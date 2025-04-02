import { TextFieldProps } from '@mui/material';

export const inputProps: TextFieldProps = {
  InputProps: {
    style: {
      height: '45px',
    },
  },
  fullWidth: true,
};

export const TableField = ({ children }: { children: JSX.Element }) => (
  <div className="flex items-center h-full">{children}</div>
);
