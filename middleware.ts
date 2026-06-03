import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {                               // runs if callback returns true(user is logged in)
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,                  //checks if token is valid
    },
    pages: {                                               // redirects user to page if callback returns false(user not logged in)
      signIn: "/signin",
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
