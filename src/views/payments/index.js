import {
  Col, Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import {
  checkAMPM,
  downloadCSV, errorSweetAlert,
  notifyMessage
} from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import moment from "moment/moment";
import { Checkbox, Dropdown, Form } from "semantic-ui-react";
import Flatpickr from "react-flatpickr";
import { Box, Eye, File, Plus } from "react-feather";
import { useNavigate } from "react-router-dom";
import MakePayment from "@src/views/payments/modal/make-payment";
import {getPendingPayments} from "@src/services/payments";
import Pagination from "@components/pagination";
import TeaLeavesRecords from "@src/views/payments/modal/tea-leaves-records";
import AdvanceRecords from "@src/views/payments/modal/advance-details";
import MonthPicker from "@components/month-picker";
import {useSkin} from "@hooks/useSkin";

const  TEST_ARRAY =  [
  {
    "farmerId": 2,
    "farmerFirstName": "Navishka",
    "farmerLastName": "Darshana",
    "farmerMobileNumber": "94766709919",
    "farmerNic": "2322323v",
    "monthlyTotalTeaKg": 50,
    "monthlyNetTotalTeaKg": 48,
    "monthlyTotalAmount": 9600,
    "monthlyTotalDeduction": 30000,
    "monthlyNetTotal": -20400,
    "totalPendingOrderAmount": 0,
    "totalPendingAdvanceAmount": 30000,
    "totalPendingBalancePayment": 0,
    "thisPaymentBalanceAmount": 20400,
    "orderList": [
      {
        "id": 5,
        "totalAmount": 1600,
        "orderPaidStatus": "NOT_PAID",
        "created": "2024-04-28T06:30:25.000+00:00",
        "updated": "2024-04-28T06:30:25.000+00:00",
        "farmerOrders": [
          {
            "id": 5,
            "reqSize": 2,
            "stockPrice": 600,
            "oneKgPrice": 300,
            "stock": {
              "id": 2,
              "stockType": "FERTILIZER",
              "variant": "test",
              "size": 200,
              "availableSize": 194,
              "oneKgPrice": 300,
              "created": "2024-04-27T18:07:43.000+00:00",
              "updated": "2024-04-27T18:07:43.000+00:00"
            }
          },
          {
            "id": 6,
            "reqSize": 10,
            "stockPrice": 1000,
            "oneKgPrice": 100,
            "stock": {
              "id": 3,
              "stockType": "TEA",
              "variant": "test",
              "size": 200,
              "availableSize": 270,
              "oneKgPrice": 100,
              "created": "2024-04-27T18:08:03.000+00:00",
              "updated": "2024-04-27T18:08:03.000+00:00"
            }
          }
        ]
      }
    ],
    "advanceList": [
      {
        "id": 2,
        "amount": 30000,
        "status": "PENDING",
        "created": "2024-04-25T00:00:00.000+00:00",
        "updated": "2024-04-28T06:35:35.000+00:00"
      }
    ],
    "farmerStocksList": [
      {
        "id": 2,
        "numberOfKg": 25,
        "bagWeight": 1,
        "netWeight": 24,
        "year": 2024,
        "month": 4,
        "totalPrice": 4800,
        "todayTeaPrice": 200,
        "created": "2024-04-25T00:00:00.000+00:00",
        "updated": "2024-04-28T06:33:21.000+00:00"
      },
      {
        "id": 3,
        "numberOfKg": 25,
        "bagWeight": 1,
        "netWeight": 24,
        "year": 2024,
        "month": 4,
        "totalPrice": 4800,
        "todayTeaPrice": 200,
        "created": "2024-04-25T00:00:00.000+00:00",
        "updated": "2024-04-28T06:33:55.000+00:00"
      }
    ]
  }
]
const Payments = () => {
  const {skin} = useSkin();
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [payments, setPayments] = useState([]);
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
  const [selectedAdvances, setSelectedAdvances] = useState(null);
  const [selectedOrderList, setSelectedOrderList] = useState(null);
  const [selectedTeaLeavesList, setSelectedTeaLeavesList] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [selectedDates, setSelectedDates] = useState([
    moment(new Date()).subtract(1, "month").format("YYYY/MM/DD"),
    moment(new Date()).format("YYYY/MM/DD")
  ]);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const initialDate = `${currentYear}/${currentMonth.toString().padStart(2, '0')}`;
  const [date, setDate] = useState(new Date(initialDate));
  const [totalPages, setTotalPages] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    setLoader(true);
    getAllPaymentDetails();
  }, [keyword]);


  const getAllPaymentDetails = async (search,page,pickedDate) => {
    setLoader(true);
    const inputDate = pickedDate ? new Date(pickedDate) : new Date(date);
    getPendingPayments(search ?? keyword,page || page === 0 ? page : pageIndex,moment(inputDate).format('YYYY/MM/DD')).then((res)=> {
      if(res.success){
        setPageIndex(res.body.number);
        setTotalPages(res.body.totalPages);
        setPayments(res.body.content)
      }
    }).finally(()=> {setLoader(false)})
  }

  const closeHandler = () => {
    setIsOpen(false);
    setSelectedPaymentDetails(null);
    setSelectedAdvances(null);
    setSelectedTeaLeavesList(null);
    setSelectedOrderList(null);
  }


  return (
    <div>
      <Row className={"main-row"}>
        <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
          <Label className="font-medium-2 mt-1">Payments for Farmers</Label>
          {/*{!loader && (*/}
          {/*  <button*/}
          {/*    onClick={() => {*/}
          {/*      // setIsCreateFarmer(true);*/}
          {/*      setIsOpen(true);*/}
          {/*    }}*/}
          {/*    type="button"*/}
          {/*    className="btn btn-primary"*/}
          {/*  >*/}
          {/*    <Plus style={{marginRight:5}} size="15" />*/}
          {/*    Make Payment*/}
          {/*  </button>*/}
          {/*)}*/}
        </div>

        <Col md={12}>
          <Row className="px-1">
            <div className="d-sm-flex justify-content-end d-block pb-2 p-1  filter-box rounded my-2">
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 px-sm-2">
                  <p className="mb-0">Search</p>
                  <Input placeholder={'Search by farmer'}  onChange={(e)=> {setKeyword(e.target.value)}} />
                </div>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 px-sm-2">
                  <p className="mb-0">Month</p>
                    <MonthPicker updateHandler={getAllPaymentDetails} date={date} setDate={setDate}/>
                </div>
              </Col>


            </div>
          </Row>
        </Col>

        {loader ? (
          <Loader />
        ) : (
          <Col xs={12} className={"datatable-main-wrapper mt-2"}>
            <div>
              <DataTable
                  className={`dataTable-custom ${skin === "dark" ? "dark-table" : "light-table"}`}
                data={payments}
                pointerOnHover
                highlightOnHover
                responsive
                columns={[
                  {
                    name: "FARMER ID",
                    selector: (row) => row["farmerId"],
                    sortable: false,
                    minWidth: "150px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.farmerId}
                      </p>
                    ),
                  },
                  {
                    name: "NAME",
                    selector: (row) => row["user"],
                    sortable: false,
                    minWidth: "200px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.farmerFirstName + ' ' + row.farmerLastName}
                      </p>
                    ),
                  },
                  {
                    name: "NIC",
                    selector: (row) => row["farmerNic"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.farmerNic}
                      </p>
                    ),
                  },
                  {
                    name: "MOBILE",
                    selector: (row) => row["farmerMobileNumber"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.farmerMobileNumber ?? "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "MONTHLY NET TOTAL",
                    selector: (row) => row["monthlyNetTotal"],
                    sortable: false,
                    minWidth: "180px",
                    cell: (row) => (
                        <p className="text-bold-500 text-truncate mb-0">
                          {row.monthlyNetTotal ?? "N/A"}
                        </p>
                    ),
                  },
                  {
                    name: "PAYMENT",
                    selector: (row) => row[""],
                    sortable: false,
                    minWidth: "150px",
                    cell: (row) => (
                        <div className="mid-center">
                          {/*<div*/}
                          {/*    onClick={() => {*/}
                          {/*      setIsOpen(true);*/}
                          {/*      setSelectedTeaLeavesList(null);*/}
                          {/*      setSelectedAdvances(null);*/}
                          {/*      setSelectedOrderList(null);*/}
                          {/*      setSelectedPaymentDetails(row);*/}
                          {/*    }}*/}
                          {/*>*/}
                          {/*  <Eye size={25} color={"#05930d"} />*/}
                          {/*</div>*/}
                          <button onClick={() => {
                            setIsOpen(true);
                            setSelectedTeaLeavesList(null);
                            setSelectedAdvances(null);
                            setSelectedOrderList(null);
                            setSelectedPaymentDetails(row);
                          }} className="btn btn-warning">
                            Confirm
                          </button>
                        </div>
                    ),
                  },
                  {
                    name: "TEA LEAVES RECORDS",
                    selector: (row) => row[""],
                    sortable: false,
                    minWidth: "180px",
                    cell: (row) => (
                        <div className="mid-center">
                          <div
                              onClick={() => {
                                setIsOpen(true);
                                setSelectedTeaLeavesList(row);
                                setSelectedAdvances(null);
                                setSelectedOrderList(null);
                                setSelectedPaymentDetails(null);
                              }}
                          >
                            <Eye size={25} color={"#05930d"} />
                          </div>

                        </div>
                    ),
                  },
                  {
                    name: "ADVANCE DETAILS",
                    selector: (row) => row[""],
                    sortable: false,
                    minWidth: "180px",
                    cell: (row) => (
                        <div className="mid-center">
                          <div
                              onClick={() => {
                                setIsOpen(true);
                                setSelectedTeaLeavesList(null);
                                setSelectedAdvances(row);
                                setSelectedOrderList(null);
                                setSelectedPaymentDetails(null);
                              }}
                          >
                            <Eye size={25} color={"#05930d"} />
                          </div>

                        </div>
                    ),
                  },
                ]}
                noHeader={true}
              />
            </div>
          </Col>
        )}

        {!loader && totalPages > 0 && (
            <div className="w-100 d-flex justify-content-end mt-1 px-3">
              <Pagination
                  activePage={pageIndex + 1}
                  totalNoOfPages={totalPages}
                  handlePagination={async (page) => {
                    await setPageIndex(page - 1);
                    await getAllPaymentDetails(null,page - 1)
                  }}
              />
            </div>
        )}
      </Row>

      <Modal
        size={`lg`}
        isOpen={isOpen}
      >
        <ModalHeader
          toggle={() => {
            setIsOpen(false);
          }}
          className={"selector-wrapper font-medium-2 inline-flex"}
        >
          {`Make Payment`}
        </ModalHeader>
        <ModalBody className="modal-dialog-centered">

          {selectedPaymentDetails ?
              <MakePayment updateHandler={getAllPaymentDetails} details={selectedPaymentDetails} closeModal={closeHandler}/> : selectedTeaLeavesList ? <TeaLeavesRecords details={selectedTeaLeavesList.farmerStocksList} totalAmount={selectedTeaLeavesList.monthlyTotalAmount} closeModal={closeHandler}/> :
          selectedAdvances ? <AdvanceRecords closeModal={closeHandler} details={selectedAdvances.advanceList} totalAmount={selectedAdvances.totalPendingAdvanceAmount}/> : null}

        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

    </div>
  );
};

export default Payments;
