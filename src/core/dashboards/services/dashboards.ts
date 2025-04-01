import { handlerHttpError } from '@/helpers/toast';
import { httpInstance } from '@/lib/axios/httpInstance';

export async function getMainDashboard() {
  try {
    const { data } = await httpInstance.get('/dashboard/main');

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}
