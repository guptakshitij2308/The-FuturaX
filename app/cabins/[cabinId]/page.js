// The dynamic part of the url will be filled at runtime(request) or can be prerendered.

// Any page or even a layout gets access to params as a props and it is same as exactly the name which we gave to the folder.

import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { getCabin, getCabins } from "../../_lib/data-service.js";
import Image from "next/image.js";
import TextExpander from "../../_components/TextExpander.js";

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
  const cabin = await getCabin(params.cabinId);

  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  // console.log(params);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            fill
            className="object-cover"
            src={image}
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
