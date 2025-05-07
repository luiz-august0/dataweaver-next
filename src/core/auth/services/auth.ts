import { httpDefaultInstance, httpInstance } from '@/lib/axios/httpInstance';
import { SessionLogin } from '../types/models';

export async function sessionLogin(session: SessionLogin) {
  const { data } = await httpDefaultInstance.post('/session/login', session);

  return data;
}

export async function sessionVerify() {
  const { data } = await httpInstance.get('/session');

  return data;
}
