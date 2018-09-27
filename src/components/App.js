import React, { Component, Fragment } from "react";

import { getPhotos, getPhotosSizes } from "../commons/apiCalls";
import Loader from "./Loader";
import Gallery from "./Gallery";
import Modal from "./Modal";
import { GALLERY_ID, primaryColor } from "../config";
import "./App.css";

const getSourceByParam = (array, parametreCerca) =>
  array.find(size => size.label === parametreCerca).source;

class App extends Component {
  state = {
    isLoading: true,
    fotosGaleria: null,
    fotoSeleccionada: null,
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
    this.setState({ ...this.state, fotoSeleccionada: null });
  };
  onClickPhotoItemHandler = photo => {
    const parametreCerca = photo.media === "video" ? "Video Player" : "Large";
    const redirectURL = `https://www.flickr.com/photos/${photo.owner}/${photo.id}/in/gallery-${GALLERY_ID}/`;
    this.setState({
      ...this.state,
      isLoadingModal: true,
      fotoSeleccionada: {
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
          fotoSeleccionada: {
            ...this.state.fotoSeleccionada,
            source: getSourceByParam(data, parametreCerca)
          }
        });
      });
  };
  pintaModal = () => {
    const { fotoSeleccionada, isLoadingModal } = this.state;

    if (!fotoSeleccionada) {
      return null;
    }

    return <Modal
      isLoading={isLoadingModal}
      photo={fotoSeleccionada}
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
          {this.pintaModal()}
      </Fragment>
    );
  };
}

export default App;
