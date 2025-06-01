import { useEffect } from "react";
import { LyricsToolbar } from "./LyricsToolbar";
import { LyricsTextarea } from "./LyricsTextarea";
import { LyricsPreview } from "./LyricsPreview";

interface LyricsEditorProps {
  content: string;
  isDirty: boolean;
  onChange: (content: string) => void;
  onSave: () => void;
}

const KEYBOARD_SHORTCUTS = [
  { key: 'b', format: 'bold', label: 'Bold' },
  { key: 'i', format: 'italic', label: 'Italic' },
  { key: 'l', format: 'list', label: 'List' },
  { key: 'e', format: 'center', label: 'Center' },
] as const;

export function LyricsEditor({ content, isDirty, onChange, onSave }: LyricsEditorProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard shortcuts when the textarea is focused
      const textarea = document.activeElement as HTMLTextAreaElement;
      if (!textarea?.matches('textarea')) return;

      // Check for Cmd/Ctrl + key combinations
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey) {
        const shortcut = KEYBOARD_SHORTCUTS.find(s => s.key === e.key.toLowerCase());
        if (shortcut) {
          e.preventDefault();
          insertFormatting(shortcut.format);
        }

        // Handle save shortcut
        if (e.key === 's') {
          e.preventDefault();
          onSave();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content, onSave]);

  const insertFormatting = (format: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let newText = content;
    let newCursorPos = start;

    switch (format) {
      case 'bold':
        newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
        newCursorPos = end + 4;
        break;
      case 'italic':
        newText = content.substring(0, start) + `_${selectedText}_` + content.substring(end);
        newCursorPos = end + 2;
        break;
      case 'list':
        newText = content.substring(0, start) + `- ${selectedText}` + content.substring(end);
        newCursorPos = end + 2;
        break;
      case 'center':
        newText = content.substring(0, start) + `> ${selectedText}` + content.substring(end);
        newCursorPos = end + 2;
        break;
    }

    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="space-y-4">
      <LyricsToolbar
        isDirty={isDirty}
        onSave={onSave}
        onFormat={insertFormatting}
      />

      <div className="space-y-4">
        <LyricsTextarea
          value={content}
          onChange={onChange}
        />

        <LyricsPreview content={content} />
      </div>
    </div>
  );
}