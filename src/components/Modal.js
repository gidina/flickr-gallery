import React, { Fragment } from "react";
import Loader from "./Loader";
import "./Modal.css";
import { blueColor } from "../config";

const Modal = ({ isLoading, photo, onClose }) => {
  return (
    <div className="gallery_item_full">
      {isLoading ? (
        <Loader color={blueColor} />
      ) : (
        <Fragment>
          <span className="close" onClick={() => onClose()}>
            &times;
          </span>
          <div className="box">
            {photo.isVideo ? (
              <embed src={photo.source} />
            ) : (
              <img src={photo.source} alt="" />
            )}
            <h3>{photo.title}</h3> - <h4 onClick={() => window.open(photo.redirectURL)}>{photo.username}</h4>
            <p>{photo.description}</p>
          </div>
        </Fragment>
      )}
    </div>
  );
};

// Modal.protoTypes = {
// onClose: PropTypes.function.isRequires
// };

export default Modal;
