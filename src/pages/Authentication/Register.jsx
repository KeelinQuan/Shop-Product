import { Button, Form, Input, Modal } from "antd";
import {
  usernameRule,
  emailRule,
  passwordRule,
  rePasswordRule,
} from "@/common/rules";
import { register } from "@/services/auth";
import useNotification from "@/customHook/useNotify";
import "@/style/modal.scss";
import { useState } from "react";

const Register = () => {
  const { contextHolder, infoNotify, errorNotify } = useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish = async (values) => {
    try {
      await register(values);
      infoNotify("topRight", "Thành Công", "Bạn đã tạo thành công!");
      setIsModalOpen(false);
    } catch ({ response }) {
      var { error } = response.data;
      errorNotify("topRight", "Lỗi đăng kí", error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    errorNotify("topRight", "Lỗi đăng kí", "Không thành công");
  };
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
     
<a  onClick={showModal}>Đăng kí</a>
      <Modal
        forceRender
        form={form}
        title={"Register-form"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type="dashed" onClick={handleOk} key="register">
            Đăng kí
          </Button>,
          <Button onClick={handleOk} key="login">
            Đăng nhập
          </Button>,
        ]}
      >
        {contextHolder}
        <Form
          name="registerForm"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Username" name="username" rules={usernameRule}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={emailRule}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={passwordRule}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Re-assword"
            name="rePassword"
            rules={rePasswordRule}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Register;
