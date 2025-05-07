import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useForgotPasswordStep } from './forgotPasswordStep/useForgotPasswordStep';
import { useLoginStep } from './loginStep/useLoginStep';
import { useRecoveryStep } from './recoveryStep/useRecoveryStep';
import { StepProps } from './types';

type StepsKey = 'LOGIN' | 'FORGOT_PASSWORD' | 'RECOVERY';

type Steps = { [key: string]: StepProps };

export default function Login({ recoveryToken }: { recoveryToken?: string }) {
  const login = useLoginStep();
  const forgotPassword = useForgotPasswordStep();
  const recovery = useRecoveryStep(recoveryToken ?? '', () => {
    step.clearErrors();
    step.reset();
    setActualStep('LOGIN');
  });

  const steps: Steps = {
    LOGIN: {
      ...login,
    },
    FORGOT_PASSWORD: {
      ...forgotPassword,
    },
    RECOVERY: {
      ...recovery,
    },
  };

  const [actualStep, setActualStep] = useState<StepsKey>(recoveryToken ? 'RECOVERY' : 'LOGIN');
  const step = steps[actualStep];

  return (
    <form onSubmit={step.onSubmit} noValidate>
      <div className="flex h-screen">
        <div className="hidden sm:flex sm:w-4/12 md:w-7/12 bg-gradient-to-b from-[#202020] via-[#303030] to-[#606060] bg-cover bg-center" />
        <div className="w-full sm:w-8/12 md:w-5/12 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">{step.title}</h1>
              <p className="text-muted-foreground text-sm mt-2">{step.subtitle}</p>
            </div>
            <div className="flex flex-col w-full mt-1 space-y-4">
              <div className="self-center space-y-4 w-2/3">{step.fields}</div>
              <Button type="submit" className="w-full mt-3 mb-2 text-base" disabled={step.loading}>
                {step.buttonText}
              </Button>
              <Button
                type='button'
                variant="ghost"
                className="text-sm text-muted-foreground hover:underline"
                onClick={() => {
                  setActualStep(actualStep === 'LOGIN' ? 'FORGOT_PASSWORD' : 'LOGIN');
                  step.clearErrors();
                  step.reset();
                }}
              >
                {actualStep === 'LOGIN' ? 'Esqueceu sua senha?' : 'Ir para o login'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
