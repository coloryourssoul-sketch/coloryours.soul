"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const year = 2026;
const month = 6;
const monthName = "July 2026";

const times = ["09:30", "12:30", "15:30"];
const daysInMonth = new Date(year, month + 1, 0).getDate();
const firstDayOfMonth = new Date(year, month, 1).getDay();
const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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
    <main className="min-h-screen bg-white px-4 py-10 sm:px-8 sm:py-10">
      <header className="mx-auto mt-6 mb-10 flex max-w-6xl items-center justify-between gap-3">
        <h1 className="text-sm font-light tracking-[0.14em] sm:text-2xl sm:tracking-[0.3em]">
          COLOR YOURS SOUL
        </h1>

        <div className="flex items-center gap-6 sm:gap-8">
          <div className="text-xs text-gray-400">EN | TH</div>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-black px-8 py-2 text-sm tracking-wide transition-all duration-300 hover:bg-black hover:text-white"
          >
            HOME
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl">
        <div className="mb-8 text-center sm:text-left">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-400">
            Booking Calendar
          </p>

          <h2 className="text-3xl font-light tracking-[0.12em] sm:text-5xl sm:tracking-[0.25em]">
            {monthName}
          </h2>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "center",
              gap: "48px",
              fontSize: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span>🟢</span>
              <span>Available</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span>🔴</span>
              <span>Booked</span>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-x-auto pb-4">
  <div className="grid min-w-[980px] grid-cols-7 overflow-hidden rounded-3xl border border-gray-200">
            {weekDays.map((day) => (
              <div
                key={day}
                className="border-b border-gray-200 p-4 text-center text-sm tracking-[0.25em] text-gray-400"
              >
                {day}
              </div>
            ))}

            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="min-h-36 border border-gray-100 bg-white"
              />
            ))}

            {days.map((day) => (
              <div key={day} className="min-h-36 border border-gray-100 p-3">
                <div className="mb-3 text-sm text-gray-500">{day}</div>

                <div className="space-y-5">
                  {times.map((time) => {
                    const isBooked = checkBooked(day, time);

                    return isBooked ? (
                      <div
                        key={time}
                        style={{
                          backgroundColor: "#FFE1E6",
                          color: "#E11D48",
                            borderRadius: "10px",
                            width: "84px",
                            margin: "0 auto",
                            padding: "6px 0",
                            textAlign: "center",
                            textDecoration: "line-through",
                            fontSize: "14px",
                            fontWeight: 500,
                        }}
                      >
                        {time}
                      </div>
                    ) : (
                      <a
                        key={time}
                        href="https://lin.ee/uSyQioK"
                        target="_blank"
                        style={{
                          display: "block",
                          backgroundColor: "#CFFAE2",
                          color: "#047857",
                          borderRadius: "10px",
                            width: "84px",
                            margin: "0 auto",
                            padding: "6px 0",
                          textAlign: "center",
                         textDecoration: "none",
                         fontSize: "14px",
                         fontWeight: 500,
                        }}
                      >
                        {time}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}