import React, { Component, Fragment } from "react";
import { getPhotos, getPhotosSizes } from "../commons/apiCalls";
import { GALLERY_ID, primaryColor } from "../config";
import Loader from "./Loader";
import Gallery from "./Gallery";
import Modal from "./Modal";
import "./App.css";

const getSourceByParam = (array, parametreCerca) =>
  array.find(size => size.label === parametreCerca).source;

class App extends Component {
  state = {
    isLoading: true,
    fotosGaleria: null,
    selectedPhoto: null,
    isLoadingModal: false
  };
  componentDidMount = () => {
    getPhotos()
      .then(data =>
        this.setState({
          ...this.state,
          isLoading: false,
          fotosGaleria: data
        })
      );
  };
  onClickCloseModal = () => {
    this.setState({ ...this.state, selectedPhoto: null });
  };
  onClickPhotoItemHandler = photo => {
    const parametreCerca = photo.media === "video" ? "Video Player" : "Large";
    const redirectURL = `https://www.flickr.com/photos/${photo.owner}/${photo.id}/in/gallery-${GALLERY_ID}/`;
    this.setState({
      ...this.state,
      isLoadingModal: true,
      selectedPhoto: {
        title: photo.title,
        description: photo.description._content,
        username: photo.ownername,
        redirectURL,
        isVideo: photo.media === "video"
      }
    });

    getPhotosSizes(photo.id)
      .then(data => {
        this.setState({
          ...this.state,
          isLoadingModal: false,
          selectedPhoto: {
            ...this.state.selectedPhoto,
            source: getSourceByParam(data, parametreCerca)
          }
        });
      });
  };
  renderModal = () => {
    const { selectedPhoto, isLoadingModal } = this.state;

    if (!selectedPhoto) {
      return null;
    }

    return <Modal
      isLoading={isLoadingModal}
      photo={selectedPhoto}
      onClose={this.onClickCloseModal}
    />
  };

  render = () => {
    const { isLoading, fotosGaleria } = this.state;

    if (isLoading) return <Loader color={primaryColor} />;
    
    return (
      <Fragment>
          <Gallery
            photos={fotosGaleria}
            onClickPhoto={this.onClickPhotoItemHandler}
          />
          {this.renderModal()}
      </Fragment>
    );
  };
}

export default App;
