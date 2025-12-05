import { portlandJapaneseGarden } from './portland-japanese-garden'
import type { GardenContent } from '@/types'

export const allGardens: GardenContent[] = [
  portlandJapaneseGarden,
]

export const gardensBySlug: Record<string, GardenContent> = {
  'portland-japanese-garden': portlandJapaneseGarden,
}

export { portlandJapaneseGarden }
