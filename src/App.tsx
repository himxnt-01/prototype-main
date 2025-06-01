// src/App.tsx
import React from 'react';
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PlayerProvider } from "@/components/player/PlayerProvider";
import { useLocation } from '@/hooks/useLocation';

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
  const { currentPath } = useLocation();

  // Function to get the page component based on the current path
  const getPage = () => {
    switch (currentPath) {
      // --- Pages outside the main application layout (no sidebar) ---
      case '/':
        return <LandingPage />;
      case '/auth/signup':
        return <SignupPage />;
      case '/auth/login':
        return <LoginPage />;
      case '/game': // Game is often a separate experience, so leaving it unwrapped
        return <GamePage />;

      // --- Core application pages that use the sidebar Layout ---
      case '/licensors': // Discover Music for Licensors/Supervisors - NO SIDEBAR
        return <DiscoverPage />;

      // --- Rights Holders section and Catalog Management pages (WITH SIDEBAR) ---
      case '/rights-holders': // Can be a general Rights Holder dashboard
        return (
          <Layout>
            <RightsHoldersPage />
          </Layout>
        );
      case '/tracks': // Main Tracks View
        return (
          <Layout>
            <TracksView />
          </Layout>
        );
      case '/upload': // Upload New Tracks
        return (
          <Layout>
            <UploadPage />
          </Layout>
        );
      case '/drafts': // Managing Work-in-progress Tracks
        return (
          <Layout>
            <DraftsPage />
          </Layout>
        );
      case '/playlists': // Creating and Managing Playlists
        return (
          <Layout>
            <PlaylistsPage />
          </Layout>
        );
      case '/albums': // Managing Album Releases
        return (
          <Layout>
            <AlbumsPage />
          </Layout>
        );
      case '/artists': // Managing Artist Profiles
        return (
          <Layout>
            <ArtistsPage />
          </Layout>
        );
      case '/marketplace': // Managing Marketplace Listings
        return (
          <Layout>
            <MarketplacePage />
          </Layout>
        );
      case '/inbox': // Managing Communications and Sync Requests
        return (
          <Layout>
            <InboxPage />
          </Layout>
        );
      case '/projects': // Managing Collaborative Projects
        return (
          <Layout>
            <ProjectsPage />
          </Layout>
        );
      // AnalyticsPage and SettingsPage cases are removed permanently as requested.

      // --- Fallback for unrecognized paths ---
      default:
        console.warn(`Unrecognized path: ${currentPath}. Redirecting to login.`);
        return <LoginPage />;
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        {/* Render the selected page component based on the current path */}
        {getPage()}
        <PlayerProvider />
      </TooltipProvider>
    </ThemeProvider>
  );
}