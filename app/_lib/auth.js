import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service.js";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // Once the request hits /account route , authorized callback will be called
  callbacks: {
    // if it returns true , the current user is allowed to go to the route which we have protected
    authorized({ auth, request }) {
      // auth is the current session
      return !!auth?.user; // trick to convert anything to boolean
    },
    // This callback runs before the actual sign in process happens (like a middleware here)
    async signIn({ user, account, profile }) {
      try {
        // console.log(user);
        const existingUser = await getGuest(user.email);
        if (!existingUser)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    // Everywhere we are going to need the guest Id so CRUD on reservations and bookings
    // This callback runs after the signin callback and runs each time after the session is checked out. (whenever we call the auth func)
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
