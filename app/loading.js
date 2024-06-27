import Spinner from "@/app/_components/Spinner.js";

// This is global loading indicator ; we can have specific loading.js also for the routes which we want that in the same way as we have layout.js

export default function Loading() {
  return <Spinner />;
}

// Done using render to readable streams ( concept of loading applied using streams in NextJs ; requires js to be enabled in browser )
// loading using these will work for all the subroutes no matter the nesting level

// We can have streaming for entire page using suspense ;

// RSC and SSR are two separate technologies. ; RSC does not replacec SSR but in fact it does compliement it. They work together and frameworks combine them.d
// Both client and server components are initially rendered on the server when SSR is used.
