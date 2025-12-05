import type { SpeciesContent } from '@/types'

export const taxusBaccata: SpeciesContent = {
  slug: 'taxus-baccata',
  commonName: 'English Yew',
  scientificName: 'Taxus baccata',
  japaneseName: 'イチイ',
  difficulty: 'beginner',
  timeToMature: '10-20 years',
  climateZones: ['6', '7', '8', '9'],

  description: `A Western species perfectly suited to cloud pruning. Yew's dense, dark foliage and ability to regenerate from old wood make it forgiving for beginners. The contrast between its deep green clouds and exposed reddish bark creates striking visual drama.`,

  characteristics: [
    'Dense, dark evergreen with soft needles',
    'Responds well to hard pruning',
    'Can regenerate from old wood (unlike most conifers)',
    'Extremely long-lived (1000+ years)',
    'Hardy to -20°C (USDA Zone 6)',
    'All parts are toxic to humans and animals',
  ],

  pruningCalendar: {
    spring: 'Shape new growth as it emerges (April-May)',
    summer: 'Main pruning session (June-July)',
    autumn: 'Light touch-up before winter',
    winter: 'Avoid pruning - frost damage to cuts',
  },

  techniques: [
    'Can be pruned hard into old wood if reshaping needed',
    'Create cloud pads by removing lower branches',
    'Expose trunk and main branches for architectural effect',
    'Allow sufficient light to reach interior growth',
  ],

  commonMistakes: [
    'Forgetting toxicity when working near children or animals',
    'Over-shading lower branches (causes die-back)',
    'Pruning during wet weather (fungal disease risk)',
    'Creating clouds too dense for light penetration',
  ],

  buyingTips: `Yew grows slowly but lives for centuries. Multi-stemmed specimens from the base make excellent cloud tree subjects. Large pre-trained examples are available from specialist nurseries. The cultivar 'Fastigiata' has upright growth less suited to cloud pruning.`,

  relatedSpecies: ['taxus-cuspidata', 'taxus-media'],
}
