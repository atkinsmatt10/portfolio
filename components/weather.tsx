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
  current: {
    temp: number
    weather: Array<{
      main: string
      description: string
      icon: string
    }>
  }
}

export function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
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
  }, [mounted])

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <span className="inline-flex items-center text-gray-500">
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading...
      </span>
    )
  }

  if (error || !weather) {
    return (
      <span className="text-gray-500">
        (Weather unavailable)
      </span>
    )
  }

  const tempF = Math.round(weather.current.temp * 9/5 + 32)
  const weatherMain = weather.current.weather[0]?.main
  const description = weather.current.weather[0]?.description

  const getWeatherIcon = (weatherMain: string, description: string) => {
    const iconProps = { size: 16, className: "inline" }
    
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
    <span>
      {" "}• {tempF}°F {getWeatherIcon(weatherMain, description)}
    </span>
  )
} 