import { getAllPosts } from '@/lib/blog'

function markdownToHtml(markdown: string): string {
  return markdown
    // Convert headers
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
    // Convert bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Convert links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Convert inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Convert blockquotes
    .replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>')
    // Convert unordered lists
    .replace(/^[-*] (.*)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    // Convert paragraphs (lines that aren't already HTML)
    .split('\n')
    .map(line => {
      line = line.trim();
      if (line === '') return '';
      if (line.match(/^<(h[1-6]|ul|ol|li|blockquote|code|pre)/)) return line;
      if (line.startsWith('---')) return ''; // Remove frontmatter
      return `<p>${line}</p>`;
    })
    .filter(line => line !== '')
    .join('\n')
    // Clean up empty paragraphs and fix nested lists
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<ul>[\s\S]*?<\/ul>)<\/p>/g, '$1')
    .replace(/<p>(<ol>[\s\S]*?<\/ol>)<\/p>/g, '$1')
    .replace(/<p>(<blockquote>[\s\S]*?<\/blockquote>)<\/p>/g, '$1');
}

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