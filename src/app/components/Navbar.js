"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-teal-950 text-white p-4 flex justify-between">
      <Link href="/books" className="font-semibold">
        Books Read
      </Link>
      <div>
        <Link
          href="/"
          className={`mx-4 ${
            pathname === "/" ? "underline font-semibold" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/tbr"
          className={`mx-4 ${
            pathname === "/tbr" ? "underline font-semibold" : ""
          }`}
        >
          TBR List
        </Link>
      </div>
    </nav>
  );
}
