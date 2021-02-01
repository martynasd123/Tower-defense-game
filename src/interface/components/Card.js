import React from "react";
import PropTypes from "prop-types";

/**
 * @param cardTitle Card title set in header
 */
const Card = ({ children, cardTitle }) => (
  <div className="card shadow mb-4">
    <div className="card-header">{cardTitle}</div>
    <div className="card-body">
      { children }
    </div>
  </div>
);

export default Card;

Card.propTypes = {
  cardTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};