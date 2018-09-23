import React, { Component, Fragment } from 'react';
import Loader from "./Loader";
import './Modal.css';
import { API_KEY } from '../../config';

const API_URL_GET_PHOTOS_SIZES = photoId => `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`;

const getSourceByParam = (array, parametreCerca) => array.find(size => size.label === parametreCerca).source;

class Modal extends Component {
  state = { isLoading: false, visible: false }
  onClickHandler = () => {
    const { photo, media } = this.props;
    const parametreCerca = media === "video" ? "Video Player" : "Original";

    this.setState({ isLoading: true, visible: true });

    fetch(API_URL_GET_PHOTOS_SIZES(photo.id))
    .then(response => response.json())
    .then(myJson => this.setState({...this.state, isLoading: false, source: getSourceByParam(myJson.sizes.size,  parametreCerca)}));
  }
  render = () => {
    const { media, photo } = this.props;
    const { isLoading, visible } = this.state;
    return (
      <Fragment>
        <button type="button" onClick={this.onClickHandler}>Click to view</button>
        <div className="modal" style={{display: visible ? "block" : "none"}}>
            <span className="close" onClick={() => this.setState({ visible: false })}>&times;</span>
            { 
              isLoading ? 
              <Loader color={"#5690F7"} /> :
              <Fragment>
                {media === "video" ? <embed className="modal-content" src={this.state.source}></embed> : <img className="modal-content" src={this.state.source} alt="TODO: cal passar ALT" />}
                <div id="caption">
                  <h3>{photo.title}</h3>
                  <p>{photo.description}</p>
                </div>
              </Fragment>
            }
        </div>
      </Fragment>
    );
  }
}

export default Modal;