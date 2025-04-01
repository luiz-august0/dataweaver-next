import { sessionLogin } from '@/core/auth/services/auth';
import { AxiosError } from 'axios';
import NextAuth, { NextAuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        login: { label: 'login', type: 'text' },
        password: { label: 'password', type: 'password' },
        databasePassword: { label: 'databasePassword', type: 'password' },
      },

      async authorize(credentials, req) {
        try {
          const sessionResponse = await sessionLogin({
            login: credentials?.login ?? '',
            password: credentials?.password ?? '',
            databasePassword: credentials?.databasePassword ?? '',
          });

          if (sessionResponse) {
            return sessionResponse;
          }

          return null;
        } catch (error) {
          const axiosError = error as AxiosError;
          throw new Error(JSON.stringify(axiosError?.response?.data));
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, session }) {
      const sessionUser = session?.user ?? user;

      return { ...token, ...sessionUser };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
