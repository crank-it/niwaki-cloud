'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { SEASONAL_CALENDAR } from '@/lib/techniques-data';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SEASON_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  winter: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' },
  spring: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' },
  summer: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800' },
  autumn: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800' },
};

export function SeasonalCalendar() {
  return (
    <section id="calendar" className="py-24 bg-niwaki-paper">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-niwaki-ink mb-4">
            Seasonal Calendar
          </h2>
          <p className="text-lg text-niwaki-bark max-w-2xl mx-auto">
            Timing is everything in niwaki. Follow this calendar to ensure your interventions
            align with your trees' natural rhythms.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SEASONAL_CALENDAR.map((month, index) => {
            const colors = SEASON_COLORS[month.season];
            return (
              <motion.div
                key={month.month}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`${colors.bg} ${colors.border} border rounded-lg p-4`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`font-serif text-lg ${colors.text}`}>
                    {MONTH_NAMES[month.month - 1]}
                  </h3>
                  <span className={`text-xs uppercase tracking-wider ${colors.text} opacity-70`}>
                    {month.season}
                  </span>
                </div>

                {month.criticalTasks && month.criticalTasks.length > 0 && (
                  <div className="mb-3 bg-red-100 border border-red-300 rounded p-2">
                    <div className="flex gap-2 items-start">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        {month.criticalTasks.map((task, idx) => (
                          <p key={idx} className="text-xs text-red-700 font-medium">
                            {task}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <ul className="space-y-1.5">
                  {month.tasks.map((task, idx) => (
                    <li key={idx} className="text-sm text-niwaki-bark flex items-start gap-2">
                      <span className={colors.text}>•</span>
                      {task}
                    </li>
                  ))}
                </ul>

                {month.avoid && month.avoid.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-niwaki-stone/10">
                    <p className="text-xs text-red-600 font-medium">
                      Avoid: {month.avoid.join(', ')}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
