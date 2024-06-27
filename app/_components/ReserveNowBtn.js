"use client";
import { useFormStatus } from "react-dom";

export function ReserveNowBtn() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-end items-center gap-6">
      <p className="text-primary-300 text-base">Start by selecting dates</p>

      <button
        className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        disabled={pending}
      >
        {!pending ? "Reserve now" : "Reserving..."}
      </button>
    </div>
  );
}
