import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service.js";
import DateSelector from "./DateSelector.js";
import ReservationForm from "./ReservationForm.js";

export default async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    await getSettings(),
    await getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      {/* Ideally client components should only be passed minimal amount of data */}
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
