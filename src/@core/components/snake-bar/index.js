import React, { Fragment } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = (props) => {
  return (
    <Fragment>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={props.onClose}
      >
        <Alert
          onClose={props.onClose}
          severity="error"
          sx={{ width: "100%", position: "absolute", bottom: 0 }}
        >
          {props.text}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default SnackBar;
