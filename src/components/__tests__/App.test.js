import React from "react";
import renderer from "react-test-renderer";
import App from "../App";
import { getPhotos, getPhotosSizes } from "../commons/consultesServidor";

jest.mock("../commons/consultesServidor");

jest.mock("../Loader");
jest.mock("../Modal");
jest.mock("../Gallery");

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

test("Si s'ha seleccionat una foto, es mostra el Modal amb la propietat isLoading a true", async () => {
  const photoTests = photosTest[0];
  getPhotos.mockImplementation(() => Promise.resolve(photosTest));
  getPhotosSizes.mockImplementation(() => Promise.resolve(sizesTest));

  let tree = await renderer.create(<App />);

  expect(getPhotosSizes).toHaveBeenCalledTimes(0);

  tree.getInstance().onClickPhotoItemHandler(photoTests);

  expect(tree.toJSON()).toMatchSnapshot();
  expect(getPhotosSizes).toHaveBeenCalledTimes(1);
  expect(getPhotosSizes).toHaveBeenCalledWith(photoTests.id);
});

test("Si s'ha seleccionat una foto i s'ha acabat la petició per obtenir les mides, es mostra el Modal", async () => {
  const photoTests = photosTest[0];
  getPhotos.mockImplementation(() => Promise.resolve(photosTest));
  getPhotosSizes.mockImplementation(() => Promise.resolve(sizesTest));

  let tree = renderer.create(<App />);

  await tree.getInstance().onClickPhotoItemHandler(photoTests);

  expect(tree.toJSON()).toMatchSnapshot();
});

test("Si es rep l'onClose del modal, es deselecciona la foto", async () => {
  const photoTests = photosTest[0];
  getPhotos.mockImplementation(() => Promise.resolve(photosTest));
  getPhotosSizes.mockImplementation(() => Promise.resolve(sizesTest));

  let tree = renderer.create(<App />);

  await tree.getInstance().onClickPhotoItemHandler(photoTests);
  tree.getInstance().onClickCloseModal();

  expect(tree.toJSON()).toMatchSnapshot();
});