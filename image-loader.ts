// image-loader.ts
import type { ImageLoaderProps } from "next/image";

/**
 * Cloudflare Image Loader
 * Transforms image requests to use Cloudflare's cdn-cgi endpoint.
 */
export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
  // 1. Normalize source to remove leading slash if it exists
  const normalizeSrc = (src: string) => (src.startsWith("/") ? src.slice(1) : src);

  // 2. Define transformation parameters
  const params = [`width=${width}`, `quality=${quality || 75}`, "format=auto"];

  // 3. Local Development: Use standard Next.js dev server behavior
  if (process.env.NODE_ENV === "development") {
    return `${src}?${params.join("&")}`;
  }

  // 4. Production: Route through Cloudflare's image transformation service
  // Note: Your domain must be active on Cloudflare for this path to work
  return `/cdn-cgi/image/${params.join(",")}/${normalizeSrc(src)}`;
}