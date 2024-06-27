// api endpoint for affiliates for getting details of a cabin and booking passed as a param

import {
  getBookedDatesByCabinId,
  getCabin,
} from "../../../_lib/data-service.js";

export async function GET(request, { params }) {
  // console.log(request);
  // console.log(params);
  // fetch data about this cabin and get booked dates ; helpful as we don't have to expose supabase api endpoint plus no .env exposed and aggregate data
  const { cabinId } = params;
  // console.log(cabinId);
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch (err) {
    return Response.json({ message: "Cabin not found." });
  }

  // return Response.json({ id: params.cabinId });
}
