import { useMutation } from "@tanstack/react-query";
import { SignIn, SingOut } from "../../auth.service";
import { useNavigate } from "react-router";

export function useAuth() {
  const navigate = useNavigate();

  const signIn = useMutation({
    mutationKey: ["SignIn"],
    mutationFn: SignIn,
    onSuccess() {
      navigate("/");
    },
  });

  const signOut = useMutation({
    mutationKey: ["SignOut"],
    mutationFn: SingOut,
    onSuccess() {
      navigate("/login");
    },
  });

  return { signIn, signOut };
}
