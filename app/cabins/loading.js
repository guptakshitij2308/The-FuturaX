import Spinner from "@/app/_components/Spinner.js";

// Having loading.js file will activate streaming ( streaming is activated it means that js is required to be enabled in the browser )
// But this is not ideal as we want more granular control over what part of the page we want our loading indicator (only for the things which are being fetched not static content)

// Suspense : built in react component which we can use to isolate components that are not ready to be rendered yett (because of async work) => suspending.
// it is like a catch block in a try catch block where it catches the components which are suspending ( 1) fetching dta , 2) Loading code (lazy loading) ).

// But we need to use a data fetching library that supports react suspense. What we do is wrap the suspending component into a suspense component.Hence implementing async operations in a declarative way without isLoading states.
// Whenever using render logic react finds a comp which is suspending,it will move back to the suspense parent(boundary) and discard rendered children and show fallback comp till async ops completed.

// Components do not automatically suspend just because an async operation is happening inside them. Integrating async ops with suspense is hard due to which we use libraries.

// Difference between fiber tree and dom tree(comp tree or virtual DOM) is that fiber tree is mutable and never destroyed which makes it possible to store hooks and states and also concurrent features which allows react to pause rendering with suspense.
// The fact that suspense children are hidden and always remain in the fibre tree, all the state in the sub tree is preserved during subsequent suspending.

// Fallback will not be shown again if the suspense trigger is wrapped in a transition(startTranisition) [nextjs page navigations as they all are wrapped in transitions]. We can reset the suspense boundary with a unique key prop.
// For example if a component re fetches data due to a navigation by the user,suspense won't be shown but can be reset using key prop (fallback won't be rendered again).

// How does a suspense boundary know that a child comp is suspending ? : bts a component throws a promise which will cause the suspense boundary to render the fallback.

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}
