// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
// ** Third Party Components
import { Edit, Power, User } from "react-feather";

// ** Reactstrap Imports
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { CHANGE_PASSWORD_ROUTE, ROLE_ADMIN, ROUTE_LOGIN, USER_ROLE } from "@configs/constant";

// ** Default Avatar Image

const UserDropdown = () => {
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          {/*<span className="user-name fw-bold">John Doe</span>*/}
          <span className="user-name fw-bold">{USER_ROLE === ROLE_ADMIN ? "Admin" : "Patient"}</span>
          {/*<span className="user-status">Admin</span>*/}
        </div>
        {/*<Avatar*/}
        {/*  img={defaultAvatar}*/}
        {/*  imgHeight="40"*/}
        {/*  imgWidth="40"*/}
        {/*  status="offline"*/}
        {/*/>*/}
        <div className="rounded-circle p-1 bg-body border-1">
          <User className="text-primary" size={20} />
        </div>
      </DropdownToggle>
      <DropdownMenu end>
        {/*<DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>*/}
        {/*  <User size={14} className="me-75" />*/}
        {/*  <span className="align-middle">Profile</span>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>*/}
        {/*  <Mail size={14} className="me-75" />*/}
        {/*  <span className="align-middle">Inbox</span>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>*/}
        {/*  <CheckSquare size={14} className="me-75" />*/}
        {/*  <span className="align-middle">Tasks</span>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>*/}
        {/*  <MessageSquare size={14} className="me-75" />*/}
        {/*  <span className="align-middle">Chats</span>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem divider />*/}
        {/*<DropdownItem*/}
        {/*  tag={Link}*/}
        {/*  to="/pages/"*/}
        {/*  onClick={(e) => e.preventDefault()}*/}
        {/*>*/}
        {/*  <Settings size={14} className="me-75" />*/}
        {/*  <span className="align-middle">Settings</span>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>*/}
        {/*  <CreditCard size={14} className="me-75" />*/}
        {/*  <span className="align-middle">Pricing</span>*/}
        {/*</DropdownItem>*/}
        {/*<DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>*/}
        {/*  <HelpCircle size={14} className="me-75" />*/}
        {/*  <span className="align-middle">FAQ</span>*/}
        {/*</DropdownItem>*/}

        {/*<DropdownItem tag={Link} to={CHANGE_PASSWORD_ROUTE}>*/}
        {/*  <Edit size={14} className="me-75" />*/}
        {/*  <span className="align-middle">Change Password</span>*/}
        {/*</DropdownItem>*/}

        <DropdownItem tag={Link} to={ROUTE_LOGIN}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
