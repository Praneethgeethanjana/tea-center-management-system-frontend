import { Button, Col, Input, Label, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { notifyMessage } from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import { createFarmer, updateFarmer } from "@src/services/farmers";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import {saveMonthlyPayment} from "@src/services/payments";
import swal from "sweetalert";
const MakePayment = ({ details, closeModal, updateHandler ,history}) => {
  const [data, setData] = useState(details ?? {weight:null,cover_weight:null,net_weight:null});
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


  const conformHandler = () => {
    swal({
      title: "Are you sure you want to do this?",
      closeOnClickOutside: false,
      buttons: {
        cancel: "No",
        dangerMode: { text: "Yes", value: "action", className: "okay-btn" },
      },
    }).then(async (value) => {
      switch (value) {
        case "action":
        await manageHandler();
          break;
        default:
      }
    });
  };


  const manageHandler = async () => {
    setLoading(true);
    let year = null
    let month = null
    if(details.orderList && details.orderList.length > 0) {
      let date = details.orderList[0];
      year = date.created.split("-")[0]
      month = date.created.split("-")[1]
    } else {
      if(details.farmerStocksList && details.farmerStocksList.length > 0) {
        let date = details.farmerStocksList[0];
        year = date.created.split("-")[0]
        month = date.created.split("-")[1]
      } else {
        let date = details.advanceList[0];
        year = date.created.split("-")[0]
        month = date.created.split("-")[1]
      }
    }
  const obj = {
      "year" : year,
        "month" : month,
        "monthlyTotalTeaKg": details.monthlyTotalTeaKg,
        "monthlyNetTotalTeaKg": details.monthlyNetTotalTeaKg,
        "monthlyTotalAmount": details.monthlyTotalAmount,
        "monthlyTotalDeduction": details.monthlyTotalDeduction,
        "monthlyNetTotal": details.monthlyNetTotal,
        "totalPendingOrderAmount": details.totalPendingOrderAmount,
        "totalPendingAdvanceAmount": details.totalPendingAdvanceAmount,
        "totalPendingBalancePayment": details.totalPendingBalancePayment,
        "thisPaymentBalanceAmount": details.thisPaymentBalanceAmount,
        "userId" : details.farmerId
    }
    await saveMonthlyPayment(obj).then((res) => {
      if(res.success){
        notifyMessage(res.message,1)
        closeModal();
        if(updateHandler) updateHandler();
      } else {
        notifyMessage(res.message,0)
      }
    }).finally(()=> {
      setLoading(false);
    })

  };





  return (
    <>
      {loading ? <Loader/> :
        <div className="manage-form">
          <Row>
            {!history ? <h5>Farmer Name : {details.farmerFirstName + ' ' + details.farmerLastName}</h5>  :
           <h5>Farmer Name : {details?.user?.firstName + ' ' + details?.user?.lastName}</h5> }
            <Col md={6}>
              <div className="text-wrapper tile-wrapper mt-1">
                <Label className={" font-small-4"}>Monthly Total Tea Leaves (Kg)</Label>
                <Input
                    name={"amount"}
                    value={details?.monthlyTotalTeaKg ?? ""}
                    disabled
                    type="text"
                    placeholder="Amount"
                    className={"mb-1"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={" font-small-4"}>Monthly Net Total Tea Leaves (Kg)</Label>
                <Input
                    disabled
                  name={"amount"}
                  value={details?.monthlyNetTotalTeaKg ?? ""}
                  type="text"
                  placeholder="monthlyNetTotalTeaKg"
                  className={"mb-1"}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"font-small-4"}>Monthly Total Amount (Rs)</Label>
                <Input
                    disabled
                    name={"amount"}
                    value={details?.monthlyTotalAmount ?? ""}
                    type="text"
                    placeholder="monthlyTotalAmount"
                    className={"mb-1"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"font-small-4"}>Pending Order Amount - For Tea/Fertilizers (Rs)</Label>
                <Input
                    disabled
                    name={"totalPendingOrderAmount"}
                    value={details?.totalPendingOrderAmount ?? ""}
                    type="text"
                    placeholder="totalPendingOrderAmount"
                    className={"mb-1"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"font-small-4"}>Total Pending Advance Amount (Rs)</Label>
                <Input
                    disabled
                    name={"amount"}
                    value={details?.totalPendingAdvanceAmount ?? ""}
                    type="text"
                    placeholder="totalPendingAdvanceAmount"
                    className={"mb-1"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"font-small-4"}>Monthly Deduction (Advance + Orders) Rs</Label>
                <Input
                    disabled
                    name={"amount"}
                    value={details?.monthlyTotalDeduction ?? ""}
                    type="text"
                    placeholder="monthlyTotalAmount"
                    className={"mb-1"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"font-small-4"}>Total Pending Balance Payment (Rs)</Label>
                <Input
                    disabled
                    name={"totalPendingBalancePayment"}
                    value={details?.totalPendingBalancePayment ?? ""}
                    type="text"
                    placeholder="totalPendingBalancePayment"
                    className={"mb-1"}
                />
              </div>
            </Col>

            <Col md={6}>
              <div className={"text-wrapper tile-wrapper mt-1"}>
                <Label className={"font-small-4"}>Monthly Net Total (Rs)</Label>
                <Input
                    disabled
                    name={"monthlyNetTotal"}
                    value={details?.monthlyNetTotal ?? ""}
                    type="text"
                    placeholder="monthlyNetTotal"
                    className={"mb-1"}
                />
              </div>
            </Col>

          </Row>

          <div className="d-flex justify-content-end">

            <button
              disabled={apiLoader}
              className="btn btn-primary mt-3"
              onClick={()=> {
                history ? closeModal() : conformHandler()
              }}
            >
              {history ? "Ok" : "Release Payment"}
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default MakePayment;
