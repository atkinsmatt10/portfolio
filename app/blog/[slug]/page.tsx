import React from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { formatDate } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} - Matt Atkins`,
    description: post.description,
  }
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#333333]">
      <main className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-12">
          <Link href="/blog" className="text-gray-600 hover:text-gray-800 mb-4 inline-block">
            ← Back to blog
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
            {post.title}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-gray-600">
            <time className="text-sm">
              {formatDate(post.date)}
            </time>
            <span className="text-sm">
              {post.readingTime}
            </span>
          </div>
        </header>

        <div className="border-t border-gray-200 my-8"></div>

        <article className="prose prose-gray max-w-none prose-headings:font-serif prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-serif font-medium mb-6 mt-8 first:mt-0">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-serif font-medium mb-4 mt-8">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-serif font-medium mb-3 mt-6">{children}</h3>,
              p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-800">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-6 space-y-2 text-gray-800">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-800">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              code: ({ children }) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">{children}</code>,
              pre: ({ children }) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm">{children}</pre>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-400 bg-blue-50 pl-6 py-3 italic my-6 text-gray-700 rounded-r">{children}</blockquote>,
              hr: () => <hr className="my-8 border-gray-300" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  )
} 