import React, { useEffect, useState } from "react";
import "./style.css";
import Cookies from "js-cookie";
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Radio,
  DatePicker,
  Button,
  Avatar,
  Spin,
  notification,
  Typography,
  Modal,
} from "antd";
import moment from "moment";
import Moment from "react-moment";
import {
  KeyOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
  InfoCircleFilled,
} from "@ant-design/icons";
import { keyp } from "../../../config/keyp";
import userApi from "../../../api/userApi";
function ChangePass(props) {
  const [isgglg, setisgglg] = useState(false);
  const [pwc, setpwc] = useState("");
  const [token, settoken] = useState("");
  const [newpass, setnewpass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onlogout = () => {
    Cookies.remove("tokenCustomer");
    // Cookies.remove
    props.history.push("/");
    window.location.reload();
  };
  const [checkpass, setcheckpass] = useState({
    currentpass: false,
    repeatpass: false,
  });
  const handleCancel = () => {
    setIsModalVisible(false);
    onlogout();
  };
  const onFinish = (value) => {
    console.log(">>Value", value);
    const datapass = { password: value.password };
    console.log(">>datapass", datapass);
    const fetchCreateProduct = async (values) => {
      setIsLoading(true);
      try {
        const datachap = { token: token, data: values };
        const response = await userApi.changePass(datachap);
        let pwcg = `${keyp}${values.password}`;
        Cookies.set("yassuozed", pwcg);

        console.log("response: ", response);
        setIsLoading(false);
        showModal();
      } catch (error) {
        setIsLoading(false);
        notification.open({
          message: "Đổi mật khẩu thất bại",
          description: "Có vấn đề khi đổi mật khẩu",
          icon: <InfoCircleFilled style={{ color: "red" }} />,
          placement: "bottomRight",
        });
      }
    };
    fetchCreateProduct(datapass);
  };
  const handlecheckrepass = (e) => {
    const { value } = e.target;
    setisinput({ ...checkpass, repeatpass: true });
    if (newpass === value) setcheckpass({ ...checkpass, repeatpass: true });
    else setcheckpass({ ...checkpass, repeatpass: false });
  };
  const handlecheckpass = (e) => {
    const { value } = e.target;
    setisinput({ ...checkpass, currentpass: true });
    if (pwc === value) setcheckpass({ ...checkpass, currentpass: true });
    else setcheckpass({ ...checkpass, currentpass: false });
  };
  const [isinput, setisinput] = useState({
    currentpass: false,
    repeatpass: false,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    onlogout();
  };
  useEffect(() => {
    const ilgg = Cookies.get("gglg");
    if (ilgg === "true") console.log(">>trung true");
    else console.log(">>trung false");
    setisgglg(ilgg);
    let pwcc = Cookies.get("yassuozed").replace(/tc8887sssfqwrasdfasdf/g, "");
    let tokenCustomer = Cookies.get("tokenCustomer");
    settoken(tokenCustomer);
    setpwc(pwcc);
  }, []);

  return (
    <div className="container">
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {isgglg === "true" ? (
          <div style={{ fontSize: "20px" }}>
            Chức năng không dành cho tài khoản đăng nhập bằng tài khoản Google
          </div>
        ) : (
          <Spin spinning={false}>
            <Card
              title="ĐỔI MẬT KHẨU"
              style={{ width: "80vh", textAlign: "start" }}
            >
              <Form
                name="basic"
                // initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="currentpassword"
                  rules={[
                    {
                      required: true,
                      message: "Nhập mật khẩu hiện tại!",
                    },
                  ]}
                >
                  <Input.Password
                    addonBefore={<KeyOutlined />}
                    // defaultValue="mysite"
                    onChange={handlecheckpass}
                    placeholder="Mật khẩu hiện tại"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    addonAfter={
                      isinput.currentpass ? (
                        checkpass.currentpass ? (
                          <CheckCircleTwoTone
                            style={{ fontSize: 20 }}
                            twoToneColor="#52c41a"
                          />
                        ) : (
                          <ExclamationCircleTwoTone
                            style={{ fontSize: 20 }}
                            twoToneColor="#eb2f96"
                          />
                        )
                      ) : (
                        ""
                      )
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Nhập mật khẩu mới!",
                    },
                  ]}
                >
                  <Input.Password
                    addonBefore={<LockOutlined />}
                    onChange={(e) => {
                      setnewpass(e.target.value);
                      setisinput({ ...checkpass, repeatpass: true });
                      setcheckpass({ ...checkpass, repeatpass: false });
                    }}
                    placeholder="Mật khẩu mới"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="repassword"
                  rules={[
                    {
                      required: true,
                      message: "Nhập lại mật khẩu mới!",
                    },
                  ]}
                >
                  <Input.Password
                    addonBefore={<KeyOutlined />}
                    // defaultValue="mysite"
                    onChange={handlecheckrepass}
                    placeholder="Nhập lại mật khẩu"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    addonAfter={
                      isinput.repeatpass ? (
                        checkpass.repeatpass ? (
                          <CheckCircleTwoTone
                            style={{ fontSize: 20 }}
                            twoToneColor="#52c41a"
                          />
                        ) : (
                          <ExclamationCircleTwoTone
                            style={{ fontSize: 20 }}
                            twoToneColor="#eb2f96"
                          />
                        )
                      ) : (
                        ""
                      )
                    }
                  />
                </Form.Item>
                <Form.Item>
                  {checkpass.currentpass === true &&
                  checkpass.repeatpass === true ? (
                    <Button
                      htmlType="submit"
                      style={{ backgroundColor: "#8a5a34", border: 0 }}
                      type="primary"
                      block
                      loading={isLoading}
                    >
                      Đổi mật khẩu
                    </Button>
                  ) : (
                    <Button
                      htmlType="submit"
                      style={{
                        backgroundColor: "#8a5a34",
                        border: 0,
                        color: "grey",
                      }}
                      type="primary"
                      disabled
                      block
                    >
                      Đổi mật khẩu
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </Card>
          </Spin>
        )}
      </div>
      <Modal
        title="Đổi mật khẩu thành công"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ marginTop: 50, marginLeft: 500 }}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Quay lại trang chủ
          </Button>,
        ]}
      >
        <p>Đổi mật khẩu thành công, vui lòng đăng nhập lại</p>
      </Modal>
    </div>
  );
}

export default ChangePass;
