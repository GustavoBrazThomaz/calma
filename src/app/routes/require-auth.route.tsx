import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

interface Props {
  children: ReactNode;
}

export function RequireAuth({ children }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  return children;
}
