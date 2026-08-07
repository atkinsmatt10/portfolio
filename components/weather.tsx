'use client'

import { useState, useEffect } from 'react'
import {
  Sun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudSun
} from 'lucide-react'

interface WeatherData {
  main: {
    temp: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Philadelphia coordinates
        const lat = 39.9526
        const lon = -75.1652

        // Check for cached data (cache for 10 minutes)
        const cacheKey = `weather-${lat}-${lon}`
        const cached = localStorage.getItem(cacheKey)
        const cacheTime = localStorage.getItem(`${cacheKey}-time`)
        const now = Date.now()
        const tenMinutes = 10 * 60 * 1000 // 10 minutes in milliseconds

        if (cached && cacheTime && (now - parseInt(cacheTime)) < tenMinutes) {
          setWeather(JSON.parse(cached))
          setLoading(false)
          return
        }

        const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)

        if (!response.ok) {
          throw new Error('Failed to fetch weather data')
        }

        const data = await response.json()
        setWeather(data)

        // Cache the response
        localStorage.setItem(cacheKey, JSON.stringify(data))
        localStorage.setItem(`${cacheKey}-time`, now.toString())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <span
        aria-label="Loading current Philadelphia weather"
        className="ml-2 inline-flex items-center gap-1 text-zinc-400 dark:text-zinc-600"
      >
        <span aria-hidden="true">•</span>
        <span aria-hidden="true">—°</span>
      </span>
    )
  }

  if (error || !weather) {
    return null
  }

  const tempF = Math.round(weather.main.temp * 9/5 + 32)
  const weatherMain = weather.weather[0]?.main
  const description = weather.weather[0]?.description

  const getWeatherIcon = (weatherMain: string, description: string) => {
    const iconProps = {
      "aria-hidden": true,
      className: "size-3.5 shrink-0",
    }

    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        return <Sun {...iconProps} />
      case 'clouds':
        if (description.includes('few')) return <CloudSun {...iconProps} />
        return <Cloud {...iconProps} />
      case 'rain':
        if (description.includes('light') || description.includes('drizzle')) {
          return <CloudDrizzle {...iconProps} />
        }
        return <CloudRain {...iconProps} />
      case 'drizzle':
        return <CloudDrizzle {...iconProps} />
      case 'thunderstorm':
        return <CloudLightning {...iconProps} />
      case 'snow':
        return <CloudSnow {...iconProps} />
      case 'mist':
      case 'fog':
      case 'haze':
        return <CloudFog {...iconProps} />
      default:
        return <Cloud {...iconProps} />
    }
  }

  return (
    <span
      aria-label={`Current Philadelphia weather: ${tempF} degrees Fahrenheit, ${description}`}
      className="ml-2 inline-flex items-center gap-1"
      title={description}
    >
      <span aria-hidden="true">•</span>
      <span>{tempF}°F</span>
      {getWeatherIcon(weatherMain, description)}
    </span>
  )
}
