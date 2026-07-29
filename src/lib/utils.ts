import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { WeatherConditionInfo, TemperatureUnit } from '@/features/weather/types';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function convertCelsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

export function formatTemperature(
  val: number,
  unit: TemperatureUnit = 'celsius'
): string {
  const rounded = Math.round(val);
  if (unit === 'fahrenheit') {
    return `${convertCelsiusToFahrenheit(rounded)}°F`;
  }
  return `${rounded}°C`;
}

export function formatDayName(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }

  return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
}

export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function formatShortHour(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
  }).format(date);
}

export const WMO_CODE_MAP: Record<number, WeatherConditionInfo> = {
  0: {
    label: 'Clear Sky',
    iconName: 'Sun',
    category: 'clear',
    backgroundGradient: 'from-amber-400/30 via-orange-500/20 to-indigo-900/40',
    glassStyle: 'bg-white/15 border-white/25 text-white',
  },
  1: {
    label: 'Mainly Clear',
    iconName: 'SunMedium',
    category: 'clear',
    backgroundGradient: 'from-sky-400/30 via-blue-500/20 to-slate-900/40',
    glassStyle: 'bg-white/15 border-white/25 text-white',
  },
  2: {
    label: 'Partly Cloudy',
    iconName: 'CloudSun',
    category: 'cloudy',
    backgroundGradient: 'from-sky-300/30 via-slate-500/20 to-slate-900/40',
    glassStyle: 'bg-white/15 border-white/25 text-white',
  },
  3: {
    label: 'Overcast',
    iconName: 'Cloud',
    category: 'cloudy',
    backgroundGradient: 'from-slate-400/30 via-zinc-600/20 to-slate-950/50',
    glassStyle: 'bg-white/10 border-white/20 text-white',
  },
  45: {
    label: 'Foggy',
    iconName: 'CloudFog',
    category: 'fog',
    backgroundGradient: 'from-slate-300/30 via-gray-500/20 to-slate-900/40',
    glassStyle: 'bg-white/10 border-white/20 text-white',
  },
  48: {
    label: 'Depositing Rime Fog',
    iconName: 'CloudFog',
    category: 'fog',
    backgroundGradient: 'from-slate-300/30 via-gray-500/20 to-slate-900/40',
    glassStyle: 'bg-white/10 border-white/20 text-white',
  },
  51: {
    label: 'Light Drizzle',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    backgroundGradient: 'from-teal-400/30 via-slate-600/20 to-indigo-950/40',
    glassStyle: 'bg-white/12 border-white/20 text-white',
  },
  53: {
    label: 'Moderate Drizzle',
    iconName: 'CloudDrizzle',
    category: 'drizzle',
    backgroundGradient: 'from-teal-400/30 via-slate-600/20 to-indigo-950/40',
    glassStyle: 'bg-white/12 border-white/20 text-white',
  },
  55: {
    label: 'Dense Drizzle',
    iconName: 'CloudRain',
    category: 'drizzle',
    backgroundGradient: 'from-cyan-500/30 via-slate-700/20 to-blue-950/50',
    glassStyle: 'bg-white/12 border-white/20 text-white',
  },
  61: {
    label: 'Slight Rain',
    iconName: 'CloudRain',
    category: 'rain',
    backgroundGradient: 'from-blue-400/30 via-slate-700/30 to-slate-950/60',
    glassStyle: 'bg-white/10 border-white/20 text-white',
  },
  63: {
    label: 'Moderate Rain',
    iconName: 'CloudRain',
    category: 'rain',
    backgroundGradient: 'from-blue-500/30 via-slate-800/30 to-slate-950/60',
    glassStyle: 'bg-white/10 border-white/20 text-white',
  },
  65: {
    label: 'Heavy Rain',
    iconName: 'CloudRainWind',
    category: 'rain',
    backgroundGradient: 'from-indigo-600/30 via-slate-900/40 to-black/70',
    glassStyle: 'bg-white/10 border-white/20 text-white',
  },
  71: {
    label: 'Slight Snow',
    iconName: 'CloudSnow',
    category: 'snow',
    backgroundGradient: 'from-indigo-200/30 via-slate-500/20 to-slate-900/40',
    glassStyle: 'bg-white/20 border-white/30 text-white',
  },
  73: {
    label: 'Moderate Snow',
    iconName: 'Snowflake',
    category: 'snow',
    backgroundGradient: 'from-blue-200/30 via-slate-600/20 to-slate-900/50',
    glassStyle: 'bg-white/20 border-white/30 text-white',
  },
  75: {
    label: 'Heavy Snow',
    iconName: 'Snowflake',
    category: 'snow',
    backgroundGradient: 'from-cyan-100/30 via-slate-700/30 to-zinc-950/60',
    glassStyle: 'bg-white/25 border-white/35 text-white',
  },
  80: {
    label: 'Slight Rain Showers',
    iconName: 'CloudRain',
    category: 'rain',
    backgroundGradient: 'from-cyan-400/30 via-slate-700/20 to-blue-950/50',
    glassStyle: 'bg-white/12 border-white/20 text-white',
  },
  81: {
    label: 'Moderate Rain Showers',
    iconName: 'CloudRain',
    category: 'rain',
    backgroundGradient: 'from-blue-500/30 via-slate-800/30 to-slate-950/60',
    glassStyle: 'bg-white/10 border-white/20 text-white',
  },
  82: {
    label: 'Violent Rain Showers',
    iconName: 'CloudRainWind',
    category: 'rain',
    backgroundGradient: 'from-indigo-600/40 via-slate-900/50 to-black/80',
    glassStyle: 'bg-white/10 border-white/20 text-white',
  },
  95: {
    label: 'Thunderstorm',
    iconName: 'CloudLightning',
    category: 'thunderstorm',
    backgroundGradient: 'from-amber-500/30 via-purple-900/40 to-black/80',
    glassStyle: 'bg-white/10 border-white/20 text-white',
  },
  96: {
    label: 'Thunderstorm with Hail',
    iconName: 'CloudHail',
    category: 'thunderstorm',
    backgroundGradient: 'from-purple-600/30 via-slate-900/50 to-black/85',
    glassStyle: 'bg-white/10 border-white/20 text-white',
  },
  99: {
    label: 'Heavy Thunderstorm with Hail',
    iconName: 'CloudHail',
    category: 'thunderstorm',
    backgroundGradient: 'from-purple-700/40 via-zinc-900/60 to-black/90',
    glassStyle: 'bg-white/10 border-white/20 text-white',
  },
};

export function getWeatherCondition(code: number): WeatherConditionInfo {
  return (
    WMO_CODE_MAP[code] ?? {
      label: 'Unknown',
      iconName: 'Cloud',
      category: 'cloudy',
      backgroundGradient: 'from-slate-500/30 via-slate-800/30 to-black/60',
      glassStyle: 'bg-white/10 border-white/20 text-white',
    }
  );
}