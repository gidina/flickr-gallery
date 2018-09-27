import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import renderer from "react-test-renderer";
import { getPhotos, getPhotosSizes } from "../../commons/apiCalls";
import App from "../App";
import Gallery from "../Gallery";
import Modal from "../Modal";

jest.mock("../../commons/apiCalls");

jest.mock("../Loader");
jest.mock("../Modal");
jest.mock("../Gallery");

const photosTest = [
  {
    id: 1,
    owner: "user1",
    ownername: "user 1",
    title: "Photo 1",
    description: { _content: "Description Photo 1" },
    media: "video",
    farm: 1,
    server: "server1",
    secret: 123456
  },
  {
    id: 2,
    owner: "user1",
    ownername: "user 1",
    title: "Photo 2",
    description: { _content: "Description Photo 2" },
    media: "photo",
    farm: 1,
    server: "server1",
    secret: 456789
  }
];

const sizesTest = [
  {
    label: "Video Player",
    source: "source Video Player size"
  },
  {
    label: "Large",
    source: "source Large size"
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

test("Si isLoading és true, es mostra un Loader de color red (#f55)", () => {
  getPhotos.mockImplementation(() => Promise.resolve(photosTest));

  expect(getPhotos).toHaveBeenCalledTimes(0);
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  expect(getPhotos).toHaveBeenCalledTimes(1);
  expect(getPhotos).toHaveBeenCalledWith();
});

test("Si no s'ha seleccionat cap foto, no es mostra el Modal", async () => {
  getPhotos.mockImplementation(() => Promise.resolve(photosTest));

  const tree = await renderer.create(<App />);

  expect(tree.toJSON()).toMatchSnapshot();
});

test("Si s'ha seleccionat un video, es mostra el Modal amb la propietat isLoading a true", async () => {
  const photoTests = photosTest[0];
  const expectedPhoto = {
    title: "Photo 1",
    description: "Description Photo 1",
    isVideo: true,
    redirectURL: "https://www.flickr.com/photos/user1/1/in/gallery-117615905-72157695735361740/",
    username: "user 1"
  };
  const expectedProps = {
    isLoading: true,
    photo: expectedPhoto
  }
  getPhotos.mockImplementation(() => Promise.resolve(photosTest));
  getPhotosSizes.mockImplementation(() => Promise.resolve(sizesTest));

  const tree = await ReactTestUtils.renderIntoDocument(<App />);
  const galleryComponent = ReactTestUtils.findRenderedComponentWithType(tree, Gallery);

  galleryComponent.props.onClickPhoto(photoTests);

  const modalComponent = ReactTestUtils.findRenderedComponentWithType(tree, Modal);

  expect(modalComponent.props.isLoading).toEqual(expectedProps.isLoading);
  expect(modalComponent.props.photo).toEqual(expectedProps.photo);

  expect(getPhotosSizes).toHaveBeenCalledTimes(1);
  expect(getPhotosSizes).toHaveBeenCalledWith(photoTests.id);
});

test("Si s'ha seleccionat una foto, es mostra el Modal amb la propietat isLoading a true", async () => {
  const photoTests = photosTest[1];
  const expectedPhoto = {
    title: "Photo 2",
    description: "Description Photo 2",
    isVideo: false,
    redirectURL: "https://www.flickr.com/photos/user1/2/in/gallery-117615905-72157695735361740/",
    username: "user 1"
  };
  const expectedProps = {
    isLoading: true,
    photo: expectedPhoto
  }
  getPhotos.mockImplementation(() => Promise.resolve(photosTest));
  getPhotosSizes.mockImplementation(() => Promise.resolve(sizesTest));

  const tree = await ReactTestUtils.renderIntoDocument(<App />);
  const galleryComponent = ReactTestUtils.findRenderedComponentWithType(tree, Gallery);

  galleryComponent.props.onClickPhoto(photoTests);

  const modalComponent = ReactTestUtils.findRenderedComponentWithType(tree, Modal);

  expect(modalComponent.props.isLoading).toEqual(expectedProps.isLoading);
  expect(modalComponent.props.photo).toEqual(expectedProps.photo);

  expect(getPhotosSizes).toHaveBeenCalledTimes(1);
  expect(getPhotosSizes).toHaveBeenCalledWith(photoTests.id);
});

test("Si s'ha seleccionat una foto i s'ha acabat la petició per obtenir les mides, es mostra el Modal", async () => {
  const photoTests = photosTest[0];
  getPhotos.mockImplementation(() => Promise.resolve(photosTest));
  getPhotosSizes.mockImplementation(() => Promise.resolve(sizesTest));

  const tree = await ReactTestUtils.renderIntoDocument(<App />);
  const galleryComponent = ReactTestUtils.findRenderedComponentWithType(tree, Gallery);

  await galleryComponent.props.onClickPhoto(photoTests);

  const modalComponent = ReactTestUtils.findRenderedComponentWithType(tree, Modal);

  expect(modalComponent.props.isLoading).toEqual(false);
});

test("Si es rep l'onClose del modal, es deselecciona la foto", async () => {
  const photoTests = photosTest[0];
  getPhotos.mockImplementation(() => Promise.resolve(photosTest));
  getPhotosSizes.mockImplementation(() => Promise.resolve(sizesTest));

  const tree = await ReactTestUtils.renderIntoDocument(<App />);
  const galleryComponent = ReactTestUtils.findRenderedComponentWithType(tree, Gallery);

  await galleryComponent.props.onClickPhoto(photoTests);

  const modalComponent = ReactTestUtils.findRenderedComponentWithType(tree, Modal);

  modalComponent.props.onClose();

  const modalComponentsAfterClosing = ReactTestUtils.scryRenderedComponentsWithType(tree, Modal);

  expect(modalComponentsAfterClosing.length).toEqual(0);
});
