// The dynamic part of the url will be filled at runtime(request) or can be prerendered.

// Any page or even a layout gets access to params as a props and it is same as exactly the name which we gave to the folder.

import { Suspense } from "react";
import Cabin from "../../_components/Cabin.js";
import Reservation from "../../_components/Reservation.js";
import Spinner from "../../_components/Spinner.js";
import { getCabin, getCabins } from "../../_lib/data-service.js";

// Instead of exporting this function for metadata,we can generate metadata directly using generateMetadata function.
// export const metadata = {
//   title: "Cabin"
// }

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);

  const { name } = cabin;

  return { title: `Cabin ${name}` };
}

// We use this to let nextJs about all the possible values of a dynamic url segment.(to export the pages as static pages)
// We know about the possible set of ids here ; so we need a way to tell next about these for SSG
// If we attempt to SSG while having some dynamic routes,then we will be getting error while attempting to do this.
// But by doing SSG, everything works as a single page app except the images which we optimized using Next Image comp as they were optimized bts by vercel on their image optimization api.

// But the problem here is most pages don't need to be 100% static or 100% dynamic but a mix of these two.
// Partial Pre Rendering : A new strategy that combines static and dynamic rendering in the same route.
// A full static page is served from the CDN which is super fast,which makes initial loading super fast and it is called a shell as it leaves in some holes for the dynamic content. The slower dynamic content is streamed in as it's rendered on the server. => even faster pages that can mostly be delivered from the edge(CDN)
export async function generateStaticParams() {
  const cabins = await getCabins();

  // console.log(cabins);

  const ids = cabins.map((cabin) => {
    // console.log(cabin.id);
    return {
      cabinId: String(cabin.id),
    };
  });

  // console.log(ids);

  return ids;
}

export default async function Page({ params }) {
  // The problem with below code is that it creates a blocking waterfall.(we re fetching multiple pieces of data that do not depend on each other but are blocking each other)
  // const cabin = await getCabin(params.cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  // This is also not ideal as we can do is to fetch all the data in separate components and stream them when they get ready.
  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(params.cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(params.cabinId),
  // ]);

  const cabin = await getCabin(params.cabinId);

  // console.log(params);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
