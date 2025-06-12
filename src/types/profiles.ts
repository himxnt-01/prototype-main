import { z } from "zod";
import { genreOptions } from "./seller";

// Image field schema
const imageSchema = z.object({
  url: z.string(),
  file: z.instanceof(File).optional(),
});

// Common profile fields schema
const commonProfileFields = {
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  display_name: z.string().min(3, "Display name must be at least 3 characters").max(50),
  bio: z.string().max(500).optional(),
  profile_image: imageSchema.optional(),
  header_image: imageSchema.optional(),
  location: z.object({
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
  }),
  social_links: z.object({
    instagram: z.string().url("Invalid Instagram URL").optional().or(z.literal("")),
    soundcloud: z.string().url("Invalid SoundCloud URL").optional().or(z.literal("")),
    spotify: z.string().url("Invalid Spotify URL").optional().or(z.literal("")),
  }),
  status: z.enum(["draft", "published"]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
};

// Base profile schema that matches our database structure
export const artistProfileSchema = z.object({
  ...commonProfileFields,
  role: z.enum(["independent-artist", "signed-artist"]),
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  profile_image: imageSchema.optional(),
  header_image: imageSchema.optional(),
  // Additional fields that will be stored as JSON in the database
  genres: z.array(z.string()).default([]),
  influences: z.array(z.string()).default([]),
  equipment: z.array(z.string()).default([]),
  software: z.array(z.string()).default([]),
  education: z.string().optional(),
  experience: z.string().optional(),
  publishing_deal: z.boolean().default(false),
  publishing_company: z.string().optional(),
  social_links: z.object({
    website: z.string().url("Invalid website URL").optional().or(z.literal("")),
    instagram: z.string().url("Invalid Instagram URL").optional().or(z.literal("")),
    twitter: z.string().url("Invalid Twitter URL").optional().or(z.literal("")),
    soundcloud: z.string().url("Invalid SoundCloud URL").optional().or(z.literal("")),
    spotify: z.string().url("Invalid Spotify URL").optional().or(z.literal("")),
    youtube: z.string().url("Invalid YouTube URL").optional().or(z.literal("")),
    apple_music: z.string().url("Invalid Apple Music URL").optional().or(z.literal("")),
  }).default({}),
  location: z.object({
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
  }),
  status: z.enum(["draft", "published"]).default("draft"),
});

// TypeScript type generated from the schema
export type ArtistProfile = z.infer<typeof artistProfileSchema>;

// Form state interface
export interface ArtistProfileFormState {
  isLoading: boolean;
  isSaving: boolean;
  isDirty: boolean;
  lastSaved: Date | null;
  activeTab: "basic" | "professional" | "social";
}

// Database types
export interface ArtistProfileData {
  id: string;
  user_id: string;
  name: string;
  bio?: string;
  profile_picture?: string;
  metadata: {
    genres: string[];
    influences: string[];
    equipment: string[];
    software: string[];
    social_links: {
      website?: string;
      instagram?: string;
      twitter?: string;
      soundcloud?: string;
      spotify?: string;
    };
    location: {
      city?: string;
      country?: string;
    };
  };
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

// Label-specific fields
export const labelProfileSchema = z.object({
  ...commonProfileFields,
  role: z.literal("label"),
  company_info: z.object({
    name: z.string().min(1),
    founded_year: z.number(),
    website: z.string().url(),
    type: z.enum(["major", "independent", "distributor"]),
  }),
  roster_size: z.number().min(0),
  distribution_partners: z.array(z.string()),
  territories: z.array(z.string()),
  genres: z.array(z.enum(genreOptions)),
});

// Publisher-specific fields
export const publisherProfileSchema = z.object({
  ...commonProfileFields,
  role: z.literal("publisher"),
  company_info: z.object({
    name: z.string().min(1),
    founded_year: z.number(),
    website: z.string().url(),
  }),
  catalog_size: z.number().min(0),
  territories: z.array(z.string()),
  collection_societies: z.array(z.string()),
  sub_publishers: z.array(z.string()),
});

// Agency-specific fields
export const agencyProfileSchema = z.object({
  ...commonProfileFields,
  role: z.literal("sync-agency"),
  company_info: z.object({
    name: z.string().min(1),
    founded_year: z.number(),
    website: z.string().url(),
  }),
  catalog_size: z.number().min(0),
  territories: z.array(z.string()),
  client_types: z.array(z.enum(["brands", "films", "tv", "games", "advertising"])),
  exclusive_representation: z.boolean(),
});

// Supervisor-specific fields
export const supervisorProfileSchema = z.object({
  ...commonProfileFields,
  role: z.literal("music-supervisor"),
  company_info: z.object({
    name: z.string().min(1),
    website: z.string().url(),
  }),
  specialties: z.array(z.enum(["film", "tv", "advertising", "games", "trailers"])),
  notable_projects: z.array(z.string()),
  preferred_genres: z.array(z.enum(genreOptions)),
});

// Licensor-specific fields
export const licensorProfileSchema = z.object({
  ...commonProfileFields,
  role: z.literal("licensor"),
  company_info: z.object({
    name: z.string().min(1),
    website: z.string().url(),
  }),
  license_types: z.array(z.enum(["sync", "mechanical", "performance", "digital"])),
  territories: z.array(z.string()),
  catalog_access: z.enum(["direct", "through-agency", "mixed"]),
});

// Union type for all profile types
export type LabelProfile = z.infer<typeof labelProfileSchema>;
export type PublisherProfile = z.infer<typeof publisherProfileSchema>;
export type AgencyProfile = z.infer<typeof agencyProfileSchema>;
export type SupervisorProfile = z.infer<typeof supervisorProfileSchema>;
export type LicensorProfile = z.infer<typeof licensorProfileSchema>;

export type Profile = 
  | ArtistProfile 
  | LabelProfile 
  | PublisherProfile 
  | AgencyProfile 
  | SupervisorProfile 
  | LicensorProfile;

export interface ProfileData {
  name: string;
  artistType: "independent" | "signed";
  instrument: string;
  bio: string;
  city: string;
  country: string;
  instagramUrl: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  soundcloudUrl: string;
  youtubeUrl: string;
  websiteUrl: string;
  hasPublishingDeal: boolean;
  publishingCompany: string;
  equipment: string[];
  software: string[];
  genres: string[];
  influences: string[];
  education: string;
  experience: string;
  profile_picture: string;
  header_image: string;
} 