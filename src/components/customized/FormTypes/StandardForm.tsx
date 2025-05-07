import type { ReactNode } from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/helpers/cn';
import { FormButton, StepType } from './types/models';
import { CustomizedButtonProps } from '@/shared/types/general';
import { Stepper } from '../Stepper/Stepper';

type Props = {
  open: boolean;
  formTitle: string;
  handleClose: () => void;
  formButtons: FormButton[];
  steps?: StepType[];
  activeStep?: number;
  headerButtons?: CustomizedButtonProps[];
  children: ReactNode;
  className?: string;
};

export default function StandardForm({
  open,
  formTitle,
  handleClose,
  formButtons,
  steps,
  activeStep = 0,
  headerButtons,
  children,
  className,
  ...rest
}: Props) {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  const renderHeaderButtons = () => {
    return (
      <>
        {headerButtons?.map((button, index) => (
          <Button key={index} {...button} className={cn('h-10', button.className)}>
            {button.label}
          </Button>
        ))}
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()} {...rest}>
      <DialogContent className={cn('sm:max-w-[500px] md:max-w-[600px]', className)}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{formTitle}</DialogTitle>
            <div className="flex items-center gap-4">
              {!isMobile && renderHeaderButtons()}
              <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-1 flex flex-row flex-wrap gap-4">{isMobile && renderHeaderButtons()}</div>
          {steps && steps.length > 0 && (
            <div className="mt-4 w-full">
              <Stepper steps={steps} activeStep={activeStep} />
            </div>
          )}
        </DialogHeader>
        {children}
        <DialogFooter className="flex flex-row gap-2 justify-end pt-4">
          {formButtons.map((button) => (
            <Button
              key={button.id}
              onClick={button.onClick}
              variant={button.variant || 'default'}
              disabled={button.loading && button.isSubmit}
            >
              {button.title}
            </Button>
          ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
