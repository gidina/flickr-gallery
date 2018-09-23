import React from 'react';
import "./Loader.css";

const Loader = ({color}) => {
    console.log("LOADER");
    return (
        <div className="loader" style={{ border: '10px solid #f3f3f3', borderTop: `10px solid ${color}` }}></div>
    );
}

// Loader.protoTypes = {
//     color: React.PropTypes.string.isRequired
// };

export default Loader;