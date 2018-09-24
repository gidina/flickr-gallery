import React, { Component, Fragment } from "react";

import Loader from "./Loader";
import Gallery from "./Gallery";
import Modal from "./Modal";
import { API_KEY, primaryColor } from "../config";
import "./App.css";

const GALLERY_ID = "117615905-72157695735361740";
const API_URL_GET_PHOTOS = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${API_KEY}&gallery_id=${GALLERY_ID}&extras=description%2C+media%2C+owner_name&format=json&nojsoncallback=1`;
const API_URL_GET_PHOTOS_SIZES = photoId =>
  `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`;

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
    fetch(API_URL_GET_PHOTOS)
      .then(response => response.json())
      .then(json =>
        this.setState({
          ...this.state,
          isLoading: false,
          fotosGaleria: json.photos.photo
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

    fetch(API_URL_GET_PHOTOS_SIZES(photo.id))
      .then(response => response.json())
      .then(json => {
        this.setState({
          ...this.state,
          isLoadingModal: false,
          fotoSeleccionada: {
            ...this.state.fotoSeleccionada,
            source: getSourceByParam(json.sizes.size, parametreCerca)
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
