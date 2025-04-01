import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

const axiosDefaultInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

axiosInstance.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (session) {
    request.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
  }

  return request;
});

export const httpInstance = axiosInstance;
export const httpDefaultInstance = axiosDefaultInstance;
