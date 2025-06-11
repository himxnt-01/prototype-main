// src/App.tsx
import React from 'react';
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { Routes, Route } from 'react-router-dom';

// Import your main Layout component
import { Layout } from './components/Layout.tsx';

// --- Import general application pages ---
import { LandingPage } from './pages/LandingPage.tsx';
import { DiscoverPage } from './pages/DiscoverPage.tsx'; // For '/licensors' route
import { GamePage } from './pages/GamePage.tsx';

// --- Import Authentication pages (usually default exports from subfolders) ---
import SignupPage from './auth/signup.tsx';
import LoginPage from './auth/login.tsx';

// --- Import Rights Holder / Catalog Management Pages ---
import { TracksView } from './components/TracksView.tsx'; // Main catalog view
import { UploadPage } from './pages/UploadPage.tsx'; // From sidebar
import { DraftsPage } from './pages/DraftsPage.tsx'; // From sidebar
import { PlaylistsPage } from './pages/PlaylistsPage.tsx'; // From sidebar
import { AlbumsPage } from './pages/AlbumsPage.tsx'; // From sidebar
import { ArtistsPage } from './pages/ArtistsPage.tsx'; // From sidebar
import { MarketplacePage } from './pages/MarketplacePage.tsx'; // From sidebar
import { InboxPage } from './pages/InboxPage.tsx'; // From sidebar
import { ProjectsPage } from './pages/ProjectsPage.tsx'; // From sidebar

// This is the original placeholder RightsHoldersPage.tsx, can be a dashboard if needed.
import RightsHoldersPage from './rights-holders/RightsHoldersPage.tsx';


export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          {/* --- Pages outside the main application layout (no sidebar) --- */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/licensors" element={<DiscoverPage />} />

          {/* --- Routes within the main Layout (with sidebar) --- */}
          <Route path="/rights-holders" element={<Layout><RightsHoldersPage /></Layout>} />
          <Route path="/tracks" element={<Layout><TracksView /></Layout>} />
          <Route path="/upload" element={<Layout><UploadPage /></Layout>} />
          <Route path="/drafts" element={<Layout><DraftsPage /></Layout>} />
          <Route path="/playlists" element={<Layout><PlaylistsPage /></Layout>} />
          <Route path="/albums" element={<Layout><AlbumsPage /></Layout>} />
          <Route path="/artists" element={<Layout><ArtistsPage /></Layout>} />
          <Route path="/marketplace" element={<Layout><MarketplacePage /></Layout>} />
          <Route path="/inbox" element={<Layout><InboxPage /></Layout>} />
          <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />

          {/* --- Fallback for unrecognized paths --- */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
        <PlayerProvider />
      </TooltipProvider>
    </ThemeProvider>
  );
}