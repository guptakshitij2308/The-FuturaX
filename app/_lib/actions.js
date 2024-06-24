"use server"; // only to define server actions

import { revalidatePath } from "next/cache.js";
import { auth, signIn, signOut } from "./auth.js";
import { supabase } from "./supabase.js";

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
