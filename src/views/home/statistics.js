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

const Statistics = () => {
  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Farmers"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">459</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Tea Leaves"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">367</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Fertilizers"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">67</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Income"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">37</h3>}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;
