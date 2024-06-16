"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation.js";

export default function Filter() {
  const searchParams = useSearchParams(); // we use this to get the current params
  const router = useRouter(); // this custom hook will allow to do programmatic navigation between routes in next
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    //   For applying this filter to the url, we ll be using a web api known as urlSearchParams

    // Here we need to pass the current params
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter); // this build the  url internally but it doesn't navigate to its new url
    // console.log(`${pathname}?${params.toString()}`);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // here we are going with programmatic way of going to the new url  ; but there's also a declarative way of navigating to the new url using link
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700  ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
