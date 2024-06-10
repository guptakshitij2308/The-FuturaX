import Spinner from "@/app/_components/Spinner.js";

// Having loading.js file will activate streaming ( streaming is activated it means that js is required to be enabled in the browser )
// But this is not ideal as we want more granular control over what part of the page we want our loading indicator (only for the things which are being fetched not static content)

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabins...</p>
    </div>
  );
}
