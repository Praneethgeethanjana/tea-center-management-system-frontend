// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import {
  CHANGE_PASSWORD_ROUTE,
  DASHBOARD_ROUTE_PATH,
  FORGOT_PASSWORD_ROUTE,
  REPORTS_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE,
  ROUTE_LOGIN,
  ROUTES_ROUTE,
  VERIFY_ACCOUNT_ROUTE,
  USER_ROLE,
  ROLE_ADMIN,
  TEST_ROUTE_PATH,
  FARMERS_ROUTE,
  TEA_LEAVES_ROUTE,
  STOCK_ROUTE, ADVANCE_ROUTE, PAYMENTS_ROUTE, ORDERS_ROUTE, PAYMENT_HISTORY_ROUTE
} from "@configs/constant";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title


// ** Default Route
const DefaultRoute =   FARMERS_ROUTE ;

const Home = lazy(() => import("../../views/home"));

const Reports = lazy(() => import("../../views/report/index"));
const TeaLeaves = lazy(() => import("../../views/tea-leaves/index"));
const Farmers = lazy(() => import("../../views/farmers/farmers"));
const Stock = lazy(() => import("../../views/stock/index"));
const Advance = lazy(() => import("../../views/advance/index"));
const Payments = lazy(() => import("../../views/payments/index"));
const PaymentHistory = lazy(() => import("../../views/payments/payment-history"));
const Orders = lazy(() => import("../../views/order/index"));
const MedicalTests = lazy(() => import("../../views/home/medical-tests"));
const Dashboard = lazy(() => import("../../views/home/statistics"));

const Login = lazy(() => import("../../views/auth/login"));
const Register = lazy(() => import("../../views/auth/register"));
const ChangePassword = lazy(() => import("../../views/change-password"));
const ForgotPassword = lazy(() => import("../../views/auth/forgot-password"));
const ResetPassword = lazy(() => import("../../views/auth/reset-password"));
const VerifyAccount = lazy(() => import("../../views/auth/verify-account"));
const Error = lazy(() => import("../../views/error"));

// ** Merge Routes
const Routes = [
  {
    path:  "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: DASHBOARD_ROUTE_PATH,
    element: <Dashboard />,
  },
  {
    path: TEST_ROUTE_PATH,
    element: <MedicalTests />,
  },
  {
    path: REPORTS_ROUTE,
    element: <Reports/>,
  },
  {
    path: TEA_LEAVES_ROUTE,
    element: <TeaLeaves/>,
  },
  {
    path: FARMERS_ROUTE,
    element: <Farmers/>,
  },
  {
    path: STOCK_ROUTE,
    element: <Stock/>,
  },
  {
    path: ADVANCE_ROUTE,
    element: <Advance/>,
  },
  {
    path: PAYMENTS_ROUTE,
    element: <Payments/>,
  },
  {
    path: PAYMENT_HISTORY_ROUTE,
    element: <PaymentHistory/>,
  },
  {
    path: ORDERS_ROUTE,
    element: <Orders/>,
  },
  {
    path: ROUTE_LOGIN,
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: CHANGE_PASSWORD_ROUTE,
    element: <ChangePassword />,
  },
  {
    path: REGISTER_ROUTE,
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: FORGOT_PASSWORD_ROUTE,
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: RESET_PASSWORD_ROUTE,
    element: <ResetPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: VERIFY_ACCOUNT_ROUTE,
    element: <VerifyAccount />,
    meta: {
      layout: "blank",
    },
  },

  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, Routes, getRoutes };
