'use client';

import * as React from 'react';
import { Umbrella, ArrowDown, ArrowUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DailyForecastItem, TemperatureUnit } from '../types';
import { formatTemperature } from '@/lib/utils';

interface ForecastListProps {
  forecasts: DailyForecastItem[];
  unit: TemperatureUnit;
}

export const ForecastList: React.FC<ForecastListProps> = ({
  forecasts,
  unit,
}) => {
  return (
    <Card glassIntensity="medium" className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span>5-Day Forecast</span>
          <span className="text-xs font-normal text-white/60">Daily Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {forecasts.map((item) => (
          <div
            key={item.date}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 transition-all duration-200"
          >
            <div className="w-24">
              <p className="font-semibold text-sm text-white">{item.dayName}</p>
              <p className="text-xs text-white/60 truncate">
                {item.condition.label}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-sky-300 font-medium">
              <Umbrella className="h-3.5 w-3.5" />
              <span>{Math.round(item.precipitationProbability)}%</span>
            </div>

            <div className="flex items-center gap-3 text-sm font-semibold">
              <div className="flex items-center text-emerald-300">
                <ArrowUp className="h-3 w-3 mr-0.5" />
                <span>{formatTemperature(item.maxTemp, unit)}</span>
              </div>
              <div className="flex items-center text-white/60">
                <ArrowDown className="h-3 w-3 mr-0.5" />
                <span>{formatTemperature(item.minTemp, unit)}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};