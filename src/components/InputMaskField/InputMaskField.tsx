import { ReactNode } from 'react';
import InputMask, { Props } from 'react-input-mask';

type InputMaskProps = {
  children?: () => JSX.Element;
  mask: string | Array<string | RegExp>;
} & Omit<Props, 'children'>;

export function InputMaskField({ children, mask, ...props }: InputMaskProps) {
  const child = children as ReactNode;
  return <InputMask mask={mask} {...props}>{child}</InputMask>;
}
