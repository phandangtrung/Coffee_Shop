import React, { lazy, useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CHeader,
  CCardHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Cookies from "js-cookie";
import axios from "axios";
import {
  KeyOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Input, Form, notification, Button, Modal } from "antd";
import { keyp } from "../../config";
import userApi from "../../api/userApi";
function ChangePass() {
  const [pwc, setpwc] = useState("");
  const [token, settoken] = useState("");
  const [newpass, setnewpass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onlogout = () => {
    Cookies.remove("tokenUser");
    // Cookies.remove
    window.location.reload();
  };
  const [checkpass, setcheckpass] = useState({
    currentpass: false,
    repeatpass: false,
  });
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

  const handleCancel = () => {
    setIsModalVisible(false);
    onlogout();
  };
  const openNotification = () => {
    notification.open({
      message: "Change Password Success",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      placement: "bottomRight",
    });
  };
  useEffect(() => {
    let pwcc = Cookies.get("yassuozed").replace(/tc8887sssfqwrasdfasdf/g, "");
    let tokenUser = Cookies.get("tokenUser");
    settoken(tokenUser);
    setpwc(pwcc);
  }, []);
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
          message: "Change Password Fail",
          description: "There's something wrong",
          icon: <InfoCircleFilled style={{ color: "red" }} />,
          placement: "bottomRight",
        });
      }
    };
    fetchCreateProduct(datapass);
  };
  const handlecheckpass = (e) => {
    const { value } = e.target;
    setisinput({ ...checkpass, currentpass: true });
    if (pwc === value) setcheckpass({ ...checkpass, currentpass: true });
    else setcheckpass({ ...checkpass, currentpass: false });
  };
  const handlecheckrepass = (e) => {
    const { value } = e.target;
    setisinput({ ...checkpass, repeatpass: true });
    if (newpass === value) setcheckpass({ ...checkpass, repeatpass: true });
    else setcheckpass({ ...checkpass, repeatpass: false });
  };
  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">
          Change Password
        </CCardHeader>
        <CContainer style={{ marginTop: 40 }}>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
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
                          message: "Please input Current Password!",
                        },
                      ]}
                    >
                      <Input.Password
                        addonBefore={<KeyOutlined />}
                        // defaultValue="mysite"
                        onChange={handlecheckpass}
                        placeholder="Current Password"
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
                          message: "Please input your New Password!",
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
                        placeholder="New Password"
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
                          message: "Please input your New Password!",
                        },
                      ]}
                    >
                      <Input.Password
                        addonBefore={<KeyOutlined />}
                        // defaultValue="mysite"
                        onChange={handlecheckrepass}
                        placeholder="Repeat Password"
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
                          style={{ backgroundColor: "#3c4b64", border: 0 }}
                          type="primary"
                          block
                          loading={isLoading}
                        >
                          Change Password
                        </Button>
                      ) : (
                        <Button
                          htmlType="submit"
                          style={{
                            backgroundColor: "#3c4b64",
                            border: 0,
                            color: "grey",
                          }}
                          type="primary"
                          disabled
                          block
                        >
                          Change Password
                        </Button>
                      )}
                    </Form.Item>
                  </Form>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <Modal
            title="Change Password Successfully"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            style={{ marginTop: 50, marginLeft: 500 }}
            footer={[
              <Button key="submit" type="primary" onClick={handleOk}>
                LOGIN
              </Button>,
            ]}
          >
            <p>Login again to continue using the website</p>
          </Modal>
        </CContainer>
      </CCard>
    </>
  );
}

export default ChangePass;
