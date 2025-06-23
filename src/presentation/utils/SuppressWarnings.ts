// suppressWarnings.ts
const originalWarn = console.warn;

console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes(
      'Your app (or one of its dependencies) is using an outdated JSX transform',
    )
  ) {
    return;
  }
  originalWarn(...args);
};
