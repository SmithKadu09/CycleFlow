import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  pages: {
    error: "/auth/error",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true, // FIX OAuthAccountNotLinked
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true, // FIX OAuthAccountNotLinked
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },

    async redirect({ baseUrl, token }) {
      if (!token?.email) return `${baseUrl}/login`;

      const client = await clientPromise;
      const db = client.db("cycleflow");

      const existing = await db.collection("users").findOne({
        email: token.email,
      });

      if (!existing) {
        await db.collection("users").insertOne({
          email: token.email,
          name: token.name,
          image: token.picture,
          hasData: false,
        });

        return `${baseUrl}/login`;
      }

      if (existing.hasData) {
        return baseUrl;
      }

      return `${baseUrl}/login`;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
