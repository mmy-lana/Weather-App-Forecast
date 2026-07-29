'use client';

import * as React from 'react';
import {
  Wind,
  Droplets,
  Gauge,
  Sun,
  Eye,
  Cloud,
  ArrowUpRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ProcessedWeatherData, TemperatureUnit } from '../types';
import { formatTemperature } from '@/lib/utils';

interface CurrentWeatherProps {
  data: ProcessedWeatherData;
  unit: TemperatureUnit;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  data,
  unit,
}) => {
  const { location, current, daily } = data;
  const todayForecast = daily[0];

  const metrics = [
    {
      label: 'Wind Speed',
      value: `${Math.round(current.windSpeed)} km/h`,
      icon: Wind,
    },
    {
      label: 'Humidity',
      value: `${current.humidity}%`,
      icon: Droplets,
    },
    {
      label: 'Pressure',
      value: `${Math.round(current.pressure)} hPa`,
      icon: Gauge,
    },
    {
      label: 'UV Index',
      value: `${current.uvIndex.toFixed(1)}`,
      icon: Sun,
    },
    {
      label: 'Cloud Cover',
      value: `${current.cloudCover}%`,
      icon: Cloud,
    },
    {
      label: 'Feels Like',
      value: formatTemperature(current.apparentTemperature, unit),
      icon: Eye,
    },
  ];

  return (
    <Card glassIntensity="heavy" className="w-full border-white/20">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-white/90">
                {location.name}
                {location.country ? `, ${location.country}` : ''}
              </span>
            </div>

            <div className="flex items-baseline gap-4 pt-2">
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white drop-shadow-md">
                {formatTemperature(current.temperature, unit)}
              </h1>
            </div>

            <p className="text-lg md:text-xl font-medium text-white/90 capitalize tracking-wide">
              {current.condition.label}
            </p>

            {todayForecast && (
              <div className="flex items-center gap-3 text-sm text-white/70 font-medium">
                <span>H: {formatTemperature(todayForecast.maxTemp, unit)}</span>
                <span>•</span>
                <span>L: {formatTemperature(todayForecast.minTemp, unit)}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center justify-between text-white/70">
                    <span className="text-xs font-medium">{metric.label}</span>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-base font-semibold text-white">
                    {metric.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};