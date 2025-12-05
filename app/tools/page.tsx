import { Metadata } from 'next'
import { Scissors, Wrench, ShoppingBag, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tools & Products',
  description: 'Essential tools and products for Japanese cloud pruning, from traditional Japanese secateurs to specialist supplies.',
}

const tools = {
  pruning: [
    {
      name: 'Japanese Secateurs (剪定鋏)',
      description: 'Traditional bypass secateurs with fine tips for precise cuts. Essential for cloud pruning work.',
      tip: 'Look for hand-forged steel blades. Niwaki and Okatsune are reliable brands.',
      priceRange: '£30-80'
    },
    {
      name: 'Long-Reach Secateurs',
      description: 'Extended handles for reaching into dense growth without disturbing the shape.',
      tip: 'Useful for larger specimens and interior work.',
      priceRange: '£40-100'
    },
    {
      name: 'Needle-Nose Secateurs',
      description: 'Extra-fine tips for detailed work, especially on pines and conifers.',
      tip: 'Worth investing in for species that require precision work.',
      priceRange: '£35-70'
    },
    {
      name: 'Japanese Loppers',
      description: 'For branches 1-3cm diameter. Look for replaceable blades.',
      tip: 'The scissor-action type gives cleaner cuts than anvil loppers.',
      priceRange: '£60-150'
    },
    {
      name: 'Pruning Saw',
      description: 'Japanese pull-saws cut on the pull stroke for greater control.',
      tip: 'Choose a saw with a curved blade for easier access in tight spaces.',
      priceRange: '£25-60'
    }
  ],
  maintenance: [
    {
      name: 'Sharpening Stones',
      description: 'Japanese waterstones for maintaining razor-sharp edges.',
      tip: 'A 1000/6000 grit combination stone covers most needs.',
      priceRange: '£30-100'
    },
    {
      name: 'Camellia Oil',
      description: 'Traditional oil for protecting blades from rust.',
      tip: 'Apply after each use, especially in humid conditions.',
      priceRange: '£8-15'
    },
    {
      name: 'Wire & Weights',
      description: 'For branch repositioning. Aluminium wire in various gauges.',
      tip: 'Start with 3mm wire for most applications.',
      priceRange: '£10-30'
    }
  ],
  suppliers: [
    {
      name: 'Niwaki Ltd',
      description: 'Premium Japanese tools, well-curated selection with excellent customer service.',
      location: 'UK',
      url: 'https://niwaki.com'
    },
    {
      name: 'Hida Tool & Hardware',
      description: 'Specialist Japanese tools with deep knowledge of traditional craftsmanship.',
      location: 'USA',
      url: 'https://hidatool.com'
    },
    {
      name: 'Dictum',
      description: 'Wide range of Japanese and European hand tools for woodworking and gardening.',
      location: 'Germany',
      url: 'https://dictum.com'
    }
  ]
}

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2 flex items-center justify-center gap-3">
            <Wrench className="w-8 h-8 text-stone-600" />
            <span>Tools & Products</span>
          </h1>
          <p className="text-xs text-stone-500 tracking-widest uppercase mb-4">
            道具
          </p>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Quality tools make a significant difference in niwaki work. We recommend investing
            in good-quality Japanese tools that will last a lifetime with proper care.
          </p>
        </div>

        {/* Pruning Tools */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Scissors className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-xl">Pruning Tools</h2>
          </div>
          <div className="space-y-4">
            {tools.pruning.map((tool, i) => (
              <div key={i} className="card">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-medium text-stone-800">{tool.name}</h3>
                  <span className="text-sm text-stone-500">{tool.priceRange}</span>
                </div>
                <p className="text-sm text-stone-600 mb-2">{tool.description}</p>
                <p className="text-sm text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block">
                  💡 {tool.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Maintenance */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-xl">Maintenance</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {tools.maintenance.map((item, i) => (
              <div key={i} className="card">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-medium text-stone-800">{item.name}</h3>
                  <span className="text-sm text-stone-500">{item.priceRange}</span>
                </div>
                <p className="text-sm text-stone-600 mb-2">{item.description}</p>
                <p className="text-xs text-stone-500">{item.tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Suppliers */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <ShoppingBag className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-xl">Trusted Suppliers</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {tools.suppliers.map((supplier, i) => (
              <a
                key={i}
                href={supplier.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card block hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium text-stone-800 group-hover:text-stone-900">
                    {supplier.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-stone-400 flex-shrink-0" />
                </div>
                <p className="text-sm text-stone-600 mb-2">{supplier.description}</p>
                <p className="text-xs text-stone-500">📍 {supplier.location}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-stone-400">
            Note: We are not affiliated with any of these suppliers. Recommendations are
            based on quality and reputation within the niwaki community.
          </p>
        </div>
      </div>
    </div>
  )
}
