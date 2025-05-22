import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

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

  const apiKey = process.env.OPENWEATHER_API_KEY
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'OpenWeather API key not configured' },
      { status: 500 }
    )
  }

  try {
    // Check cache first
    const cacheKey = `${lat}-${lon}`
    const cached = cache.get(cacheKey)
    const now = Date.now()
    
    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      return NextResponse.json(cached.data)
    }
    
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`OpenWeather API error: ${response.status}`)
    }

    const data = await response.json()
    
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