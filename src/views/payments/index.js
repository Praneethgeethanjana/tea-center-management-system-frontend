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


const Payments = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [status, setStatus] = useState("ALL");
  const [keyword, setKeyword] = useState("");
  const [selectedDates, setSelectedDates] = useState([
    moment(new Date()).subtract(1, "month").format("YYYY/MM/DD"),
    moment(new Date()).format("YYYY/MM/DD")
  ]);
  const [liveDate, setLiveDate] = useState(null);

  useEffect(() => {
    // setLoader(true);
    // getMyAppointments();
  }, [keyword]);


  const getMyAppointments = async (startDate,endDate, sts) => {
    setLoader(true)

  }

  const statusChangeHandler = (id,action) => {
    errorSweetAlert("Are you sure?","",action === "ACTIVE" ? "Accept" : action === "COMPLETED" ? "Yes, Complete" : "Yes,Reject",()=> {
    },true)
  }


  return (
    <div>
      <Row className={"main-row"}>
        <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
          <Label className="font-medium-2 mt-1">Payments for Farmers</Label>
          {!loader && (
            <button
              onClick={() => {
                // setIsCreateFarmer(true);
                setIsOpen(true);
              }}
              type="button"
              className="btn btn-primary"
            >
              <Plus style={{marginRight:5}} size="15" />
              Make Payment
            </button>
          )}
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
              {/*<Col xs={12} sm={6} md={3}>*/}
              {/*  <div className="px-0 px-sm-2">*/}
              {/*    <p className="mb-0">Status</p>*/}
              {/*    <Dropdown*/}
              {/*      disabled={false}*/}
              {/*      placeholder=""*/}
              {/*      className={"form-control"}*/}
              {/*      fluid*/}
              {/*      selection*/}
              {/*      search={false}*/}
              {/*      onChange={(e, { value }) => {*/}
              {/*        setStatus(value);*/}
              {/*        // getMyAppointments(null,null,value)*/}
              {/*      }}*/}
              {/*      value={status}*/}
              {/*      options={[*/}
              {/*        { key: "ALL", text: "ALL", value: "ALL" },*/}
              {/*        { key: "PENDING", text: "PENDING", value: "PENDING" },*/}
              {/*        { key: "ACTIVE", text: "ACCEPTED", value: "ACTIVE" },*/}
              {/*        { key: "REJECTED", text: "REJECTED", value: "REJECTED" },*/}
              {/*        { key: "COMPLETED", text: "COMPLETED", value: "COMPLETED" },*/}
              {/*      ]}*/}
              {/*      selectOnBlur={false}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*</Col>*/}
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 mt-2 mt-sm-0 px-sm-2">
                  <p className="mb-0">Date</p>
                  <Flatpickr
                    options={{
                      mode: "range",
                      dateFormat: 'Y/m/d',
                    }}
                    className="form-control selected-date"
                    placeholder={"Select date range"}
                    value={liveDate ? liveDate : selectedDates}
                    onChange={(date) => {
                      setLiveDate(date);
                      setSelectedDates([
                        moment(date[0]).format("YYYY/MM/DD"),
                        moment(date[1]).format("YYYY/MM/DD"),
                      ]);
                      // getMyAppointments( moment(date[0]).format("YYYY/MM/DD"),moment(date[1]).format("YYYY/MM/DD"),null)
                    }}
                  />
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
                className="dataTable-custom light-table"
                data={appointments}
                pointerOnHover
                highlightOnHover
                responsive
                columns={[
                  {
                    name: "APPOINTMENT ID",
                    selector: (row) => row["id"],
                    sortable: false,
                    minWidth: "150px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.id}
                      </p>
                    ),
                  },
                  {
                    name: "USER ID",
                    selector: (row) => row["userUniqueId"],
                    sortable: false,
                    minWidth: "100px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row?.user?.userUniqueId}
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
                        {row.user?.firstName + ' ' + row.user?.lastName}
                      </p>
                    ),
                  },
                  {
                    name: "CREATED DATE",
                    selector: (row) => row["created"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.created ? row.created.split('T')[0] : "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "APPOINT DATE",
                    selector: (row) => row["appointmentDate"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.appointmentDate ? row.appointmentDate.split('T')[0] : "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "PAYMENT SLIP",
                    selector: (row) => row[""],
                    sortable: false,
                    minWidth: "150px",
                    cell: (row) => (
                      <div className={"mid-center"}>
                        <div
                          onClick={() => {
                            window.open(row.paymentSlipUrl)
                          }}
                        >
                          <File size={25} color={"#05930d"} />
                        </div>
                      </div>
                    ),
                  },
                  {
                    name: "DOCTOR RECEIPT",
                    selector: (row) => row[""],
                    sortable: false,
                    minWidth: "150px",
                    cell: (row) => (
                      <div className={"mid-center"}>
                        {row.doctorReceiptUrl ?
                          <div
                            onClick={() => {
                              window.open(row.doctorReceiptUrl)
                            }}
                          >
                            <File size={25} color={"#05930d"} />
                          </div> : 'N/A'}
                      </div>
                    ),
                  },
                  {
                    name: "TOTAL FEE",
                    selector: (row) => row["total"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.total ?  `Rs ${row.total}` : "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "STATUS",
                    selector: (row) => row["status"],
                    minWidth: "150px",
                    sortable: false,
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.status === 'ACTIVE' ? "ACCEPTED" : row.status}
                      </p>
                    ),
                  },
                  {
                    name: "NOTE",
                    selector: (row) => row["remark"],
                    sortable: false,
                    minWidth: "200px",
                    cell: (row) => (
                      <p className="text-bold-500 mb-0">
                        {row.remark ?? "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "OPTIONS",
                    selector: (row) => row[""],
                    sortable: false,
                    minWidth: "300px",
                    cell: (row) => (
                      <div>
                        {row.status === "PENDING" ?   <div className={"d-flex"}>
                          <button style={{marginRight:'5px'}} className="btn  btn-success" onClick={()=> {statusChangeHandler(row.id,'ACTIVE')}}>Accept</button>
                          <button className="btn btn-danger" onClick={()=> {statusChangeHandler(row.id,'REJECTED')}}>Reject</button>
                        </div> : row.status === "ACTIVE" ? <button
                          onClick={()=> {
                            setIsOpen(true);
                            setSelectedAppointment(row);
                            console.log("SELECTED",row)
                          }} className="btn btn-warning">Upload Report</button> : row.status === "COMPLETED" ? <button   onClick={()=> {
                          setIsOpen(true);
                          setSelectedAppointment(row);
                          console.log("SELECTED",row)
                        }} className="btn btn-primary">View Report</button> : 'N/A'}
                      </div>
                    ),
                  },
                ]}
                noHeader={true}
              />
            </div>
          </Col>
        )}
      </Row>

      <Modal
        size={'md'}
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

          <MakePayment/>

        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

    </div>
  );
};

export default Payments;
