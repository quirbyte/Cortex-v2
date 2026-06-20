export type PaletteType = {
  bg: string;
  border: string;
  iconBg: string;
  accentBlob: string;
  btn: string;
};

export const PALETTES: PaletteType[] = [
  {
    bg: "bg-blue-50/60 dark:bg-blue-950/20",
    border: "border-blue-100 dark:border-blue-900/30",
    iconBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
    accentBlob: "group-hover:bg-blue-100/70 dark:group-hover:bg-blue-900/20",
    btn: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white",
  },
  {
    bg: "bg-emerald-50/60 dark:bg-emerald-950/20",
    border: "border-emerald-100 dark:border-emerald-900/30",
    iconBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
    accentBlob: "group-hover:bg-emerald-100/70 dark:group-hover:bg-emerald-900/20",
    btn: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white",
  },
  {
    bg: "bg-purple-50/60 dark:bg-purple-950/20",
    border: "border-purple-100 dark:border-purple-900/30",
    iconBg: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400",
    accentBlob: "group-hover:bg-purple-100/70 dark:group-hover:bg-purple-900/20",
    btn: "bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white",
  },
  {
    bg: "bg-amber-50/60 dark:bg-amber-950/20",
    border: "border-amber-100 dark:border-amber-900/30",
    iconBg: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
    accentBlob: "group-hover:bg-amber-100/70 dark:group-hover:bg-amber-900/20",
    btn: "bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white",
  },
  {
    bg: "bg-rose-50/60 dark:bg-rose-950/20",
    border: "border-rose-100 dark:border-rose-900/30",
    iconBg: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400",
    accentBlob: "group-hover:bg-rose-100/70 dark:group-hover:bg-rose-900/20",
    btn: "bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white",
  },
  {
    bg: "bg-cyan-50/60 dark:bg-cyan-950/20",
    border: "border-cyan-100 dark:border-cyan-900/30",
    iconBg: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-400",
    accentBlob: "group-hover:bg-cyan-100/70 dark:group-hover:bg-cyan-900/20",
    btn: "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white",
  },
];

export const getOrgPalette = (stringId: string): PaletteType => {
  let hash = 0;
  for (let i = 0; i < stringId.length; i++) {
    hash = stringId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTES[Math.abs(hash) % PALETTES.length];
};