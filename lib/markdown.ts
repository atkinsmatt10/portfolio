export function markdownToHtml(markdown: string): string {
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
    .map((line) => {
      line = line.trim()
      if (line === '') return ''
      if (line.match(/^<(h[1-6]|ul|ol|li|blockquote|code|pre)/)) return line
      if (line.startsWith('---')) return ''
      return `<p>${line}</p>`
    })
    .filter((line) => line !== '')
    .join('\n')
    // Clean up empty paragraphs and fix nested lists
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<ul>[\s\S]*?<\/ul>)<\/p>/g, '$1')
    .replace(/<p>(<ol>[\s\S]*?<\/ol>)<\/p>/g, '$1')
    .replace(/<p>(<blockquote>[\s\S]*?<\/blockquote>)<\/p>/g, '$1')
}
