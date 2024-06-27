// ... : catch all segment means all URLs that start with /api/auth/whatever will  be handled by this route handler

// This works bts as next auth has already created important routes so that api req can entirely be handled by nextjs
export { GET, POST } from "@/app/_lib/auth.js";
