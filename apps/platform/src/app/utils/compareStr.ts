export function compareStr(a: string, b: string): boolean {
  const normalizedA = a
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const normalizedB = b
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return normalizedA.toLowerCase().includes(normalizedB.toLowerCase());
}
