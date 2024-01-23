import { Modal, Input, Form, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { emailRule, passwordRule } from "@/common/rules";
import { loginRedux } from "@/redux/auth";
import "@/style/modal.scss";
import useNotification from "@/customhook/useNotify";
import { login } from "@/services/auth";
import { useState } from "react";
import { LoginOutlined } from "@ant-design/icons";

const Login = () => {
  const dispatch = useDispatch();
  const { contextHolder, infoNotify, errorNotify } = useNotification();
  const [isShowModal, setIsShowModal] = useState(false);
  const handleOk = () => {
    form.submit();
    setIsShowModal(false);
  };
  const handleCancel = () => {
    setIsShowModal(false);
  };
  const onFinish = async (values) => {
    try {
      let res = await login(values);
      dispatch(loginRedux(res));
      infoNotify("topRight", "Đăng nhập thành công", "Thành công");
      setIsShowModal(false);
    } catch (error) {
      console.log(error);

      errorNotify("topRight", "Đăng nhập thất bại", "Không thành công");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    errorNotify("topRight", "Lỗi đăng nhập", error.message);
  };
  const [form] = Form.useForm();

  const showModal = () => {
    setIsShowModal(true);
  };
  return (
    <>
      {contextHolder}
      <Button icon={<LoginOutlined />} type="primary" onClick={showModal}>
        Login
      </Button>
      <Modal
        forceRender
        title={"Login-form"}
        open={isShowModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleOk} key="submit">
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="loginForm"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            identifier: "quan1234@gmail.com",
            password: "123456",
          }}
        >
          <Form.Item label="Email" name="identifier" rules={emailRule}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={passwordRule}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Login;
