import React from "react";
import renderer from "react-test-renderer";
import Gallery from "../Gallery";
import ReactTestUtils from "react-dom/test-utils";
import GalleryItem from "../GalleryItem";
import Pagination from "../Pagination";

jest.mock("../GalleryItem");
jest.mock("../Pagination");

window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event("resize"));
};

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
    },
    {
        id: 3,
        title: "Photo 3",
        description: { _content: "Description Photo 3" },
        media: "video",
        farm: 3,
        server: "server3",
        secret: 323456
    },
    {
        id: 4,
        title: "Photo 4",
        description: { _content: "Description Photo 4" },
        media: "video",
        farm: 1,
        server: "server1",
        secret: 456789
    },
    {
        id: 5,
        title: "Photo 5",
        description: { _content: "Description Photo 5" },
        media: "video",
        farm: 5,
        server: "server5",
        secret: 123456
    },
    {
        id: 6,
        title: "Photo 6",
        description: { _content: "Description Photo 6" },
        media: "video",
        farm: 1,
        server: "server1",
        secret: 456789
    },
    {
        id: 7,
        title: "Photo 7",
        description: { _content: "Description Photo 7" },
        media: "video",
        farm: 7,
        server: "server7",
        secret: 363456
    },
    {
        id: 8,
        title: "Photo 8",
        description: { _content: "Description Photo 8" },
        media: "video",
        farm: 1,
        server: "server1",
        secret: 856789
    },
    {
        id: 9,
        title: "Photo 9",
        description: { _content: "Description Photo 9" },
        media: "video",
        farm: 1,
        server: "server1",
        secret: 856789
    }
];

const breakpointDesktop = 1047;

test("Renders as many 'GalleryItem' as photos received", () => {
    const tree = ReactTestUtils.renderIntoDocument(<Gallery photos={photosTest} onClickPhoto={() => {}} />);
    const galleryItems = ReactTestUtils.scryRenderedComponentsWithType(tree, GalleryItem);

    expect(galleryItems.length).toEqual(photosTest.length);
});

test(`Desktop resolution (>${breakpointDesktop}): 'Pagination' is rendered`, () => {
    window.resizeTo(breakpointDesktop+1, window.innerHeight);

    const tree = ReactTestUtils.renderIntoDocument(<Gallery photos={photosTest} onClickPhoto={() => {}} />);
    const paginationComponent = ReactTestUtils.scryRenderedComponentsWithType(tree, Pagination);

    expect(paginationComponent.length).toEqual(1);
});

test(`Mobile or Tablet resolution (<=${breakpointDesktop}): 'Pagination' isn't rendered`, () => {
    window.resizeTo(breakpointDesktop, window.innerHeight);

    const tree = ReactTestUtils.renderIntoDocument(<Gallery photos={photosTest} onClickPhoto={() => {}} />);
    const paginationComponent = ReactTestUtils.scryRenderedComponentsWithType(tree, Pagination);

    expect(paginationComponent.length).toEqual(0);
});

test("onClick GalleryItem, argument: photo", () => {
    const onClickPhotoMock = jest.fn();
    const indexPhotoSelected = 0;

    const tree = ReactTestUtils.renderIntoDocument(<Gallery photos={photosTest} onClickPhoto={onClickPhotoMock} />);
    const galleryItems = ReactTestUtils.scryRenderedComponentsWithType(tree, GalleryItem);

    const seletecGalleryItem = galleryItems[indexPhotoSelected];

    expect(onClickPhotoMock).toHaveBeenCalledTimes(0);

    seletecGalleryItem.props.onClick();

    expect(onClickPhotoMock).toHaveBeenCalledTimes(1);
    expect(onClickPhotoMock).toHaveBeenCalledWith(photosTest[indexPhotoSelected]);
});

test("onPageChange", () => {
    //Force desktop size to render Pagination component
    window.resizeTo(breakpointDesktop+1, window.innerHeight);
    const onClickPhotoMock = jest.fn();

    const tree = ReactTestUtils.renderIntoDocument(<Gallery photos={photosTest} onClickPhoto={onClickPhotoMock} />);
    const paginationComponent = ReactTestUtils.findRenderedComponentWithType(tree, Pagination);

    const startIndex = 0;
    const endIndex = 5;
    const expectedLength = endIndex - startIndex + 1;
    paginationComponent.props.onPageChange(startIndex, endIndex);

    const galleryItems = ReactTestUtils.scryRenderedComponentsWithType(tree, GalleryItem);
    expect(galleryItems.length).toEqual(expectedLength);
});