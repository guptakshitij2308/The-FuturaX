import SelectCountry from "../../_components/SelectCountry.js";
import UpdateProfileForm from "../../_components/UpdateProfileForm.js";
import { auth } from "../../_lib/auth.js";
import { getGuest } from "../../_lib/data-service.js";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session?.user?.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      {/* Here the problem is we are calling a server component inside a client component. We get an error as our code is trying to run supabase create client on the client where the .env variables are not available  */}
      {/* Here this will work now as a component instance of this server component is already being created. Now this becomes a react element and it is being passed which works . */}
      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />{" "}
      </UpdateProfileForm>
    </div>
  );
}
