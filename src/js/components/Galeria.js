import React, { Component } from 'react';
import Modal from "./Modal";
import './Galeria.css';

const API_URL_GET_PHOTOS = "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=1ffb89f5dcaa0f0c96c86fd180deade0&gallery_id=117615905-72157695735361740&extras=description%2C+media&format=json&nojsoncallback=1";

const midaFotos = "m";

const photoDescription = description => <p>{description}</p>;
// const photoBox = foto => <div key={foto.id} className="gallery-item">
//   <h3>{foto.title}</h3>
//   <img src={`https://farm${foto.farm}.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}_${midaFotos}.jpg`} alt={foto.title} />
//   {foto.description && foto.description._content ? <p>foto.description._content</p> : null}
// </div>;

{/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200px" height="200px">
      <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="black"/>
      <circle cx="100" cy="100" r="50" style="stroke: black; fill: red;"/>
    </svg> */}

const photoBox = foto => {
  const description = foto.description && foto.description._content ? <div className="module line-clamp"><p>{foto.description._content}</p></div> : null;
  const imageUrl = `https://farm${foto.farm}.staticflickr.com/${foto.server}/${foto.id}_${foto.secret}_${midaFotos}.jpg`;
  return <div key={foto.id} className="gallery-item">
    <div className="img-overlay-wrap">
      <svg fill="#f55" style={{color: foto.media === "video" ? "blue" : "red"}} viewBox="0 3 60 20">
        <path d="M 0.65359477,1.3817905 C 60.201925,8.44316 121.92863,11.583451 175.81699,28.832771 l 0.6536,-28.10457531 z"></path>
      </svg>
      <img src={imageUrl} alt={foto.title} />
    </div>
    <h3>{foto.title}</h3>
    {/* <video width="320" height="240" controls>
      <source src="source={`http://www.flickr.com/apps/video/stewart.swf?v=49235&photo_id=${foto.id}&photo_secret=${foto.secret}`}" type="video/mp4" />
      Your browser does not support the video tag.
    </video> */}
    {description}
    <Modal photoId={foto.id} media={foto.media} />
  </div>;
}

class Galeria extends Component {
  state = { fotosGaleria: { photos: { photo: [] }} }
  componentDidMount() {
    fetch(API_URL_GET_PHOTOS)
      .then(response => response.json())
      .then(myJson => this.setState({ fotosGaleria: myJson }));

    // fetch("https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=1ffb89f5dcaa0f0c96c86fd180deade0&photo_id=34701918214&format=json&nojsoncallback=1")
    //   .then(response => response.json())
    //   .then(myJson => console.log(myJson.photo.description._content));
  }
  render() {
    const { fotosGaleria } = this.state;
    return (
      <div className="gallery">
        {fotosGaleria.photos.photo.map(photoBox)}
      </div>
    );
  }
}

export default Galeria;