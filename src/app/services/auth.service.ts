import { createClient } from "@supabase/supabase-js";
import type { Login } from "../../domain/types/login";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export async function SignIn({ email, password }: Login) {
  const { data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (data?.session?.access_token) {
    const token = data.session.access_token;
    window.localStorage.setItem("token", token);
    return;
  }

  throw new Error("Não autorizado");
}

export async function SingOut() {
  await supabase.auth.signOut();
  window.localStorage.removeItem("token");
}
