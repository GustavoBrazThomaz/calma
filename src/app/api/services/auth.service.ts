import { supabase } from "../config";
import type { Login } from "../../../domain/types/login";

export async function SignIn({ email, password }: Login) {
  try {
    const { data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    const userId = data.user?.id;
    if (!userId) {
      throw new Error("erro ao pegar o id do usuário");
    }
    window.sessionStorage.setItem("userId", userId);

    return data;
  } catch (error) {
    return error;
  }
}

export async function SingOut() {
  try {
    await supabase.auth.signOut();
    window.sessionStorage.removeItem("userId");
  } catch (error) {
    return error;
  }
}

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  if (!userId) {
    throw new Error("erro ao pegar o id do usuário");
  }
  window.sessionStorage.setItem("userId", userId);
  return data;
}
