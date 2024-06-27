/* eslint-disable @next/next/no-img-element */
import { signInAction } from "../_lib/actions.js";

function SignInButton() {
  return (
    // As we can not have interactivity in a server component and we are keeping our authentication flow entirely on the server for better experience,
    //  hence we need to create server actions which allow us to add interactivity to server components,usually to forms for data mutations. ; in the action prop we need to pass the server action
    // Main react hooks in server actions : useFormStatus , useTransition and useOptimistic
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
