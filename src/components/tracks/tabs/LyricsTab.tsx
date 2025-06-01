interface LyricsTabProps {
  lyrics: string;
}

export function LyricsTab({ lyrics }: LyricsTabProps) {
  return (
    <pre className="text-sm whitespace-pre-wrap font-sans p-4">
      {lyrics}
    </pre>
  );
}