import { ButtonProps } from "@mui/material";

export type CustomizedButtonProps = ButtonProps & {
  label: JSX.Element | string;
};
