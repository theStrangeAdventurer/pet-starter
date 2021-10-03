export const isSsr = () => typeof window === 'undefined';

export const checkIsMobile = (userAgent?: string) => {
  if (isSsr() && !userAgent) {
    return true; // mobile by default
  }
  const ua = userAgent || navigator?.userAgent;
  return /iPhone|iPad|iPod|Android/i.test(ua as string);
};
