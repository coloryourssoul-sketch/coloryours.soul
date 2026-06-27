
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-5xl font-light tracking-[0.3em]">
        COLOR YOURS SOUL
      </h1>

<p className="mt-6 text-gray-500 text-lg">
  Personal Color Analysis & Image Consulting
</p>

<p className="mt-4 max-w-md text-center text-gray-400">
  Discover the colors that bring out your natural beauty and confidence.✨
</p>

      <Link
        href="/booking"
        className="mt-10 rounded-full border border-black px-8 py-3 hover:bg-black hover:text-white transition"
      >
        BOOKING
      </Link>
    </main>
  );
}