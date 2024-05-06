// ** User List Component
// import Table from './Table'

// ** Reactstrap Imports
import {Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import {Database, DollarSign, Feather, Inbox, Square, User, UserCheck, UserPlus, UserX} from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import {getStatistics, getVariables} from "@src/services/statistics";
import React, {useEffect, useState} from "react";
import CreateAdvance from "@src/views/advance/modal/create-advance";
import ChangePrices from "@src/views/home/modal/change-prices";

const Statistics = () => {

  const [farmerCount,setFarmerCount] = useState(null);
  const [fertilizerKg,setFertilizerKg] = useState(null);
  const [previousMonthWithdrawal,setPreviousMonthWithdrawal] = useState(null);
  const [teaKg,setTeaKg] = useState(null);
  const [todayTeaPrice,setTodayTeaPrice] = useState(null);
  const [totalWithdrawal,setTotalWithdrawal] = useState(null);
  const [thisMonthTeaKg,setThisMonthTeaKg] = useState(null);
  const [teaFactoryPrice,setTeaFactoryPrice] = useState(null);
  const [teaCenterCharge,setTeaCenterCharge] = useState(null);
  const [isOpen,setIsOpen] = useState(false);

  useEffect(() => {
    getVariablesHandler();
    getStatisticsHandler();
  },[]);
  const getStatisticsHandler = async () => {
    getStatistics().then((res)=> {
      if(res.success && res.body) {
        setFarmerCount(res.body?.farmerCount);
        setFertilizerKg(res.body?.fertilizerKg);
        setPreviousMonthWithdrawal(res.body?.previousMonthWithdrawal);
        setTeaKg(res.body?.teaKg);
        setTotalWithdrawal(res.body?.totalWithdrawal);
        setThisMonthTeaKg(res.body?.thisMonthTeaKg)
      }
    });

  }

  const getVariablesHandler = () => {
    getVariables().then((res)=> {
      if(res.success && res.body){
        setTodayTeaPrice(res?.body?.todayTeaPrice)
        setTeaFactoryPrice(res?.body?.teaFactoryPrice)
        setTeaCenterCharge(res?.body?.teaCenterCharge)
      }
    })
  }

  return (
    <div className="app-user-list">
      <Row className={"mt-1"}>
        <Col md={3} className={"d-flex justify-content-center align-items-center"}>
          <div>
            <h4>Factory Price for 1Kg</h4>
            <h3> Rs {teaFactoryPrice}</h3>
          </div>
        </Col>
        <Col md={3} className={"d-flex justify-content-center align-items-center"}>
          <div>
            <h4>Tea Center Charge for 1Kg</h4>
            <h3>Rs {teaCenterCharge}</h3>
          </div>
        </Col>
        <Col md={3} className={"d-flex justify-content-center align-items-center"}>
          <div>
            <h4>Today Tea leaves price for 1Kg</h4>
            <h3>Rs {todayTeaPrice}</h3>
          </div>
        </Col>
        <Col md={3} className={"d-flex justify-content-center align-items-center"}>
          <div>
           <button onClick={()=> {setIsOpen(true)}} className="btn btn-warning">Change Prices</button>
          </div>
        </Col>

      </Row>
      <Row className="mt-3">
        {/*<Col lg="6" sm="6">*/}
        {/*  <StatsHorizontal*/}
        {/*      color="warning"*/}
        {/*      statTitle="Today Leaves Price for 1Kg"*/}
        {/*      icon={<UserX size={20} />}*/}
        {/*      renderStats={<h3 className="fw-bolder mb-75">Rs {todayTeaPrice ?? 0}</h3>}*/}
        {/*  />*/}

        {/*</Col>*/}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Farmers"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{farmerCount ?? 0}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
              color="primary"
              statTitle="This month all tea leaves"
              icon={<Feather size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{thisMonthTeaKg ?? 0} Kg</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Tea"
            icon={<Square size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{teaKg ?? 0} Kg</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Fertilizers"
            icon={<Inbox size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{fertilizerKg ?? 0} Kg</h3>}
          />
        </Col>

        <Col lg="3" sm="6">
          <StatsHorizontal
              color="danger"
              statTitle="Prev.Month Withdrawal"
              icon={<DollarSign size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">Rs {previousMonthWithdrawal ?? 0}</h3>}
          />
        </Col>

        <Col lg="3" sm="6">
          <StatsHorizontal
              color="info"
              statTitle="Total Withdrawal"
              icon={<Database size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">Rs {totalWithdrawal ?? 0}</h3>}
          />
        </Col>

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
          {`Change Prices`}
        </ModalHeader>
        <ModalBody className="modal-dialog-centered">

         <ChangePrices todayTeaPrice={todayTeaPrice} teaFactoryPrice={teaFactoryPrice} teaCenterCharge={teaCenterCharge} updateHandler={getVariablesHandler}  closeModal={()=> {setIsOpen(false)}}/>

        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>

    </div>
  );
};

export default Statistics;
