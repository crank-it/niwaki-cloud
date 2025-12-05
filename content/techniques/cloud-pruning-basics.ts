import type { TechniqueContent } from '@/types'

export const cloudPruningBasics: TechniqueContent = {
  slug: 'cloud-pruning-basics',
  title: 'Cloud Pruning: The Complete Beginner\'s Guide',
  japaneseTitle: '雲剪定の基本',
  difficulty: 'beginner',
  timeRequired: '1-2 hours per session',

  introduction: `Cloud pruning transforms ordinary shrubs and trees into living sculptures that evoke the misty mountains of Japanese landscape paintings. The technique creates distinct "cloud" shapes in the foliage while revealing the beautiful architecture of branches beneath.`,

  philosophy: `At its heart, niwaki embodies wabi-sabi—the Japanese aesthetic that finds beauty in imperfection, impermanence, and incompleteness. Unlike Western topiary's geometric precision, cloud pruning celebrates organic, asymmetrical forms that suggest rather than define.

The Japanese say: "A bird should be able to fly through the tree without its feathers touching a leaf." This airiness—the interplay of solid and void—is the hallmark of authentic niwaki.`,

  principles: [
    {
      name: 'Fukinsei (不均整)',
      meaning: 'Asymmetry',
      application: 'Avoid mirror-image symmetry. Let cloud pads vary in size and position.',
    },
    {
      name: 'Kanso (簡素)',
      meaning: 'Simplicity',
      application: 'Remove what is unnecessary. Less is more.',
    },
    {
      name: 'Shizen (自然)',
      meaning: 'Naturalness',
      application: 'Work with the plant\'s natural tendencies, not against them.',
    },
  ],

  steps: [
    {
      step: 1,
      title: 'Observe',
      description: 'Study your plant from all angles. Identify the main trunk line, natural branch structure, and existing growth patterns. Spend at least 15 minutes just looking before making any cuts.',
    },
    {
      step: 2,
      title: 'Define the skeleton',
      description: 'Identify 3-5 main branches that will form your cloud structure. These should radiate outward and upward, avoiding crossing or parallel lines.',
    },
    {
      step: 3,
      title: 'Remove the interior',
      description: 'Clear growth from the centre of the plant and along branch lengths. This reveals the trunk and branch architecture that gives niwaki its character.',
    },
    {
      step: 4,
      title: 'Shape the clouds',
      description: 'Form foliage into rounded, cloud-like shapes at branch ends. Work from the inside out, removing shoots that grow inward or downward.',
    },
    {
      step: 5,
      title: 'Refine',
      description: 'Step back frequently. Adjust cloud sizes for visual balance—lower clouds typically larger, upper clouds smaller. Ensure all clouds have good light access.',
    },
  ],

  tools: [
    { name: 'Secateurs', use: 'Primary cutting tool for branches up to 1cm' },
    { name: 'Long-handled shears', use: 'Reaching into dense growth' },
    { name: 'Loppers', use: 'Branches 1-3cm diameter' },
    { name: 'Pruning saw', use: 'Larger branches' },
    { name: 'Wire and weights', use: 'Repositioning branches (optional)' },
  ],

  commonMistakes: [
    'Starting without a plan—always observe first',
    'Removing too much at once—work gradually over years',
    'Creating identical clouds—embrace asymmetry',
    'Forgetting to step back—perspective is everything',
    'Using blunt tools—clean cuts heal faster',
  ],
}
