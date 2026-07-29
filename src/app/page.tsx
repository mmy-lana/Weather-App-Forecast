'use client';

import * as React from 'react';
import { Loader2, RefreshCw, AlertCircle, CloudSun } from 'lucide-react';
import { useWeather } from '@/features/weather/hooks/use-weather';
import { WeatherSearch } from '@/features/weather/components/weather-search';
import { CurrentWeather } from '@/features/weather/components/current-weather';
import { WeatherChart } from '@/features/weather/components/weather-chart';
import { ForecastList } from '@/features/weather/components/forecast-list';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [hasMounted, setHasMounted] = React.useState<boolean>(false);

  const {
    weather,
    unit,
    isLoading,
    error,
    searchQuery,
    searchResults,
    isSearching,
    setSearchQuery,
    selectLocation,
    toggleUnit,
    refreshWeather,
  } = useWeather();

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  const dynamicBg =
    weather?.current.condition.backgroundGradient ||
    'from-slate-900 via-indigo-950 to-slate-950';

  if (!hasMounted) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-white/70">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm font-medium">Loading Atmosphere...</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`min-h-screen w-full bg-gradient-to-br ${dynamicBg} transition-all duration-700 ease-in-out p-4 md:p-8 lg:p-12 relative overflow-hidden`}
    >
      {/* Dynamic Glassmorphic Ambient Background Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Navigation / Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <CloudSun className="h-7 w-7 text-sky-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Atmosphere
              </h1>
              <p className="text-xs text-white/60">
                Open-Meteo Weather & 5-Day Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="glass"
              size="sm"
              onClick={refreshWeather}
              isLoading={isLoading}
              leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            >
              Refresh
            </Button>
          </div>
        </header>

        {/* Location Search Bar */}
        <WeatherSearch
          searchQuery={searchQuery}
          searchResults={searchResults}
          isSearching={isSearching}
          unit={unit}
          onSearchChange={setSearchQuery}
          onSelectLocation={selectLocation}
          onToggleUnit={toggleUnit}
        />

        {/* Global Error Banner */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-500/20 backdrop-blur-md border border-red-400/30 text-white flex items-center gap-3 max-w-xl mx-auto animate-in fade-in-50">
            <AlertCircle className="h-5 w-5 text-red-300 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Initial Loading Screen */}
        {isLoading && !weather && (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-white/80" />
            <p className="text-sm text-white/70 font-medium">
              Fetching latest forecast data...
            </p>
          </div>
        )}

        {/* Dashboard Weather Views */}
        {weather && (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            {/* Current Condition Hero */}
            <CurrentWeather data={weather} unit={unit} />

            {/* 24h Hourly Chart & 5-Day Forecast Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <WeatherChart hourlyData={weather.hourly} unit={unit} />
              </div>
              <div className="lg:col-span-1">
                <ForecastList forecasts={weather.daily} unit={unit} />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}