import { NextRequest, NextResponse } from 'next/server'
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.ELEVENLABS_API_KEY
    if (!apiKey) {
      console.error('ELEVENLABS_API_KEY is missing from environment variables')
      return NextResponse.json(
        { error: 'ElevenLabs API key not configured' },
        { status: 500 }
      )
    }

    // Initialize ElevenLabs client with fresh API key
    const elevenlabs = new ElevenLabsClient({
      apiKey: apiKey,
    })

    // Create audio stream from text
    const audioStream = await elevenlabs.textToSpeech.stream('JBFqnCBsd6RMkjVDRZzb', {
      modelId: 'eleven_turbo_v2_5', // Use turbo model for faster generation
      text,
      outputFormat: 'mp3_44100_128',
      voiceSettings: {
        stability: 0.5,
        similarityBoost: 0.75,
        useSpeakerBoost: true,
        speed: 1.0,
      },
    })

    // Collect chunks into a buffer
    const chunks: Uint8Array[] = []
    for await (const chunk of audioStream) {
      chunks.push(chunk)
    }

    const audioBuffer = Buffer.concat(chunks)

    // Return the audio as a response
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Error generating speech:', error)
    
    // Check if it's an authentication error
    if (error instanceof Error && 'statusCode' in error) {
      const statusCode = (error as any).statusCode
      if (statusCode === 401) {
        console.error('Authentication failed - API key may be invalid or expired')
        return NextResponse.json(
          { error: 'Authentication failed with ElevenLabs API' },
          { status: 500 }
        )
      } else if (statusCode === 429) {
        console.error('Rate limit exceeded')
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to generate speech' },
      { status: 500 }
    )
  }
} 