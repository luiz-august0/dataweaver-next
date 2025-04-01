import { FormEventHandler, ReactNode } from 'react';
import { UseFormClearErrors, UseFormReset } from 'react-hook-form';

export type StepProps = {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
  title: string;
  subtitle: string;
  buttonText: string;
  loading: boolean;
  clearErrors: UseFormClearErrors<any>;
  reset: UseFormReset<any>;
  fields: ReactNode;
};
