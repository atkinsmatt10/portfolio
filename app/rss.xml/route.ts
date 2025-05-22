import { getAllPosts } from '@/lib/blog'

export async function GET() {
  const posts = getAllPosts()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matteatkins.com'
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Matt Atkins - Blog</title>
    <description>Hot takes on tech, the world of sports, and a mix of other things I'm thinking about.</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>atkinsmatt10@gmail.com (Matt Atkins)</managingEditor>
    <webMaster>atkinsmatt10@gmail.com (Matt Atkins)</webMaster>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>atkinsmatt10@gmail.com (Matt Atkins)</author>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
} 