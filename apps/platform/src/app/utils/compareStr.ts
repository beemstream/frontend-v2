export function compareStr(a: string, b: string): boolean {
  const normalizedA = normalize(a);
  const normalizedB = normalize(b);

  return normalizedA.toLowerCase().includes(normalizedB.toLowerCase());
}

const normalize = (s: string) => {
  return s
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};
