export interface FormButton {
  id: string;
  title: string;
  onClick?: () => void;
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  loading?: boolean;
  isSubmit?: boolean;
}

export interface StepType {
  label: string;
  jsx: JSX.Element;
}
