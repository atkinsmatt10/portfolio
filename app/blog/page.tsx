import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import { Rss } from "lucide-react"

export const metadata = {
  title: "Blog - Matt Atkins",
  description: "Hot takes on tech, the world of sports, and a mix of other things I'm thinking about.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#333333]">
      <main className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-12">
          <Link href="/" className="text-gray-600 hover:text-gray-800 mb-4 inline-block">
            ← Back to home
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
            <h1 className="font-serif text-4xl md:text-5xl font-medium">Writing</h1>
            <Link 
              href="/rss.xml" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors group w-fit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Rss size={20} className="group-hover:text-gray-800 transition-colors" />
              <span className="text-sm">Subscribe to RSS</span>
            </Link>
          </div>
          <p className="text-xl md:text-2xl font-light">
            Hot takes on tech, the world of sports, and a mix of other things I'm thinking about.
          </p>
        </header>

        <div className="border-t border-gray-200 my-8"></div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="font-medium text-xl md:text-2xl mb-2 group-hover:underline">
                  {post.title}
                </h2>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                  <time className="text-sm text-gray-600">
                    {formatDate(post.date)}
                  </time>
                  <span className="text-sm text-gray-600">
                    {post.readingTime}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  )
} 