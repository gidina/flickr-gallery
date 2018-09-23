import React, { Component, Fragment } from 'react';
import Modal from "./Modal";
import Loader from "./Loader";
import { API_KEY } from "../../config";
import './Galeria.css';

const GALLERY_ID = "117615905-72157695735361740";
const API_URL_GET_PHOTOS = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${API_KEY}&gallery_id=${GALLERY_ID}&extras=description%2C+media&format=json&nojsoncallback=1`;
const midaFotos = "m";

const photoBox = foto => {
  const description = foto.description && foto.description._content ? <p>{foto.description._content}</p> : null;
  const imageUrl = `https://farm${foto.farm}.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}_${midaFotos}.jpg`;
  return <div key={foto.id}>
      <div className="gallery-item">
        <div className="img-overlay-wrap">
          <svg style={{ fill: foto.media === "video" ? "5690F7" : "f55" }} viewBox="0 3 60 20">
            <path d="M 0.65359477,1.3817905 C 60.201925,8.44316 121.92863,11.583451 175.81699,28.832771 l 0.6536,-28.10457531 z"></path>
          </svg>
          <img src={imageUrl} alt={foto.title} />
        </div>
        <h3>{foto.title}</h3>
        {description}
      </div>
      <Modal media={foto.media} photo={{ id: foto.id, title: foto.title, description: foto.description && foto.description._content ? foto.description._content : "" }} />
    </div>;
}

class Galeria extends Component {
  state = { isLoading: true, fotosGaleria: { photos: { photo: [] }} }
  componentDidMount() {
    fetch(API_URL_GET_PHOTOS)
      .then(response => response.json())
      .then(json => this.setState({ isLoading: false, fotosGaleria: json }));
  }
  render() {
    const { isLoading, fotosGaleria } = this.state;
    return (
      <Fragment>
        { 
          isLoading ? 
          <Loader color={"#f55"} /> : 
          <div className="gallery">
            {fotosGaleria.photos.photo.map(photoBox)}
          </div>
        }
      </Fragment>
    );
  }
}

export default Galeria;