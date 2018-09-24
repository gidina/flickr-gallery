import React from "react";
import PropTypes from 'prop-types';

import "./Loader.css";

const Loader = ({ color }) => <div 
  className="loader" 
  style={{ border: "10px solid #f3f3f3", borderTop: `10px solid ${color}` }} 
  />;

Loader.propTypes = {
    color: PropTypes.string.isRequired
};

export default Loader;
