import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-white/50 text-lg mb-8">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
