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
import AddLeaves from "@src/views/tea-leaves/modal/add-leaves";
import { getAllTeaLeavesRecords } from "@src/services/tea-leaves";
import Pagination from "@components/pagination";


const TeaLeavesForAdmin = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [status, setStatus] = useState("ALL");
  const [keyword, setKeyword] = useState("");
  const [selectedDates, setSelectedDates] = useState([
    moment(new Date()).subtract(1, "month").format("YYYY/MM/DD"),
    moment(new Date()).format("YYYY/MM/DD")
  ]);
  const [liveDate, setLiveDate] = useState(null);
  const [totalPages, setTotalPages] = useState("");
  const [pageIndex, setPageIndex] = useState(0);


  useEffect( () => {
    setLoader(true);
    let timer;
    const  delayedSearch = async () => {
      await getAllTeaLeaves();
    };
    timer = setTimeout(delayedSearch, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);


  const getAllTeaLeaves = async (search,page,startDate,endDate) => {
    setLoader(true)
    await getAllTeaLeavesRecords(search ?? keyword,page || page === 0 ? page : pageIndex,startDate ?? selectedDates[0],endDate ?? selectedDates[1]).then((res) => {
      if(res.success){
        if(res.body && res.body?.content){
          setLeaves(res.body.content);
          setTotalPages(res.body.totalPages);
          setPageIndex(res.body.number);
        }
      } else {
        notifyMessage(res.message,0)
        setLeaves([]);
      }
    }).finally(()=> {setLoader(false)});
  }

  const statusChangeHandler = (id,action) => {
    errorSweetAlert("Are you sure?","",action === "ACTIVE" ? "Accept" : action === "COMPLETED" ? "Yes, Complete" : "Yes,Reject",()=> {

    },true)
  }

  return (
    <div>
      <Row className={"main-row"}>
        <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
          <Label className="font-medium-2 mt-1">Tea Leaves Records</Label>
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
              Add Tea Leaves
            </button>
          )}
        </div>

        <Col md={12}>
          <Row className="px-1">
            <div className="d-sm-flex justify-content-end d-block pb-2 p-1  filter-box rounded my-2">
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 px-sm-2">
                  <p className="mb-0">Search</p>
                  <Input placeholder={'Search by farmer'} value={keyword}  onChange={(e)=> {setKeyword(e.target.value)}} />
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
                  <p className="mb-0">Given Date</p>
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
                      getAllTeaLeaves(null,null,moment(date[0]).format("YYYY/MM/DD"),moment(date[1]).format("YYYY/MM/DD"))
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
                data={leaves}
                pointerOnHover
                highlightOnHover
                responsive
                columns={[
                  {
                    name: "ID",
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
                    name: "Date",
                    selector: (row) => row["created"],
                    sortable: false,
                    minWidth: "100px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.created ? row.created.split('T')[0] : "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "Farmer Name",
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
                    name: "Weight (Kg)",
                    selector: (row) => row["numberOfKg"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.numberOfKg ?? "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "Bag Weight (Kg)",
                    selector: (row) => row["bagWeight"],
                    sortable: false,
                    minWidth: "160px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.bagWeight ?? "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "Net Weight (Kg)",
                    selector: (row) => row["netWeight"],
                    sortable: false,
                    minWidth: "160px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.netWeight ?? "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "Tea Price for 1Kg (Rs)",
                    selector: (row) => row["todayTeaPrice"],
                    sortable: false,
                    minWidth: "180px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.todayTeaPrice ?? "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "Total Price (Rs)",
                    selector: (row) => row["totalPrice"],
                    sortable: false,
                    minWidth: "160px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.totalPrice ?? "N/A"}
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

        {!loader && totalPages > 0 && (
          <div className="w-100 d-flex justify-content-end mt-1 px-3">
            <Pagination
              activePage={pageIndex + 1}
              totalNoOfPages={totalPages}
              handlePagination={async (page) => {
                await setPageIndex(page - 1);
                await getAllTeaLeaves(null,page - 1,null,null)
              }}
            />
          </div>
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
          {`Leaves`}
        </ModalHeader>
        <ModalBody className="modal-dialog-centered">

        <AddLeaves closeModal={() => {setIsOpen(false)}}/>

        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

    </div>
  );
};

export default TeaLeavesForAdmin;
