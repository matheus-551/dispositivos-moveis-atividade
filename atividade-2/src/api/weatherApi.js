// Serviço responsável por buscar os dados de clima.
//
// - HG Brasil (https://hgbrasil.com/status/weather) fornece o clima atual
//   e a previsão para os próximos dias (usada na seção "Next Forecast").
// - A HG Brasil não oferece previsão HORÁRIA no plano gratuito, então para
//   a seção "Today" (que no mock mostra horários como 15:00, 16:00...)
//   usamos a Open-Meteo (https://open-meteo.com), que é gratuita, aberta e
//   não exige chave de API.
//
// Troque HG_BRASIL_KEY pela sua chave em https://hgbrasil.com/status/weather

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

// Geocodifica o nome da cidade para lat/lon usando a Open-Meteo Geocoding API
// (gratuita, sem chave), necessário para pedir a previsão horária.
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

// Retorna as próximas ~4 horas (a partir da hora atual) usando Open-Meteo,
// no mesmo formato usado pelo componente HourlyForecast.
export async function fetchHourlyForecast(latitude, longitude) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&hourly=temperature_2m,weathercode&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Não foi possível obter a previsão horária.");
  }
  const json = await response.json();

  const times = json?.hourly?.time || [];
  const temps = json?.hourly?.temperature_2m || [];
  const codes = json?.hourly?.weathercode || [];

  const now = new Date();
  const currentHourIndex = times.findIndex((t) => new Date(t) >= now);
  const startIndex = currentHourIndex >= 0 ? currentHourIndex : 0;

  return times.slice(startIndex, startIndex + 4).map((time, i) => {
    const idx = startIndex + i;
    const date = new Date(time);
    return {
      hourLabel: `${String(date.getHours()).padStart(2, "0")}.00`,
      temp: Math.round(temps[idx]),
      weathercode: codes[idx],
    };
  });
}

// Função principal usada pela tela: junta os dois resultados.
export async function fetchWeatherBundle(cityName) {
  const current = await fetchCurrentAndDaily(cityName);

  let hourly = [];
  try {
    const coords = await geocodeCity(cityName);
    if (coords) {
      hourly = await fetchHourlyForecast(coords.latitude, coords.longitude);
    }
  } catch (e) {
    // Se a previsão horária falhar, seguimos só com os dados da HG Brasil.
    hourly = [];
  }

  return { current, hourly };
}
