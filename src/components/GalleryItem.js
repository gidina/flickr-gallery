import React from "react";
import PropTypes from 'prop-types';
import { primaryColor, secondaryColor } from "../config";
import "./GalleryItem.css";

const GalleryItem = ({ photo, onClick }) => 
    <div className="gallery_item" onClick={onClick}>
        <span className="gallery_item_preview">
            <button>Click to view</button>
            <svg
                fill={photo.media === "video" ? secondaryColor : primaryColor}
                className="gallery_top"
                viewBox="0 3 60 20"
            >
                <path d="M 0.65359477,1.3817905 C 60.201925,8.44316 121.92863,11.583451 175.81699,28.832771 l 0.6536,-28.10457531 z" />
            </svg>
            <img
                src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`}
                alt=""
            />
            <span>
                <h3>{photo.title}</h3>
                <p>{photo.description._content}</p>
            </span>
        </span>
    </div>;

GalleryItem.propTypes = {
    photo: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default GalleryItem;
