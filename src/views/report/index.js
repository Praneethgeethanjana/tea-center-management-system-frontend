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
import {getPaymentHistory, getPaymentHistoryForReport, getPendingPayments} from "@src/services/payments";
import Pagination from "@components/pagination";
import MonthPicker from "@components/month-picker";


const DownloadReport = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [payments, setPayments] = useState([]);
    const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null);
    const [selectedAdvances, setSelectedAdvances] = useState(null);
    const [selectedOrderList, setSelectedOrderList] = useState(null);
    const [selectedTeaLeavesList, setSelectedTeaLeavesList] = useState(null);
    const [keyword, setKeyword] = useState("");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const initialDate = `${currentYear}/${currentMonth.toString().padStart(2, '0')}`;
    const [date, setDate] = useState(new Date(initialDate));
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        setLoader(true);
        getAllPaymentHistory();
    }, [keyword]);


    const getAllPaymentHistory = async (search,page,pickedDate) => {
        setLoader(true);
        const inputDate = pickedDate ? new Date(pickedDate) : new Date(date);
        const convertYear = moment(inputDate).format('YYYY')
        const convertMonth = moment(inputDate).format('MM')
        getPaymentHistoryForReport(search ?? keyword,convertYear,convertMonth).then((res)=> {
            if(res.success){
                setPayments(res.body.content)
            }
        }).finally(()=> {setLoader(false)})

    }

    const statusChangeHandler = (id,action) => {
        errorSweetAlert("Are you sure?","",action === "ACTIVE" ? "Accept" : action === "COMPLETED" ? "Yes, Complete" : "Yes,Reject",()=> {
        },true)
    }


    return (
        <div>
            <Row className={"main-row"}>
                <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
                    <Label className="font-medium-2 mt-1">Payments History</Label>
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
                                    <MonthPicker updateHandler={getAllPaymentHistory} date={date} setDate={setDate}/>
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
                                data={payments}
                                pointerOnHover
                                highlightOnHover
                                responsive
                                columns={[
                                    {
                                        name: "ID",
                                        selector: (row) => row["farmerId"],
                                        sortable: false,
                                        width: "80px",
                                        cell: (row) => (
                                            <p className="text-bold-500 text-truncate mb-0">
                                                {row.id}
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
                                                {row.user.firstName + ' ' + row.user.lastName}
                                            </p>
                                        ),
                                    },
                                    {
                                        name: "DATE",
                                        selector: (row) => row["created"],
                                        sortable: false,
                                        minWidth: "130px",
                                        cell: (row) => (
                                            <p className="text-bold-500 text-truncate mb-0">
                                                {row.created ? row.created.split("T")[0] : "N/A"}
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
                                                {row.user.mobile ?? "N/A"}
                                            </p>
                                        ),
                                    },
                                    {
                                        name: "MONTHLY NET TOTAL",
                                        selector: (row) => row["monthlyNetTotal"],
                                        sortable: false,
                                        minWidth: "150px",
                                        cell: (row) => (
                                            <p className="text-bold-500 text-truncate mb-0">
                                                {row.monthlyNetTotal ?? "N/A"}
                                            </p>
                                        ),
                                    },
                                    {
                                        name: "PAYMENT DETAILS",
                                        selector: (row) => row[""],
                                        sortable: false,
                                        minWidth: "150px",
                                        cell: (row) => (
                                            <div className="mid-center">
                                                <div
                                                    onClick={() => {
                                                        setIsOpen(true);
                                                        setSelectedTeaLeavesList(null);
                                                        setSelectedAdvances(null);
                                                        setSelectedOrderList(null);
                                                        setSelectedPaymentDetails(row);
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
            </Row>


        </div>
    );
};

export default DownloadReport;
