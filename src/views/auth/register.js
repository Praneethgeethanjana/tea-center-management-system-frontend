// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
import { Facebook, GitHub, Mail, Twitter } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Button,
  CardText,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";

// ** Illustrations Imports

import coverImage from "@src/assets/images/teacenter-cover.webp";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { notifyMessage } from "../../utility/commun-func";
import { userRegister } from "../../services/auth";

const Register = () => {
  // ** Hooks
  const { skin } = useSkin();

  const source = skin === "dark" ? coverImage : coverImage;


  const registerHandler =  async (e) => {
    e.preventDefault();
    const data = {
      firstName: e.target[0].value ?? "",
      lastName : e.target[1].value ?? "",
      userName : e.target[2].value ?? "",
      nic : e.target[3].value ?? "",
      address : e.target[4].value ?? "",
      dob : e.target[5].value ?? "",
      bloodGroup : e.target[6].value ?? "",
      mobile: e.target[7].value ?? "",
      password : e.target[8].value ?? "",
    };
    if(data.firstName.trim() === "") return notifyMessage("First Name cannot be empty!",0)
    if(data.lastName.trim() === "") return notifyMessage("Last Name cannot be empty!",3)
    if(data.userName.trim() === "") return notifyMessage("Email cannot be empty!",3)
    if(data.address.trim() === "") return notifyMessage("Address cannot be empty!",3)
    if(data.dob.trim() === "") return notifyMessage("Date of Birth cannot be empty!",3)
    if(data.password.trim() === "") return notifyMessage("Password cannot be empty!",3)


    await userRegister(data).then((res) => {
      if(res){
        console.log(res);
        if(res.success){

        } else {
          notifyMessage(res.message,0)
        }
      }
    })

  }

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner main-auth-cover m-0">
        <Col className="d-none  d-lg-flex auth-left-side  align-items-center" lg="6" sm="12">
          {/* <div className="w-100 d-lg-flex align-items-center justify-content-center"> */}
            <img style={{objectFit:'cover',minHeight:'100%',width:'100%'}} className="" src={source} alt="" />
          {/* </div> */}
        </Col>
        <Col
          className="d-flex auth-right-side align-items-center auth-bg px-2 p-lg-5"
          lg="6"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="8">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Register
            </CardTitle>
            <CardText className="mb-2">
              Make your app management easy and fun!
            </CardText>
            <Form
              className="auth-register-form mt-2"
              onSubmit={registerHandler}
            >
              <div className="mb-1">
                <Label className="required form-label" for="register-firstName">
                FirstName
                </Label>
                <Input
                  type="text"
                  id="register-firstName"
                  placeholder="johndoe"
                  autoFocus
                />
              </div>

              <div className="mb-1">
                <Label className="form-label required" for="register-lastname">
                Lastname
                </Label>
                <Input
                  type="text"
                  id="register-lastname"
                  placeholder="johndoe"
                  autoFocus
                />
              </div>


              <div className="mb-1">
                <Label className="form-label required" for="register-email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="register-email"
                  placeholder="john@example.com"
                />
              </div>

              <div className="mb-1">
                <Label className="form-label" for="register-nic">
                NIC
                </Label>
                <Input
                  type="text"
                  id="register-nic"
                  placeholder="johndoe"
                  autoFocus
                />
              </div>

              <div className="mb-1">
                <Label className="form-label required" for="register-address">
                Address
                </Label>
                <Input
                  type="text"
                  id="register-address"
                  placeholder=""
                  autoFocus
                />
              </div>

              <div className="mb-1">
                <Label className="form-label required" for="register-dob">
                Date of Birth
                </Label>
                <Input
                  type="date"
                  id="register-dob"
                  placeholder=""
                  autoFocus
                />
              </div>

              <div className="mb-1">
                <Label className="form-label" for="register-blood">
                Blood Group
                </Label>
                <Input
                  type="text"
                  id="register-blood"
                  placeholder=""
                  autoFocus
                />
              </div>

              <div className="mb-1">
                <Label className="form-label" for="register-mobile">
                Mobile
                </Label>
                <Input
                  type="text"
                  id="register-mobile"
                  placeholder=""
                  autoFocus
                />
              </div>

              <div className="mb-1">
                <Label className="form-label required" for="register-password">
                  Password
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="register-password"
                />
              </div>
              {/*<div className="form-check mb-1">*/}
              {/*  <Input type="checkbox" id="terms" />*/}
              {/*  <Label className="form-check-label" for="terms">*/}
              {/*    I agree to*/}
              {/*    <a*/}
              {/*      className="ms-25"*/}
              {/*      href="/"*/}
              {/*      onClick={(e) => e.preventDefault()}*/}
              {/*    >*/}
              {/*      privacy policy & terms*/}
              {/*    </a>*/}
              {/*  </Label>*/}
              {/*</div>*/}
              <Button color="primary" block>
                Sign up
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">Already have an account?</span>
              <Link to="/login">
                <span>Sign in instead</span>
              </Link>
            </p>
            {/*<div className="divider my-2">*/}
            {/*  <div className="divider-text">or</div>*/}
            {/*</div>*/}
            {/*<div className="auth-footer-btn d-flex justify-content-center">*/}
            {/*  <Button color="facebook">*/}
            {/*    <Facebook size={14} />*/}
            {/*  </Button>*/}
            {/*  <Button color="twitter">*/}
            {/*    <Twitter size={14} />*/}
            {/*  </Button>*/}
            {/*  <Button color="google">*/}
            {/*    <Mail size={14} />*/}
            {/*  </Button>*/}
            {/*  <Button className="me-0" color="github">*/}
            {/*    <GitHub size={14} />*/}
            {/*  </Button>*/}
            {/*</div>*/}
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
