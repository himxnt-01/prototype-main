// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

console.log("Hello from Functions!")

// Define a type for the expected request body (e.g., audio URL, track ID)
interface AnalyzeAudioRequest {
  audioUrl: string;
  trackId?: string; // Optional: if you want to update a specific track
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
  Key?: string; // Changed from key to Key to match example
  BPM?: number; // Changed from bpm to BPM to match example
  Genre?: string[]; // Changed from genre to Genre to match example
  SubGenre?: string[]; // Added SubGenre to match prompt
  Mood?: string[]; // Changed from mood to Mood to match example
  Instruments?: string[]; // Changed from instruments to Instruments to match example
  VocalType?: string; // Added VocalType to match prompt
  ExplicitContent?: boolean; // Added ExplicitContent to match prompt
  OverallDescription?: string; // Added OverallDescription to match prompt
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

    console.log(`importKeyFromString: Original pemKey length: ${pemKey.length}, first 70 chars: '${pemKey.substring(0,70)}...'`);

    // 1. Remove header and footer
    let base64Key = pemKey.replace(pemHeader, "").replace(pemFooter, "");
    console.log(`importKeyFromString: base64Key length after header/footer removal: ${base64Key.length}, first 70 chars: '${base64Key.substring(0,70)}...'`);

    // 2. Remove all newline characters
    base64Key = base64Key.replace(/\\n/g, ""); // First, remove literal \\n if any were missed (unlikely here after JSON.parse)
    base64Key = base64Key.replace(/\n/g, ""); // Then remove actual newlines
    console.log(`importKeyFromString: base64Key length after newline removal: ${base64Key.length}, first 70 chars: '${base64Key.substring(0,70)}...'`);
    
    // 3. Remove any other whitespace just in case
    base64Key = base64Key.replace(/\s/g, "");
    console.log(`importKeyFromString: Processed base64Key for atob length: ${base64Key.length}, first 70 chars: '${base64Key.substring(0,70)}...'`);


    try {
      const binaryDer = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
      console.log(`importKeyFromString: binaryDer length: ${binaryDer.length}`);
      return await crypto.subtle.importKey(
        "pkcs8",
        binaryDer,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        true,
        ["sign"]
      );
    } catch (e) {
      console.error("Error importing key:", e);
      console.error(`importKeyFromString (in catch): Original pemKey length: ${pemKey.length}`);
      console.error(`importKeyFromString (in catch): Processed base64Key for atob length: ${base64Key.length}`);
      console.error(`importKeyFromString (in catch): Processed base64Key (first 70 chars): '${base64Key.substring(0,70)}...'`);
      // If atob failed, binaryDer might not be defined or relevant here.
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

  console.log(`MY_TEST_VARIABLE from Deno.env: ${Deno.env.get('MY_TEST_VARIABLE')}`);

  try {
    // 1. Get the Gemini Service Account Key from environment variables
    const geminiServiceAccountKeyJson = Deno.env.get('GEMINI_SERVICE_ACCOUNT_KEY');

    if (!geminiServiceAccountKeyJson) {
      console.error('GEMINI_SERVICE_ACCOUNT_KEY environment variable not set.');
      return new Response(JSON.stringify({ error: 'Gemini service account key not configured for the function.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Parse request body
    if (req.headers.get("content-type") !== "application/json") {
        return new Response(JSON.stringify({ error: "Request body must be JSON" }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
    const body: AnalyzeAudioRequest = await req.json();
    const { audioUrl, trackId } = body;

    if (!audioUrl) {
      return new Response(JSON.stringify({ error: 'audioUrl is required in the request body.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 3. Get Google Access Token
    console.log("Attempting to get Google access token...");
    const accessToken = await getGoogleAccessToken(geminiServiceAccountKeyJson);
    console.log("Successfully obtained Google access token.");

    // 4. Call Vertex AI Gemini API
    const vertexApiUrl = `https://us-central1-aiplatform.googleapis.com/v1/projects/mvpasap/locations/us-central1/publishers/google/models/gemini-2.5-flash-preview-05-20:streamGenerateContent`;

    // Modified prompt to refer to "the provided audio"
    const instructionPrompt = `
Analyze the provided audio and output the information as a JSON object with the following keys:
- Key (e.g., "C Major", "A Minor")
- BPM (Beats Per Minute, e.g., 120)
- Genre (e.g., ["Electronic", "Techno", "Ambient"])
- SubGenre (e.g., ["Deep House", "Progressive Trance"])
- Mood (e.g., ["Energetic", "Dark", "Melancholic"])
- Instruments (e.g., ["Synthesizer", "Drum Machine", "Bass Guitar"])
- VocalType (e.g., "Male Vocals", "Female Vocals", "Instrumental", "Vocal Samples")
- ExplicitContent (true or false)
- OverallDescription (A brief 1-2 sentence summary of the track's vibe and characteristics)

Example JSON output format:
{
  "Key": "A Minor",
  "BPM": 125,
  "Genre": ["Electronic", "House"],
  "SubGenre": ["Deep House"],
  "Mood": ["Groovy", "Uplifting"],
  "Instruments": ["Drum Machine", "Synthesizer", "Bass"],
  "VocalType": "Vocal Samples",
  "ExplicitContent": false,
  "OverallDescription": "A groovy deep house track with prominent basslines and uplifting synth melodies."
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
        // "response_mime_type": "application/json", // Enable this for strict JSON output
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
      console.error('Vertex AI API Error:', geminiResponse.status, errorBody);
      return new Response(JSON.stringify({ error: `Vertex AI API Error: ${geminiResponse.status} ${errorBody}` }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const responseText = await geminiResponse.text();
    let fullTextResponse = "";
    try {
        const parts = JSON.parse(responseText);
        for (const part of parts) {
            if (part.candidates && part.candidates[0].content && part.candidates[0].content.parts) {
                for (const textPart of part.candidates[0].content.parts) {
                    if (textPart.text) {
                        fullTextResponse += textPart.text;
                    }
                }
            }
        }
    } catch (e) {
        console.error("Error parsing Gemini streaming response:", e);
        console.error("Raw Gemini response text:", responseText);
        return new Response(JSON.stringify({ error: 'Error parsing Gemini response.', details: responseText }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    console.log('Raw Gemini response:', fullTextResponse);

    let analysisResult: GeminiAnalysisResult = {};
    try {
      const jsonMatch = fullTextResponse.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        analysisResult = JSON.parse(jsonMatch[1]);
      } else {
        analysisResult = JSON.parse(fullTextResponse);
      }
      console.log('Parsed Gemini analysis:', analysisResult);
    } catch (e) {
      console.error('Error parsing extracted JSON from Gemini response:', e);
      console.error('Full text response was:', fullTextResponse);
      return new Response(JSON.stringify({ error: 'Could not parse analysis from Gemini.', details: fullTextResponse }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 6. TODO: Update Supabase `tracks` table with `analysisResult` using `trackId` if provided
    if (trackId && Object.keys(analysisResult).length > 0) {
      const { createClient } = await import('npm:@supabase/supabase-js@2'); // Using npm specifier for Deno
      
      // Use environment variables for URL and Key
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

      if (!supabaseUrl || !supabaseServiceRoleKey) {
        console.error('Supabase URL or Service Role Key not configured via environment variables.');
        console.error(`SUPABASE_URL found: ${!!supabaseUrl}, SUPABASE_SERVICE_ROLE_KEY found: ${!!supabaseServiceRoleKey}`);
        // Return an error or handle appropriately if configuration is missing
        return new Response(JSON.stringify({ error: 'Supabase client configuration missing.' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } else {
        // Log the resolved URL and a confirmation that the key is set (without logging the full key)
        console.log(`Supabase Client Initializing with URL from env: ${supabaseUrl}`);
        console.log(`Supabase Service Role Key from env is SET. Length: ${supabaseServiceRoleKey.length}`);

        const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey);

        // Expand the updateObject to include all relevant analysis fields
        const updateObject = {
          bpm: analysisResult.BPM,
          key: analysisResult.Key,
          genre: analysisResult.Genre,
          instruments: analysisResult.Instruments,
          vocal_type: analysisResult.VocalType,
          explicit_content: analysisResult.ExplicitContent,
          moods: analysisResult.Mood, // Storing the Mood array directly into the JSONB field
          // SubGenre and OverallDescription from Gemini are not mapped yet as there are no direct columns.
          analysis_status: "completed", // Set status to "completed"
          updated_at: new Date().toISOString(),
        };

        console.log(`Attempting to update Supabase track with ID: ${trackId} with Data:`, updateObject);

        if (!trackId) {
          console.warn("No trackId provided, skipping Supabase update. Gemini analysis result:", analysisResult);
          // If no trackId, we might just return the analysis and not attempt an update.
          // Or, this case should have been handled earlier if trackId is mandatory for this function's purpose.
          return new Response(
            JSON.stringify({ success: true, message: "Analysis complete, no trackId provided for update.", data: analysisResult }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        // @ts-ignore: Check if supabaseClient is defined
        if (typeof supabaseClient === 'undefined') {
            console.error("supabaseClient is not defined. Cannot update track.");
            return new Response(JSON.stringify({ success: false, error: "Internal server error: Supabase client not configured.", trackId: trackId }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        // @ts-ignore: supabaseClient will be used here
        const { data: updatedTrack, error: updateError } = await supabaseClient
          .from('tracks')
          .update(updateObject) // Using the new simplified object
          .eq('id', trackId) 
          .select();

        if (updateError && Object.keys(updateError).length > 0) { 
          console.error('!!! Supabase update FAILED. Error object received:', updateError);
          const errorDetailString = JSON.stringify(updateError, null, 2);
          console.error('Supabase update error object (stringified):', errorDetailString);
          console.error('Supabase update error message property:', updateError.message);
          console.error('Supabase update error details property:', updateError.details);
          console.error('Supabase update error hint property:', updateError.hint);
          console.error('Supabase update error code property:', updateError.code);
          console.error('Attempting to return 500 error response to client...');
          
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: 'Failed to update track in Supabase.', 
              details: updateError.message || 'No specific error message. Raw error object was not empty but lacked typical fields.',
              rawError: updateError, // Send the raw error object
              trackId: trackId 
            }),
            { 
              status: 500, // Internal Server Error
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        } else if (updateError) { // Handles the case where updateError might be an empty object {}
          console.error('!!! Supabase update FAILED. Received an empty error object or an error with no keys:', updateError);
          console.error('Attempting to return 500 error response to client for empty/unknown error object...');
          return new Response(
            JSON.stringify({
              success: false,
              error: 'Failed to update track in Supabase. Received an undecipherable error object.',
              details: 'The error object from Supabase was empty or did not contain standard error fields.',
              rawError: updateError, // Send the raw error object
              trackId: trackId,
            }),
            {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        console.log('Supabase update successful. Updated track data:', updatedTrack);

        // Return success response with Gemini data and updated track confirmation
        return new Response(
          JSON.stringify({ success: true, data: analysisResult, trackId: trackId, updatedTrackData: updatedTrack }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

  } catch (error) {
    console.error('Unhandled error in Edge Function:', error);
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
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