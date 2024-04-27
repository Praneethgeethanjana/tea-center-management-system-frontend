// ** React Imports
import { useSkin } from "@hooks/useSkin";


import InputPasswordToggle from "@components/input-password-toggle";


import { Button, Col, Form, Label, Row } from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { useNavigate } from "react-router-dom";
import { notifyMessage } from "@src/utility/commun-func";
import { changeAdminPassword } from "@src/services/auth";
import React, { useRef } from "react";
import { SOMETHING_WENT_WRONG_MSG } from "@configs/constant";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { skin } = useSkin();
  const formRef = useRef();



  const updateHandler = async (e) => {
    e.preventDefault();
    const data = {
      currentPassword: e.target[0].value ?? "",
      newPassword: e.target[1].value ?? "",
      confirmPassword: e.target[2].value ?? "",
    };
    if (data.currentPassword.trim() === "")
      return notifyMessage("Please enter current password", 0);
    if (data.newPassword.trim() === "")
      return notifyMessage("Please enter new password", 0);
    if (data.newPassword.trim().length < 5)
      return notifyMessage("Password must be 5 characters", 0);
    if (data.confirmPassword.trim() === "")
      return notifyMessage("Please enter new password again", 0);
    if (data.newPassword.trim() !== data.confirmPassword.trim())
      return notifyMessage("New password doesn't match", 0);

    const obj = {
      currentPassword: data.currentPassword
        .trim()
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;"),
      newPassword: data.newPassword
        .trim()
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;"),
    };
    changeAdminPassword(obj).then((res) => {
      if (res.success) {
        formRef.current.reset();
        if (res.message) notifyMessage(res.message, 1);
      } else {
        if (res.errorContent) {
          notifyMessage(res.errorContent, 0);
        } else {
          notifyMessage(SOMETHING_WENT_WRONG_MSG, 0);
        }
      }
    });
  };

  return (
    <div>
      <Row className={"main-row"}>
        <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
          <Label className="font-medium-2 mt-1">Change Password</Label>
        </div>

        <div className="">
          <Row className="auth-inner m-0">
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="7">
              <Form
                className="auth-login-form mt-3"
                onSubmit={updateHandler}
                innerRef={formRef}
              >
                <div className="mb-2">
                  <Label className="form-label" for="login-email">
                    Current Password
                  </Label>
                  <InputPasswordToggle
                    className="input-group-merge"
                    id="curr-password"
                  />
                </div>
                <div className="mb-2">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label" for="login-password">
                      New Password
                    </Label>
                    {/*<Link to="/forgot-password">*/}
                    {/*  <small>Forgot Password?</small>*/}
                    {/*</Link>*/}
                  </div>
                  <InputPasswordToggle
                    className="input-group-merge"
                    id="new-password"
                  />
                </div>

                <div className="mb-2">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label" for="login-password">
                      Confirm Password
                    </Label>
                  </div>
                  <InputPasswordToggle
                    className="input-group-merge"
                    id="confirm-password"
                  />
                </div>

                <Button color="primary" block>
                  Update Password
                </Button>

                {/*<p className="text-center mt-2">*/}
                {/*  <Link to={PICKUP_ORDER_ROUTE}>*/}
                {/*    <ChevronLeft className="rotate-rtl me-25" size={14} />*/}
                {/*    <span className="align-middle">Back</span>*/}
                {/*  </Link>*/}
                {/*</p>*/}
              </Form>
            </Col>
          </Row>
        </div>
      </Row>
    </div>
  );
};

export default ChangePassword;
