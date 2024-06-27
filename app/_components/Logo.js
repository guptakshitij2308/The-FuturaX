import Image from "next/image.js";
import Link from "next/link.js";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      {/* First way of using images in Next Js */}
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      {/* Second way of using images in Next Js ; here we first import the image and then after nextjs analyzes the image..., it serves acc to size without us specifying heights and widths */}
      <Image
        src={logo}
        height="60"
        width="60"
        quality={100}
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The FuturaX Inn
      </span>
    </Link>
  );
}

export default Logo;

// Benefits of Image component of nextjs instead of img tag :
// 1) Automatically server correct size images in webp format.
// 2) Prevents layout shifts. ( as forces to specify widths and heights )
// 3) Lazy loading (images when they enter the viewport)
