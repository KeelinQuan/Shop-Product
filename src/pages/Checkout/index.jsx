import { Row, Col, Form, Input, Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductTable from "@/Components/Product/ProductTable";
import { useFetch } from "@/customHook/useFetching";
import { clearItem } from "@/redux/cart";
import { useNavigate } from "react-router-dom";
import { saveUserThunk } from "@/redux/auth/thunk";
import { addOrder } from "@/services/order";
import useNotification from "@/customhook/useNotify";
import { requiredRule } from "@/common/rules";

const Checkout = () => {
  const { contextHolder, infoNotify, errorNotify } = useNotification();
  const user = useSelector((state) => state.auth.user);
  const productList = useSelector((state) => state.cart.productList);
  const dispatch = useDispatch();
  const nav = useNavigate();
  let query = productList?.reduce((txt, item, index) => {
    return txt + `filters[id][$in][${index}]=${item.id}&`;
  }, "");

  let { data } = useFetch(`/products`, query);
  data = productList?.length ? data : [];
  let dataSource = data?.map((item) => {
    let productFinded = productList.find((product) => product?.id === item?.id);
    let quantity = 0;
    if (productFinded) {
      quantity = productFinded.quantity;
    }
    let price = Number(item?.attributes?.price);
    return {
      ...item,
      product: item?.id,
      key: item?.id,
      quantity: quantity,
      price: price,
      totalPrice: price * quantity,
    };
  });
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      address: user?.address,
      phone: user?.phone,
      customerName: user?.name,
    });
  }, [user?.address, user?.phone, user?.name]);

  const saveInfo = async () => {
    let newInfo = form.getFieldValue();
    newInfo.name = newInfo.customerName ? newInfo.customerName : newInfo.name;
    dispatch(saveUserThunk(newInfo));
  };

  const onOrder = async (values) => {
    try {
      let contact = {
        idUser: user?.id,
        address: values?.address,
        customerName: values?.customerName,
        phone: values?.phone,
      };
      let totalOrderPrice = dataSource?.reduce((total, item) => {
        return total + Number(item?.attributes?.price) * item?.quantity;
      }, 0);

      await addOrder(contact, totalOrderPrice, dataSource);
      dispatch(clearItem());
      nav("/");
      infoNotify("topRight", "Tạo đơn thành công", "Thành công");
    } catch (error) {
      console.log("error", error);
      errorNotify("topRight", "Tạo đơn thất bại", "Không thành công");
    }
  };
  return (
    <div>
      {contextHolder}
      <Row>
        <Col>
          <h3>Tài khoản: {user.username} </h3>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={24}>
          <Form
            form={form}
            onFinish={onOrder}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 800 }}
          >
            <Form.Item
              label="Tên người nhận"
              name="customerName"
              rules={[requiredRule]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address" rules={[requiredRule]}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={[requiredRule]}>
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        <Col>
          <h3>Lưu thông tin mua hàng cho lần sau</h3>
          <Button onClick={saveInfo}>Lưu</Button>
        </Col>
      </Row>
      <ProductTable
        dataSource={dataSource}
        options={{
          edit: false,
          buttonCTA: (
            <Button
              disabled={!dataSource?.length}
              onClick={() => {
                form.submit();
              }}
            >
              Đặt hàng
            </Button>
          ),
        }}
      />
    </div>
  );
};

export default Checkout;
