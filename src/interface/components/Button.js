import React from "react";
import "./style.css";
import PropTypes from "prop-types";

/**

 * @param onClick - button click function
 * @param name - button name/title
 * @param color - button color
 * @param iconName - icon name if needed
 * @param className - additional CSS
 * @param title - title displayed on hover
 * @param mx - margin x
 * @param my - margin y
 * @param iconClassName - additional icon CSS
 * @param type - button type
 * @param dataToggle - dataToggle for dropdown open button
 */

const Button = ({
  onClick, disabled, name, color, iconName, className, onHoverTitle, type, children, mx, my, iconClassName, dataToggle, dataKey
}) => (
  <button
    type={type || "button"}
    className={`btn ${color ? `btn-${color}` : ""} ${className || ""} ${iconName ? "btn-icon" : ""} mx-${mx} my-${my}`}
    name={name}
    disabled={disabled}
    onClick={onClick}
    title={onHoverTitle}
    data-toggle={dataToggle}
    data-key={dataKey}
  >
    {iconName ? (
      <span className={`material-icons ${iconClassName || ""}`}>
        {iconName}
      </span>
    ) : ""}
    {children}
  </button>
);

export default Button;

Button.defaultProps = {
  mx: 1,
  my: 1,
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onHoverTitle: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  color: PropTypes.string,
  iconName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  mx: PropTypes.number,
  my: PropTypes.number,
  iconClassName: PropTypes.string,
  dataToggle: PropTypes.string,
  dataKey: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
      PropTypes.object,
    ])),
  ]),
};