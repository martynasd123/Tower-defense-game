import React from "react";
import PropTypes from "prop-types";
import "./style.css";
/**
 * @param py padding y axis. Padding both *-top and *-bottom
 * @param px padding x axis. Padding both *-left and *-right
 */
const MainContainer = ({
  children, py, px, background, className,
}) => (
  <main>
    <div className={`container ${py ? `py-${py}` : ""} ${className} ${px ? `px-${px}` : ""} ${background ? "container_main shadow-lg" : ""}`}>
      { children }
    </div>
  </main>
);

MainContainer.propTypes = {
  py: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  px: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  background: PropTypes.bool,
};

export default MainContainer;