// image-loader.ts
import type { ImageLoaderProps } from "next/image";

/**
 * Simple Image Loader for Cloudflare Pages
 * Serves images directly without transformation since Cloudflare Image Resizing
 * requires Pro+ plans and doesn't work with Cloudflare Pages by default.
 */
export default function cloudflareLoader({ src, width, quality }: ImageLoaderProps) {
  // For external URLs (http/https), return as-is
  if (src.startsWith("http://") || src.startsWith("https://")) {
    // If the URL supports query params for sizing (like Cloudinary), use them
    if (src.includes("cloudinary.com")) {
      // Cloudinary transformation
      return src.replace("/upload/", `/upload/w_${width},q_${quality || 75}/`);
    }
    return src;
  }

  // For local images, serve directly from origin
  // The src already starts with "/" for local images
  return src;
}