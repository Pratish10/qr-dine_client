"use client";
import clsx from "clsx";
import React from "react";
import { SearchInput } from "./search-input";
import useScroll from "@/hooks/useScroll";
import { ThemeSelect } from "./theme-select";
import Link from "next/link";

export const Navbar = (): React.JSX.Element => {
  const size = useScroll();
  return (
    <nav
      className={clsx(
        "flex items-center h-14 fixed top-0 left-0 w-full z-10",
        size.scrollY > 100 &&
          "dark:bg-black bg-white border-b-2 dark:border-b-gray-600"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href={"/"} className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-green-600"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </svg>
          <span className="font-bold">QR Dine</span>
        </Link>
        <div>
          <SearchInput />
        </div>
        <ThemeSelect />
      </div>
    </nav>
  );
};
