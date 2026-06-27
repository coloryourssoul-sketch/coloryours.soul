"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const times = ["09:30", "12:30", "15:30"];

type Slot = {
  id: number;
  date: string;
  time: string;
  is_booked: boolean;
};

export default function AdminPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [slots, setSlots] = useState<Slot[]>([]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentMonth);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  async function fetchSlots() {
    const monthNumber = String(month + 1).padStart(2, "0");
    const startDate = `${year}-${monthNumber}-01`;
    const endDate = `${year}-${monthNumber}-${String(daysInMonth).padStart(
      2,
      "0"
    )}`;

    const { data } = await supabase
      .from("slots")
      .select("*")
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    setSlots(data || []);
  }

  useEffect(() => {
    fetchSlots();
  }, [currentMonth]);

  function getDateString(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  }

  async function toggleSlot(day: number, time: string) {
    const date = getDateString(day);
    const slot = slots.find((item) => item.date === date && item.time === time);

    if (!slot) {
      const { data, error } = await supabase
        .from("slots")
        .insert([{ date, time, is_booked: true }])
        .select()
        .single();

      if (error) {
        alert(error.message);
        return;
      }

      if (data) {
        setSlots([...slots, data]);
      }

      return;
    }

    const { data, error } = await supabase
      .from("slots")
      .update({ is_booked: !slot.is_booked })
      .eq("id", slot.id)
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    if (data) {
      setSlots(slots.map((item) => (item.id === data.id ? data : item)));
    }
  }

  function checkBooked(day: number, time: string) {
    const date = getDateString(day);
    const slot = slots.find((item) => item.date === date && item.time === time);

    return slot?.is_booked || false;
  }

  function goToPreviousMonth() {
    setCurrentMonth(new Date(year, month - 1, 1));
  }

  function goToNextMonth() {
    setCurrentMonth(new Date(year, month + 1, 1));
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl tracking-[0.3em]">ADMIN</h1>

        <a href="/booking" className="rounded-full border px-5 py-2 text-sm">
          VIEW BOOKING
        </a>
      </header>

      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            onClick={goToPreviousMonth}
            className="rounded-full border px-5 py-2 text-sm"
          >
            ← Previous
          </button>

          <h2 className="text-center text-4xl font-light tracking-widest">
            {monthName.toUpperCase()}
          </h2>

          <button
            onClick={goToNextMonth}
            className="rounded-full border px-5 py-2 text-sm"
          >
            Next →
          </button>
        </div>

        <p className="mb-6 text-gray-500">
          คลิกที่เวลาเพื่อเปลี่ยนสถานะ ว่าง / ไม่ว่าง
        </p>

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

                  return (
                    <button
                      key={time}
                      onClick={() => toggleSlot(day, time)}
                      className={`w-full rounded-lg px-2 py-1 text-sm ${
                        isBooked
                          ? "bg-rose-100 text-rose-500 line-through"
                          : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                      }`}
                    >
                      {time}
                    </button>
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