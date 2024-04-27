// ** React Imports
import { Link ,useNavigate} from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
import { ChevronLeft } from "react-feather";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/forgot-password-v2.svg";
import illustrationsDark from "@src/assets/images/pages/forgot-password-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { notifyMessage } from "@src/utility/commun-func";
import { checkUserTokenForResetPassword, forgotPassword, resetUserPassword } from "@src/services/auth";
import InputPasswordToggle from "@components/input-password-toggle";
import { useEffect, useState } from "react";
import { ROUTE_LOGIN } from "@configs/constant";

const ResetPassword = () => {
  // ** Hooks
  const navigate = useNavigate();
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const [token,setToken] = useState(null);



  useEffect(() => {
     checkTokenHandler();
  },[]);

  const checkTokenHandler = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const uid = searchParams.get('uid');
    if(uid) {
      let ob = {
        token : uid
      }
     await checkUserTokenForResetPassword(ob).then((res) => {
        if(res.success) {
          setToken(uid);
        } else {
          setToken(null)
        }
      });
    }
  }



  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    const password = e.target[0].value ?? ""
    const confirmPassword = e.target[1].value ?? ""

    if(password.trim() === "") return notifyMessage("Please enter your new password!",3);
    if(confirmPassword.trim() === "") return notifyMessage("Please enter your confirm password!",3);
    if(confirmPassword.trim() !== password.trim()) return notifyMessage("Doesn't match your password",3);

    console.log("ADO",token)

    // if(token) {
        const obj = {
          token : token,
          password : password.trim()
        }
     await resetUserPassword(obj).then((res) => {
        console.log(res)
        if(res.success){
          notifyMessage(res.message,1)
          navigate(ROUTE_LOGIN);
        } else {
          notifyMessage(res.message,0)
        }
      })

    // }

  }

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Reset Password
            </CardTitle>
            <CardText className="mb-2">
              {/*Enter your email and we'll send you instructions to reset your*/}
              {/*password*/}
            </CardText>
            <Form
              className="auth-forgot-password-form mt-2"
              onSubmit={resetPasswordHandler}
            >

              <div className="mb-1">
                <Label className="form-label" for="reset-password">
                  New Password
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="reset-password"
                />
              </div>

              <div className="mb-1">
                <Label className="form-label" for="reset-password-confirm">
                  Confirm New Password
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="reset-password-confirm"
                />
              </div>

              <Button color="primary" block>
                Reset Password
              </Button>
            </Form>
            {/*<p className="text-center mt-2">*/}
            {/*  <Link to="/login">*/}
            {/*    <ChevronLeft className="rotate-rtl me-25" size={14} />*/}
            {/*    <span className="align-middle">Back to login</span>*/}
            {/*  </Link>*/}
            {/*</p>*/}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
