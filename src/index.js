// ** React Imports
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "flatpickr/dist/themes/material_green.css";

// ** Redux Imports
import { store } from "./redux/store";
import { Provider } from "react-redux";

//Toastr
// ** ThemeColors Context
import { ThemeContext } from "./utility/context/ThemeColors";

// ** ThemeConfig
// ** Toast
import "react-toastify/dist/ReactToastify.css";

// ** Spinner (Splash Screen)
import Spinner from "./@core/components/spinner/Fallback-spinner";

// ** Ripple Button
import "./@core/components/ripple-button";

// ** PrismJS
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx.min";

// ** React Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// ** React Hot Toast Styles
import "@styles/react/libs/react-hot-toasts/react-hot-toasts.scss";

// ** Core styles
import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import "./assets/scss/style.scss";

//Mobile input
import "react-intl-tel-input/dist/main.css";
import "react-datepicker/dist/react-datepicker.css";

// ** Service Worker
import * as serviceWorker from "./serviceWorker";
import { ToastContainer } from "react-toastify";

// ** Lazy load app
const LazyApp = lazy(() => import("./App"));

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <ThemeContext>
          <LazyApp />
          {/*<Toaster*/}
          {/*  position={themeConfig.layout.toastPosition}*/}
          {/*  toastOptions={{ className: "react-hot-toast" }}*/}
          {/*/>*/}
          <ToastContainer
            theme="colored"
            position="top-right"
            autoClose={3000}
          />
        </ThemeContext>
      </Suspense>
    </Provider>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
