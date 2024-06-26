"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../_lib/actions.js";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini.js";

function DeleteReservation({ bookingId }) {
  // function deleteReservation() {
  //   "use server"
  //   // SA to delete a reservation
  // }
  // Whenever we do some server action , to reflect the result of the SA to the UI , we don't need any state , instead we revalidate the cache to re fetch the data.

  // useTransition : Allows us to mark a state update as a so called transition and when a state update is marked as a transition,it will do so without blocking the ui ;
  // It can be used to mark a SA as a transition ; isPending : bool , startTransition: func
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => deleteReservation(bookingId));
    // bts this works because next is using suspense boundaries for all of this. All navigations in next are automatically wrapped into a transition hence this works
  }

  return (
    <button
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      // onClick={() => deleteReservation(bookingId)}
      onClick={handleDelete}
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;

// Optimistic Ui in order to improve the perceived performance of deleting the reservation.
//  Trick to improve the perceived performance of user interface and is optimistic as we assume that a certain async operation will be successful before it has finished and being done in backgroud.
