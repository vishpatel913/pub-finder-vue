export const toTitleCase = (string: string): string =>
  string
    .split(/\s|-|_/)
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

export const toCamelCase = (string: string): string =>
  string
    .split(/\s|-|_/)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.substring(1)))
    .join('');
