import { MultipartBean } from "@/shared/types/models";
import { ChangeEvent, Dispatch } from "react";
import { formatMoney, unmaskInputMoney } from "./formatters";

type onChangeMoneyInputProps = {
  fieldName?: string;
  setValue?: any;
  clearErrors?: any;
  setInputValue: Dispatch<React.SetStateAction<string>>;
  target?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
};

export function onChangeMoneyInput({
  fieldName,
  setValue,
  clearErrors,
  setInputValue,
  target,
}: onChangeMoneyInputProps) {
  const val = unmaskInputMoney(target?.target.value ?? formatMoney(0));

  clearErrors?.(fieldName);

  if (val < 0) {
    setValue?.(fieldName, 0);
    setInputValue?.(formatMoney(0));
    return;
  }

  setValue?.(fieldName, val);
  setInputValue?.(formatMoney(val));
  clearErrors?.(fieldName);
}

export const getDigits = (value?: string): string =>
  value?.replace(/\D/g, "") ?? "";

export const setMultipartStateFromFile = (
  file: File,
  setFunction: (multipart: MultipartBean) => void
) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = function () {
    setFunction({
      file: reader.result as string,
      filename: file.name,
    });
  };
};

export const getFilenameFromUrl = (url: string) => {
  return url.substring(url.lastIndexOf("/") + 1, url.length);
};

export const calculateAge = (birthday: string) => {
  const today = new Date();
  const birthDate = new Date(birthday);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
