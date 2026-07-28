import { isRawEmoji, resolveWikiIcon } from '../../lib/icons'

export function PageIcon({ icon, fallback = 'page', className = '' }: { icon?: string; fallback?: string; className?: string }) {
  const value = icon?.trim()
  const resolved = resolveWikiIcon(value || fallback)
  const glyph = resolved?.glyph ?? (isRawEmoji(value) ? value : resolveWikiIcon(fallback)?.glyph ?? '📄')
  // Emoji glyphs draw well inside their em box, so at the surrounding font size they read as
  // undersized next to the text they label. Scale them relative to the inherited size rather than
  // to a fixed px value, so every call site stays proportional to its own context.
  // A caller that passes its own text-* takes over: emitting both would put two font-size
  // utilities on one element, and which one wins would come down to their order in the stylesheet.
  const scale = /(^|\s)text-/.test(className) ? '' : 'text-[1.5em]'
  return <span className={`inline-flex items-center justify-center ${scale} leading-none ${className}`} aria-hidden="true">{glyph}</span>
}
