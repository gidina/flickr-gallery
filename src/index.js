import React from 'react';
import ReactDOM from "react-dom";
import Galeria from "./js/components/Galeria";
import './reset.css';

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<Galeria />, wrapper) : false;