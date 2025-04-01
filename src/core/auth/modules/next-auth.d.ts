import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      login: string;
      role: string;
      accessToken: string;
      photo: string;
      primaryColor: string;
      secondaryColor: string;
      enterpriseName: string;
    };
  }
}
