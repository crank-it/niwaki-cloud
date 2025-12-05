'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, MapPin, X } from 'lucide-react'

interface SubmissionFormProps {
  onSubmit: (data: SubmissionData) => Promise<void>
  onCancel: () => void
  initialLocation?: { lat: number; lng: number }
}

interface SubmissionData {
  name: string
  description: string
  latitude: number
  longitude: number
  photos: File[]
  city?: string
  country?: string
}

export function SubmissionForm({ onSubmit, onCancel, initialLocation }: SubmissionFormProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [latitude, setLatitude] = useState(initialLocation?.lat || 0)
  const [longitude, setLongitude] = useState(initialLocation?.lng || 0)
  const [photos, setPhotos] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setPhotos(prev => [...prev, ...acceptedFiles].slice(0, 5))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024
  })

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        setError(null)
      },
      () => {
        setError('Unable to retrieve your location')
      }
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Please enter a name for your garden')
      return
    }

    if (photos.length === 0) {
      setError('Please add at least one photo')
      return
    }

    if (latitude === 0 && longitude === 0) {
      setError('Please set a location for your garden')
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        latitude,
        longitude,
        photos,
        city: city.trim() || undefined,
        country: country.trim() || undefined
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Garden Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
          placeholder="e.g., My Backyard Niwaki"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent resize-none"
          placeholder="Tell us about your garden..."
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Location *
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            value={latitude || ''}
            onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
            className="flex-1 px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            placeholder="Latitude"
            step="any"
          />
          <input
            type="number"
            value={longitude || ''}
            onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
            className="flex-1 px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            placeholder="Longitude"
            step="any"
          />
          <button
            type="button"
            onClick={handleGetLocation}
            className="btn-secondary px-3"
            title="Use my location"
          >
            <MapPin className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            placeholder="City"
          />
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
            placeholder="Country"
          />
        </div>
      </div>

      {/* Photos */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Photos * (max 5)
        </label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-stone-600 bg-stone-50'
              : 'border-stone-300 hover:border-stone-400'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
          <p className="text-sm text-stone-600">
            {isDragActive ? 'Drop photos here' : 'Drag & drop photos or click to browse'}
          </p>
          <p className="text-xs text-stone-400 mt-1">Max 10MB per image</p>
        </div>

        {photos.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-100">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 btn-secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Garden'}
        </button>
      </div>
    </form>
  )
}
