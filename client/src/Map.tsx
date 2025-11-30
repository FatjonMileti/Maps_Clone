import { useState, useRef, useEffect, FormEvent } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useQuery } from '@tanstack/react-query'
import type { Map as LeafletMap } from 'leaflet'

interface LocationResult {
  lat: string
  lon: string
  display_name: string
}

const fetchLocation = async (query: string): Promise<LocationResult | null> => {
  if (!query) return null
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch location')
  }
  const data: LocationResult[] = await response.json()
  if (data.length === 0) {
    throw new Error('Location not found')
  }
  return data[0]
}

const Map = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')
  const [center, setCenter] = useState<[number, number]>([51.505, -0.09])
  const mapRef = useRef<LeafletMap | null>(null)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['location', submittedQuery],
    queryFn: () => fetchLocation(submittedQuery),
    enabled: !!submittedQuery,
    retry: false
  })

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmittedQuery(searchQuery)
  }

  useEffect(() => {
    if (data) {
      const newCenter: [number, number] = [parseFloat(data.lat), parseFloat(data.lon)]
      setCenter(newCenter)
      if (mapRef.current) {
        mapRef.current.flyTo(newCenter)
      }
    }
  }, [data])

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a location"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {isError && <p style={{ color: 'red' }}>{(error as Error).message}</p>}
      <MapContainer ref={mapRef} center={center} zoom={13} style={{ height: '80vh' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center}>
          <Popup>{data?.display_name || 'Select a location'}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map
