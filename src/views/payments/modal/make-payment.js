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
import {Payhere, AccountCategory,Customer, CurrencyType, PayhereCheckout, CheckoutParams} from "@payhere-js-sdk/client"


// Sandbox
Payhere.init("1226614",AccountCategory.SANDBOX)
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


  const payhereHandler = () => {
    const customer = new Customer({
      first_name: "Demo",
      last_name: "User",
      phone: "+94771234567",
      email: "user@example.com",
      address: "No. 50, Highlevel Road",
      city: "Panadura",
      country: "Sri Lanka",
    })

    const checkoutData = new CheckoutParams({
      returnUrl: 'http://localhost:3000/return',
      cancelUrl: 'http://localhost:3000/cancel',
      notifyUrl: 'http://localhost:8080/notify',
      order_id: '112233',
      itemTitle: 'Demo Item',
      currency: CurrencyType.LKR,
      amount: 100
    })

    const checkout = new PayhereCheckout(customer,checkoutData,onPayhereCheckoutError)
    checkout.start()
  }

  const handlePayment = async () => {
    try {
      const payment = {
        sandbox: true, // Set to false for live transactions
        merchant_id: '1226614',
        return_url: 'http://localhost:3000/home',
        cancel_url: 'http://localhost:3000/home',
        notify_url: 'http://localhost:3000/home',
        order_id: '110',
        items: 'Item Name',
        amount: "100.00",
        currency: "LKR",
        first_name: "Demo",
        last_name: "User",
        phone: "+94771234567",
        email: "geethanjana10@gmail.com",
        address: "No. 50, Highlevel Road",
        city: "Panadura",
        country: "Sri Lanka",
        delivery_address: 'No. 46, Galle road, Kalutara South', // optional field
        delivery_city: 'Kalutara', // optional field
        delivery_country: 'Sri Lanka', // optional field
        custom_1: '', // optional field
        custom_2: '', // optional field
        // Add other necessary payment data
      }
      window.payhere.startPayment(payment);

      // Redirect user to PayHere payment page
      window.payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed. OrderID:" + orderId);
        //Note: validate the payment and show success or failure page to the customer
      };

      // Called when user closes the payment without completing
      window.payhere.onDismissed = function onDismissed() {
        //Note: Prompt user to pay again or show an error page
        console.log("Payment dismissed");
      };

      // Called when error happens when initializing payment such as invalid parameters
      window.payhere.onError = function onError(error) {
        // Note: show an error page
        console.log("Error:"  + error);
      };

    } catch (error) {
      console.error('PayHere Error:', error);
    }
  };


  const onPayhereCheckoutError = (errorMsg) => {
    notifyMessage(errorMsg,0)
  }
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
            {!history && <button
                style={{marginRight:10}}
                disabled={apiLoader}
                className="btn btn-info mt-3"
                onClick={()=> {
                  history ? closeModal() : handlePayment()
                }}
            >
              Pay by PayHere
            </button> }

            <button
              disabled={apiLoader}
              className="btn btn-primary mt-3"
              onClick={()=> {
                history ? closeModal() : manageHandler()
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
