import { API_KEY, GALLERY_ID } from "../config";

const API_URL_GET_PHOTOS = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${API_KEY}&gallery_id=${GALLERY_ID}&extras=description%2C+media%2C+owner_name&format=json&nojsoncallback=1`;
const API_URL_GET_PHOTOS_SIZES = photoId =>
  `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`;

export const getPhotos = () => 
  fetch(API_URL_GET_PHOTOS)
    .then(response => response.json())
    .then(json => json.photos.photo);

export const getPhotosSizes = (photoId) => 
  fetch(API_URL_GET_PHOTOS_SIZES(photoId))
  .then(response => response.json())
  .then(json => json.sizes.size);

