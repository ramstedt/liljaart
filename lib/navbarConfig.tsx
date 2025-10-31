export const navbarConfig: Record<
  string,
  { color: 'light' | 'dark'; showBorder: boolean }
> = {
  '/': { color: 'dark', showBorder: false },
  '/galleri': { color: 'light', showBorder: true },
  '/galleri/': { color: 'light', showBorder: true }, // ensure dynamic slug support
  '*': { color: 'light', showBorder: true }, // fallback for all other routes
};
