
export function iconForCondition(conditionSlug = "") {
  const map = {
    clear_day: { name: "weather-sunny", color: "#FFD65C" },
    clear_night: { name: "weather-night", color: "#E5E5E5" },
    few_clouds_day: { name: "weather-partly-cloudy", color: "#FFD65C" },
    few_clouds_night: { name: "weather-night-partly-cloudy", color: "#E5E5E5" },
    cloudly_day: { name: "weather-cloudy", color: "#E5E5E5" },
    cloudly_night: { name: "weather-cloudy", color: "#E5E5E5" },
    cloud: { name: "weather-cloudy", color: "#E5E5E5" },
    rain: { name: "weather-pouring", color: "#BEE3FF" },
    storm: { name: "weather-lightning-rainy", color: "#BEE3FF" },
    snow: { name: "weather-snowy", color: "#FFFFFF" },
    fog: { name: "weather-fog", color: "#E5E5E5" },
  };
  return map[conditionSlug] || { name: "weather-cloudy", color: "#E5E5E5" };
}

export function iconForWMOCode(code) {
  if (code === 0) return iconForCondition("clear_day");
  if ([1, 2].includes(code)) return iconForCondition("few_clouds_day");
  if (code === 3) return iconForCondition("cloudly_day");
  if ([45, 48].includes(code)) return iconForCondition("fog");
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code))
    return iconForCondition("rain");
  if ([71, 73, 75, 77, 85, 86].includes(code)) return iconForCondition("snow");
  if ([95, 96, 99].includes(code)) return iconForCondition("storm");
  return iconForCondition("cloud");
}
