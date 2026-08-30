
export const themes = {
  rain: {
    gradient: ["#0B1E4D", "#123B8A", "#1857B8"],
    cardBackground: "rgba(255,255,255,0.08)",
    cardBackgroundStrong: "rgba(255,255,255,0.12)",
    pill: "rgba(255,255,255,0.15)",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255,255,255,0.75)",
    divider: "rgba(255,255,255,0.15)",
  },
  clear: {
    gradient: ["#1E9BE0", "#3FB6EE", "#6ED0F5"],
    cardBackground: "rgba(255,255,255,0.15)",
    cardBackgroundStrong: "rgba(255,255,255,0.22)",
    pill: "rgba(255,255,255,0.25)",
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255,255,255,0.85)",
    divider: "rgba(255,255,255,0.25)",
  },
};

export function pickTheme(conditionSlug = "") {
  const rainy = ["rain", "storm", "snow", "fog", "cloudly_day", "cloudly_night"];
  return rainy.includes(conditionSlug) ? themes.rain : themes.clear;
}
