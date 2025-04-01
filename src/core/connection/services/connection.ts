import { handlerHttpError } from '@/helpers/toast';
import { httpInstance } from '@/lib/axios/httpInstance';
import { Connection } from '../types/models';
import { AsyncResponse } from '@/shared/types/models';

export async function getConnection(): Promise<AsyncResponse<Connection>> {
  try {
    const { data } = await httpInstance.get('/database');

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}

export async function create(connection: Connection): Promise<AsyncResponse<Connection>> {
  try {
    const { data } = await httpInstance.post('/database', connection);

    return data;
  } catch (error) {
    handlerHttpError(error);
    throw error;
  }
}

export async function edit(connection: Connection): Promise<AsyncResponse<Connection>> {
  try {
    const { data } = await httpInstance.put('/database', connection);

    return data;
  } catch (error) {
    handlerHttpError(error);
    throw error;
  }
}
