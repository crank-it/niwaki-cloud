import type { GardenContent } from '@/types'

export const portlandJapaneseGarden: GardenContent = {
  slug: 'portland-japanese-garden',
  name: 'Portland Japanese Garden',
  japaneseName: 'ポートランド日本庭園',
  location: {
    city: 'Portland',
    region: 'Oregon',
    country: 'United States',
    coordinates: { lat: 45.5189, lng: -122.7082 },
  },

  description: `Proclaimed "the most beautiful and authentic Japanese garden outside Japan" by the Japanese ambassador, Portland Japanese Garden spans 12.5 acres in Washington Park. Its world-class niwaki programme maintains hundreds of meticulously pruned pines, maples, and shrubs using traditional Japanese techniques.`,

  highlights: [
    'Five distinct garden styles within one property',
    'World-class niwaki maintenance programme',
    'Cultural Village designed by Kengo Kuma (2017)',
    'Regular pruning demonstrations and workshops',
    'Stunning views of Mt. Hood',
  ],

  gardens: [
    { name: 'Flat Garden', style: 'Hiraniwa', description: 'Zen-influenced raked gravel with sculptural pines' },
    { name: 'Strolling Pond Garden', style: 'Chisen-kaiyū-shiki', description: 'Traditional pond garden with koi and moon bridge' },
    { name: 'Tea Garden', style: 'Roji', description: 'Intimate path leading to authentic tea house' },
    { name: 'Natural Garden', style: 'Shizen', description: 'Native plantings meeting Japanese aesthetics' },
    { name: 'Sand and Stone Garden', style: 'Karesansui', description: 'Dry landscape representing mountains and sea' },
  ],

  practicalInfo: {
    hours: 'Wednesday-Monday 10am-6pm (seasonal variations)',
    admission: '$18.95-$25 adults',
    address: '611 SW Kingston Ave, Portland, OR 97205',
    website: 'https://japanesegarden.org',
  },

  niwakiNotes: `The garden's horticultural team employs authentic Japanese pruning techniques including candling and needling for pines. Regular demonstrations offer visitors insight into this meticulous work. The collection includes exceptional mature black pines and expertly trained maples.`,

  visitingTips: [
    'Visit early morning for fewer crowds and optimal photography light',
    'Check calendar for pruning demonstrations',
    'Spring (cherry blossoms) and autumn (maples) are peak seasons',
    'The Cultural Village café offers matcha and Japanese sweets',
  ],
}
