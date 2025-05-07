import { buttonVariants } from '@/components/ui/button';
import { VariantProps } from 'class-variance-authority';
import * as Icon from 'lucide-react';

export type CustomizedButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  } & {
    label: JSX.Element | string;
    startIcon?: keyof typeof Icon;
  };
