import { handlerHttpError } from '@/helpers/toast';
import { httpInstance } from '@/lib/axios/httpInstance';
import { DefaultRequestParams } from '@/shared/types/props';
import { User } from '../types/models';

export async function getUsersList({ paginationDTO, filterRequestDTO, sort }: DefaultRequestParams) {
  try {
    const { data } = await httpInstance.get('/user/filter/page', {
      params: { ...paginationDTO, ...filterRequestDTO, sort },
    });

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}

export async function mutateUser(user: User, userAuthenticated: boolean) {
  try {
    const { data } = await (userAuthenticated
      ? httpInstance.put('/session/user', user)
      : user.id
      ? httpInstance.put(`/user/${user.id}`, user)
      : httpInstance.post('/user', user));

    return data;
  } catch (error) {
    handlerHttpError(error);
    throw error;
  }
}
