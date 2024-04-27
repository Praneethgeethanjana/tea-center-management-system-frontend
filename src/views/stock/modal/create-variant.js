import { Button, Col, Input, Label, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { notifyMessage } from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import { createFarmer, updateFarmer } from "@src/services/farmers";
import Flatpickr from "react-flatpickr";
import moment from "moment";
const CreateVariant = ({ detials, closeModal, updateHandler }) => {
  const [data, setData] = useState(detials ?? {weight:null,cover_weight:null,net_weight:null});
  const [loading, setLoading] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);
  const [location, setLocation] = React.useState(null);
  const [selectedDate, setSelectedDate] = useState([
    moment(new Date()).format("YYYY-MM-DD"),
  ]);
  const [liveDate, setLiveDate] = useState(null);


  useEffect( () => {
    // setLoading(true);

  },[])



  const manageHandler = async () => {
    if (!data.firstName || data.firstName.trim() === "" )
      return notifyMessage("First name can not be empty", 0);
    if (!data.lastName || data.lastName.trim() === "" )
      return notifyMessage("Last name can not be empty", 0);
    return notifyMessage("Please enter valid mobile number", 0);
    if (!data.nic || data.nic.trim() === "" )
      return notifyMessage("NIC can not be empty", 0);
    if (!data.address || data.address.trim() === "" )
      return notifyMessage("Address can not be empty", 0);

    const obj = {
      firstName : data.firstName,
      lastName : data.lastName,
      address : data.address,
      latitude : `${location?.lat}`,
      longitude : `${location?.lng}`,
      nic : data.nic,
      bankAccountNumber : data.accountNumber ?? null,
      bankAccountName : data.accountName ?? null,
      bankName : data.bankName ?? null,
      bankBranch: data.branchName ?? null
    }

    if(detials) {
      await updateFarmerHandler(detials.id,obj);
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


  const inputHandler = (e,val) => {
    let name = e.target.name;
    setData({ ...data, [name]: val });
  };



  return (
    <>
      {loading ? <Loader/> :
        <div className="manage-form">
          <Row>
            <Col md={6}>
              <div className="text-wrapper tile-wrapper mt-1">
                <Label className={"required font-small-4"}>Select Stock</Label>
                <Dropdown
                  disabled={false}
                  placeholder=""
                  className={"form-control"}
                  fluid
                  selection
                  search={false}
                  onChange={(e, { value }) => {
                    // getMyAppointments(null,null,value)
                  }}
                  value={"TEA"}
                  options={[
                    { key: "TEA", text: "Tea", value: "TEA" },
                    { key: "FERTILIZER", text: "Fertilizer", value: "FERTILIZER" },
                  ]}
                  selectOnBlur={false}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"required font-small-4"}>Variant Name</Label>
                <Input
                  name={"variantName"}
                  value={data.variantName ?? ""}
                  onChange={(e) => {
                    let val = e.target.value;
                      inputHandler(e,val)
                  }}
                  type="text"
                  placeholder="Variant Name"
                  className={"mb-1"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={"required font-small-4"}>Size</Label>
                <Input
                  name={"size"}
                  value={data.size ?? ""}
                  onChange={(e) => {
                    let val = e.target.value;
                    inputHandler(e,val)
                  }}
                  type="text"
                  placeholder="Size"
                  className={"mb-1"}
                />
              </div>
            </Col>


            <Col md={6}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={"font-small-4"}>Available QTY</Label>
                <Input
                  name="qty"
                  value={data.qty ?? ""}
                  onChange={(e) => {
                    let val = e.target.value;
                      inputHandler(e,val);
                  }}
                  type="text"
                  placeholder="QTY"
                  className={"mb-1"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={"font-small-4"}>Price</Label>
                <Input
                  name="price"
                  value={data.price ?? ""}
                  onChange={(e) => {
                    let val = e.target.value;
                    if(/^\d*\.?\d{0,2}$/.test(val) || val === '') {
                      if(val == ".") val = "0."
                      inputHandler(e,val)
                    }
                  }}
                  type="text"
                  placeholder="Price"
                  className={"mb-1"}
                />
              </div>
            </Col>


          </Row>

          <div className="d-flex justify-content-end">

            <button
              disabled={apiLoader}
              className="btn btn-primary mt-3"
              onClick={manageHandler}
            >
              Add
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default CreateVariant;
