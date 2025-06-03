export interface Profile {
  id: string;
  username: string;
  display_name?: string;
  bio?: string;
  profile_pic_url?: string;
  header_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Follower {
  id: string;
  artist_id: string;
  follower_id: string;
  created_at: string;
}

export interface SharedTrack {
  id: string;
  track_id: string;
  shared_by: string;
  shared_with: string;
  share_type: 'private' | 'public';
  created_at: string;
}

export interface Playlist {
  id: string;
  title: string;
  description?: string;
  cover_url?: string;
  created_by: string;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlaylistTrack {
  id: string;
  playlist_id: string;
  track_id: string;
  position: number;
  added_at: string;
}

export interface SharedPlaylist {
  id: string;
  playlist_id: string;
  shared_by: string;
  shared_with: string;
  share_type: 'private' | 'public';
  created_at: string;
} 