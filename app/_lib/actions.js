"use server"; // only to define server actions

import { revalidatePath } from "next/cache.js";
import { auth, signIn, signOut } from "./auth.js";
import { supabase } from "./supabase.js";
import { getBookings } from "./data-service.js";
import { redirect } from "next/navigation.js";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// As we are now completely on the backend , we need to check if the user invoking the action is authorized or not.
export async function updateGuest(formData) {
  // console.log(formData);
  const session = await auth();
  if (!session)
    // in SA instead of try catch blocks , we must throw errors and they are caught by the closest error boundaries.
    throw new Error("You must be logged in.");

  const nationalityData = formData.get("nationality");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = nationalityData?.split("%");
  // console.log(nationalID, country, countryFlag);
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Invalid national ID");
  }
  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };

  // console.log(updateData);

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);
  // .select()
  // .single();

  revalidatePath("/account/profile");

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are unauthorized to delete this booking.");
  }

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
  return data;
}

export async function updateReservation(formData) {
  // Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  // Authroization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => String(booking.id));
  const reservationId = formData.get("reservationId");
  // console.log(
  //   reservationId,
  //   guestBookingIds,
  //   guestBookingIds.includes(reservationId)
  // );
  // console.log(typeof reservationId, typeof guestBookingIds[0]);

  if (!guestBookingIds.includes(reservationId)) {
    throw new Error("You are unauthorized to update this booking.");
  }
  // console.log(formData);
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const updatedFields = { numGuests, observations };

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", Number(reservationId))
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  // Cache revalidation should always be done before redirecting
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  revalidatePath(`/account/reservations`);
  redirect("/account/reservations");
  return data;
}
