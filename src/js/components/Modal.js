import React, { Component, Fragment } from 'react';
import './Modal.css';
import { API_KEY } from '../../config';

const API_URL_GET_PHOTOS_SIZES = photoId => `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`;
    // http://www.flickr.com/photos/{user-id|custom-url}/{photo-id}/play/{site|mobile|hd|orig}/{secret|originalsecret}/

const getSourceByParam = (array, parametreCerca) => array.find(size => size.label === parametreCerca).source;

class Modal extends Component {
  state = { visible: false }
  componentDidMount() {
    const { photo, media } = this.props;

    const parametreCerca = media === "video" ? "Video Player" : "Original";

    fetch(API_URL_GET_PHOTOS_SIZES(photo.id))
      .then(response => response.json())
      .then(myJson => {
          console.log("myJson: ", myJson);
          this.setState({...this.state, source: getSourceByParam(myJson.sizes.size,  parametreCerca)});
        //   console.log(myJson);
        //   const resultado = myJson.sizes.size.find(size => size.label === parametreCerca);
        //   console.log("====>", resultado.source);
      });

    //   .then(myJson => this.setState({...this.state, [media]: myJson.sizes.size[media === "video" ? 10 : 1].source}));
  }
  render() {
    const { media, photo } = this.props;
    const { visible } = this.state;
    return (
        <Fragment>
            <button type="button" onClick={() => this.setState({ visible: true })}>Click to view</button>
            <div className="modal" style={{display: visible ? "block" : "none"}}>
                <span className="close" onClick={() => this.setState({ visible: false })}>&times;</span>
                {media === "video" ? <embed className="modal-content" src={this.state.source}></embed> : <img className="modal-content" src={this.state.source} alt="TODO: cal passar ALT" />}
                <div id="caption">
                  <h3>{photo.title}</h3>
                  <p>{photo.description}</p>
                </div>
            </div>
        </Fragment>
    );
  }
}

export default Modal;