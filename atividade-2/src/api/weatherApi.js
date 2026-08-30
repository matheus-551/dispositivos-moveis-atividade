
const HG_BRASIL_KEY = "ba94c742";

export async function fetchCurrentAndDaily(cityName) {
  const url = `https://api.hgbrasil.com/weather?key=${HG_BRASIL_KEY}&city_name=${encodeURIComponent(
    cityName
  )}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Não foi possível obter os dados da HG Brasil.");
  }
  const json = await response.json();

  if (!json.results) {
    throw new Error("Cidade não encontrada.");
  }

  return json.results;
}

export async function geocodeCity(cityName) {
  const cleanName = cityName.split(",")[0].trim();
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    cleanName
  )}&count=1&language=pt&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Não foi possível geocodificar a cidade.");
  }
  const json = await response.json();
  const first = json?.results?.[0];
  if (!first) return null;

  return { latitude: first.latitude, longitude: first.longitude };
}

export async function fetchHourlyForecast(latitude, longitude) {
  const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&hourly=temperature_2m,weathercode&timezone=auto` +
    `&start_date=${todayStr}&end_date=${todayStr}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Não foi possível obter a previsão horária.");
  }
  const json = await response.json();

  const times = json?.hourly?.time || [];
  const temps = json?.hourly?.temperature_2m || [];
  const codes = json?.hourly?.weathercode || [];

  return times.map((time, idx) => {
    const date = new Date(time);
    return {
      hourLabel: `${String(date.getHours()).padStart(2, "0")}.00`,
      temp: Math.round(temps[idx]),
      weathercode: codes[idx],
      isCurrentHour: date.getHours() === new Date().getHours(),
    };
  });
}

export async function fetchWeatherBundle(cityName) {
  const current = await fetchCurrentAndDaily(cityName);

  let hourly = [];
  try {
    const coords = await geocodeCity(cityName);
    if (coords) {
      hourly = await fetchHourlyForecast(coords.latitude, coords.longitude);
    }
  } catch (e) {
    hourly = [];
  }

  return { current, hourly };
}
