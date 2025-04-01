"use client";

import { HttpStandardError } from "@/shared/types/models";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const successToast = (message: string) => {
  toast.success(message);
};

export const errorToast = (message: string) => {
  toast.error(message);
};

export const warningToast = (message: string) => {
  toast.warning(message);
};

export const infoToast = (message: string) => {
  toast.info(message);
};

export const handlerHttpError = (error: any) => {
  httpErrorToast(error as HttpStandardError & AxiosError);
};

const httpErrorToast = (error: HttpStandardError & AxiosError) => {
  const message = (error.response?.data as any)?.message ?? (error.message ?? "");

  if (error.response?.status == 401 || error.status == 401) {
    warningToast(message);
  } else {
    errorToast(message);
  }
};
