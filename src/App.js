import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/router";
import "toastr/build/toastr.min.css";

const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
