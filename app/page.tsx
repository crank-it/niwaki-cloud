import Link from 'next/link'
import { ArrowRight, Map, Sparkles, BookOpen, TreeDeciduous, Award, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl font-light text-stone-800 tracking-wide mb-2">
          雲の形
        </h1>
        <p className="text-stone-500 text-sm tracking-widest uppercase mb-6">
          the shape of clouds
        </p>
        <p className="text-lg text-stone-600 mb-8 leading-relaxed">
          Discover the ancient Japanese art of cloud pruning. Visualise your garden&apos;s potential,
          explore techniques, and join a global community of niwaki enthusiasts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/visualizer" className="btn-primary inline-flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Visualise Your Garden</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/discover" className="btn-secondary inline-flex items-center justify-center gap-2">
            <Map className="w-4 h-4" />
            <span>Discover Gardens</span>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <Link href="/visualizer" className="card group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-stone-200 transition-colors">
            <Sparkles className="w-6 h-6 text-stone-600" />
          </div>
          <h2 className="section-title group-hover:text-stone-900">AI Visualiser</h2>
          <p className="section-subtitle">視覚化ツール</p>
          <p className="text-stone-600 mt-3">
            Upload a photo of your garden and see how it could look with cloud pruning applied by our AI.
          </p>
        </Link>

        <Link href="/discover" className="card group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-stone-200 transition-colors">
            <Map className="w-6 h-6 text-stone-600" />
          </div>
          <h2 className="section-title group-hover:text-stone-900">Discover Gardens</h2>
          <p className="section-subtitle">庭園を探す</p>
          <p className="text-stone-600 mt-3">
            Explore the map, see top-rated gardens, and discover beautiful niwaki from around the world.
          </p>
        </Link>

        <Link href="/species" className="card group hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-stone-200 transition-colors">
            <BookOpen className="w-6 h-6 text-stone-600" />
          </div>
          <h2 className="section-title group-hover:text-stone-900">Learn</h2>
          <p className="section-subtitle">学ぶ</p>
          <p className="text-stone-600 mt-3">
            Comprehensive guides on species, techniques, history, and the world&apos;s finest gardens.
          </p>
        </Link>
      </section>

      {/* Secondary Features */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <Link href="/species" className="p-4 rounded-lg border border-stone-200 hover:border-stone-300 hover:bg-white transition-all group">
          <TreeDeciduous className="w-5 h-5 text-stone-500 mb-2" />
          <h3 className="font-medium text-stone-800 group-hover:text-stone-900">Species Guide</h3>
          <p className="text-sm text-stone-500 mt-1">12+ detailed species profiles</p>
        </Link>

        <Link href="/techniques" className="p-4 rounded-lg border border-stone-200 hover:border-stone-300 hover:bg-white transition-all group">
          <BookOpen className="w-5 h-5 text-stone-500 mb-2" />
          <h3 className="font-medium text-stone-800 group-hover:text-stone-900">Techniques</h3>
          <p className="text-sm text-stone-500 mt-1">From basics to expert</p>
        </Link>

        <Link href="/discover" className="p-4 rounded-lg border border-stone-200 hover:border-stone-300 hover:bg-white transition-all group">
          <Award className="w-5 h-5 text-stone-500 mb-2" />
          <h3 className="font-medium text-stone-800 group-hover:text-stone-900">Rankings</h3>
          <p className="text-sm text-stone-500 mt-1">Top rated gardens</p>
        </Link>

        <Link href="/gardens" className="p-4 rounded-lg border border-stone-200 hover:border-stone-300 hover:bg-white transition-all group">
          <Users className="w-5 h-5 text-stone-500 mb-2" />
          <h3 className="font-medium text-stone-800 group-hover:text-stone-900">Featured Gardens</h3>
          <p className="text-sm text-stone-500 mt-1">World-class inspiration</p>
        </Link>
      </section>

      {/* Stats */}
      <section className="text-center py-12 border-t border-stone-200">
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <div className="text-3xl font-light text-stone-800">12+</div>
            <div className="text-xs text-stone-500 uppercase tracking-wide">Species Guides</div>
          </div>
          <div>
            <div className="text-3xl font-light text-stone-800">1000+</div>
            <div className="text-xs text-stone-500 uppercase tracking-wide">Years of History</div>
          </div>
          <div>
            <div className="text-3xl font-light text-stone-800">∞</div>
            <div className="text-xs text-stone-500 uppercase tracking-wide">Possibilities</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-light text-stone-800 mb-2">Join Our Community</h2>
          <p className="text-stone-500 text-sm mb-6">
            Share your garden, discover others, and connect with niwaki enthusiasts worldwide.
          </p>
          <Link href="/submit" className="btn-primary inline-flex items-center gap-2">
            <span>Submit Your Garden</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
