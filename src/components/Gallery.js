import React, { Component, Fragment } from "react";
import GalleryItem from "./GalleryItem";
import Pagination from "./Pagination";
import "./Gallery.css";

const breakpointDesktop = 1047;

class Gallery extends Component {
  state = {
    currentPhotos: this.props.photos,
    isDesktop: window.innerWidth > breakpointDesktop
  }
  resizeHandler = () => {
    const isDesktopCurrent = window.innerWidth > breakpointDesktop;

    if (this.state.isDesktop === isDesktopCurrent) return;

    if (isDesktopCurrent) {
      this.setState({
        ...this.state,
        isDesktop: isDesktopCurrent
      });
      return;
    }

    // currentPhotos se inicializa a todas la fotos cuando no es Desktop
    this.setState({
      ...this.state,
      currentPhotos: this.props.photos,
      isDesktop: isDesktopCurrent
    });
  }
  componentDidMount = () => {
    window.addEventListener("resize", this.resizeHandler);
  }
  onPageChange = (startIndex, endIndex) => {
    const { photos } = this.props;
    const currentPhotos = photos.slice(startIndex, endIndex + 1);
    this.setState({ ...this.state, currentPhotos });
  }
  render = () => {
    const { photos, onClickPhoto } = this.props;
    const { currentPhotos, isDesktop } = this.state;
    return (
      <Fragment>
        <div className="gallery">
          {
            currentPhotos.map(photo => 
              <GalleryItem key={photo.id} onClick={onClickPhoto} photo={photo} />)
          }
        </div>
        {
          isDesktop ? 
          <Pagination
            numItems={photos.length}
            onPageChange={this.onPageChange}
          /> : 
          null
        }
      </Fragment>
    );
  }
}

// Gallery.protoTypes = {
//     photos: React.PropTypes.array.isRequired
// };

export default Gallery;
