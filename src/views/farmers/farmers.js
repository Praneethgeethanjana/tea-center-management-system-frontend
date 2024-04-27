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
import swal from "sweetalert";

import {
  checkAMPM,
  downloadCSV,
  notifyMessage,
} from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import moment from "moment/moment";
import { Checkbox, Dropdown, Form } from "semantic-ui-react";
import Flatpickr from "react-flatpickr";
import { Box, Edit, Eye, File, Plus, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import CreateFarmer from "@src/views/farmers/modal/create-farmer";
import { getFarmers } from "@src/services/farmers";
import Pagination from "@components/pagination";


const Farmers = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [isCreateFarmer, setIsCreateFarmer] = useState(false);



  useEffect( () => {
    setLoader(true);
    let timer;
    const  delayedSearch = async () => {
      await getAllFarmers();
    };
    timer = setTimeout(delayedSearch, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);



  const getAllFarmers = async (search,page) => {
    setLoader(true);
    await getFarmers(search ?? keyword ,page || page === 0 ? page : pageIndex).then((res) => {
      if(res.success) {
       if(res.body && res.body?.content) {
         setTotalPages(res.body.totalPages)
         setPageIndex(res.body.number)
         setFarmers(res.body.content)
       }
      } else {
        notifyMessage(res.message,0)
        setFarmers([])
      }
    }).finally(() => {setLoader(false);})
  }

  const deleteConformer = (obj) => {
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
          deleteDriverHandler(obj);
          break;
        default:
      }
    });
  };

  const deleteDriverHandler = () => {

  }


  return (
    <div>
      <Row className={"main-row"}>
        <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
          <Label className="font-medium-2 mt-1">Tea Farmers</Label>
          {!loader && (
            <button
              onClick={() => {
                setIsCreateFarmer(true);
              }}
              type="button"
              className="btn btn-primary"
            >
              <Plus style={{marginRight:5}} size="15" />
              Add New Farmer
            </button>
          )}
        </div>

        <Col md={12}>
          <Row className="px-1">
            <div className="d-sm-flex justify-content-end d-block pb-2 p-1  filter-box rounded my-2">
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 px-sm-2">
                  <p className="mb-0">Search</p>
                  <Input placeholder={'Search farmers'}  onChange={(e)=> {setKeyword(e.target.value)}} />
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
              {/*        getAllPatients(null,null,value)*/}
              {/*      }}*/}
              {/*      value={status}*/}
              {/*      options={[*/}
              {/*        { key: "ALL", text: "ALL", value: "ALL" },*/}
              {/*        { key: "PENDING", text: "PENDING", value: "PENDING" },*/}
              {/*        { key: "ACTIVE", text: "ACCEPTED", value: "ACTIVE" },*/}
              {/*        { key: "REJECTED", text: "REJECTED", value: "REJECTED" },*/}
              {/*      ]}*/}
              {/*      selectOnBlur={false}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*</Col>*/}
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
                data={farmers}
                pointerOnHover
                highlightOnHover
                responsive
                columns={[
                  {
                    name: "First Name",
                    selector: (row) => row["firstName"],
                    sortable: false,
                    minWidth: "80px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.firstName}
                      </p>
                    ),
                  },
                  {
                    name: "Last Name",
                    selector: (row) => row["lastName"],
                    sortable: false,
                    minWidth: "80px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row?.lastName}
                      </p>
                    ),
                  },
                  {
                    name: "Mobile",
                    selector: (row) => row["mobile"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.mobile ?? "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "Address",
                    selector: (row) => row["address"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.address ??  "N/A"}
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
                            setSelectedFarmer(row);
                            setIsCreateFarmer(true);
                          }}
                        >
                          <Edit size="15" />
                        </button>
                        <button
                          className={"tbl-status-btn"}
                          onClick={() => deleteConformer(row)}
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
                await getAllFarmers(keyword,page - 1)
              }}
            />
          </div>
        )}

      </Row>

      <Modal
        size={'lg'}
        isOpen={isCreateFarmer}
      >
        <ModalHeader
          toggle={() => {
            setIsCreateFarmer(false);
            setSelectedFarmer(null)
          }}
          className={"selector-wrapper font-medium-2 inline-flex"}
        >
          {`Create New Farmer`}
        </ModalHeader>
        <ModalBody className="modal-dialog-centered">

          <CreateFarmer farmer={selectedFarmer} updateHandler={getAllFarmers} closeModal={()=> {setIsCreateFarmer(false)}}/>

        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

    </div>
  );
};

export default Farmers;
