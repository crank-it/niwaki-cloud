import { Metadata } from 'next';
import {
  TechniqueHero,
  PhilosophySection,
  StylesGallery,
  TechniqueGrid,
  BranchTraining,
  SeasonalCalendar,
  SpeciesGuide,
  ToolsSection,
  MistakesAccordion,
  YearOneTimeline,
  ResourcesSection,
} from '@/components/techniques';

export const metadata: Metadata = {
  title: 'Pruning Techniques | The Art of Niwaki',
  description:
    'Master the art of Japanese cloud pruning with comprehensive technique guides. Learn traditional methods from midoritsumi to momiage, with step-by-step processes, timing guides, and species-specific advice.',
  keywords: [
    'niwaki',
    'cloud pruning',
    'Japanese gardening',
    'pruning techniques',
    'midoritsumi',
    'momiage',
    'sukashi',
    'pine pruning',
    'bonsai',
    'garden design',
  ],
};

export default function TechniquesPage() {
  return (
    <main className="min-h-screen">
      <TechniqueHero />
      <PhilosophySection />
      <StylesGallery />
      <TechniqueGrid />
      <BranchTraining />
      <SpeciesGuide />
      <SeasonalCalendar />
      <ToolsSection />
      <MistakesAccordion />
      <YearOneTimeline />
      <ResourcesSection />
    </main>
  );
}
