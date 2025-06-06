'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Square, Volume2, Loader2 } from 'lucide-react'

interface TextToSpeechPlayerProps {
  text: string
  title?: string
}

export function TextToSpeechPlayer({ text, title = 'Listen to this article' }: TextToSpeechPlayerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isGeneratingRef = useRef(false)

  // Clean text content for TTS (remove markdown, excessive whitespace, etc.)
  const cleanTextForTTS = (rawText: string): string => {
    return rawText
      // Remove front matter
      .replace(/^---[\s\S]*?---\s*/m, '')
      // Remove markdown headers
      .replace(/^#{1,6}\s+/gm, '')
      // Remove markdown emphasis
      .replace(/[*_`]/g, '')
      // Remove markdown links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove markdown images
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
      // Remove blockquote markers
      .replace(/^>\s*/gm, '')
      // Remove list markers
      .replace(/^[-*+]\s+/gm, '')
      .replace(/^\d+\.\s+/gm, '')
      // Remove horizontal rules
      .replace(/^---+$/gm, '')
      // Clean up excessive whitespace
      .replace(/\n\s*\n/g, '\n\n')
      .trim()
  }

  const generateAudio = async (retryCount = 0) => {
    // Prevent multiple simultaneous requests
    if (isGeneratingRef.current) {
      return
    }
    
    isGeneratingRef.current = true
    setIsLoading(true)
    setError(null)

    try {
      const cleanedText = cleanTextForTTS(text)
      
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: cleanedText }),
      })

      if (!response.ok) {
        let errorMessage = 'Failed to generate audio'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          // If we can't parse the error response, use the status text
          errorMessage = `Server error: ${response.status} ${response.statusText}`
        }
        
        // Retry once for 500 errors (server errors)
        if (response.status >= 500 && retryCount < 1) {
          console.log('Retrying TTS request due to server error...')
          await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second
          return generateAudio(retryCount + 1)
        }
        
        throw new Error(errorMessage)
      }

      const audioBlob = await response.blob()
      const url = URL.createObjectURL(audioBlob)
      setAudioUrl(url)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsLoading(false)
      isGeneratingRef.current = false
    }
  }

  const handlePlay = async () => {
    if (!audioUrl) {
      await generateAudio()
      return
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setCurrentTime(0)
    }
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [audioUrl])

  // Cleanup audio URL when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Volume2 className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={handlePlay}
          disabled={isLoading}
          className="flex items-center justify-center w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-full transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5 ml-0.5" />
          )}
        </button>

        {audioUrl && (
          <button
            onClick={handleStop}
            className="flex items-center justify-center w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition-colors"
          >
            <Square className="w-4 h-4" />
          </button>
        )}

        {audioUrl && duration > 0 && (
          <div className="flex-1 flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 min-w-0">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        )}
      </div>

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          style={{ display: 'none' }}
        />
      )}
    </div>
  )
} 