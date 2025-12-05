'use client'

import { useState, useCallback, useRef, DragEvent, ChangeEvent } from 'react'
import { stripExifData } from '@/lib/utils'

interface ImageUploaderProps {
  onUpload: (imageDataUrl: string) => void
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {
      setError(null)

      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file')
        return
      }

      const maxSize = 10 * 1024 * 1024
      if (file.size > maxSize) {
        setError('Image must be smaller than 10MB')
        return
      }

      setIsProcessing(true)

      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const dataUrl = e.target?.result as string
          // Strip EXIF data for privacy
          const cleanedDataUrl = await stripExifData(dataUrl)
          onUpload(cleanedDataUrl)
        } catch {
          setError('Failed to process the image file')
        } finally {
          setIsProcessing(false)
        }
      }
      reader.onerror = () => {
        setError('Failed to read the image file')
        setIsProcessing(false)
      }
      reader.readAsDataURL(file)
    },
    [onUpload]
  )

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        handleFile(files[0])
      }
    },
    [handleFile]
  )

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        handleFile(files[0])
      }
    },
    [handleFile]
  )

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-light text-stone-800 mb-1 tracking-wide">
          雲剪定
        </h2>
        <p className="text-stone-400 text-xs mb-2">cloud pruning</p>
        <p className="text-stone-500 text-sm">
          Upload your garden photo
        </p>
      </div>

      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          relative cursor-pointer rounded-lg border-2 border-dashed
          transition-all duration-300 ease-out aspect-video
          flex items-center justify-center
          ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
          ${
            isDragging
              ? 'border-stone-600 bg-stone-100'
              : 'border-stone-300 hover:border-stone-500 hover:bg-stone-50'
          }
        `}
      >
        <div className="text-center p-6">
          {isProcessing ? (
            <>
              <div className="text-4xl mb-3 text-stone-400 animate-pulse">処理中</div>
              <p className="text-stone-600 text-sm">Processing...</p>
            </>
          ) : (
            <>
              <div className="text-4xl mb-3 text-stone-400">松</div>
              <p className="text-stone-600 text-sm">
                {isDragging ? 'Drop here' : 'Drop image or click to browse'}
              </p>
            </>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          disabled={isProcessing}
        />
      </div>

      {error && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm text-center">
          {error}
        </div>
      )}

      <p className="mt-4 text-center text-xs text-stone-400">
        Location data automatically removed for privacy
      </p>
    </div>
  )
}
