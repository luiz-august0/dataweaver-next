import { handlerHttpError } from '@/helpers/toast';
import { httpInstance } from '@/lib/axios/httpInstance';
import { ChangePasswordRequest, ForgotPasswordRequest } from '../types/dtos';

export async function generateRecovery(req: ForgotPasswordRequest) {
  try {
    const { data } = await httpInstance.post('/session/recovery', req);

    return data;
  } catch (error) {
    handlerHttpError(error);
    throw error;
  }
}

export async function changePassword(req: ChangePasswordRequest) {
  try {
    const { data } = await httpInstance.post('/session/recovery/password', req);

    return data;
  } catch (error) {
    handlerHttpError(error);
    throw error;
  }
}
