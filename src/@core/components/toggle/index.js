import React from "react";
import "./index.scss";

const ToggleSwitch = ({ data, isChecked, updateHandler }) => {
  const handleToggle = () => {
    updateHandler({ driverId: data.id, enableStatus: !isChecked });
  };

  return (
    <div className="toggle-switch">
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
