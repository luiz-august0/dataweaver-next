export function formatMoney(value?: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

export function unmaskInputMoney(value: string): number {
  if (!value) {
    return 0;
  }
  return typeof value === 'number' ? value : Number(value.replace(/\D/g, '')) / 100;
}
