import { z } from "zod";

export const genreOptions = [
  "Hip-Hop",
  "Pop",
  "Electronic",
  "R&B",
  "Rock",
  "Jazz",
  "Classical",
  "Country",
  "Reggae",
  "Afrobeats",
] as const;

export const sellerProfileSchema = z.object({
  displayName: z
    .string()
    .min(3, "Display name must be at least 3 characters")
    .max(50, "Display name must be less than 50 characters"),
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .optional(),
  profileImage: z
    .object({
      url: z.string(),
      file: z.instanceof(File),
    })
    .optional(),
  headerImage: z
    .object({
      url: z.string(),
      file: z.instanceof(File),
    })
    .optional(),
  genres: z.array(z.enum(genreOptions)).min(1, "Select at least one genre"),
  equipment: z.array(z.string()).min(1, "Add at least one piece of equipment"),
  socialLinks: z.object({
    instagram: z.string().url("Invalid Instagram URL").optional().or(z.literal("")),
    soundcloud: z.string().url("Invalid SoundCloud URL").optional().or(z.literal("")),
    spotify: z.string().url("Invalid Spotify URL").optional().or(z.literal("")),
  }),
  location: z.object({
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
  }),
});

export type SellerProfileFormData = z.infer<typeof sellerProfileSchema>;

export type ImageUpload = {
  url: string;
  file: File;
}; 