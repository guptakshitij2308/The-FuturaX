"use client";

import { deleteReservation } from "../_lib/actions.js";
import ReservationCard from "./ReservationCard.js";
import { useOptimistic } from "react";

export function ReservationList({ bookings }) {
  // We need to think now about two types of states : actual state and optimistic state
  // First we pass the current state in the beginning , and this will be returned at the start when no async tasks are being done and no SA is pending. Second is update function.
  // We will be using optimistic delete to instantly delete the booking from the UI as soon as the delete is clicked.
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    // takes in the current state and whatever we pass in optimisticDelete func (the value which helps us determine the next optimistic state)
    (currentBookings, bookingId) => {
      // Here we should manually determine the optimistic state
      return currentBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {/* {bookings.map((booking) => ( */}
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
