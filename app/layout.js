// import Logo from "./_components/Logo.js";
// import Navigation from "./_components/Navigation.js";
import Logo from "@/app/_components/Logo.js";
import Navigation from "@/app/_components/Navigation.js";

// Every next app needs to have one global layout (root layout) ; this root layout will wrap around every component
// Whatever rendered on every page is whatever returned from root layout

export const metadata = {
  title: "The FuturaX Inn",
  description: "Welcome to the enclave",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
        </header>
        <Navigation />
        <main>{children}</main>
        <footer>The FuturaX Inn</footer>
      </body>
    </html>
  );
}

// Why react server components ? : UI is a function of both state and data.

// What are react server components ? : Server is an integral part of the react component tree. It is the name of this new paradim and the component type is server component.
// The work of server components is to make the ui a function of the data. (No interactivity as they run only in the server ; requires zero js) ; RSC requires to be implemented by a frameowrk.

// Client components responsible for interactivity where the ui is still a function of the state.
//
// Server components become the default ones in the application unless told that it is a client component using use client directive at the top of the module.

// Server client boundary : Mark the split point between the code that runs on the server and the code that runs on the client. use client is to create client server boundaries which creates client sub trees.

// Only client components can use state and hooks whereas server components can't have states.Lifting state up also in client comp.
// Props can be passed in both (must be serializable in server components.E.g. no functions and classes).
// Data fetching in server comp.
// Client comp can only import client comp wherease server comp can import both.
// But client comp can render server comp as long as they have been passed as props.

// Client comp re rendered whenever the state changes whereas server components are re rendered whenever the url changes (navigation) as server comp are typed to specific routes.
// Pages already need to be server components.
