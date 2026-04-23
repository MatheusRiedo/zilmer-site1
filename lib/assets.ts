export function cdnUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_CDN_URL
  if (!base || !path) return path
  return base.replace(/\/$/, '') + path
}
