export function compareStr(a: string, b: string): boolean {
  const normalizedA = a.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const normalizedB = b.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return normalizedA.toLowerCase().includes(normalizedB.toLowerCase());
}

