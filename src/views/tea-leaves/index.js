
import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN, ROLE_FARMER, USER_ROLE } from "../../configs/constant";
import TeaLeavesForFarmer from "@src/views/tea-leaves/farmer-view";
import TeaLeavesForAdmin from "@src/views/tea-leaves/admin-view";


const TeaLeaves = () => {
  return (
    <div>
      {USER_ROLE === ROLE_FARMER ? <TeaLeavesForFarmer/> : <TeaLeavesForAdmin/>}
    </div>
  );
};

export default TeaLeaves;
