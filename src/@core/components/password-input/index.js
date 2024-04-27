// ** React Imports
import React, { Fragment, useState } from "react";

// ** Third Party Components
import PropTypes from "prop-types";
import classnames from "classnames";
import { Eye, EyeOff } from "react-feather";
import { Input, InputGroup, InputGroupText } from "reactstrap";

const InputPasswordToggle = (props) => {
  // ** Props
  const {
    label,
    hideIcon,
    showIcon,
    visible,
    className,
    htmlFor,
    placeholder,
    iconSize,
    inputClassName,
    bsSize,
    name,
    onChange,
    id,
    ...rest
  } = props;

  // ** State
  const [inputVisibility, setInputVisibility] = useState(visible);

  // ** Renders Icon Based On Visibility
  const renderIcon = () => {
    const size = iconSize ? iconSize : 14;

    if (inputVisibility === false) {
      return hideIcon ? hideIcon : <Eye size={size} />;
    } else {
      return showIcon ? showIcon : <EyeOff size={size} />;
    }
  };

  return (
    <Fragment>
      <InputGroup
        className={classnames({
          [className]: className,
        })}
      >
        <Input
          id={id}
          bsSize={bsSize}
          type={!inputVisibility ? "password" : "text"}
          placeholder={placeholder ? placeholder : "············"}
          name={name}
          onChange={onChange}
        />

        <InputGroupText
          style={{ height: "35px" }}
          onClick={() => setInputVisibility(!inputVisibility)}
          className="cursor-pointer"
        >
          {renderIcon()}
        </InputGroupText>
      </InputGroup>
    </Fragment>
  );
};

export default InputPasswordToggle;

// ** PropTypes
InputPasswordToggle.propTypes = {
  hideIcon: PropTypes.node,
  showIcon: PropTypes.node,
  visible: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  iconSize: PropTypes.number,
  inputClassName: PropTypes.string,
  label(props, propName, componentName) {
    // ** If label is defined and htmlFor is undefined throw error
    if (props[propName] && props["htmlFor"] === "undefined") {
      throw new Error("htmlFor prop is required when label prop is present");
    }
  },
  htmlFor(props, propName, componentName) {
    // ** If htmlFor is defined and label is undefined throw error
    if (props[propName] && props["label"] === "undefined") {
      throw new Error("label prop is required when htmlFor prop is present");
    }
  },
};

// ** Default Props
InputPasswordToggle.defaultProps = {
  visible: false,
};
