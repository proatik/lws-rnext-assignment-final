import bcrypt from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// library functions.
import { getUser, createUserAndAccount } from "./lib/users";

// configurations.
import configs from "./configs";

const nextAuth = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: configs.maxAge,
  },

  pages: {
    signIn: "/login",
    newUser: "/register",
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async ({ email, password }) => {
        if (!email || !password) {
          return null;
        }

        const user = await getUser(email, "credentials");

        if (!user) {
          throw new CredentialsSignin({
            cause: "Invalid credentials",
          });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new CredentialsSignin({
            cause: "Invalid credentials",
          });
        }

        delete user.password;

        return user;
      },
    }),

    GoogleProvider,
  ],

  callbacks: {
    async signIn({ user }) {
      const { name: fullName, email } = user;

      const isExist = await getUser(email, "google");

      if (!isExist) {
        const userData = {
          email,
          fullName,
          provider: "google",
        };

        await createUserAndAccount(userData);
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (account && account?.provider === "google") {
        const { id, fullName, email } = await getUser(user?.email, "google");

        token.id = id;
        token.email = email;
        token.fullName = fullName;
        token.provider = "google";
      } else if (account && account?.provider === "credentials") {
        const { id, fullName, email } = user;

        token.id = id;
        token.email = email;
        token.fullName = fullName;
        token.provider = "credentials";
      }

      return token;
    },

    async session({ session, token }) {
      const { id, fullName, email, provider } = token;

      session.user = { id, fullName, email, provider };

      return session;
    },
  },
});

export const { auth, signIn, signOut, handlers } = nextAuth;
