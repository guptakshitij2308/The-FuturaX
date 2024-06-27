import Link from "next/link.js";
import { ReservationList } from "../../_components/ReservationList.js";
import { auth } from "../../_lib/auth.js";
import { getBookings } from "../../_lib/data-service.js";

export const metadata = {
  title: "Reservations",
};

// Optimistic Ui in order to improve the perceived performance of deleting the reservation.
//  Trick to improve the perceived performance of user interface and is optimistic as we assume that a certain async operation w ill be successful before it has finished and being done in backgroud.

export default async function Page() {
  // CHANGE
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
