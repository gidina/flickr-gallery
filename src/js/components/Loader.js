import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {
  render() {
    const { color } = this.props;
    return (
        <div className="loader" style={{ border: '10px solid #f3f3f3', borderTop: `10px solid ${color}` }}></div>
    );
  }
}

export default Loader;