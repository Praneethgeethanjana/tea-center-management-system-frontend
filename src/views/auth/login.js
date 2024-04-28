// ** React Imports
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import { Button, CardText, CardTitle, Col, Form, Input, Label, Row } from "reactstrap";

import coverImage from "@src/assets/images/teacenter-cover.webp"

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { notifyMessage } from "@src/utility/commun-func";
import { adminLogin, userLogin } from "@src/services/auth";
import qs from "qs";
import {
  ACCESS_TOKEN, BASE_ROUTE_PATH, DASHBOARD_ROUTE_PATH, FARMERS_ROUTE,

  REFRESH_TOKEN, ROLE_ADMIN, ROLE_FARMER,
  SOMETHING_WENT_WRONG_MSG, TEST_ROUTE_PATH
} from "@configs/constant";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { skin } = useSkin();
  const [isAdminType,setIsAdminType] = useState(true);

  const source = coverImage;

  useEffect(() => {
    localStorage.clear();
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = {
      username: e.target[0].value ?? "",
      password: e.target[1].value ?? "",
    };
    if (data.username.trim() === "")
      return notifyMessage("Email cannot be empty", 0);
    if (data.password.trim() === "")
      return notifyMessage("Password cannot be empty", 0);

    const obj = {
      username: data.username
        .trim()
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;"),
      password: data.password.trim(),
      grant_type: "password",
    };
    await userLogin(qs.stringify(obj),isAdminType).then((res) => {
      console.log("LOGIN",res)
      if (res.access_token) {
        localStorage.setItem(ACCESS_TOKEN, res.access_token);
        localStorage.setItem(REFRESH_TOKEN, res.refresh_token);

         const role = res.user.authorities[0].authority

        if(role === "ROLE_USER") {
          localStorage.setItem("USER_ROLE",ROLE_FARMER)
        } else {
          localStorage.setItem("USER_ROLE",ROLE_ADMIN)
        }
        window.location.href = DASHBOARD_ROUTE_PATH
        // navigate(APPOINTMENTS_ROUTE)

      } else {
        if (res.message) {
          notifyMessage(res.message, 0);
        }

      }
    });
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex auth-left-side align-items-center" lg="6" sm="12">
          {/*<div className="w-100 d-lg-flex align-items-center justify-content-center px-5">*/}
            <img style={{objectFit:'cover',minHeight:'100%',width:'100%'}} className="" src={source} alt="Login Cover" />
          {/*</div>*/}
        </Col>
        <Col
          className="d-flex auth-right-side align-items-center auth-bg px-2 p-lg-5"
          lg="6"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="8">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Tea Center Management System
            </CardTitle>
            <h4 className="mb-2">
              Login
            </h4>
            {/*<div className="d-flex">*/}
            {/*  <div onClick={() => {*/}
            {/*    setIsAdminType(false);*/}

            {/*  }} className={`py-5px b-r-l-rounded cursor-pointer w-50 ${isAdminType ? 'border-black' : 'bg-black'}   d-flex justify-content-center`}><span className={`${isAdminType ? 'text-black' : 'text-white'}`}>Patient</span></div>*/}
            {/*  <div onClick={() => {setIsAdminType(true)}} className={`py-5px b-r-r-rounded cursor-pointer w-50 ${isAdminType ? 'bg-black' : 'border-black'} d-flex justify-content-center`}><span className={`${isAdminType ? 'text-white' : 'text-black'}`}>Admin</span></div>*/}
            {/*</div>*/}
            <Form className="auth-login-form mt-3" onSubmit={loginHandler}>
              <div className="mb-2">
                <Label className="form-label" for="login-email">
                  Email
                </Label>
                <Input
                  type="text"
                  id="login-email"
                  placeholder="Username"
                  autoFocus
                />
              </div>
              <div className="mb-2">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                   <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                />
              </div>

              <Button color="primary" block>
                Login
              </Button>
            </Form>

            {/*<p className="text-center mt-2">*/}
            {/*<span className="me-25">New on our platform?</span>*/}
            {/*<Link to="/register">*/}
            {/*  <span>Register as Patient</span>*/}
            {/* </Link>*/}
            {/*</p>*/}

          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
