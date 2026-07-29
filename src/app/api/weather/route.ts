import { NextRequest, NextResponse } from 'next/server';
import {
  fetchForecastByCoordinates,
  fetchLocationSearchResults,
} from '@/features/weather/services/weather-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const name = searchParams.get('name') || 'Selected Location';
  const country = searchParams.get('country') || '';

  try {
    if (query) {
      const searchResults = await fetchLocationSearchResults(query);
      return NextResponse.json(searchResults);
    }

    if (lat && lon) {
      const forecastData = await fetchForecastByCoordinates(
        parseFloat(lat),
        parseFloat(lon),
        name,
        country
      );
      return NextResponse.json(forecastData);
    }

    return NextResponse.json(
      { error: 'Missing required query parameters (q or lat/lon).' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'An error occurred fetching weather data.',
      },
      { status: 500 }
    );
  }
}