import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, SignIn, SingOut } from "../../services/auth.service";
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

  const fetchUser = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { signIn, signOut, fetchUser };
}
