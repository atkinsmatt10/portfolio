import test from 'node:test'
import assert from 'node:assert/strict'
import { markdownToHtml } from '../app/rss.xml/route'

test('converts headers', () => {
  const md = '# Title\n## Sub'
  const html = markdownToHtml(md)
  assert.match(html, /<h1>Title<\/h1>/)
  assert.match(html, /<h2>Sub<\/h2>/)
})

test('converts emphasis', () => {
  const md = '**bold** *italic*'
  const html = markdownToHtml(md)
  assert.match(html, /<strong>bold<\/strong>/)
  assert.match(html, /<em>italic<\/em>/)
})

test('converts lists', () => {
  const md = '- one\n- two'
  const html = markdownToHtml(md)
  assert.ok(html.includes('<ul>'))
  assert.ok(html.includes('<li>one</li>'))
  assert.ok(html.includes('<li>two</li>'))
})
