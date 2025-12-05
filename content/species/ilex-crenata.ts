import type { SpeciesContent } from '@/types'

export const ilexCrenata: SpeciesContent = {
  slug: 'ilex-crenata',
  commonName: 'Japanese Holly',
  scientificName: 'Ilex crenata',
  japaneseName: 'イヌツゲ',
  difficulty: 'beginner',
  timeToMature: '8-15 years',
  climateZones: ['5', '6', '7', '8', '9'],

  description: `The most popular choice for Western cloud pruning. Its dense, multi-stemmed habit and small glossy leaves create voluptuous cloud pads that clip beautifully. Unlike box (Buxus), it's resistant to box blight and tolerates clay, drought, and urban pollution.`,

  characteristics: [
    'Dense, multi-stemmed evergreen shrub',
    'Small, glossy dark green leaves (1-3cm)',
    'Tolerates heavy pruning and reshaping',
    'Slow to moderate growth (10-20cm/year)',
    'Hardy to -20°C (USDA Zone 5)',
  ],

  pruningCalendar: {
    spring: 'Light shaping as new growth emerges',
    summer: 'Primary pruning in early or late summer',
    autumn: 'Final trim by September',
    winter: 'Avoid pruning - risk of frost damage to cuts',
  },

  techniques: [
    'Use sharp secateurs, never hedge trimmers (damages leaves)',
    'Prune to maintain cloud shape, following natural contours',
    'Remove shoots growing into centre of plant',
    'Thin dense areas to allow light penetration',
  ],

  commonMistakes: [
    'Overwatering causing Phytophthora root rot',
    'Planting in alkaline soil (causes yellowing)',
    'Using hedge trimmers instead of secateurs',
    'Pruning in winter when frost can damage cuts',
  ],

  buyingTips: `Look for specimens with multiple stems from the base and dense branching. Avoid plants with yellowing leaves (indicates pH stress) or sparse growth. Pre-trained cloud trees represent 10-20+ years of development and command premium prices (£500-5000+).`,

  relatedSpecies: ['buxus-sempervirens', 'ligustrum-japonicum'],
}
