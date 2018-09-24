import React, { Component, Fragment } from "react";
import { redColor, blueColor } from "../config";
import Pagination from "./Pagination";
import "./Gallery.css";

const midaFotos = "b";

class Gallery extends Component {
  state = { currentPhotos: this.props.photos };
  onPageChange = (startIndex, endIndex) => {
    const { photos } = this.props;
    const currentPhotos = photos.slice(startIndex, endIndex + 1);
    this.setState({ ...this.state, currentPhotos });
  };
  render = () => {
    const { photos, onClickPhoto } = this.props;
    const { currentPhotos } = this.state;
    return (
      <Fragment>
        <div className="gallery">
          {currentPhotos.map(foto => (
            <div
              key={foto.id}
              className="gallery_item"
              onClick={() => onClickPhoto(foto)}
            >
              <span
                className="gallery_item_preview"
                onClick={() =>
                  this.setState({
                    ...this.state,
                    isModalOpen: true,
                    fotoSeleccionada: foto
                  })
                }
              >
                <button>Click to view</button>
                <svg
                  fill={foto.media === "video" ? blueColor : redColor}
                  className="gallery_top"
                  viewBox="0 3 60 20"
                >
                  <path d="M 0.65359477,1.3817905 C 60.201925,8.44316 121.92863,11.583451 175.81699,28.832771 l 0.6536,-28.10457531 z" />
                </svg>
                <img
                  src={`https://farm${foto.farm}.staticflickr.com/${
                    foto.server
                  }/${foto.id}_${foto.secret}_${midaFotos}.jpg`}
                  alt=""
                />
                <span>
                  <h3>{foto.title} - {foto.ownername}</h3>
                  <p>{foto.description._content}</p>
                </span>
              </span>
            </div>
          ))}
        </div>
        <Pagination numItems={photos.length} onPageChange={this.onPageChange} />
      </Fragment>
    );
  };
}

// Gallery.protoTypes = {
//     photos: React.PropTypes.array.isRequired
// };

export default Gallery;
