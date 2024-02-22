import { Row, Col, Form, Input, Button } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductTable from "../../Components/Product/ProductTable";
import { useFetch } from "@/customHook/useFetching";

const Checkout = () => {
  const user = useSelector((state) => state.auth.user);
  const productList = useSelector((state) => state.cart.productList);

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
    return {
      ...item,
      key: item?.id,
      quantity: quantity,
    };
  });

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldValue({
      address: user?.address,
      phone: user?.phone,
    });
  }, [user?.address, user?.phone]);
    console.log('>>check',user);
  const saveInfo = () => {};
  return (
    <div>
      <Row>
        <Col span={24}>
          <h3>Tài khoản: {user.username} </h3>
        </Col>

        <Col span={24}>
          <Form form={form}>
            <Form.Item label="Địa chỉ">
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại">
              <Input />
            </Form.Item>
          </Form>
        </Col>
        <Col span={24}>
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
