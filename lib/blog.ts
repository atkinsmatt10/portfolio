import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  content: string
  readingTime: string
}

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const stats = readingTime(content)

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        content,
        readingTime: stats.text,
      }
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    let fileContents: string
    
    try {
      fileContents = fs.readFileSync(fullPath, 'utf8')
    } catch {
      // Try .mdx extension if .md doesn't exist
      const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
      fileContents = fs.readFileSync(mdxPath, 'utf8')
    }

    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      content,
      readingTime: stats.text,
    }
  } catch {
    return null
  }
} 