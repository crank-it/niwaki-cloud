import { ilexCrenata } from './ilex-crenata'
import { pinusThunbergii } from './pinus-thunbergii'
import { taxusBaccata } from './taxus-baccata'
import type { SpeciesContent } from '@/types'

export const allSpecies: SpeciesContent[] = [
  ilexCrenata,
  pinusThunbergii,
  taxusBaccata,
]

export const speciesBySlug: Record<string, SpeciesContent> = {
  'ilex-crenata': ilexCrenata,
  'pinus-thunbergii': pinusThunbergii,
  'taxus-baccata': taxusBaccata,
}

export { ilexCrenata, pinusThunbergii, taxusBaccata }
