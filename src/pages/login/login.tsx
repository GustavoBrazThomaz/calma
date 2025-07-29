import {
  Avatar,
  Button,
  Card,
  Flex,
  Form,
  Input,
  Layout,
  Typography,
} from "antd";
import type { Login } from "../../domain/types/login";
import { useAuth } from "../../app/api/hooks/auth/use-auth";

export function Login() {
  const [formInstance] = Form.useForm<Login>();
  const { signIn } = useAuth();

  function handleSubmit(form: Login) {
    signIn.mutate(form);
  }

  return (
    <Layout>
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Card style={{ width: "350px" }}>
          <Flex gap="small" style={{ paddingBottom: "1rem" }}>
            <Avatar
              size={48}
              src="/calma.png"
              shape="square"
              style={{
                marginTop: "0",
              }}
            />

            <Typography.Title level={3} style={{ paddingTop: "0.8rem" }}>
              Calma
            </Typography.Title>
          </Flex>

          <Form<Login>
            form={formInstance}
            clearOnDestroy={true}
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<Login>
              label="Email"
              name="email"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="exemplo@email.com"
                type="email"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item<Login>
              label="Senha"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="*********" />
            </Form.Item>

            <Button
              type="primary"
              variant="solid"
              color="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Entrar
            </Button>
          </Form>
        </Card>
      </Flex>
    </Layout>
  );
}
