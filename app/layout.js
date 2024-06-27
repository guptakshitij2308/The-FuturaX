// import Logo from "./_components/Logo.js";
// import Navigation from "./_components/Navigation.js";
import Logo from "@/app/_components/Logo.js";
import Navigation from "@/app/_components/Navigation.js";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google"; // we are importing a function
import Header from "./_components/Header.js";
import { ReservationProvider } from "./_components/ReservationContext.js";

const josefin = Josefin_Sans({
  subsets: ["latin"], // set of characters
  display: "swap", // first displayed in default font and then swapped
});

// console.log(josefin);

// Every next app needs to have one global layout (root layout) ; this root layout will wrap around every component
// Whatever rendered on every page is whatever returned from root layout

// We can either export this metadata from a layout or export metadata from different files (pages) which will overwrite this metadata
export const metadata = {
  // title: "The FuturaX Inn",
  title: {
    template: "%s | The FuturaX Inn",
    default: "Welcome | The FuturaX Inn",
  },
  description:
    "Welcome to The Enclave: Where luxury meets comfort, offering an exquisite escape with top-notch amenities and unparalleled service for discerning travelers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 antialiased text-primary-100 min-h-screen ${josefin.className} flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            {/* Here ReservationProvider is a client component but children is a server component. but there is no problem as children might already have been rendered on the server and are being passed as elements. */}
            {/* Now all the client components and only client comp will be able to use the custom hook exported. */}
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
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
