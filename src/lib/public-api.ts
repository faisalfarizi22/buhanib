const APP_API_ORIGIN = process.env.NEXT_PUBLIC_BINAHUB_APP_URL || "https://app-binahub.vercel.app";

export function appApiUrl(pathname: string) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${APP_API_ORIGIN}${normalizedPath}`;
}
