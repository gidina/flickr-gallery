export const getPhotos = (url) => 
    fetch(url)
      .then(response => response.json())
      .then(json => json);

export const getPhotosSizes = (url) => 
  fetch(API_URL_GET_PHOTOS_SIZES(photo.id))
  .then(response => response.json())
  .then(json => json);

