import { supabase } from "../config";
import type { Login } from "../../../domain/types/login";

export async function SignIn({ email, password }: Login) {
  try {
    const { data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return data;
  } catch (error) {
    return error;
  }
}

export async function SingOut() {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    return error;
  }
}

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data;
}
