'use client';

import type { FilterState, TechniqueCategory, Season, Difficulty } from '@/types/techniques';

interface TechniqueFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const CATEGORIES: { value: TechniqueCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pine-specific', label: 'Pine-specific' },
  { value: 'deciduous', label: 'Deciduous' },
  { value: 'structural', label: 'Structural' },
  { value: 'maintenance', label: 'Maintenance' },
];

const SEASONS: { value: Season | null; label: string }[] = [
  { value: null, label: 'Any Season' },
  { value: 'winter', label: 'Winter' },
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
];

const DIFFICULTIES: { value: Difficulty | null; label: string }[] = [
  { value: null, label: 'Any Difficulty' },
  { value: 1, label: '★ Beginner' },
  { value: 2, label: '★★ Easy' },
  { value: 3, label: '★★★ Intermediate' },
  { value: 4, label: '★★★★ Advanced' },
  { value: 5, label: '★★★★★ Expert' },
];

export function TechniqueFilter({ filters, onFilterChange }: TechniqueFilterProps) {
  return (
    <div className="space-y-4">
      {/* Category buttons */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onFilterChange({ ...filters, category: cat.value })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filters.category === cat.value
                ? 'bg-niwaki-moss text-white'
                : 'bg-niwaki-paper text-niwaki-bark border border-niwaki-stone/20 hover:border-niwaki-moss/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Season and difficulty dropdowns */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="season" className="text-sm text-niwaki-stone">
            Season:
          </label>
          <select
            id="season"
            value={filters.season ?? ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                season: e.target.value ? (e.target.value as Season) : null,
              })
            }
            className="bg-niwaki-paper border border-niwaki-stone/20 rounded-lg px-3 py-1.5 text-sm text-niwaki-ink focus:outline-none focus:ring-2 focus:ring-niwaki-moss/30"
          >
            {SEASONS.map((season) => (
              <option key={season.label} value={season.value ?? ''}>
                {season.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="difficulty" className="text-sm text-niwaki-stone">
            Difficulty:
          </label>
          <select
            id="difficulty"
            value={filters.difficulty ?? ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                difficulty: e.target.value ? (Number(e.target.value) as Difficulty) : null,
              })
            }
            className="bg-niwaki-paper border border-niwaki-stone/20 rounded-lg px-3 py-1.5 text-sm text-niwaki-ink focus:outline-none focus:ring-2 focus:ring-niwaki-moss/30"
          >
            {DIFFICULTIES.map((diff) => (
              <option key={diff.label} value={diff.value ?? ''}>
                {diff.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
