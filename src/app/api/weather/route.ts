import { NextRequest, NextResponse } from 'next/server';
import { fetchForecastByCoordinates, fetchLocationSearchResults } from '@/features/weather/services/weather-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latParam = searchParams.get('lat');
  const lonParam = searchParams.get('lon');
  const queryParam = searchParams.get('query');
  const nameParam = searchParams.get('name') || 'Selected Location';
  const countryParam = searchParams.get('country') || '';

  try {
    if (queryParam) {
      const locations = await fetchLocationSearchResults(queryParam);
      return NextResponse.json({ locations }, { status: 200 });
    }

    if (latParam && lonParam) {
      const lat = parseFloat(latParam);
      const lon = parseFloat(lonParam);

      if (isNaN(lat) || isNaN(lon)) {
        return NextResponse.json(
          { error: 'Invalid latitude or longitude parameters' },
          { status: 400 }
        );
      }

      const weatherData = await fetchForecastByCoordinates(
        lat,
        lon,
        nameParam,
        countryParam
      );
      return NextResponse.json(weatherData, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Missing required parameters. Provide query OR lat and lon.' },
      { status: 400 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}