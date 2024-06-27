/* eslint-disable @next/next/no-img-element */
"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext.js";
import { createReservation } from "../_lib/actions.js";
import { ReserveNowBtn } from "./ReserveNowBtn.js";

function ReservationForm({ cabin, user }) {
  // We do not have access to resetRange on the server as the server does not have access to the context and state func only available on the client ; we ll be using the trick to manually call in form action
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(range.to, range.from);
  const cabinPrice = numNights * (regularPrice - discount);
  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: cabin.id,
    // userId: user.id, // here we don't need to this as we ll be getting userId directly in SA from the session
  };

  const createBookingWithData = createReservation.bind(null, bookingData); // First arguement is the new value of the this keyword and we can pass some additional arguements ; It reutrns a new func
  // Now the above is a func with new booking data. ; Now the second arguement of the above func will become the first arguement of the func we are binding.

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as </p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      {/* <p>
        {String(range.from)} to {String(range.to)}
      </p> */}

      {/* Problem is how do we pass other data to the form so that it reaches SA besides from the input elements as here we have many fields. */}
      {/* Alternative is to use the bind method ; When we call bind on a func, it sets the this keyword of the function  and allows us to pass in some other arguements into the func.  */}
      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        // action={createReservation}
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <ReserveNowBtn />
      </form>
    </div>
  );
}

export default ReservationForm;
