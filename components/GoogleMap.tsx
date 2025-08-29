'use client'

import { useEffect, useRef, useState } from 'react'

interface GoogleMapProps {
  className?: string
  center: { lat: number; lng: number }
  zoom: number
  markerTitle?: string
}

// Snazzy Maps: Ultra Light with Labels (ID: 151)
const ULTRA_LIGHT_WITH_LABELS_STYLES: any[] = [
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#e9e9e9' }, { lightness: 17 }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }, { lightness: 20 }] },
  { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#ffffff' }, { lightness: 17 }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#ffffff' }, { lightness: 29 }, { weight: 0.2 }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#ffffff' }, { lightness: 18 }] },
  { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: '#ffffff' }, { lightness: 16 }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }, { lightness: 21 }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#dedede' }, { lightness: 21 }] },
  { elementType: 'labels.text.stroke', stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { lightness: 16 }] },
  { elementType: 'labels.text.fill', stylers: [{ saturation: 36 }, { color: '#333333' }, { lightness: 40 }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#f2f2f2' }, { lightness: 19 }] },
  { featureType: 'administrative', elementType: 'geometry.fill', stylers: [{ color: '#fefefe' }, { lightness: 20 }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#fefefe' }, { lightness: 17 }, { weight: 1.2 }] },
];

export default function GoogleMap({ className, center, zoom, markerTitle }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Check if Google Maps is already loaded
        if (window.google && window.google.maps) {
          return
        }

        // Load Google Maps script
        const script = document.createElement('script')
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        if (!apiKey) {
          setError('Google Maps API key not configured')
          setIsLoading(false)
          return
        }
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
        script.async = true
        script.defer = true
        
        script.onload = () => {
          setIsLoading(false)
        }
        
        script.onerror = () => {
          setError('Failed to load Google Maps')
          setIsLoading(false)
        }
        
        document.head.appendChild(script)
      } catch (err) {
        setError('Failed to initialize Google Maps')
        setIsLoading(false)
      }
    }

    loadGoogleMaps()
  }, [])

  useEffect(() => {
    if (!isLoading && !error && mapRef.current && window.google) {
      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          styles: ULTRA_LIGHT_WITH_LABELS_STYLES
        })

        // Add marker
        new window.google.maps.Marker({
          position: center,
          map,
          title: markerTitle || 'Location'
        })
      } catch (err) {
        setError('Failed to create map')
      }
    }
  }, [isLoading, error, center.lat, center.lng, zoom, markerTitle])

  // Fallback UI
  if (isLoading || error) {
    return (
      <div className={className}>
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">🗺️</div>
            <p className="text-gray-600 font-zain">
              {isLoading ? 'Loading map...' : 'Map unavailable'}
            </p>
            <p className="text-sm text-gray-500 font-zain mt-2">
              Amsterdam, Netherlands
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={mapRef} className={className} style={{ minHeight: '400px' }} />
  )
}

// Add Google Maps types to global scope
declare global {
  interface Window {
    google: any
  }
}