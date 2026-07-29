'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ProcessedWeatherData,
  GeocodingResult,
  TemperatureUnit,
} from '../types';
import { searchLocations, fetchWeatherData } from '../services/weather-api';

const DEFAULT_LOCATION = {
  name: 'Tokyo',
  country: 'Japan',
  latitude: 35.6762,
  longitude: 139.6503,
};

export function useWeather() {
  const [weather, setWeather] = useState<ProcessedWeatherData | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const loadWeather = useCallback(
    async (
      lat: number,
      lon: number,
      name: string,
      country: string,
      admin1?: string
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(lat, lon, name, country, admin1);
        setWeather(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'An unknown error occurred while fetching weather.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  }, []);

  const selectLocation = useCallback(
    (location: GeocodingResult) => {
      setSearchQuery('');
      setSearchResults([]);
      loadWeather(
        location.latitude,
        location.longitude,
        location.name,
        location.country || '',
        location.admin1
      );
    },
    [loadWeather]
  );

  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchLocations(searchQuery);
        setSearchResults(results);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          loadWeather(
            position.coords.latitude,
            position.coords.longitude,
            'Your Location',
            ''
          );
        },
        () => {
          loadWeather(
            DEFAULT_LOCATION.latitude,
            DEFAULT_LOCATION.longitude,
            DEFAULT_LOCATION.name,
            DEFAULT_LOCATION.country
          );
        },
        { timeout: 8000 }
      );
    } else {
      loadWeather(
        DEFAULT_LOCATION.latitude,
        DEFAULT_LOCATION.longitude,
        DEFAULT_LOCATION.name,
        DEFAULT_LOCATION.country
      );
    }
  }, [loadWeather]);

  return {
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
    refreshWeather: () =>
      weather &&
      loadWeather(
        weather.location.latitude,
        weather.location.longitude,
        weather.location.name,
        weather.location.country,
        weather.location.admin1
      ),
  };
}