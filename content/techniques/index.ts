import { cloudPruningBasics } from './cloud-pruning-basics'
import type { TechniqueContent } from '@/types'

export const allTechniques: TechniqueContent[] = [
  cloudPruningBasics,
]

export const techniquesBySlug: Record<string, TechniqueContent> = {
  'cloud-pruning-basics': cloudPruningBasics,
}

export { cloudPruningBasics }
