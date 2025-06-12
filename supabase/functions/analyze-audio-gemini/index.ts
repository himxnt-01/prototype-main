// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
// If your editor shows errors for Deno imports, please follow the Deno setup guide
// mentioned above. This code is correct for the Supabase Deno runtime.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

console.log("Hello from Functions!")

// Define a type for the expected webhook payload from Supabase
interface AnalyzeAudioRequest {
  record: {
    id: string; 
    audio_url: string;
    // The trigger sends the entire track record, so other fields might be present
    [key: string]: any;
  };
}

// Define a type for the expected structure of the service account key
interface ServiceAccountKey {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

// Define a type for the Gemini API response structure (simplified)
interface GeminiAnalysisResult {
  // Define fields based on your prompt, e.g.:
  Key?: string;
  BPM?: number;
  Genre?: string[];
  SubGenre?: string[];
  Mood?: string[];
  Instruments?: string[];
  VocalType?: string;
  ExplicitContent?: boolean;
  OverallDescription?: string;
  EmotionalArc?: string;
  Language?: string;
  Harmony?: string;
  ChordProgression?: string;
  LyricalTheme?: string[];
  CulturalFusion?: string[];
  HistoricalPeriod?: string;
}

// --- Google Auth Helper ---
async function getGoogleAccessToken(serviceAccountKeyJson: string): Promise<string> {
  const serviceAccountKey: ServiceAccountKey = JSON.parse(serviceAccountKeyJson);
  const GOOGLE_TOKEN_URI = 'https://oauth2.googleapis.com/token';
  const GOOGLE_CLOUD_PLATFORM_SCOPE = 'https://www.googleapis.com/auth/cloud-platform';

  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: serviceAccountKey.client_email,
    sub: serviceAccountKey.client_email,
    aud: GOOGLE_TOKEN_URI,
    iat: now,
    exp: now + 3600, // Token valid for 1 hour
    scope: GOOGLE_CLOUD_PLATFORM_SCOPE,
  };

  // Helper to import PEM key for SubtleCrypto
  async function importKeyFromString(pemKey: string) {
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    // Keep console logs for now for debugging if needed
    let base64Key = pemKey.replace(pemHeader, "").replace(pemFooter, "").replace(/\\n/g, "").replace(/\n/g, "").replace(/\s/g, "");
    try {
      const binaryDer = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
      return await crypto.subtle.importKey(
        "pkcs8",
        binaryDer,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        true,
        ["sign"]
      );
    } catch (e) {
      console.error("Error importing key:", e.message);
      throw new Error("Failed to import private key for JWT signing.");
    }
  }

  const privateKey = await importKeyFromString(serviceAccountKey.private_key);

  const unsignedJwt = `${btoa(JSON.stringify(header)).replace(/=+$/, '')}.${btoa(JSON.stringify(claims)).replace(/=+$/, '')}`;

  const signature = await crypto.subtle.sign(
    { name: "RSASSA-PKCS1-v1_5" },
    privateKey,
    new TextEncoder().encode(unsignedJwt)
  );

  const signedJwt = `${unsignedJwt}.${btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=+$/, '')}`;

  const tokenResponse = await fetch(GOOGLE_TOKEN_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: signedJwt,
    }),
  });

  if (!tokenResponse.ok) {
    const errorBody = await tokenResponse.text();
    console.error("Error fetching Google access token:", tokenResponse.status, errorBody);
    throw new Error(`Google Auth Error: ${tokenResponse.status} ${errorBody}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Get the Gemini Service Account Key from environment variables
    const geminiServiceAccountKeyJson = Deno.env.get('GEMINI_SERVICE_ACCOUNT_KEY');

    if (!geminiServiceAccountKeyJson) {
      console.error('GEMINI_SERVICE_ACCOUNT_KEY environment variable not set.');
      // NOTE: This error is the one you were seeing locally.
      // Ensure you have set the secret correctly using:
      // npx supabase secrets set --env-file ./path/to/your/env/file
      // And that `npx supabase start` is run AFTER setting the secret.
      return new Response(JSON.stringify({ error: 'Service account key not configured.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Parse request body - updated to match expected webhook format
    if (!req.headers.get("content-type")?.includes("application/json")) {
        return new Response(JSON.stringify({ error: "Request body must be JSON" }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
    const body: AnalyzeAudioRequest = await req.json();
    // Accommodate both direct calls and trigger-based calls
    const record = body.record
    const trackId = record?.id;
    const audioUrl = record?.audio_url;


    if (!audioUrl || !trackId) {
      return new Response(JSON.stringify({ error: '`record` object with `id` and `audio_url` is required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
     // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Set analysis status to 'processing'
    await supabaseClient.from('tracks').update({ analysis_status: 'processing' }).eq('id', trackId);


    // 3. Get Google Access Token
    console.log("Attempting to get Google access token...");
    const accessToken = await getGoogleAccessToken(geminiServiceAccountKeyJson);
    console.log("Successfully obtained Google access token.");

    // 4. Call Vertex AI Gemini API
    // Corrected endpoint to non-streaming for a single JSON response
    const vertexApiUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/mvpasap/locations/us-central1/publishers/google/models/gemini-2.5-flash-preview-05-20:generateContent`;

    // Modified prompt to refer to "the provided audio"
    const instructionPrompt = `
Analyze the provided audio and generate a single, valid JSON object.

Your response MUST contain all of the following keys. If you cannot determine the value for a key, you MUST return \`null\` for that key's value. Do not omit any keys from the JSON object.

- Key
- BPM
- Genre
- SubGenre
- Mood
- LyricalTheme
- Instruments
- VocalType
- Language
- Harmony
- ChordProgression
- EmotionalArc
- CulturalFusion
- HistoricalPeriod
- ExplicitContent
- OverallDescription

Example of a complete response with a null value:
{
  "Key": "A Minor",
  "BPM": 125,
  "Genre": ["Electronic", "House"],
  "SubGenre": ["Deep House"],
  "Mood": ["Groovy", "Uplifting"],
  "LyricalTheme": null,
  "Instruments": ["Drum Machine", "Synthesizer", "Bass"],
  "VocalType": "Vocal Samples",
  "Language": "Instrumental",
  "Harmony": "Diatonic",
  "ChordProgression": "Am7-Gmaj7-Cmaj7-Fmaj7",
  "EmotionalArc": "Builds steadily from a minimal intro to a euphoric peak.",
  "CulturalFusion": [],
  "HistoricalPeriod": "2020s",
  "ExplicitContent": false,
  "OverallDescription": "A groovy deep house track with prominent basslines."
}
    `;

    const geminiRequestBody = {
      contents: [
        {
          role: "user", 
          parts: [
            { text: instructionPrompt }, // First part: the text prompt
            {
              fileData: { // Second part: the audio file data
                mimeType: "audio/mp3", // Assuming mp3 based on the URL
                fileUri: audioUrl
              }
            }
          ],
        },
      ],
      generationConfig: {
        "response_mime_type": "application/json", // Enable this for strict JSON output
        "temperature": 0.3,
        "topP": 0.95,
        "topK": 40
      }
    };

    console.log("Calling Vertex AI Gemini API...");
    const geminiResponse = await fetch(vertexApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(geminiRequestBody),
    });

    if (!geminiResponse.ok) {
      const errorBody = await geminiResponse.text();
      console.error("Gemini API Error Response:", errorBody);
       await supabaseClient.from('tracks').update({ 
        analysis_status: 'error',
        error_message: `Gemini API failed with status ${geminiResponse.status}: ${errorBody}`
      }).eq('id', trackId);
      // Pass the full error body for better debugging
      throw new Error(`Gemini API request failed with status ${geminiResponse.status}: ${errorBody}`);
    }

    // 5. Process and save the analysis
    // Since using the non-streaming endpoint, the response is a JSON object, not a text stream.
    const responseJson = await geminiResponse.json();
    console.log("Raw Gemini Response JSON:", JSON.stringify(responseJson, null, 2));

    // The actual analysis is nested inside the response object.
    const analysisText = responseJson?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!analysisText) {
        await supabaseClient.from('tracks').update({ 
            analysis_status: 'error',
            error_message: 'Could not find analysis text in Gemini response.'
        }).eq('id', trackId);
        throw new Error('Could not find analysis text in Gemini response. Full response: ' + JSON.stringify(responseJson));
    }

    let analysisResult: GeminiAnalysisResult;
    try {
        analysisResult = JSON.parse(analysisText);
    } catch (e) {
        await supabaseClient.from('tracks').update({ 
            analysis_status: 'error',
            error_message: `Failed to parse JSON from Gemini: ${e.message}`
        }).eq('id', trackId);
        throw new Error(`Failed to parse JSON: ${e.message}`);
    }

    console.log("Parsed Gemini Analysis:", analysisResult);

    // Helper function to ensure a value is an array
    const ensureArray = (value: string | string[] | null | undefined): string[] | null => {
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === 'string') {
        // If it's a non-empty string, put it in an array. Otherwise, it's likely meant to be empty.
        return value ? [value] : null;
      }
      return null; // Return null for null, undefined, or other types
    };

    // 6. Map Gemini response to Supabase table columns, ensuring array types are correct
    const updateData = {
      key: analysisResult.Key,
      bpm: analysisResult.BPM,
      genre: ensureArray(analysisResult.Genre),
      // `moods` in the table is `jsonb`. Gemini's `Mood` is likely a string array.
      moods: ensureArray(analysisResult.Mood),
      instruments: ensureArray(analysisResult.Instruments),
      vocal_type: analysisResult.VocalType,
      explicit_content: analysisResult.ExplicitContent,
      // Storing OverallDescription in a new 'description' column.
      // IMPORTANT: You will need to add this column to your 'tracks' table.
      description: analysisResult.OverallDescription,
      // Add the new detailed fields
      language: analysisResult.Language,
      emotional_arc: analysisResult.EmotionalArc,
      harmony: analysisResult.Harmony,
      chord_progression: analysisResult.ChordProgression,
      lyrical_theme: ensureArray(analysisResult.LyricalTheme),
      cultural_fusion: ensureArray(analysisResult.CulturalFusion),
      historical_period: analysisResult.HistoricalPeriod,
      analysis_status: 'completed',
      updated_at: new Date().toISOString(),
      error_message: null, // Clear any previous errors
    };

    // 7. Update the track in Supabase
    const { data, error } = await supabaseClient
      .from('tracks')
      .update(updateData)
      .eq('id', trackId)
      .select();

    if (error) {
      console.error('Supabase update error:', error);
       await supabaseClient.from('tracks').update({ 
        analysis_status: 'error',
        error_message: `Supabase update failed: ${error.message}`
      }).eq('id', trackId);
      throw new Error(`Supabase update failed: ${error.message}`);
    }

    console.log("Successfully updated track in Supabase:", data);

    // 8. Return the successful analysis
    return new Response(JSON.stringify({ success: true, analysis: analysisResult }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})

/* To invoke locally:

  Prerequisites:
  1. Ensure your GEMINI_SERVICE_ACCOUNT_KEY is set in supabase/functions/.env.local
     Example: GEMINI_SERVICE_ACCOUNT_KEY='{"type": "service_account", ...}'
  2. Run \`supabase start\`

  Curl Request:
  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/analyze-audio-gemini' \\
    --header 'Authorization: Bearer YOUR_SUPABASE_ANON_KEY' \\
    --header 'Content-Type: application/json' \\
    --data '{"audioUrl":"YOUR_CLOUDINARY_AUDIO_URL", "trackId": "OPTIONAL_TRACK_ID"}'

*/