import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mb-10 px-4 text-center text-gray-500">
      <small className="mb-2 block text-xs">
        &copy; {new Date().getFullYear()} | Baran Özdemir. This is an open
        source project.{" "}
        <Link
          className="underline text-black font-semibold dark:text-gray-400"
          href="https://github.com/baranozdemir1"
        >
          Clone
        </Link>
      </small>
      <p className="text-xs">
        <span className="font-semibold dark:text-gray-400">
          About this website:
        </span>{" "}
        built with React & Next.js (App Router & Server Actions), TypeScript,
        Tailwind CSS, Framer Motion, React Email & Resend, Vercel hosting.
      </p>
    </footer>
  );
}
