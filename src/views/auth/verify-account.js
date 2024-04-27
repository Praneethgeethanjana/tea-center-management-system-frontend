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
import { checkUserTokenForResetPassword, forgotPassword, resetUserPassword, verifyAccount } from "@src/services/auth";
import InputPasswordToggle from "@components/input-password-toggle";
import { useEffect, useState } from "react";
import { ROUTE_LOGIN } from "@configs/constant";

const VerifyAccount = () => {
  // ** Hooks
  const navigate = useNavigate();
  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const [type,setType] = useState(1);
  const [msg,setMsg] = useState('');



  useEffect(() => {
    verifyAccountHandler();
  },[]);

  const verifyAccountHandler = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('uid');
    console.log("My UID",token)
    if(token) {
      await verifyAccount(token).then((res) => {
        console.log(res)
        if(res.success) {
            setType(1)
          setMsg(res.message)
        } else {
            setType(0)
          setMsg(res.message)
        }
      });
    }
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
              Verify Account
            </CardTitle>
            <CardText className="mb-2">
              {type ? 'Successfully Verified' : "Verification failed" }
            </CardText>

            <p>
              {msg}
            </p>

            {type === 1 && <Button onClick={()=> {navigate(ROUTE_LOGIN)}} color="primary">
                Login
              </Button>
            }


            {/*<Form*/}
            {/*  className="auth-forgot-password-form mt-2"*/}
            {/*  onSubmit={resetPasswordHandler}*/}
            {/*>*/}
            {/*  */}
            {/*  <Button color="primary" block>*/}
            {/*    Login*/}
            {/*  </Button>*/}
            {/*</Form>*/}


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

export default VerifyAccount;
