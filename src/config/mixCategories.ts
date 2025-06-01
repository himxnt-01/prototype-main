import { MixType } from "@/types/mix";

export const MIX_CATEGORIES = [
  {
    id: "radio_tv",
    label: "Radio & TV",
    types: ["radio_edit", "tv_edit", "clean"] as MixType[],
  },
  {
    id: "alternate",
    label: "Alternate Versions",
    types: ["instrumental", "acapella", "acoustic", "live"] as MixType[],
  },
  {
    id: "remixes",
    label: "Remixes & Extended",
    types: ["remix", "extended"] as MixType[],
  },
  {
    id: "sync",
    label: "Sync & Licensing",
    types: ["film_score", "trailer"] as MixType[],
  },
] as const;

export const TYPE_STYLES = {
  radio_edit: "bg-blue-500/10 text-blue-500",
  extended: "bg-indigo-500/10 text-indigo-500",
  instrumental: "bg-purple-500/10 text-purple-500",
  acapella: "bg-pink-500/10 text-pink-500",
  remix: "bg-yellow-500/10 text-yellow-500",
  acoustic: "bg-green-500/10 text-green-500",
  live: "bg-orange-500/10 text-orange-500",
  clean: "bg-teal-500/10 text-teal-500",
  tv_edit: "bg-cyan-500/10 text-cyan-500",
  film_score: "bg-violet-500/10 text-violet-500",
  trailer: "bg-rose-500/10 text-rose-500",
} as const;