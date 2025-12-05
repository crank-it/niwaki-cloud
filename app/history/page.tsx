import { Metadata } from 'next'
import { History, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'History of Niwaki',
  description: 'Explore the rich 1000+ year history of Japanese cloud pruning, from ancient temple gardens to modern practice.',
}

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2 flex items-center justify-center gap-3">
            <History className="w-8 h-8 text-stone-600" />
            <span>History of Niwaki</span>
          </h1>
          <p className="text-xs text-stone-500 tracking-widest uppercase mb-4">
            仁和寺の歴史
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {/* Ancient Origins */}
          <section className="card">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-stone-600" />
              <h2 className="section-title text-lg">Ancient Origins (500-794 CE)</h2>
            </div>
            <p className="text-stone-600 leading-relaxed mb-4">
              The roots of niwaki stretch back to the Asuka and Nara periods, when Chinese garden
              design principles first arrived in Japan along with Buddhism. Early Japanese gardens
              were inspired by Chinese representations of paradise islands (Horai) and mythical
              mountain landscapes.
            </p>
            <p className="text-stone-600 leading-relaxed">
              These initial gardens featured symbolic arrangements of rocks and plants meant to
              evoke mountains, islands, and natural scenery in miniature. The concept of
              manipulating trees to suggest age and the forces of nature was already present,
              though not yet formalised.
            </p>
          </section>

          {/* Heian Period */}
          <section className="card">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="section-title text-lg">Heian Period (794-1185)</h2>
            </div>
            <p className="text-stone-600 leading-relaxed mb-4">
              The Heian period saw the development of the &quot;shinden-zukuri&quot; garden style,
              designed around aristocratic residences. Large pond gardens became fashionable,
              featuring carefully placed stones and trained plants viewed from boats or covered
              walkways.
            </p>
            <p className="text-stone-600 leading-relaxed">
              During this era, the practice of training trees to represent idealized natural
              forms became more refined. The aesthetic concept of &quot;shakkei&quot; (borrowed scenery)
              emerged, where distant landscapes were incorporated into garden design—a principle
              that would influence how individual trees were shaped.
            </p>
          </section>

          {/* Kamakura & Muromachi */}
          <section className="card">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="section-title text-lg">Zen Influence (1185-1573)</h2>
            </div>
            <p className="text-stone-600 leading-relaxed mb-4">
              The rise of Zen Buddhism transformed Japanese garden design fundamentally.
              Zen monks returning from China brought new aesthetic sensibilities emphasising
              simplicity, asymmetry, and the suggestion of infinite depth within confined spaces.
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              The karesansui (dry landscape) gardens of this period, such as those at Ryoan-ji
              and Daisen-in, demonstrated how carefully positioned rocks and pruned plants could
              represent vast mountain ranges and seas. Trees were shaped to complement these
              compositions, their cloud-like forms suggesting mist-shrouded peaks.
            </p>
            <p className="text-stone-600 leading-relaxed">
              The celebrated garden designer Muso Soseki (1275-1351) helped codify many
              principles that still guide niwaki practice today.
            </p>
          </section>

          {/* Edo Period */}
          <section className="card">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="section-title text-lg">Edo Period Golden Age (1603-1868)</h2>
            </div>
            <p className="text-stone-600 leading-relaxed mb-4">
              The peaceful Edo period allowed garden arts to flourish as never before.
              The daimyo (feudal lords) commissioned elaborate stroll gardens that combined
              multiple styles and showcased collections of meticulously trained trees.
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              Gardens like Kenroku-en in Kanazawa, Koraku-en in Okayama, and Ritsurin in
              Takamatsu featured hundreds of cloud-pruned pines and other specimens, each
              requiring years of skilled attention. Professional niwaki-shi (tree gardeners)
              developed and passed down their techniques through rigorous apprenticeships.
            </p>
            <p className="text-stone-600 leading-relaxed">
              This era also saw the publication of influential garden manuals that documented
              pruning techniques for the first time, ensuring their preservation for future
              generations.
            </p>
          </section>

          {/* Modern Era */}
          <section className="card">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="section-title text-lg">Modern Practice (1868-Present)</h2>
            </div>
            <p className="text-stone-600 leading-relaxed mb-4">
              The Meiji Restoration and subsequent modernisation of Japan brought both challenges
              and opportunities for traditional garden arts. While some historic gardens fell
              into neglect, others were preserved as cultural treasures, and the craft of niwaki
              continued through dedicated practitioners.
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              In the 20th century, Japanese garden design gained international recognition.
              Gardens were created worldwide, from Portland to London to Sydney, bringing
              appreciation for niwaki to new audiences. Western gardeners began adapting
              cloud pruning techniques to their own climates and available species.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Today, niwaki enjoys renewed popularity both in Japan and abroad. Contemporary
              practitioners honour traditional techniques while exploring new applications,
              ensuring this living art form continues to evolve while maintaining its
              deep connection to Japanese aesthetic philosophy.
            </p>
          </section>
        </div>

        {/* Quote */}
        <div className="mt-12 text-center py-8 border-t border-stone-200">
          <blockquote className="text-xl font-light text-stone-700 italic mb-4">
            &quot;The purpose of the garden is not to replicate nature, but to capture its essence.&quot;
          </blockquote>
          <p className="text-sm text-stone-500">— Traditional Japanese garden principle</p>
        </div>
      </div>
    </div>
  )
}
