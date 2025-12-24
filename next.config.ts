// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntPlugin = require("next-intl/plugin")
const withNextIntl = createNextIntPlugin()

import path from "path"
import type { NextConfig } from "next"

const shimCanvas = path.resolve(__dirname, "src/shims/canvas.js")
const emptyShim = path.resolve(__dirname, "src/shims/empty.ts")

const nextConfig: NextConfig = {
  // Make Turbopack (dev) respect aliases too
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: shimCanvas,
        fs: emptyShim,
        path: emptyShim,
        crypto: emptyShim,
      },
    },
  },

  // Use the injected webpack instance (no import!)
  webpack: (config, { webpack }) => {
    // Alias canvas to our browser shim
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      canvas: shimCanvas,
      ["canvas$"]: shimCanvas, // exact-match safety
    }

    // Extra safety: replace any require("canvas")
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^canvas$/, shimCanvas)
    )

    // Silence Node built-ins in browser bundles if referenced
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false,
      path: false,
      crypto: false,
    }

    return config
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/_pdf/test.pdf", // your local path used in the app
        destination:
          "https://www.cte.iup.edu/cte/Resources/PDF_TestPage.pdf", // remote PDF
      },
    ]
  },
}

export default withNextIntl(nextConfig)
