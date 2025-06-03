import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/providers/AuthProvider';

// Import pages
import SignupPage from './auth/signup';
import LoginPage from './auth/login';
import ResetPasswordPage from './auth/reset-password';
import UpdatePasswordPage from './auth/update-password';
import { RoleBasedProfile } from '@/components/profile/RoleBasedProfile';
import { TracksView } from './components/TracksView';
import { UploadPage } from './pages/UploadPage';
import { DraftsPage } from './pages/DraftsPage';
import { PlaylistsPage } from './pages/PlaylistsPage';
import { AlbumsPage } from './pages/AlbumsPage';
import { ArtistsPage } from './pages/ArtistsPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { InboxPage } from './pages/InboxPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { GamePage } from './pages/GamePage';
import { DebugPage } from './pages/DebugPage';
import RightsHoldersPage from './rights-holders/RightsHoldersPage';

// Auth guard component
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}

export function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Root redirect */}
      <Route 
        path="/" 
        element={
          user ? <Navigate to="/tracks" replace /> : <Navigate to="/auth/login" replace />
        } 
      />

      {/* Public auth routes */}
      <Route path="/auth">
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="update-password" element={<UpdatePasswordPage />} />
      </Route>

      {/* Protected routes with main layout */}
      <Route element={
        <AuthGuard>
          <Layout>
            <Outlet />
          </Layout>
        </AuthGuard>
      }>
        {/* Role-based profile routes */}
        <Route path="/artist/profile" element={<RoleBasedProfile />} />
        <Route path="/label/profile" element={<RoleBasedProfile />} />
        <Route path="/publisher/profile" element={<RoleBasedProfile />} />
        <Route path="/agency/profile" element={<RoleBasedProfile />} />
        <Route path="/supervisor/profile" element={<RoleBasedProfile />} />
        <Route path="/licensor/profile" element={<RoleBasedProfile />} />

        {/* Other protected routes */}
        <Route path="/game" element={<GamePage />} />
        <Route path="/licensors" element={<DiscoverPage />} />
        <Route path="/rights-holders" element={<RightsHoldersPage />} />
        <Route path="/tracks" element={<TracksView />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/drafts" element={<DraftsPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/inbox" element={<InboxPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        
        {/* Debug route */}
        <Route path="/debug" element={<DebugPage />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/tracks" replace />} />
    </Routes>
  );
} 