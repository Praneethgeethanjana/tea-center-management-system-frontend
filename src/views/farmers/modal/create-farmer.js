import { Button, Col, Input, Label, Row } from "reactstrap";
import IntlTelInput from "react-intl-tel-input";
import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { notifyMessage } from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import { allPhoneValidation, mobileNumberInputValidation } from "@src/utility/validation";
import MapComponent from "@components/google-map";
import { createFarmer, updateFarmer } from "@src/services/farmers";
const CreateFarmer = ({ farmer, closeModal, updateHandler }) => {
  const [data, setData] = useState(farmer ?? {});
  const [loading, setLoading] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);
  const [location, setLocation] = React.useState(null);
  const [mobile, setMobile] = React.useState({
    contactNumber: "",
    mobileFormat: "",
    validMobile: false,
  });

  useEffect( () => {
    setLoading(true);
    if(farmer) {
      let lat = farmer.latitude;
      let lng = farmer.longitude;
       setLocation({
        lat,
        lng,
      });
      setMobile({
        contactNumber: farmer?.mobile,
        mobileFormat: "",
        validMobile: true,
      });
      setData(farmer);
    }
    setLoading(false);
  },[])



  const manageHandler = async () => {
    if (!data.firstName || data.firstName.trim() === "" ) return notifyMessage("First name can not be empty", 0);
    if (!data.lastName || data.lastName.trim() === "" ) return notifyMessage("Last name can not be empty", 0);
    if (mobile.contactNumber.trim() === "") return notifyMessage("Mobile can not be empty", 0);
    if (!allPhoneValidation.test(mobile.contactNumber)) return notifyMessage("Please enter valid mobile number", 0);
    if (!data.nic || data.nic.trim() === "" ) return notifyMessage("NIC can not be empty", 0);
    if (!data.address || data.address.trim() === "" ) return notifyMessage("Address can not be empty", 0);

    const obj = {firstName : data.firstName, lastName : data.lastName, mobile: mobile?.contactNumber, address : data.address, latitude : `${location?.lat}`, longitude : `${location?.lng}`, nic : data.nic, bankAccountNumber : data.accountNumber ?? null, bankAccountName : data.accountName ?? null, bankName : data.bankName ?? null, bankBranch: data.branchName ?? null}

    if(farmer) {
    await updateFarmerHandler(farmer.id,obj);
    } else {
     await createFarmerHandler(obj);
    }
  };
 const createFarmerHandler = async (obj) => {
   setApiLoader(true);
   await  createFarmer(obj).then((res) => {
     if(res.success) {
       notifyMessage(res.message,1)
       if(updateHandler) updateHandler();
       closeModal();
     } else {
       notifyMessage(res.message,0);
     }
   }).finally(()=> { setApiLoader(false)});
 }

 const updateFarmerHandler = async (id,obj) => {
   setApiLoader(true);
   await updateFarmer(id,obj).then((res) => {
     if(res.success) {
       notifyMessage(res.message,1)
       if(updateHandler) updateHandler();
       closeModal();
     } else {
       notifyMessage(res.message,0);
     }
   }).finally(()=> { setApiLoader(false)});
 }


  const inputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const onPhoneNumberChange = (condition, value, object, withdialcode) => {
    setLoading(true);
    if (
      mobileNumberInputValidation(value, withdialcode, condition)
        .numberInputValidation
    ) {
      let validationData = {
        validMobile: mobileNumberInputValidation(value, withdialcode, condition)
          .mobileNumberValidation,
        mobileFormat: withdialcode,
        contactNumber: value,
      };
      setMobile(validationData);
    }
    setLoading(false);
  };



  return (
    <>
      {loading ? <Loader/> :
        <div className="manage-form">
          <Row>
            <Col md={4}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"required font-small-4"}>First Name</Label>
                <Input
                  name={"firstName"}
                  value={data?.firstName}
                  onChange={(e) => inputHandler(e)}
                  type="text"
                  placeholder="First Name"
                  className={"mb-1"}
                />
              </div>
            </Col>
            <Col md={4}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"required font-small-4"}>Last Name</Label>
                <Input
                  name="lastName"
                  value={data?.lastName}
                  onChange={(e) => inputHandler(e)}
                  type="text"
                  placeholder="Last Name"
                  className={"mb-1"}
                />
              </div>
            </Col>


            <Col md={4}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"required font-small-4"}>Mobile Number</Label>

                <IntlTelInput
                  value={mobile?.contactNumber}
                  containerClassName="intl-tel-input dashboard-intl"
                  inputClassName="form-control"
                  onPhoneNumberChange={onPhoneNumberChange}
                  // placeholder={"Mobile number"}
                  preferredCountries={["gb", "ae", "ph", "lk"]}
                  defaultCountry={"lk"}
                  required={true}
                  customPlaceholder={"xxxxxxxxxxx"}
                  nationalMode={false}
                />

              </div>
            </Col>

            <Col md={4}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={"required font-small-4"}>NIC</Label>
                <Input
                  name="nic"
                  value={data?.nic}
                  onChange={(e) => inputHandler(e)}
                  type="text"
                  placeholder="NIC"
                  className={"mb-1"}
                />
              </div>
            </Col>

            <Col md={4}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={"font-small-4"}>Bank Name</Label>
                <Input
                  name="bankName"
                  value={data?.bankName}
                  onChange={(e) => inputHandler(e)}
                  type="text"
                  placeholder="Bank Name"
                  className={"mb-1"}
                />
              </div>
            </Col>

            <Col md={4}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={" font-small-4"}>Branch Name</Label>
                <Input
                  name="branchName"
                  value={data?.branchName}
                  onChange={(e) => inputHandler(e)}
                  type="text"
                  placeholder="Branch Name"
                  className={"mb-1"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={" font-small-4"}>Account Number</Label>
                <Input
                  name="accountNumber"
                  value={data?.accountNumber}
                  onChange={(e) => inputHandler(e)}
                  type="text"
                  placeholder="Account Number"
                  className={"mb-1"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={" font-small-4"}>Account Name</Label>
                <Input
                  name="accountName"
                  value={data?.accountName}
                  onChange={(e) => inputHandler(e)}
                  type="text"
                  placeholder="Account Name"
                  className={"mb-1"}
                />
              </div>
            </Col>


            <Col md={12}>
              <div className={"text-wrapper mb-1 tile-wrapper"}>
                <Label className={"required font-small-4"}>Address</Label>
                <Input
                  name="address"
                  value={data?.address}
                  onChange={(e) => inputHandler(e)}
                  type="textarea"
                  style={{minHeight: '60px' }}
                  placeholder="Address"
                  className={"mb-1"}
                />
              </div>
            </Col>

            <Col className="mt-2" sm={12}>
              <Label className="font-medium-1 mb-1">Select Tea Garden Location</Label>
              {loading ? (
                <div>
                  <Label>Please wait...</Label>
                </div>
              ) : (
                <MapComponent
                  farmer={farmer}
                  data={location}
                  setData={setLocation}
                />
              )
              }
            </Col>


          </Row>

          <div className="d-flex justify-content-end">

            <button
              disabled={apiLoader}
              className="btn btn-primary mt-3"
              onClick={manageHandler}
            >
              {farmer ? 'Update' : "Create"} Farmer
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default CreateFarmer;
