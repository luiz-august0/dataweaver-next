export type ForgotPasswordRequest = {
  login: string;
};

export type ChangePasswordRequest = {
  password: string;
  token: string;
};
