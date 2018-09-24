import React from "react";
import "./Loader.css";

const Loader = ({ color }) => {
  return (
    <div
      className="loader"
      style={{ border: "10px solid #f3f3f3", borderTop: `10px solid ${color}` }}
    />
  );
};

// Loader.protoTypes = {
//     color: React.PropTypes.string.isRequired
// };

export default Loader;
