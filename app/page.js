import Link from "next/link.js";
import Navigation from "./components/Navigation.js";

export default function Page() {
  return (
    <div>
      {/* <Navigation /> */}
      <h1>The FuturaX Inn. Welcome to the enclave.</h1>
      <Link href="/cabins">Expore luxury cabins</Link>
    </div>
  );
}

// Optimization techniques : Prefetch all the routes linked to a certain page. Each page is downoloaded separately as a separate chunk and each page is cached for a certain amount of time
