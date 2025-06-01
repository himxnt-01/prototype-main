import { useState, useCallback } from "react";
import { Draft } from "@/types/draft";

export function useLyricsState(
  lyrics: Draft["lyrics"],
  onChange: (lyrics: Draft["lyrics"]) => void
) {
  const [hasLyrics, setHasLyrics] = useState(!!lyrics);
  const [content, setContent] = useState(lyrics?.content || "");
  const [language, setLanguage] = useState(lyrics?.language || "en");
  const [explicit, setExplicit] = useState(lyrics?.explicit || false);
  const [isDirty, setIsDirty] = useState(false);

  const handleSave = useCallback(() => {
    onChange({
      content,
      language,
      explicit
    });
    setIsDirty(false);
  }, [content, language, explicit, onChange]);

  return {
    hasLyrics,
    content,
    language,
    explicit,
    isDirty,
    setContent,
    setHasLyrics,
    setLanguage,
    setExplicit,
    setIsDirty,
    handleSave,
  };
}