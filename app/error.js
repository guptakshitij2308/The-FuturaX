"use client";

// As error boundary needs always be a client component. (global error boundary ; will wrap the entire app in a react boundary)
// we can also have nested error boundaries. this happens for all errors and excecptions anywhere in the app but only in rendering.
// Errors in callback func will not be caught by a react error boundary.

// this function gets access to error object and a function to reset the error boundary by clicking. Also it does not catch errors which happen in the root layout.(for that we need to have a file global-error.js)
export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
