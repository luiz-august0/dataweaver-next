export type EnumParams = {
  label: any;
  bgColor?: string;
  color?: string;
};

export type EnumDefaultType = {
  [key: string | number]: EnumParams;
};

export const EnumDefaultStatus: EnumDefaultType = {
  true: { label: 'Ativo', bgColor: 'rgb(209, 250, 223)', color: 'rgb(2, 122, 72)' },
  false: { label: 'Inativo', bgColor: 'rgb(254, 228, 226)', color: 'rgb(180, 35, 24)' },
  all: { label: 'Todos' },
};

export const EnumGender: EnumDefaultType = {
  F: { label: 'Feminino' },
  M: { label: 'Masculino' },
};
