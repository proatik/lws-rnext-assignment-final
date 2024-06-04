import Link from "next/link";

export const metadata = {
  title: "Lws Kart | 404",
};

const NotFound = () => {
  return (
    <div className="grid w-full h-screen place-items-center">
      <div className="text-center">
        <h1 className="mb-6 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-8 text-lg text-gray-600">
          Oops! Looks like you're lost.
        </p>
        <div className="animate-bounce">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        <p className="mt-4 text-gray-600">
          Let's get you back{" "}
          <Link href="/" className="text-blue-500">
            home
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;
