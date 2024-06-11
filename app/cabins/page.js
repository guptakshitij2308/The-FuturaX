import { Suspense } from "react";
import CabinList from "../_components/CabinList.js";
import Spinner from "../_components/Spinner.js";

export const metadata = {
  title: "Cabins",
};

export default function Page() {
  // we ll be moving all the data fetching into it's own component and then wrap it with a suspense boundary for a granular strategy of streaming data.
  // since the below comp did not depend on data fetching,we moved that to separate comp and then wrap it with a suspense ; convention in nextjs

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Modern Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&#39;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      {/* Loading.js file has been overwritten by this suspense boundary written here. */}
      <Suspense fallback={<Spinner />}>
        <CabinList />
      </Suspense>
    </div>
  );
}

// Each page in nextjs is a react component (react server component) that we export from a page.js file

// All the components whether a client or a server component are rendered on the server on the initial render and then sent as html to
