// Building api endpoints from nextjs using route handlers :
//  done by creating a route.js in any folder which does not have page.js as when a req is sent to the route handler , no html is returned instead the route handlers will be executed and returns json
// Not that important in app router as we have server actions to mutate data ( was important in pages router.)
// this can export one or more func corresponding to http verbs
export async function GET() {
  return Response.json({ test: "test" }); // Response is not a nextjs feature but a web standard implemented in browsers.
}

// export async function POST() {}
