import { NextRequest, NextResponse } from 'next/server'

type WeatherApiResponse = {
  main: {
    temp: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  source: 'open-meteo'
}

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number
    weather_code?: number
  }
}

// Simple in-memory cache
const cache = new Map<string, { data: WeatherApiResponse; timestamp: number }>()
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

function mapWeatherCode(code: number) {
  if (code === 0) {
    return { main: 'Clear', description: 'clear sky' }
  }

  if ([1, 2].includes(code)) {
    return { main: 'Clouds', description: 'few clouds' }
  }

  if (code === 3) {
    return { main: 'Clouds', description: 'overcast clouds' }
  }

  if ([45, 48].includes(code)) {
    return { main: 'Fog', description: 'fog' }
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return { main: 'Drizzle', description: 'light drizzle' }
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { main: 'Rain', description: 'rain' }
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { main: 'Snow', description: 'snow' }
  }

  if ([95, 96, 99].includes(code)) {
    return { main: 'Thunderstorm', description: 'thunderstorm' }
  }

  return { main: 'Clouds', description: 'cloudy' }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    )
  }

  const latitude = Number(lat)
  const longitude = Number(lon)

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json(
      { error: 'Latitude and longitude must be valid numbers' },
      { status: 400 }
    )
  }

  try {
    // Check cache first
    const cacheKey = `${latitude.toFixed(4)}-${longitude.toFixed(4)}`
    const cached = cache.get(cacheKey)
    const now = Date.now()

    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      return NextResponse.json(cached.data)
    }

    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'temperature_2m,weather_code',
      temperature_unit: 'celsius',
    })

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Open-Meteo API error response:', errorText)
      throw new Error(`Open-Meteo API error: ${response.status} - ${errorText}`)
    }

    const openMeteoData = await response.json() as OpenMeteoResponse
    const temperature = openMeteoData.current?.temperature_2m
    const weatherCode = openMeteoData.current?.weather_code

    if (typeof temperature !== 'number' || typeof weatherCode !== 'number') {
      throw new Error('Open-Meteo response did not include current weather data')
    }

    const weather = mapWeatherCode(weatherCode)
    const data: WeatherApiResponse = {
      main: {
        temp: temperature,
      },
      weather: [
        {
          ...weather,
          icon: weatherCode.toString(),
        },
      ],
      source: 'open-meteo',
    }

    // Cache the response
    cache.set(cacheKey, { data, timestamp: now })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}
