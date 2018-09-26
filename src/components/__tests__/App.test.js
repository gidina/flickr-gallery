import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import App from "../App";
import { API_KEY } from "../../config";
import { getPhotos } from "../commons/consultesServidor";

jest.mock("../commons/consultesServidor");

it("getPhotos OK", async () => {
  const GALLERY_ID = "117615905-72157695735361740";
  const API_URL_GET_PHOTOS = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${API_KEY}&gallery_id=${GALLERY_ID}&extras=description%2C+media%2C+owner_name&format=json&nojsoncallback=1`;
  const photosTest = [
    {
      id: 1,
      title: "Photo 1",
      description: { _content: "Description Photo 1" },
      media: "video",
      farm: 1,
      server: "server1",
      secret: 123456
    },
    {
      id: 2,
      title: "Photo 2",
      description: { _content: "Description Photo 2" },
      media: "video",
      farm: 1,
      server: "server1",
      secret: 456789
    }
  ];
  const dades = {
    photos: {
      photo: photosTest
    }
  };
  getPhotos.mockImplementation(() => Promise.resolve(dades));

  const treeBefore = ReactTestUtils.renderIntoDocument(<App />);

  expect(treeBefore.state.isLoading).toEqual(true);
  expect(treeBefore.state.fotosGaleria).toEqual(null);

  const tree = await treeBefore;

  expect(getPhotos).toHaveBeenCalledTimes(1);
  expect(getPhotos).toHaveBeenCalledWith(API_URL_GET_PHOTOS);
  expect(tree.state.isLoading).toEqual(false);
  expect(tree.state.fotosGaleria).toEqual(photosTest);
});

it("getSizes OK", async () => {
    const photoId = 1;
    const API_URL_GET_PHOTOS_SIZES = photoId => 
        `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`;


    const GALLERY_ID = "117615905-72157695735361740";
    const API_URL_GET_PHOTOS = `https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${API_KEY}&gallery_id=${GALLERY_ID}&extras=description%2C+media%2C+owner_name&format=json&nojsoncallback=1`;
    const sizesTest = [
      {
        label: "primera mida",
        source: "source mida 1"
      },
      {
        label: "segona mida",
        source: "source mida 2"
      },
    ];
    const dades = {
      sizes: {
        size: sizesTest
      }
    };
    getPhotosSizes.mockImplementation(() => Promise.resolve(dades));
  
    const treeBefore = ReactTestUtils.renderIntoDocument(<App />);
  
    expect(treeBefore.state.isLoading).toEqual(true);
    expect(treeBefore.state.fotosGaleria).toEqual(null);
  
    const tree = await treeBefore;
  
    expect(getPhotosSizes).toHaveBeenCalledTimes(1);
    expect(getPhotosSizes).toHaveBeenCalledWith(API_URL_GET_PHOTOS);
    expect(tree.state.isLoading).toEqual(false);
    expect(tree.state.fotosGaleria).toEqual(photosTest);
  });

test.skip("Si isLoading és true, es mostra un Loader de color red", () => {});
test.skip("Si no s'ha seleccionat cap foto, no es mostra el Modal", () => {});
test.skip("Si s'ha seleccionat una foto, es mostra el Modal", () => {});
test.skip("Quan es selecciona una foto, la propietat isLoadingModal es posa a true", () => {});
test.skip("Si es rep l'onClose del modal, es deselecciona la foto", () => {});

// jest.mock("fetch");

// test("prova async", () => {

//     const tree = ReactTestUtils.renderIntoDocument(<App />);

//     expect(fetch).toBeCalledWith("pepe");
//     // const galleryItems = ReactTestUtils.scryRenderedComponentsWithType(tree, GalleryItem);
//     // console.log(galleryItems.length);

//     // expect.assertions(1);
//     // return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
// });
