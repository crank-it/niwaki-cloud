import { Metadata } from 'next'
import { ExternalLink, BookOpen, Video, Globe, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'A curated collection of the best resources for learning Japanese cloud pruning, from books to videos to courses.',
}

const resources = {
  books: [
    {
      title: 'Niwaki: Pruning, Training and Shaping Trees the Japanese Way',
      author: 'Jake Hobson',
      description: 'The definitive guide to niwaki in English. Essential reading for anyone serious about Japanese tree training.',
      url: 'https://niwaki.com/the-book'
    },
    {
      title: 'The Art of Japanese Gardens',
      author: 'David Young & Michiko Young',
      description: 'Comprehensive overview of Japanese garden design with excellent sections on plant use and maintenance.',
      url: '#'
    },
    {
      title: 'Cloud-Pruning Practice',
      author: 'Yoshikawa Tatsuya',
      description: 'Technical manual from a Japanese master, with detailed illustrations of pruning techniques.',
      url: '#'
    }
  ],
  websites: [
    {
      title: 'Niwaki.com',
      description: 'Jake Hobson\'s excellent resource with articles, guides, and quality Japanese tools.',
      url: 'https://niwaki.com'
    },
    {
      title: 'Japanese Garden Society (UK)',
      description: 'Events, garden visits, and a community of enthusiasts across the UK.',
      url: 'https://jgs.org.uk'
    },
    {
      title: 'Real Japanese Gardens',
      description: 'Detailed guides to visiting Japanese gardens, with focus on their horticultural elements.',
      url: 'https://real-japanese-gardens.com'
    }
  ],
  videos: [
    {
      title: 'Niwaki Ltd YouTube Channel',
      description: 'Practical tutorials on cloud pruning, tool maintenance, and Japanese garden techniques.',
      url: 'https://youtube.com/@niwakiltd'
    },
    {
      title: 'Portland Japanese Garden Pruning Series',
      description: 'Behind-the-scenes look at maintenance of one of the world\'s finest Japanese gardens.',
      url: 'https://youtube.com/@portlandjapanesegarden'
    }
  ],
  organisations: [
    {
      title: 'Japanese Garden Society (UK)',
      description: 'Promoting Japanese garden culture through events, journal, and garden access.',
      url: 'https://jgs.org.uk'
    },
    {
      title: 'North American Japanese Garden Association',
      description: 'Network of Japanese gardens across North America with educational resources.',
      url: 'https://najga.org'
    },
    {
      title: 'European Japanese Gardens Association',
      description: 'Connecting Japanese gardens and enthusiasts across Europe.',
      url: 'https://ejga.net'
    }
  ]
}

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2 flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-stone-600" />
            <span>Resources</span>
          </h1>
          <p className="text-xs text-stone-500 tracking-widest uppercase mb-4">
            学習資料
          </p>
          <p className="text-stone-600 max-w-2xl mx-auto">
            A curated collection of the best resources for learning and practising
            Japanese cloud pruning and garden design.
          </p>
        </div>

        {/* Books */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-xl">Books</h2>
          </div>
          <div className="space-y-4">
            {resources.books.map((book, i) => (
              <a
                key={i}
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card block hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-stone-800 group-hover:text-stone-900 mb-1">
                      {book.title}
                    </h3>
                    <p className="text-sm text-stone-500 mb-2">by {book.author}</p>
                    <p className="text-sm text-stone-600">{book.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-stone-400 flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Websites */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-xl">Websites</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.websites.map((site, i) => (
              <a
                key={i}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card block hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-stone-800 group-hover:text-stone-900">
                    {site.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-stone-400 flex-shrink-0" />
                </div>
                <p className="text-sm text-stone-600 mt-2">{site.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Videos */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Video className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-xl">Videos</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.videos.map((video, i) => (
              <a
                key={i}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card block hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-stone-800 group-hover:text-stone-900">
                    {video.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-stone-400 flex-shrink-0" />
                </div>
                <p className="text-sm text-stone-600 mt-2">{video.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Organisations */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="w-5 h-5 text-stone-600" />
            <h2 className="section-title text-xl">Organisations</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.organisations.map((org, i) => (
              <a
                key={i}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card block hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-stone-800 group-hover:text-stone-900">
                    {org.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-stone-400 flex-shrink-0" />
                </div>
                <p className="text-sm text-stone-600 mt-2">{org.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
