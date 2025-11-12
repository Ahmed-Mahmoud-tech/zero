import NextAuth from "next-auth";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    // user: {
    //   id?: string;
    //   email?: string;
    //   name?: string;
    //   image?: string;
    // };
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
  }
}

export const authOptions = {
  providers: [
    {
      id: "oidc",
      name: "OIDC Provider",
      type: "oauth",
      issuer: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN?.replace(
        /^https?:\/\//,
        ""
      )}`,
      clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      authorization: {
        params: {
          scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE || "openid profile email",
        },
      },
      userinfo: {
        url: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN?.replace(
          /^https?:\/\//,
          ""
        )}/userinfo`,
      },
      profile(profile: any) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }: any): Promise<Session> {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
} as const;

// Create NextAuth handler for the App Router
const handler = NextAuth(authOptions as any);

export default handler;
export { handler };
