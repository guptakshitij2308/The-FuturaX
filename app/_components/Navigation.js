/* eslint-disable @next/next/no-img-element */
import Link from "next/link.js";
import { auth } from "../_lib/auth.js";

export default async function Navigation() {
  // Whenever we do authentication in a component,it will make the entire route dynamic (as this func works with cookies and headers)
  // Since we are calling this auth func in the layout , which is a part of every route, our entire pages will become dynamic
  const session = await auth();
  // console.log(session);
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

// There is a convention in next js. To make a route opt out of the router, we can use an _ before its name so that it remains as a private component
