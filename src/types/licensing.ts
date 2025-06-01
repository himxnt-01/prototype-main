export interface SyncLicensingInfo {
  mood: string[];
  instruments: string[];
  tempo: string;
  energy: "low" | "medium" | "high";
  vocals: "none" | "male" | "female" | "both";
  explicit: boolean;
  genres: string[];
  subgenres: string[];
  similar: string[];
  themes: string[];
  description?: string;
  clearance: ClearanceInfo;
  pricing: PricingTier[];
  usage: UsageInfo;
  technicalSpecs: TechnicalSpecs;
}

interface ClearanceInfo {
  masterRights: string;
  publishingRights: string;
  territorialRestrictions: string[];
  preClearedFor: string[];
  restrictions: string[];
  licensingContact?: string;
  clearanceTimeframe?: string;
  rightsExpiration?: string;
}

interface PricingTier {
  name: string;
  usage: string[];
  price: number;
  term: string;
  territories: string[];
  minimumGuarantee?: number;
  rushFee?: number;
  customizationFee?: number;
}

interface UsageInfo {
  intendedUse: string[];
  targetAudience: string[];
  marketingChannels: string[];
  contentRating: "G" | "PG" | "PG-13" | "R" | "NC-17";
  usageRestrictions: string[];
}

interface TechnicalSpecs {
  fileFormat: string;
  sampleRate: number;
  bitDepth: number;
  channels: number;
  stems?: string[];
  deliveryFormat: string[];
}