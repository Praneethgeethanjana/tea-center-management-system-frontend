import {
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import { notifyMessage } from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import moment from "moment/moment";
import { Dropdown } from "semantic-ui-react";
import { AlertCircle, Box, Edit, Eye } from "react-feather";
import Flatpickr from "react-flatpickr";
import Pagination from "../../@core/components/pagination/index";

const TestReportsForPatient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIdentifier, setIsIdentifier] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isDriverEdit, setIsDriverEdit] = useState(false);
  const [orders, setOrders] = useState([]);
  const [allDrivers, setAllDrivers] = useState(null);
  const [status, setStatus] = useState(0);
  const [selectedDriverId, setSelectedDriverId] = useState(0);
  const [type, setType] = useState("PICKUP");
  const [drivers, setDrivers] = useState([{ key: 0, text: "ALL", value: 0 }]);
  const [routes, setRoutes] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedRoute, setSelectedRoute] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState("");
  const [selectedDates, setSelectedDates] = useState([
    moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"),
    moment(new Date()).format("YYYY-MM-DD"),
  ]);
  const [liveDate, setLiveDate] = useState(null);


  return (
    <div>
      <Row>
        <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
          <Label className="font-medium-2 mt-1">My Reports</Label>
        </div>

        <Col md={12}>
          <Row className={"px-1"}>
            <div className="d-sm-flex  pb-2 p-1  filter-box rounded justify-content-end d-block my-2">
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 px-sm-2">
                  <p className="mb-0">Type</p>
                  <Dropdown
                    disabled={false}
                    placeholder="Type"
                    className={"form-control"}
                    fluid
                    selection
                    search={false}
                    onChange={(e, { value }) => {
                      setType(value);
                    }}
                    value={type}
                    options={[
                      // { key: "ALL", text: "All", value: 0 },
                      { key: "PICKUP", text: "PICKUP", value: "PICKUP" },
                      { key: "DELIVERY", text: "DELIVERY", value: "DELIVERY" },
                    ]}
                    selectOnBlur={false}
                  />
                </div>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 px-sm-2">
                  <p className="mb-0">Appointment ID</p>
                  <Dropdown
                    disabled={false}
                    placeholder=""
                    className={"form-control"}
                    fluid
                    selection
                    search={false}
                    onChange={(e, { value }) => {
                      setStatus(value);
                    }}
                    value={status}
                    options={[
                      { key: "ALL", text: "ALL", value: 0 },
                      { key: "ACTIVE", text: "ACTIVE", value: "ACTIVE" },
                      { key: "ONGOING", text: "ONGOING", value: "ONGOING" },
                      {
                        key: "COMPLETED",
                        text: "COMPLETED",
                        value: "COMPLETED",
                      },
                    ]}
                    selectOnBlur={false}
                  />
                </div>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 mt-2 mt-sm-0 px-sm-2">
                  <p className="mb-0">Created Date</p>
                  <Flatpickr
                    options={{
                      mode: "range",
                    }}
                    className="form-control selected-date"
                    placeholder={"Select date range"}
                    value={liveDate ? liveDate : selectedDates}
                    onChange={(date) => {
                      setLiveDate(date);
                      setSelectedDates([
                        moment(date[0]).format("YYYY-MM-DD"),
                        moment(date[1]).format("YYYY-MM-DD"),
                      ]);
                    }}
                  />
                </div>
              </Col>
            </div>
          </Row>
        </Col>

        {/*<div className="pb-3 mx-2 bg-danger">*/}

        {/*</div>*/}

        {loader ? (
          <Loader />
        ) : (
          <Col xs={12} className={"datatable-main-wrapper  mt-1"}>
            <div>
              <DataTable
                className="dataTable-custom light-table"
                data={routes}
                pointerOnHover
                highlightOnHover
                responsive
                columns={[
                  {
                    name: "ID",
                    selector: (row) => row["id"],
                    sortable: false,
                    width: "80px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.id}
                      </p>
                    ),
                  },
                  {
                    name: "ROUTE NAME",
                    selector: (row) => row["identifier"],
                    sortable: false,
                    minWidth: "100px",
                    cell: (row) => (
                      <div className="d-flex justify-content-between">
                        <div
                          onClick={() => {
                            setIsIdentifier(true);
                            setSelectedRoute(row);
                          }}
                        >
                          <Edit size={20} color={"#05930d"} />
                        </div>
                        <p
                          style={{ marginLeft: "10px" }}
                          className="text-bold-500 text-truncate mb-0"
                        >
                          {row.identifier}
                        </p>
                      </div>
                    ),
                  },
                  // {
                  //   name: "TYPE",
                  //   selector: (row) => row["orderType"],
                  //   sortable: false,
                  //   minWidth: "100px",
                  //   cell: (row) => (
                  //     <p className="text-bold-500 text-truncate mb-0">
                  //       {row.orderType}
                  //     </p>
                  //   ),
                  // },
                  {
                    name: "ROUTE STATUS",
                    selector: (row) => row["routeStatus"],
                    sortable: false,
                    minWidth: "80px",
                    cell: (row) => (
                      <div className="d-flex">
                        <p className="text-bold-500 text-truncate mb-0">
                          {row.routeStatus}
                        </p>
                        {row.isRejectionCompleted && (
                          <div style={{ marginLeft: "5px" }}>
                            <AlertCircle
                              id="rejected-tooltip"
                              size={20}
                              color={"#eac22b"}
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target="rejected-tooltip"
                            >
                              Completed with rejected orders
                              {/*Orders were rejected, too.*/}
                            </UncontrolledTooltip>
                          </div>
                        )}
                      </div>
                    ),
                  },
                  {
                    name: "DRIVER",
                    selector: (row) => row["driver.username"],
                    sortable: false,
                    minWidth: "180px",
                    cell: (row) => (
                      <div className="d-flex justify-content-between">
                        {row.routeStatus === "ACTIVE" ? (
                          <div
                            onClick={() => {
                              setIsDriverEdit(true);
                              setSelectedRoute(row);
                            }}
                          >
                            <Edit size={20} color={"#05930d"} />
                          </div>
                        ) : (
                          <div
                            onClick={() => {
                              setIsDriverEdit(true);
                              setSelectedRoute(row);
                            }}
                          >
                            <Eye size={20} color={"#05930d"} />
                          </div>
                        )}
                        <p
                          style={{ marginLeft: "10px" }}
                          className=" text-bold-500 text-truncate mb-0"
                        >
                          {row.driver.username}
                        </p>
                      </div>
                    ),
                  },
                  {
                    name: `${
                      type === "PICKUP" ? "PICKUP ORDERS" : "DELIVERY ORDERS"
                    }`,
                    selector: (row) =>
                      row[
                        `${
                          type === "PICKUP" ? "pickupOrders" : "deliveryOrders"
                        }`
                        ],
                    sortable: false,
                    cell: (row) => (
                      <div className="w-100 d-flex">
                        {type === "PICKUP" &&
                          row.pickupOrders &&
                          row.pickupOrders.length > 0 && (
                            <div
                              onClick={() => {
                                setIsOpen(true);
                                setSelectedRoute(row);
                                setOrders(row.pickupOrders);
                              }}
                            >
                              <Box
                                style={{ marginLeft: "10px" }}
                                size={25}
                                color={"#05930d"}
                              />
                            </div>
                          )}
                        {type === "DELIVERY" &&
                          row.deliveryOrders &&
                          row.deliveryOrders.length > 0 && (
                            <div
                              className="w-100 d-flex justify-content-center"
                              onClick={() => {
                                setIsOpen(true);
                                setSelectedRoute(row);
                                setOrders(row.deliveryOrders);
                              }}
                            >
                              <Box
                                style={{ marginLeft: "10px" }}
                                size={25}
                                color={"#05930d"}
                              />
                            </div>
                          )}
                      </div>
                    ),
                  },
                ]}
                noHeader={true}
              />
            </div>
            <Row>
              <div className="w-100 d-flex justify-content-end mt-1 px-1">
                {totalPages > 0 && (
                  <Pagination
                    activePage={pageNumber + 1}
                    totalNoOfPages={totalPages}
                    handlePagination={(page) => {

                    }}
                  />
                )}
              </div>
            </Row>
          </Col>
        )}
      </Row>

    </div>
  );
};

export default TestReportsForPatient;
