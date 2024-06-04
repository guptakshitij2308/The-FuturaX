import Logo from "./components/Logo.js";
import Navigation from "./components/Navigation.js";

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
