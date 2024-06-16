import CabinCard from "@/app/_components/CabinCard.js";
import { getCabins } from "../_lib/data-service.js";
// import { unstable_noStore as noStore } from "next/cache.js";

export default async function CabinList({ filter }) {
  // noStore(); // revalidation at component level ; opting out one of the components of route of the data cache will make the entire page dynamic and opt out of the data cache.
  const cabins = await getCabins();
  // console.log(cabins);

  let filteredCabins;

  if (filter === "all") filteredCabins = cabins;
  else if (filter === "small")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity < 4);
  else if (filter === "medium")
    filteredCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity < 8
    );
  else if (filter === "large")
    filteredCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
