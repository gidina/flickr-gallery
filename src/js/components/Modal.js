import React, { Component, Fragment } from 'react';
import './Modal.css';

const API_URL_GET_PHOTOS_SIZES = photoId => `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=1ffb89f5dcaa0f0c96c86fd180deade0&photo_id=${photoId}&format=json&nojsoncallback=1`;

class Modal extends Component {
  state = { visible: false }
  componentDidMount() {
    const { photoId, media } = this.props;

    fetch(API_URL_GET_PHOTOS_SIZES(photoId))
      .then(response => response.json())
    //   .then(myJson => console.log(myJson));

    // http://www.flickr.com/photos/{user-id|custom-url}/{photo-id}/play/{site|mobile|hd|orig}/{secret|originalsecret}/


      .then(myJson => this.setState({...this.state, [media]: myJson.sizes.size[media === "video" ? 10 : 1].source}));
  }
  render() {
    const { photoId, media } = this.props;
    const { visible } = this.state;

    console.log(this.state.video);
    return (
        <Fragment>
            <button type="button" onClick={() => this.setState({ visible: true })}>Click to view</button>
            <div className="modal" style={{display: visible ? "block" : "none"}}>
                <span className="close" onClick={() => this.setState({ visible: false })}>&times;</span>
                {media === "video" ? <video width="320" height="240" controls>
      <source src={this.state.video} type="video/mp4" />
      Your browser does not support the video tag.
    </video> : <img className="modal-content" src={this.state.photo} alt="TODO: cal passar ALT" />}
                <div id="caption"></div>
            </div>
        </Fragment>
    );
  }
}

export default Modal;