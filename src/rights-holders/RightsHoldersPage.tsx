// src/rights-holders/RightsHoldersPage.tsx

import React from 'react';
import { TracksView } from '@/components/TracksView'; // <--- Import your TracksView component

export default function RightsHoldersPage() {
  return (
    // You can keep a minimal wrapper or direct return TracksView if it handles its own layout
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      {/* You can add a title or welcome message here if you want it above TracksView,
          or remove it if TracksView provides its own page title/header.
          For now, I'll remove the placeholder text to let TracksView take over.
      */}
      {/* The main content of the Rights Holders Catalog Management */}
      <TracksView />
    </div>
  );
}