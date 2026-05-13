import { getAllPosts } from '@/lib/blog'
import { markdownToHtml } from '@/lib/markdown'

export async function GET() {
  const posts = getAllPosts()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matteatkins.com'

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Matt Atkins</title>
    <description>Hot takes on tech, the world of sports, and a mix of other things I'm thinking about.</description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <copyright>Copyright © ${new Date().getFullYear()}, Matt Atkins</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <managingEditor>atkinsmatt10@gmail.com (Matt Atkins)</managingEditor>
    <webMaster>atkinsmatt10@gmail.com (Matt Atkins)</webMaster>
    <generator>Matt Atkins Portfolio</generator>
    <image>
      <url>${siteUrl}/feed-icon.png</url>
      <title>Matt Atkins</title>
      <link>${siteUrl}</link>
      <width>144</width>
      <height>144</height>
      <description>Hot takes on tech, the world of sports, and a mix of other things I'm thinking about.</description>
    </image>
    ${posts
      .map(
        (post) => {
          const htmlContent = markdownToHtml(post.content);
          return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <content:encoded><![CDATA[${htmlContent}]]></content:encoded>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>atkinsmatt10@gmail.com (Matt Atkins)</author>
      <category>Blog</category>
    </item>`;
        }
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
