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
import {Box, Edit, Eye, File, Plus, Trash2} from "react-feather";
import { useNavigate } from "react-router-dom";
import CreateAdvance from "@src/views/advance/modal/create-advance";
import {deleteTeaLeaves, getAllTeaLeavesRecords} from "@src/services/tea-leaves";
import {deleteAdvance, getAllAdvanceDetails} from "@src/services/advance";
import swal from "sweetalert";
import Pagination from "@components/pagination";
import CreateOrder from "@src/views/order/modal/create-order";
import {deleteOrder, getAllOrders} from "@src/services/order";
import OrderItemDetails from "@src/views/order/modal/order-item-details";


const Order = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState("ALL");
    const [keyword, setKeyword] = useState("");
    const [selectedDates, setSelectedDates] = useState([
        moment(new Date()).subtract(1, "month").format("YYYY/MM/DD"),
        moment(new Date()).format("YYYY/MM/DD")
    ]);
    const [liveDate, setLiveDate] = useState(null);
    const [totalPages, setTotalPages] = useState("");
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        setLoader(true);
        getAllOrderDetails();
    }, [keyword]);


    const getAllOrderDetails = async (search,page,startDate,endDate) => {
        setLoader(true)
        await getAllOrders(search ?? keyword,page || page === 0 ? page : pageIndex,startDate ?? selectedDates[0],endDate ?? selectedDates[1]).then((res) => {
            if(res.success){
                if(res.body && res.body?.content){
                    setOrders(res.body.content);
                    setTotalPages(res.body.totalPages);
                    setPageIndex(res.body.number);
                }
            } else {
                notifyMessage(res.message,0)
                setOrders([]);
            }
        }).finally(()=> {setLoader(false)});
    }

    const deleteConformer = (id) => {
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
                    deleteOrderHandler(id);
                    break;
                default:
            }
        });
    };

    const deleteOrderHandler = async (id) => {
        await deleteOrder(id).then((res) => {
            if(res.success) {
                notifyMessage(res.message,1);
                getAllOrderDetails();
            } else {
                notifyMessage(res.message,0);
            }
        })
    }



    return (
        <div>
            <Row className={"main-row"}>
                <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
                    <Label className="font-medium-2 mt-1">Order for Farmers</Label>
                    {!loader && (
                        <button
                            onClick={() => {
                                setIsOpen(true);
                            }}
                            type="button"
                            className="btn btn-primary"
                        >
                            <Plus style={{marginRight:5}} size="15" />
                            Create
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
                                            getAllOrderDetails(null,null,moment(date[0]).format("YYYY/MM/DD"),moment(date[1]).format("YYYY/MM/DD"))
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
                                data={orders}
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
                                        name: "FARMER NAME",
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
                                        name: "DATE",
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
                                        name: "TOTAL AMOUNT",
                                        selector: (row) => row["totalAmount"],
                                        sortable: false,
                                        minWidth: "130px",
                                        cell: (row) => (
                                            <p className="text-bold-500 text-truncate mb-0">
                                                Rs {row.totalAmount ?? "N/A"}
                                            </p>
                                        ),
                                    },
                                    {
                                        name: "ORDER ITEMS",
                                        selector: (row) => row["farmerOrders"],
                                        sortable: false,
                                        minWidth: "130px",
                                        cell: (row) => (
                                            <div className="mid-center">
                                                <div
                                                    onClick={() => {
                                                         setIsOpen(true);
                                                        setSelectedOrder(row);
                                                    }}
                                                >
                                                    <Box
                                                        style={{ marginLeft: "10px" }}
                                                        size={25}
                                                        color={"#05930d"}
                                                    />
                                                </div>
                                            </div>
                                        ),
                                    },
                                    {
                                        name: "ACTIONS",
                                        minWidth: "200px",
                                        selector: (row) => row[""],
                                        sortable: false,
                                        cell: (row) => (
                                            <div className={"mid-center"}>
                                                {/*<button*/}
                                                {/*    className={"tbl-status-btn"}*/}
                                                {/*    onClick={() => {*/}
                                                {/*        setSelectedOrder(row);*/}
                                                {/*        setIsOpen(true);*/}
                                                {/*    }}*/}
                                                {/*>*/}
                                                {/*    <Edit size="15" />*/}
                                                {/*</button>*/}
                                                <button
                                                    className={"tbl-status-btn"}
                                                    onClick={() => deleteConformer(row.id)}
                                                >
                                                    <Trash2 size="15" />
                                                </button>
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
                                await getAllOrderDetails(null,page - 1,null,null)
                            }}
                        />
                    </div>
                )}
            </Row>

            <Modal
                size={'lg'}
                isOpen={isOpen}
            >
                <ModalHeader
                    toggle={() => {
                        setIsOpen(false);
                        setSelectedOrder(null);
                    }}
                    className={"selector-wrapper font-medium-2 inline-flex"}
                >
                    {`${selectedOrder ? "Order Item Details" : 'Create Order'}`}
                </ModalHeader>
                <ModalBody className="modal-dialog-centered">

                    {selectedOrder ? <OrderItemDetails details={selectedOrder.farmerOrders} totalAmount={selectedOrder.totalAmount} closeModal={()=> {
                        setIsOpen(false)
                        setSelectedOrder(null)
                    }}/> :
                        <CreateOrder details={selectedOrder} updateHandler={getAllOrderDetails} closeModal={() => {
                            setIsOpen(false)
                            setSelectedOrder(null);
                        }}/>
                    }

                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>

        </div>
    );
};

export default Order;