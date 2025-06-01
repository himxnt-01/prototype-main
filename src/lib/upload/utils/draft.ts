// src/lib/upload/utils/draft.ts

import { DUMMY_ARTISTS, DUMMY_GENRES } from '../constants'; // <-- This goes up one level to 'upload' directory// CORRECTED PATH: constants.ts is in the same directory
import { ClientSideDummyDraft } from '@/types/track'; // Import the new type using alias

/**
 * Creates a dummy draft object for client-side display.
 * This function generates placeholder data for a track before it's fully
 * processed or uploaded to the backend.
 *
 * @param file The File object being uploaded, used for initial title.
 * @returns A `ClientSideDummyDraft` object.
 */
export function createDummyDraft(file: File): ClientSideDummyDraft {
  const randomIndex = Math.floor(Math.random() * DUMMY_ARTISTS.length);
  const durationInSeconds = Math.floor(Math.random() * 180) + 120; // 2-5 minutes
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;

  let title = "Untitled Track"; // Default fallback title

  try {
    if (file.name) {
      // Remove extension
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");

      // Replace underscores and hyphens with spaces
      const cleanedName = nameWithoutExt
        .replace(/_/g, " ")
        .replace(/-/g, " ")
        .trim();

      if (cleanedName) {
        // Split into words and capitalize each word
        title = cleanedName
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
      }
    }
  } catch (error) {
    console.error("Error processing file name:", error);
    // Keep the default title if there's an error
  }

  return {
    id: Date.now(), // Client-side unique ID (number)
    title,
    artist: DUMMY_ARTISTS[randomIndex],
    status: {
      phase: "recording",
      clearance: "pending_submission", // Placeholder
      monetization: false,
      public: false,
      flags: {
        needsMetadata: true
      }
    },
    metadata: {
      genre: DUMMY_GENRES[Math.floor(Math.random() * DUMMY_GENRES.length)],
      bpm: Math.floor(Math.random() * 40) + 100,
      key: ["Am", "Cm", "Em", "Gm"][Math.floor(Math.random() * 4)],
      duration: `${minutes}:${seconds.toString().padStart(2, '0')}`, // CORRECTED SYNTAX
      language: "English",
      explicit: false
    },
    rights: {
      writers: [],
      publishers: [],
      masterOwners: []
    },
    progress: 0,
    lastModified: new Date().toISOString(),
    uploadDate: new Date().toISOString()
  };
}
