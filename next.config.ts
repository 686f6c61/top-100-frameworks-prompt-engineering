/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file next.config.ts
 * @description Configuración de Next.js con headers de seguridad
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
]

const nextConfig: NextConfig = {
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  // Configuración de imágenes remotas (si se necesitan)
  images: {
    remotePatterns: [],
  },

  // Deshabilitar X-Powered-By para no exponer Next.js
  poweredByHeader: false,
};

export default nextConfig;
