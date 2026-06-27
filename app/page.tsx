
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
<h1 className="px-6 text-center text-3xl sm:text-5xl font-light tracking-[0.18em] sm:tracking-[0.3em] leading-tight">
  COLOR YOURS SOUL
</h1>

<p className="mt-6 px-6 text-center text-base sm:text-lg text-gray-500">
  Personal Color Analysis & Image Consulting
</p>

<p className="mt-4 max-w-lg px-8 text-center text-sm sm:text-base text-gray-400 leading-relaxed">
  Discover the colors that bring out your natural beauty and confidence. ✨
</p>

<Link
  href="/booking"
  className="mt-10 rounded-full border border-black px-8 py-3 hover:bg-black hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm hover:shadow-lg"
>
  BOOKING
</Link>
    </main>
  );
}