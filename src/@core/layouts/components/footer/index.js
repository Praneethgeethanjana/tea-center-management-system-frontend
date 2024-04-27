// ** Icons Import

import { Heart } from "react-feather";

const Footer = () => {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25">
        COPYRIGHT © {new Date().getFullYear()}{" "}
        {/*<a*/}
        {/*  href="http://localhost:3000"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Tea Center Management System*/}
        {/*</a>*/}
        <span className="d-none d-sm-inline-block">Tea Center Management System , All rights Reserved</span>
      </span>
      <span className="float-md-end d-none d-md-block">
        Developed by Praneeth Geethanjana
      </span>
    </p>
  );
};

export default Footer;
