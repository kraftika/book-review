"use client";

import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white py-6 px-4 relative">
      <div className="mx-auto max-w-screen-lg flex items-center justify-between flex-wrap px-4">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <Link href="/" className="font-semibold text-xl tracking-tight">
            Book Review
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-800 hover:text-black hover:border-black"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full lg:flex lg:items-center lg:w-auto lg:block ${
            isOpen ? "block" : "hidden"
          } absolute lg:static top-full left-0 bg-white lg:bg-transparent z-10 w-full shadow-md lg:shadow-none`}
        >
          <div className="text-sm lg:flex-grow text-center lg:text-right p-4 lg:p-0">
            <Link
              href="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-black mr-4"
            >
              Recenzii
            </Link>
            <Link
              href="/about"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-black"
            >
              Despre mine
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
