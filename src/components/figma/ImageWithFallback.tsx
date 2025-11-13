import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  // Resolve local project images under `data/articleImages/` to Vite-served URLs.
  // This lets `projectArticles.ts` reference images as `./articleImages/example.jpg` or
  // `articleImages/ai-email-generator/flowchart.jpg` and have them work at runtime.
  // Vite's import.meta.glob with `{ query: '?url', import: 'default', eager: true }` returns a map of import -> URL.
  // The relative path here points from this file to the data folder.
  // Using ** to match nested folders.
  const localImages = import.meta.glob('../../../data/articleImages/**', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

  const resolveLocalSrc = (rawSrc?: string | null) => {
    if (!rawSrc) return rawSrc

    // If it's already an absolute URL, data URI, or an absolute public path, leave it.
    if (/^https?:\/\//.test(rawSrc) || rawSrc.startsWith('data:') || rawSrc.startsWith('/')) {
      return rawSrc
    }

    // Normalize leading ./ or ../
    const norm = rawSrc.replace(/^\.\/+/, '').replace(/^\.\.\//, '')

    // First pass: try to find an exact full-path match (e.g., "website-tracking/flowchart.jpg")
    for (const key in localImages) {
      if (key.endsWith(norm) || key.endsWith('/' + norm)) {
        return localImages[key]
      }
    }

    // Second pass (fallback): try basename-only match if full path didn't work
    const basename = norm.split('/').pop() || norm
    for (const key in localImages) {
      if (key.endsWith(basename)) {
        return localImages[key]
      }
    }

    // Not a local image we know about — return original
    return rawSrc
  }

  const resolvedSrc = resolveLocalSrc(typeof src === 'string' ? src : undefined)

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={resolvedSrc as string | undefined} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
