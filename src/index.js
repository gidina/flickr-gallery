import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// import './reset.css';

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
