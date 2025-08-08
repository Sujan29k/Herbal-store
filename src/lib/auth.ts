import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import { compare } from "bcryptjs";

export interface NextAuthOptions {
  providers: any[];
  pages: {
    signIn: string;
  };
  callbacks: {
    signIn: (params: any) => Promise<boolean>;
    jwt: (params: any) => any;
    session: (params: any) => any;
  };
  session: {
    strategy: "jwt";
    maxAge: number;
  };
  secret?: string;
  debug?: boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB();
        const existing = await User.findOne({ email: user.email });
        if (!existing) {
          await User.create({
            name: user.name,
            email: user.email,
            isOAuth: true,
            role: "user",
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user && "role" in user) {
        token.role = user.role || "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && "role" in token) {
        session.user.role = token.role || "user";
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
};
