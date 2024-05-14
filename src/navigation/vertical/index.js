import {
  Activity,
  Box,
  FileText,
  Crosshair,
  Feather,
  Map,
  MessageSquare,
  Users, Book, CheckSquare, FolderPlus, Bookmark, DollarSign, Archive, File, Disc, MapPin
} from "react-feather";
import {
  USER_ROLE,
  ROLE_ADMIN,
  DASHBOARD_ROUTE_PATH,
  FARMERS_ROUTE,
  ROLE_FARMER,
  TEA_LEAVES_ROUTE,
  STOCK_ROUTE,
  ADVANCE_ROUTE,
  PAYMENTS_ROUTE,
  ORDERS_ROUTE,
  PAYMENT_HISTORY_ROUTE, LOCATIONS_ROUTE
} from "../../configs/constant";


 const navigationItems = [
   {
     id: "home",
     title: "Dashboard",
     icon: <FolderPlus size={20} />,
     navLink: DASHBOARD_ROUTE_PATH,
     roles:[ROLE_FARMER,ROLE_ADMIN]
   },
  {
    id: "tea-leaves",
    title: "Tea Leaves",
    icon: <Feather size={20} />,
    navLink: TEA_LEAVES_ROUTE,
    roles:[ROLE_FARMER,ROLE_ADMIN],
  },
   {
     id: "stock",
     title: "Stock",
     icon: <Box size={20} />,
     navLink: STOCK_ROUTE,
     roles:[ROLE_FARMER,ROLE_ADMIN]
   },
   {
     id: "farmers",
     title: "Farmers",
     icon: <Users size={20} />,
     navLink: FARMERS_ROUTE,
     roles:[ROLE_ADMIN,ROLE_FARMER]
   },
   {
     id: "orders",
     title: "Orders",
     icon: <Archive size={20} />,
     navLink: ORDERS_ROUTE,
     roles:[ROLE_ADMIN,ROLE_FARMER]
   },
   {
     id: "advance",
     title: "Advance",
     icon: <Bookmark size={20} />,
     navLink: ADVANCE_ROUTE,
     roles:[ROLE_ADMIN,ROLE_FARMER]
   },
   {
     id: "payments",
     title: "Payments",
     icon: <DollarSign size={20} />,
     // navLink: PAYMENTS_ROUTE,
     roles:[ROLE_ADMIN,ROLE_FARMER],
     children:[
       {
         id: "pending-payments",
         title: "Pending Payment",
         icon: <Disc size={20} />,
         navLink: PAYMENTS_ROUTE,
         roles:[ROLE_ADMIN,ROLE_FARMER]
       },
       {
         id: "payment-history",
         title: "Payment History",
         icon: <Disc size={20} />,
         navLink: PAYMENT_HISTORY_ROUTE,
         roles:[ROLE_ADMIN,ROLE_FARMER]
       },
     ]
   },

   {
     id: "locations",
     title: "Locations",
     icon: <MapPin size={20} />,
     navLink: LOCATIONS_ROUTE,
     roles:[ROLE_ADMIN,ROLE_FARMER]
   },
];

const userRole = USER_ROLE;

export default navigationItems.filter(item => {
  if (!item.roles || item.roles.includes(userRole)) {
    return true;
  }
  return false;
});