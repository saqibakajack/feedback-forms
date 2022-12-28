import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "@/lib/axios";

export default NextAuth({
    session: {
        jwt: true,
        secret: process.env.SESSION_SECRET,
        maxAge: 24*60*60*28
    },
    providers: [
        Credentials({
            name: "Credentials",
            authorize: async (credentials) => {
                const {data} = await axios.post('/login', credentials);
                return data;
            }
        })
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user);
            return token;
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            return session;
        },
    },
    pages: {
        signIn: "/login"
    },
});
