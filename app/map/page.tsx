import { Metadata } from 'next'
import { GardenMap } from '@/components/map/GardenMap'

export const metadata: Metadata = {
  title: 'Community Map',
  description: 'Explore cloud-pruned gardens around the world, submitted by our community of niwaki enthusiasts.',
}

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <GardenMap />
    </div>
  )
}
