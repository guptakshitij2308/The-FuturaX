import { createClient } from "@supabase/supabase-js";

// NextJs comes with built in support for environment variables. ; By default these env variables will not leak to the browser and they are only available inside the environment in which the app is running.
// However we can make it public (allowed by NextJs) ; we can do that by prefixing the variable name with NEXT_PUBIC_VAR_NAME
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
