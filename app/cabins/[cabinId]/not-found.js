import Link from "next/link.js";

// In nextjs, not found page can be shown in 2 ways : default way in which url does not exist and manually by triggering to call the not found function.

export default function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This cabin could not be found :(
        <br />
        Please try for a different one.
      </h1>
      <Link
        href="/cabins"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Back to all cabins
      </Link>
    </main>
  );
}
