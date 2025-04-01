export interface FormButton {
  id: string;
  title: string;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  loading?: boolean;
  isSubmit?: boolean;
}

export interface StepType {
  label: string;
  jsx: JSX.Element;
}
