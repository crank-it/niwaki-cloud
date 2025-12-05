import { Metadata } from 'next'
import { DiscoverView } from '@/components/discover/DiscoverView'

export const metadata: Metadata = {
  title: 'Discover Gardens',
  description: 'Explore the world\'s finest cloud-pruned gardens. Interactive map, community rankings, and detailed garden profiles.',
}

export default function DiscoverPage() {
  return <DiscoverView />
}
