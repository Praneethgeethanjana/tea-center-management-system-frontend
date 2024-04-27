import {
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

import React, { useEffect, useState } from "react";

import Loader from "@components/spinner/Loader";
import { Box, Eye, Plus } from "react-feather";
import { useNavigate } from "react-router-dom";
import { getMedicalTests } from "@src/services/statistics";


const MedicalTests = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [tests, setTests] = useState([]);

  const [isAssignModal, setIsAssignModal] = useState(false);

  useEffect(() => {
    getAllTests();
  }, []);


 const getAllTests = async () => {
   setLoader(true);
   await getMedicalTests().then((res) => {
     if(res.success) {
       setTests(res.body);
     } else {
       setTests([])
     }
   }).finally(()=> {
     setLoader(false);
   })
 }


  return (
    <div>
      <Row className={"main-row"}>
        <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
          <Label className="font-medium-2 mt-1">OUR MEDICAL TESTS</Label>
          {!loader && (
            <button
              onClick={() => {
                setIsAssignModal(true);
              }}
              type="button"
              className="btn btn-primary"
            >
              <Plus size="15" />
              NEW APPOINTMENT
            </button>
          )}
        </div>


        {loader ? (
          <Loader />
        ) : (
          <Col xs={12} className={"datatable-main-wrapper mt-5"}>
            {
              tests.length > 0 ?
                <div className="d-flex" >
                  {tests.map((item,index) => (
                    <div className="shadow-lg m-1 p-1 rounded-3" key={index}>
                      <h3 className="font-medium-3">{item.testName}</h3>
                      <p>{item.description}</p>
                      <h5>Rs {item.fee}/=</h5>
                    </div>
                  ))}
                </div>
                :
                <div>

                </div>
            }
          </Col>
        )}
      </Row>

      <Modal
        size={'lg'}
        isOpen={isOpen || isAssignModal}
      >
        <ModalHeader
          toggle={() => {
            setIsOpen(false);
            setIsAssignModal(false);
          }}
          className={"selector-wrapper font-medium-2 inline-flex"}
        >
          {`Create New Appointment`}
        </ModalHeader>
        <ModalBody className="modal-dialog-centered">



        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default MedicalTests;
