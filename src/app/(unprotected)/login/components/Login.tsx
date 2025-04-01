import { LinearProgress, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useForgotPasswordStep } from './forgotPasswordStep/useForgotPasswordStep';
import { useLoginStep } from './loginStep/useLoginStep';
import { useRecoveryStep } from './recoveryStep/useRecoveryStep';
import { StepProps } from './types';

type StepsKey = 'LOGIN' | 'FORGOT_PASSWORD' | 'RECOVERY';

type Steps = { [key: string]: StepProps };

export default function Login({ recoveryToken }: { recoveryToken?: string }) {
  const { palette } = useTheme();
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
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          background: 'linear-gradient(to bottom, #202020 0%, #303030 50%, #606060 100%)',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            display: 'flex',
            my: 8,
            mx: 4,
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" textAlign={'center'}>
            {step.title}
          </Typography>
          <Typography fontSize={16} color={palette.grey[600]} marginTop={2} textAlign={'center'}>
            {step.subtitle}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={step.onSubmit}
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', mt: 1, alignItems: 'center' }}
          >
            {step.fields}
            {step.loading ? (
              <LinearProgress color="primary" sx={{ mt: 3, mb: 2, width: '100%' }} />
            ) : (
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, textTransform: 'none' }}>
                {step.buttonText}
              </Button>
            )}
            {!step.loading && (
              <Button
                variant="text"
                sx={{
                  textTransform: 'none',
                }}
                onClick={() => {
                  setActualStep(actualStep == 'LOGIN' ? 'FORGOT_PASSWORD' : 'LOGIN');
                  step.clearErrors();
                  step.reset();
                }}
              >
                {actualStep == 'LOGIN' ? 'Esqueceu sua senha ?' : 'Ir para o login'}
              </Button>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
