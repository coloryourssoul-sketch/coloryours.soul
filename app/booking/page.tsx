"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const year = 2026;
const month = 6; // July เพราะ Jan = 0
const monthName = "JULY 2026";

const times = ["09:30", "12:30", "15:30"];
const daysInMonth = new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = new Date(year, month, 1).getDay();
const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

type Slot = {
  id: number;
  date: string;
  time: string;
  is_booked: boolean;
};

export default function BookingPage() {
  const [slots, setSlots] = useState<Slot[]>([]);

  async function fetchSlots() {
    const { data } = await supabase.from("slots").select("*");
    setSlots(data || []);
  }

  useEffect(() => {
    fetchSlots();
  }, []);

  function getDateString(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function checkBooked(day: number, time: string) {
    const date = getDateString(day);
    const slot = slots.find((item) => item.date === date && item.time === time);
    return slot?.is_booked || false;
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl tracking-[0.3em]">COLOR YOURS SOUL</h1>
        <a href="/" className="rounded-full border px-5 py-2 text-sm">
          HOME
        </a>
      </header>

      <section className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-4xl font-light tracking-widest">
          {monthName}
        </h2>

        <div className="mb-6 flex gap-6 text-sm">
          <span>🟢 Available</span>
          <span>🔴 Booked</span>
        </div>

        <div className="grid grid-cols-7 overflow-hidden rounded-3xl border">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <div
              key={day}
              className="border-b p-4 text-center text-gray-400 tracking-widest"
            >
              {day}
            </div>
          ))}

          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="min-h-36 border bg-white" />
          ))}

          {days.map((day) => (
            <div key={day} className="min-h-36 border p-3">
              <div className="mb-3 text-sm text-gray-600">{day}</div>

              <div className="space-y-2">
                {times.map((time) => {
                  const isBooked = checkBooked(day, time);

                  return isBooked ? (
                    <div
                      key={time}
                      className="rounded-lg bg-rose-100 px-2 py-1 text-center text-sm text-rose-500 line-through"
                    >
                      {time}
                    </div>
                  ) : (
                    <a
                      key={time}
                      href="https://lin.ee/uSyQioK"
                      target="_blank"
                      className="block rounded-lg bg-emerald-100 px-2 py-1 text-center text-sm text-emerald-700 hover:bg-emerald-200"
                    >
                      {time}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}