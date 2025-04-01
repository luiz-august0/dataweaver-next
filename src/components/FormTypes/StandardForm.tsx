import { CustomizedButtonProps } from "@/shared/types/general";
import * as Icon from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ReactNode } from "react";
import { FormButton, StepType } from "./types/models";

type Props = {
  open: boolean;
  formTitle: string;
  handleClose: () => void;
  formButtons: FormButton[];
  steps?: StepType[];
  activeStep?: number;
  headerButtons?: CustomizedButtonProps[];
  children: ReactNode;
} & DialogProps;

export default function StandardForm({
  open,
  formTitle,
  handleClose,
  formButtons,
  steps,
  activeStep,
  headerButtons,
  children,
  ...rest
}: Props) {
  const matchWidth = useMediaQuery("(max-width:768px)");

  const renderheaderButtons = () => {
    return (
      <>
        {headerButtons?.map((button, index) => (
          <Button key={index} {...button} sx={{ height: "40px", ...button.sx }}>
            {button.label}
          </Button>
        ))}
      </>
    );
  };

  return (
    <Dialog {...rest} open={open} fullWidth>
      <DialogTitle>
        <div className="flex items-center justify-between">
          <Typography fontSize={28}>{formTitle}</Typography>
          <div className="flex gap-4 items-center">
            {!matchWidth && renderheaderButtons()}
            <IconButton onClick={handleClose}>
              <Icon.Close />
            </IconButton>
          </div>
        </div>
        <div className="flex flex-row gap-4 flex-wrap mt-1">
          {matchWidth && renderheaderButtons()}
        </div>
        {steps && steps.length > 0 && (
          <div className="mt-4 w-full">
            <Stepper activeStep={activeStep}>
              {steps.map((item, index) => {
                return (
                  <Step key={index}>
                    <StepLabel>{item.label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </div>
        )}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {formButtons.map((e) => {
          return (
            <Button
              key={e.id}
              onClick={e.onClick}
              variant={e.variant}
              color={e.color}
              disabled={e.loading && e.isSubmit}
            >
              {e.title}
            </Button>
          );
        })}
      </DialogActions>
    </Dialog>
  );
}
