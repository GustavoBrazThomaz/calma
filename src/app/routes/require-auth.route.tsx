import { Flex, Spin } from "antd";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../api/hooks/auth/use-auth";

interface Props {
  children: ReactNode;
}

export function RequireAuth({ children }: Props) {
  const navigate = useNavigate();
  const {
    fetchUser: { isLoading, data },
  } = useAuth();

  useEffect(() => {
    if (!isLoading && data?.user === null) {
      navigate("/login");
    }
  }, [isLoading]);

  if (isLoading)
    return (
      <Flex
        align="center"
        justify="center"
        style={{ width: "100%", height: "100%" }}
      >
        <Spin size="large" />
      </Flex>
    );

  return children;
}
