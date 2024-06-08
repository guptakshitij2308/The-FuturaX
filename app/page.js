import Image from "next/image.js";
import Link from "next/link.js";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <div>
      <main className="mt-24">
        <Image
          src={bg}
          fill
          className="object-cover object-top"
          placeholder="blur"
          quality={80}
          alt="Mountains and forests with two cabins"
        />

        <div className="relative z-10 text-center">
          <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
            Welcome to the enclave.
          </h1>
          <Link
            href="/cabins"
            className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Explore luxury cabins
          </Link>
        </div>
      </main>
    </div>
  );
}

// Optimization techniques : Prefetch all the routes linked to a certain page. Each page is downoloaded separately as a separate chunk and each page is cached for a certain amount of time
