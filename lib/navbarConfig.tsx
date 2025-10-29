export const navbarConfig: Record<
  string,
  { color: 'light' | 'dark'; showBorder: boolean }
> = {
  '/': { color: 'dark', showBorder: false },
  '/butik': { color: 'light', showBorder: true },
  '/butik/': { color: 'light', showBorder: true }, // ensure dynamic slug support
  '*': { color: 'light', showBorder: true }, // fallback for all other routes
};
