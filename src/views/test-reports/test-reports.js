
import React, {  } from "react";
import { ROLE_ADMIN, USER_ROLE } from "@configs/constant";
import TestReportsForAdmin from "@src/views/test-reports/admin-view";
import TestReportsForPatient from "@src/views/test-reports/patient-view";

const TestReports = () => {
  return (
    <div>
      {USER_ROLE === ROLE_ADMIN ? <TestReportsForAdmin/> : <TestReportsForPatient/>}
    </div>
  );
};

export default TestReports;
