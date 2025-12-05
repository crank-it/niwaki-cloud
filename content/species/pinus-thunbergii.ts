import type { SpeciesContent } from '@/types'

export const pinusThunbergii: SpeciesContent = {
  slug: 'pinus-thunbergii',
  commonName: 'Japanese Black Pine',
  scientificName: 'Pinus thunbergii',
  japaneseName: '黒松 (Kuromatsu)',
  difficulty: 'expert',
  timeToMature: '15-25 years',
  climateZones: ['5', '6', '7', '8', '9'],

  description: `THE quintessential niwaki species. Extensively used in Japan for trained and untrained garden trees, it demands advanced knowledge of candle pruning (midoritsumi) and needle plucking (momiage). The finest specimens represent 40+ years of patient, skilled work.`,

  characteristics: [
    'Irregular, picturesque growth habit',
    'Long, dark green needles in pairs',
    'Deeply furrowed grey-black bark with age',
    'Salt-tolerant, excellent for coastal gardens',
    'Hardy to -25°C (USDA Zone 5)',
  ],

  pruningCalendar: {
    spring: 'Candle pinching (midoritsumi) as candles elongate',
    summer: 'Allow second flush to harden',
    autumn: 'Needle plucking (momiage) November-December',
    winter: 'Branch selection and structural pruning',
  },

  techniques: [
    'Midoritsumi: Pinch all candles at base when soft but before hardening',
    'Momiage: Hand-remove 2-3 year old needles, leaving 7-8 pairs at tips',
    'Top growth pruned more heavily for balance (apical dominance)',
    'Never cut into bare wood - pines cannot regenerate from old wood',
  ],

  commonMistakes: [
    'Cutting into bare branches (they will die permanently)',
    'Missing the narrow window for candle pinching',
    'Using tools instead of fingers for needle work',
    'Neglecting annual maintenance (quickly loses form)',
  ],

  buyingTips: `Mature Japanese black pines are among the most valuable niwaki, with exceptional specimens reaching £10,000-50,000+. Look for interesting trunk movement, bark character, and well-positioned branching. Younger trees offer the chance to develop your own masterpiece over decades.`,

  relatedSpecies: ['pinus-sylvestris', 'pinus-parviflora'],
}
