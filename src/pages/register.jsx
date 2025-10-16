import { useState } from "react";
import { Button, Card, Form, Input, Upload, Typography, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  UploadOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("✅ Register data:", { ...values });
    setLoading(true);
    try {
      // 🚀 Giả lập API đăng ký
      await new Promise((resolve) => setTimeout(resolve, 1500));
      message.success("Register success! 🎉");
      form.resetFields();
      setAvatar(null);
    } catch (error) {
      message.error("Register failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: 420,
          padding: "30px 25px",
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 25 }}>
          <UserOutlined style={{ fontSize: 40, color: "#1890ff" }} />
          <Title level={3} style={{ marginTop: 10, marginBottom: 5 }}>
            Create Account ✨
          </Title>
          <Text type="secondary">Join us and start exploring!</Text>
        </div>

        <Form
          form={form}
          name="registerForm"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#1890ff" }} />}
              placeholder="Enter your full name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#1890ff" }} />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#1890ff" }} />}
              placeholder="Enter your password"
              size="large"
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone twoToneColor="#1890ff" />
                ) : (
                  <EyeInvisibleOutlined />
                )
              }
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number!" },
            ]}
          >
            <Input
              prefix={<PhoneOutlined style={{ color: "#1890ff" }} />}
              placeholder="Enter your phone number"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              style={{
                borderRadius: 8,
                background: "linear-gradient(90deg, #1890ff, #40a9ff)",
                boxShadow: "0 4px 10px rgba(24,144,255,0.3)",
                fontWeight: 500,
              }}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
