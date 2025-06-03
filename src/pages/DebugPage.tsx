import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DebugState {
  userId: string | null;
  userEmail: string | null;
  sessionData: any;
  tracks: any[];
  isLoading: boolean;
  error: string | null;
  sessionError: string | null;
  authDebugInfo: {
    hasSession: boolean;
    hasUser: boolean;
    sessionExpiry: string | null;
    lastChecked: string;
  };
}

export function DebugPage() {
  const [state, setState] = useState<DebugState>({
    userId: null,
    userEmail: null,
    sessionData: null,
    tracks: [],
    isLoading: true,
    error: null,
    sessionError: null,
    authDebugInfo: {
      hasSession: false,
      hasUser: false,
      sessionExpiry: null,
      lastChecked: new Date().toISOString()
    }
  });

  useEffect(() => {
    async function fetchDebugData() {
      try {
        // Get current session and user using multiple methods for debugging
        const [
          sessionResponse,
          userResponse
        ] = await Promise.all([
          supabase.auth.getSession(),
          supabase.auth.getUser()
        ]);

        const { data: { session }, error: sessionError } = sessionResponse;
        const { data: { user }, error: userError } = userResponse;

        if (sessionError) {
          console.error('Session Error:', sessionError);
          setState(prev => ({ 
            ...prev, 
            sessionError: `Session Error: ${sessionError.message}`,
            authDebugInfo: {
              ...prev.authDebugInfo,
              hasSession: false,
              hasUser: false,
              lastChecked: new Date().toISOString()
            }
          }));
          return;
        }

        if (userError) {
          console.error('User Error:', userError);
          setState(prev => ({ 
            ...prev, 
            sessionError: `User Error: ${userError.message}`,
            authDebugInfo: {
              ...prev.authDebugInfo,
              hasUser: false,
              lastChecked: new Date().toISOString()
            }
          }));
          return;
        }

        // Update auth debug info
        const authDebugInfo = {
          hasSession: !!session,
          hasUser: !!user,
          sessionExpiry: session?.expires_at ? new Date(session.expires_at * 1000).toISOString() : null,
          lastChecked: new Date().toISOString()
        };

        if (!session || !user) {
          setState(prev => ({ 
            ...prev, 
            isLoading: false,
            sessionError: "No active session or user found",
            authDebugInfo
          }));
          return;
        }

        // Log the user ID we're querying with
        console.log('Attempting query for user ID:', user.id);

        try {
          // Simple query without schema prefix
          const { data: tracks, error } = await supabase
            .from('tracks')
            .select('id, title, user_id')
            .eq('user_id', user.id);

          console.log('Query results:', {
            data: tracks,
            error: error,
            userId: user.id
          });

          if (error) {
            console.error('Database Error Details:', {
              message: error.message,
              details: error.details,
              hint: error.hint,
              code: error.code,
              fullError: error
            });

            setState(prev => ({ 
              ...prev, 
              isLoading: false,
              error: JSON.stringify({
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
              }, null, 2),
              userId: user.id,
              userEmail: user.email || null,
              sessionData: session,
              authDebugInfo
            }));
            return;
          }

          setState({
            userId: user.id,
            userEmail: user.email || null,
            sessionData: session,
            tracks: tracks || [],
            isLoading: false,
            error: null,
            sessionError: null,
            authDebugInfo
          });

        } catch (err) {
          console.error('Debug Page Error:', err);
          setState(prev => ({ 
            ...prev, 
            isLoading: false,
            error: err instanceof Error ? 
              JSON.stringify({
                message: err.message,
                stack: err.stack,
                name: err.name,
                fullError: err
              }, null, 2) : 
              'An unknown error occurred',
            authDebugInfo: {
              ...prev.authDebugInfo,
              lastChecked: new Date().toISOString()
            }
          }));
        }

      } catch (err) {
        console.error('Debug Page Error:', err);
        setState(prev => ({ 
          ...prev, 
          isLoading: false,
          error: err instanceof Error ? err.message : 'An unknown error occurred',
          authDebugInfo: {
            ...prev.authDebugInfo,
            lastChecked: new Date().toISOString()
          }
        }));
      }
    }

    fetchDebugData();
  }, []);

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading debug data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Database Debug Info</h1>

      {/* Authentication Debug Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Authentication Status
            {state.sessionError && <AlertCircle className="h-5 w-5 text-destructive" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {state.sessionError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{state.sessionError}</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-2">
              <p><span className="font-semibold">User ID:</span> {state.userId || 'Not found'}</p>
              <p><span className="font-semibold">Email:</span> {state.userEmail || 'Not found'}</p>
              <p><span className="font-semibold">Session Active:</span> {state.authDebugInfo.hasSession ? 'Yes' : 'No'}</p>
              <p><span className="font-semibold">Session Expiry:</span> {state.authDebugInfo.sessionExpiry ? new Date(state.authDebugInfo.sessionExpiry).toLocaleString() : 'No expiry found'}</p>
              <p><span className="font-semibold">Last Checked:</span> {new Date(state.authDebugInfo.lastChecked).toLocaleString()}</p>
              
              <div className="mt-4">
                <p className="font-semibold mb-2">Full Session Data:</p>
                <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-48 text-xs">
                  {JSON.stringify(state.sessionData, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Database Connection Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Database Connection
            {state.error && <AlertCircle className="h-5 w-5 text-destructive" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {state.error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Database Error</AlertTitle>
              <AlertDescription className="mt-2">
                <pre className="whitespace-pre-wrap font-mono text-xs bg-muted p-2 rounded">
                  {state.error}
                </pre>
              </AlertDescription>
            </Alert>
          ) : (
            <p className="text-green-500">Database connection successful</p>
          )}
        </CardContent>
      </Card>

      {/* Tracks Info */}
      <Card>
        <CardHeader>
          <CardTitle>Tracks Information</CardTitle>
        </CardHeader>
        <CardContent>
          {state.error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Database Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <p><span className="font-semibold">Total Tracks:</span> {state.tracks.length}</p>
              </div>
              
              {state.tracks.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">User ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.tracks.map((track) => (
                        <tr key={track.id} className="border-t">
                          <td className="px-4 py-2 font-mono text-xs">{track.id}</td>
                          <td className="px-4 py-2">{track.title || '(no title)'}</td>
                          <td className="px-4 py-2 font-mono text-xs">{track.user_id || '(none)'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted-foreground italic">No tracks found for this user</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Raw Data */}
      <Card>
        <CardHeader>
          <CardTitle>Raw Track Data</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-xs">
            {JSON.stringify(state.tracks, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
} 