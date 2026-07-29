import {
  GeocodingApiResponse,
  GeocodingResult,
  OpenMeteoForecastApiResponse,
  ProcessedWeatherData,
} from '../types';
import { getWeatherCondition, formatDayName, formatShortHour } from '@/lib/utils';

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

const cache = new Map<string, { data: ProcessedWeatherData; timestamp: number }>();
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

export async function searchLocations(query: string): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) return [];

  const url = `${GEOCODING_BASE_URL}?name=${encodeURIComponent(
    query.trim()
  )}&count=5&language=en&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch location search results.');
  }

  const data: GeocodingApiResponse = await response.json();
  return data.results || [];
}

export async function fetchWeatherData(
  latitude: number,
  longitude: number,
  locationName: string,
  country: string,
  admin1?: string
): Promise<ProcessedWeatherData> {
  const cacheKey = `${latitude.toFixed(2)}_${longitude.toFixed(2)}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
    return cached.data;
  }

  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation_probability',
      'weather_code',
      'wind_speed_10m',
      'uv_index',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max',
    ].join(','),
    timezone: 'auto',
    forecast_days: '7',
  });

  const response = await fetch(`${FORECAST_BASE_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to retrieve forecast data from weather service.');
  }

  const rawData: OpenMeteoForecastApiResponse = await response.json();

  const processedData: ProcessedWeatherData = {
    location: {
      name: locationName,
      country,
      admin1,
      latitude,
      longitude,
      timezone: rawData.timezone,
    },
    current: {
      temperature: rawData.current.temperature_2m,
      apparentTemperature: rawData.current.apparent_temperature,
      humidity: rawData.current.relative_humidity_2m,
      windSpeed: rawData.current.wind_speed_10m,
      windDirection: rawData.current.wind_direction_10m,
      windGusts: rawData.current.wind_gusts_10m,
      pressure: rawData.current.pressure_msl,
      uvIndex: rawData.hourly.uv_index[0] || 0,
      cloudCover: rawData.current.cloud_cover,
      weatherCode: rawData.current.weather_code,
      isDay: Boolean(rawData.current.is_day),
      condition: getWeatherCondition(rawData.current.weather_code),
      time: rawData.current.time,
    },
    daily: rawData.daily.time.slice(0, 5).map((dateStr, index) => ({
      date: dateStr,
      dayName: formatDayName(dateStr),
      weatherCode: rawData.daily.weather_code[index],
      condition: getWeatherCondition(rawData.daily.weather_code[index]),
      maxTemp: rawData.daily.temperature_2m_max[index],
      minTemp: rawData.daily.temperature_2m_min[index],
      precipitationProbability: rawData.daily.precipitation_probability_max[index] || 0,
      precipitationSum: rawData.daily.precipitation_sum[index] || 0,
      uvIndexMax: rawData.daily.uv_index_max[index] || 0,
      windSpeedMax: rawData.daily.wind_speed_10m_max[index] || 0,
      sunrise: rawData.daily.sunrise[index],
      sunset: rawData.daily.sunset[index],
    })),
    hourly: rawData.hourly.time.slice(0, 24).map((timeStr, index) => ({
      time: timeStr,
      formattedTime: formatShortHour(timeStr),
      temperature: rawData.hourly.temperature_2m[index],
      apparentTemperature: rawData.hourly.apparent_temperature[index],
      humidity: rawData.hourly.relative_humidity_2m[index],
      precipitationProbability: rawData.hourly.precipitation_probability[index] || 0,
      weatherCode: rawData.hourly.weather_code[index],
      condition: getWeatherCondition(rawData.hourly.weather_code[index]),
      windSpeed: rawData.hourly.wind_speed_10m[index],
      uvIndex: rawData.hourly.uv_index[index] || 0,
    })),
  };

  cache.set(cacheKey, { data: processedData, timestamp: Date.now() });
  return processedData;
}