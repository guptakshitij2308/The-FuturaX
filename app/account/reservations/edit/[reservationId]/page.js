import { UpdateReservationButton } from "../../../../_components/UpdateReservationButton.js";
import { updateReservation } from "../../../../_lib/actions.js";
import { getBooking, getCabin } from "../../../../_lib/data-service.js";

export default async function Page({ params }) {
  // CHANGE
  const { reservationId } = params;
  const { numGuests, observations, cabinId } = await getBooking(reservationId);
  const cabin = await getCabin(cabinId);
  //   console.log(reservation);
  const { maxCapacity } = cabin;
  // console.log(cabin);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateReservation}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={numGuests}
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
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={observations}
          />
        </div>
        {/* This is necessary as the server actions do not get access to the url and params like the server components do. */}
        <input type="hidden" name="reservationId" value={reservationId} />

        <UpdateReservationButton />
      </form>
    </div>
  );
}
