import React, { Component, Fragment } from 'react';
import './Modal.css';

const API_URL_GET_PHOTOS_SIZES = photoId => `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=1ffb89f5dcaa0f0c96c86fd180deade0&photo_id=${photoId}&format=json&nojsoncallback=1`;
    // http://www.flickr.com/photos/{user-id|custom-url}/{photo-id}/play/{site|mobile|hd|orig}/{secret|originalsecret}/

class Modal extends Component {
  state = { visible: false }
  componentDidMount() {
    const { photoId, media } = this.props;

    fetch(API_URL_GET_PHOTOS_SIZES(photoId))
      .then(response => response.json())
      .then(myJson => this.setState({...this.state, [media]: myJson.sizes.size[media === "video" ? 10 : 1].source}));
  }
  render() {
    const { media } = this.props;
    const { visible } = this.state;
    return (
        <Fragment>
            <button type="button" onClick={() => this.setState({ visible: true })}>Click to view</button>
            <div className="modal" style={{display: visible ? "block" : "none"}}>
                <span className="close" onClick={() => this.setState({ visible: false })}>&times;</span>
                {media === "video" ? <embed src={this.state.video}></embed> : <img className="modal-content" src={this.state.photo} alt="TODO: cal passar ALT" />}
                <div id="caption"></div>
            </div>
        </Fragment>
    );
  }
}

export default Modal;