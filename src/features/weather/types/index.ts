export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1_id?: number;
  admin2_id?: number;
  admin1?: string;
  admin2?: string;
  country?: string;
  country_id?: number;
  timezone: string;
  population?: number;
  postcodes?: string[];
}

export interface GeocodingApiResponse {
  results?: GeocodingResult[];
  generationtime_ms: number;
}

export interface OpenMeteoCurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  is_day: string;
  precipitation: string;
  rain: string;
  showers: string;
  snowfall: string;
  weather_code: string;
  cloud_cover: string;
  pressure_msl: string;
  surface_pressure: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
  wind_gusts_10m: string;
}

export interface OpenMeteoCurrentData {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  cloud_cover: number;
  pressure_msl: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
}

export interface OpenMeteoHourlyUnits {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  dew_point_2m: string;
  apparent_temperature: string;
  precipitation_probability: string;
  precipitation: string;
  weather_code: string;
  surface_pressure: string;
  cloud_cover: string;
  visibility: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
  uv_index: string;
}

export interface OpenMeteoHourlyData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  dew_point_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  precipitation: number[];
  weather_code: number[];
  surface_pressure: number[];
  cloud_cover: number[];
  visibility: number[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
  uv_index: number[];
}

export interface OpenMeteoDailyUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  apparent_temperature_max: string;
  apparent_temperature_min: string;
  sunrise: string;
  sunset: string;
  daylight_duration: string;
  sunshine_duration: string;
  uv_index_max: string;
  precipitation_sum: string;
  rain_sum: string;
  showers_sum: string;
  snowfall_sum: string;
  precipitation_hours: string;
  precipitation_probability_max: string;
  wind_speed_10m_max: string;
  wind_gusts_10m_max: string;
  wind_direction_10m_dominant: string;
}

export interface OpenMeteoDailyData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  sunrise: string[];
  sunset: string[];
  daylight_duration: number[];
  sunshine_duration: number[];
  uv_index_max: number[];
  precipitation_sum: number[];
  rain_sum: number[];
  showers_sum: number[];
  snowfall_sum: number[];
  precipitation_hours: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
  wind_direction_10m_dominant: number[];
}

export interface OpenMeteoForecastApiResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: OpenMeteoCurrentUnits;
  current: OpenMeteoCurrentData;
  hourly_units: OpenMeteoHourlyUnits;
  hourly: OpenMeteoHourlyData;
  daily_units: OpenMeteoDailyUnits;
  daily: OpenMeteoDailyData;
}

export interface WeatherConditionInfo {
  label: string;
  iconName: string;
  category: 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'thunderstorm';
  backgroundGradient: string;
  glassStyle: string;
}

export interface DailyForecastItem {
  date: string;
  dayName: string;
  weatherCode: number;
  condition: WeatherConditionInfo;
  maxTemp: number;
  minTemp: number;
  precipitationProbability: number;
  precipitationSum: number;
  uvIndexMax: number;
  windSpeedMax: number;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecastItem {
  time: string;
  formattedTime: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  weatherCode: number;
  condition: WeatherConditionInfo;
  windSpeed: number;
  uvIndex: number;
}

export interface ProcessedWeatherData {
  location: {
    name: string;
    country: string;
    admin1?: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  current: {
    temperature: number;
    apparentTemperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    windGusts: number;
    pressure: number;
    uvIndex: number;
    cloudCover: number;
    weatherCode: number;
    isDay: boolean;
    condition: WeatherConditionInfo;
    time: string;
  };
  daily: DailyForecastItem[];
  hourly: HourlyForecastItem[];
}