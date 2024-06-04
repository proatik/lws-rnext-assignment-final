"use client";

import Link from "next/link";
import { useEffect } from "react";

const ErrorPage = ({ error, reset }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-full px-4 py-4 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="mx-auto max-w-max">
            <div className="container mt-5">
              <h2 className="text-4xl text-red-400">
                Oops! Something went wrong.
              </h2>

              <div className="flex gap-5 mt-5">
                <button
                  onClick={() => reset()}
                  className="px-4 py-1 my-3 text-teal-500 border border-teal-500 rounded-md bg-teal-300/10"
                >
                  Try again
                </button>
                <Link
                  href="/"
                  className="px-4 py-1 my-3 text-blue-500 border border-blue-500 rounded-md bg-blue-300/10"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default ErrorPage;
