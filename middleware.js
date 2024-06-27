// Next middleware : sits in between the incoming req and the response. Allows us to run some code on the incoming req but before the respone is completed.
// By default in nextjs, middleware runs before every route in the project, but we can specify the routes for which we want it to run using a matcher ; runs after the req,but before the route is rendered and sent back.
// Analogy :  can be it is a chunk of code that's in every page.js comp

import { NextResponse } from "next/server.js";

// Only one middleware func needs to be exported from middleware.js in the project root folder. Main func is reading cookies and incoming headers as well as set cookies as well as headers.

// Uses : Read and set cookies ; authentication and authorization ; server side analytices , redirect based on geolocation ; A/B testing
// 1) Redirect or rewrite to a route , ; 2) Can also be used to bypass a route and directly send json response to the client.

// export function middleware(req) {
//   //   console.log(req);

//   //    redirect the user ; NextResponse is a wrapper around Response
//   return NextResponse.redirect(new URL("/about", req.url));
// }

// // matcher : to avoid infinte redirects as middleware runs for every route
// export const config = {
//   matcher: ["/account"], // specify the routes for only which the middleware should run
// };

// Besides being able to get the current session , auth function also serves as a middleware.

import { auth } from "@/app/_lib/auth.js";
export const middleware = auth;

export const config = {
  matcher: ["/account"], // specify the routes for only which the middleware should run
};
