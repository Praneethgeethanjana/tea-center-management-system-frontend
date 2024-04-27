import { Button, Col, Input, Label, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { notifyMessage } from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import { createFarmer, updateFarmer } from "@src/services/farmers";
import Flatpickr from "react-flatpickr";
import moment from "moment";
const MakePayment = ({ detials, closeModal, updateHandler }) => {
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
                <Label className={"required font-small-4"}>Select Farmer</Label>
                <Dropdown
                  disabled={false}
                  placeholder=""
                  className={"form-control"}
                  fluid
                  selection
                  search={true}
                  onChange={(e, { value }) => {
                    // getMyAppointments(null,null,value)
                  }}
                  value={"ALL"}
                  options={[
                    { key: "ALL", text: "ALL", value: "ALL" },
                    { key: "PENDING", text: "PENDING", value: "PENDING" },
                    { key: "ACTIVE", text: "ACCEPTED", value: "ACTIVE" },
                    { key: "REJECTED", text: "REJECTED", value: "REJECTED" },
                    { key: "COMPLETED", text: "COMPLETED", value: "COMPLETED" },
                  ]}
                  selectOnBlur={false}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"required font-small-4"}>Amount</Label>
                <Input
                  name={"amount"}
                  value={data.weight ?? ""}
                  onChange={(e) => {
                    let val = e.target.value;
                    if(/^\d*\.?\d{0,2}$/.test(val) || val === '') {
                      if(val == ".") val = "0."
                      inputHandler(e,val)
                    }
                  }}
                  type="text"
                  placeholder="Amount"
                  className={"mb-1"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={"text-wrapper tile-wrapper"}>
                <Label className={"font-small-4"}>Date</Label>
                <Flatpickr
                  options={{
                    mode: "single",
                    minDate: moment().subtract(2, "months").toDate(),
                    maxDate: new Date(),
                  }}
                  className="form-control selected-date"
                  placeholder={"Select a date"}
                  value={liveDate ? liveDate : selectedDate}
                  onChange={(date) => {
                    setLiveDate(date);
                    setSelectedDate([moment(date[0]).format("YYYY-MM-DD")]);

                  }}
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
              Advance
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default MakePayment;
