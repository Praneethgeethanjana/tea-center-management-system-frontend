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
import CreateVariant from "@src/views/stock/modal/create-variant";
import {deleteStock, getAllStockDetails} from "@src/services/stock";
import Pagination from "@components/pagination";
import swal from "sweetalert";
import {deleteAdvance} from "@src/services/advance";
import {useSkin} from "@hooks/useSkin";


const Stock = () => {
  const {skin} = useSkin();
  const [loader, setLoader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [status, setStatus] = useState("ALL");
  const [keyword, setKeyword] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    setLoader(true);
    getStockDetails();
  }, [keyword]);


  const getStockDetails = async (search,page,type) => {
    setLoader(true);
    getAllStockDetails(search ?? keyword,page || page === 0 ? page : pageIndex,type ?? status).then((res) => {
      if(res.success){
        if(res.body.content) {
          setStocks(res.body.content);
          setTotalPages(res.body.totalPages);
          setPageIndex(res.body.number);
        }
      }
    }).finally(() => {setLoader(false)});
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
          deleteStockHandler(id);
          break;
        default:
      }
    });
  };

  const deleteStockHandler = async (id) => {
    await deleteStock(id).then((res) => {
      if(res.success) {
        notifyMessage(res.message,1);
        getStockDetails();
      } else {
        notifyMessage(res.message,0);
      }
    })
  }

  return (
    <div>
      <Row className={"main-row"}>
        <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
          <Label className="font-medium-2 mt-1">Our Stock</Label>
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
              Add Item
            </button>
          )}
        </div>

        <Col md={12}>
          <Row className="px-1">
            <div className="d-sm-flex justify-content-end d-block pb-2 p-1  filter-box rounded my-2">
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 px-sm-2">
                  <p className="mb-0">Search</p>
                  <Input placeholder={'Search by variant name'}  onChange={(e)=> {setKeyword(e.target.value)}} />
                </div>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 px-sm-2">
                  <p className="mb-0">Status</p>
                  <Dropdown
                    disabled={false}
                    placeholder=""
                    className={"form-control"}
                    fluid
                    selection
                    search={false}
                    onChange={(e, { value }) => {
                      setStatus(value);
                      getStockDetails(keyword,pageIndex,value)
                    }}
                    value={status}
                    options={[
                      { key: "ALL", text: "All", value: "ALL" },
                      { key: "TEA", text: "Tea", value: "TEA" },
                      { key: "FERTILIZER", text: "Fertilizer", value: "FERTILIZER" },
                    ]}
                    selectOnBlur={false}
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
                  className={`dataTable-custom ${skin === "dark" ? "dark-table" : "light-table"}`}
                data={stocks}
                pointerOnHover
                highlightOnHover
                responsive
                columns={[
                  {
                    name: "Variant Name",
                    selector: (row) => row["variant"],
                    sortable: false,
                    minWidth: "150px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.variant ?? "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "Stock Type",
                    selector: (row) => row["stockType"],
                    sortable: false,
                    minWidth: "100px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.stockType ?? "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "Qty",
                    selector: (row) => row["availableSize"],
                    sortable: false,
                    minWidth: "200px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.availableSize} Kg
                      </p>
                    ),
                  },
                  {
                    name: "Price of 1 Kg",
                    selector: (row) => row["oneKgPrice"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        Rs {row.oneKgPrice}
                      </p>
                    ),
                  },
                  {
                    name: "ACTIONS",
                    minWidth: "200px",
                    selector: (row) => row[""],
                    sortable: false,
                    cell: (row) => (
                        <div className={"mid-center"}>
                          <button
                              className={"tbl-status-btn"}
                              onClick={() => {
                                setSelectedVariant(row);
                                setIsOpen(true);
                              }}
                          >
                            <Edit size="15" />
                          </button>
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
                    await getStockDetails(null,page - 1,null);
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
          {`${selectedVariant ? "Update" : "Create"} Variant`}
        </ModalHeader>
        <ModalBody className="modal-dialog-centered">

          <CreateVariant updateHandler={getStockDetails} details={selectedVariant} closeModal={() => {
            setIsOpen(false)
            setSelectedVariant(null)
          }}/>

        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

    </div>
  );
};

export default Stock;
