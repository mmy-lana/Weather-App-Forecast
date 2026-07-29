'use client';

import * as React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HourlyForecastItem, TemperatureUnit } from '../types';
import { convertCelsiusToFahrenheit } from '@/lib/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface WeatherChartProps {
  hourlyData: HourlyForecastItem[];
  unit: TemperatureUnit;
}

export const WeatherChart: React.FC<WeatherChartProps> = ({
  hourlyData,
  unit,
}) => {
  const labels = hourlyData.map((h) => h.formattedTime);
  const temperatures = hourlyData.map((h) =>
    unit === 'fahrenheit'
      ? convertCelsiusToFahrenheit(h.temperature)
      : Math.round(h.temperature)
  );

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: `Temperature (°${unit === 'celsius' ? 'C' : 'F'})`,
        data: temperatures,
        borderColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 2,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
          return gradient;
        },
        tension: 0.4,
        pointBackgroundColor: '#ffffff',
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 10,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 11,
          },
          callback: (val) => `${val}°`,
        },
      },
    },
  };

  return (
    <Card glassIntensity="medium" className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span>24-Hour Temperature Trend</span>
          <span className="text-xs font-normal text-white/60">Hourly Trend</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full pt-2">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};