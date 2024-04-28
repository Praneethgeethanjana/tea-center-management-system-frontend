// ** User List Component
// import Table from './Table'

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserCheck, UserPlus, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import {getStatistics, getVariables} from "@src/services/statistics";
import {useEffect, useState} from "react";

const Statistics = () => {

  const [farmerCount,setFarmerCount] = useState(null);
  const [fertilizerKg,setFertilizerKg] = useState(null);
  const [previousMonthWithdrawal,setPreviousMonthWithdrawal] = useState(null);
  const [teaKg,setTeaKg] = useState(null);
  const [todayTeaPrice,setTodayTeaPrice] = useState(null);
  const [totalWithdrawal,setTotalWithdrawal] = useState(null);
  const [thisMonthTeaKg,setThisMonthTeaKg] = useState(null);

  useEffect(() => {
    getStatisticsHandler();
  },[]);
  const getStatisticsHandler = async () => {
    getStatistics().then((res)=> {
      if(res.success && res.body) {
        setFarmerCount(res.body?.farmerCount);
        setFertilizerKg(res.body?.fertilizerKg);
        setPreviousMonthWithdrawal(res.body?.previousMonthWithdrawal);
        setTeaKg(res.body?.teaKg);
        setTodayTeaPrice(res.body?.todayTeaPrice);
        setTotalWithdrawal(res.body?.totalWithdrawal);
        setThisMonthTeaKg(res.body?.thisMonthTeaKg)
      }
    });
    getVariables().then((res)=> {
    console.log(res)
    })
  }

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
              color="warning"
              statTitle="Today Leaves Price for 1Kg"
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">Rs {todayTeaPrice ?? 0}</h3>}
          />
        </Col>
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
              color="danger"
              statTitle="This month all tea leaves"
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{thisMonthTeaKg ?? 0} Kg</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Tea"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{teaKg ?? 0} Kg</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Fertilizers"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{fertilizerKg ?? 0} Kg</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Total Withdrawal"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">Rs {totalWithdrawal ?? 0}</h3>}
          />
        </Col>

        <Col lg="3" sm="6">
          <StatsHorizontal
              color="warning"
              statTitle="Prev.Month Withdrawal"
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">Rs {previousMonthWithdrawal ?? 0}</h3>}
          />
        </Col>

      </Row>
    </div>
  );
};

export default Statistics;
