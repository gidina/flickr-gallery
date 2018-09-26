import React from "react";
import GalleryItem from "../GalleryItem";
import renderer from "react-test-renderer";
import ReactTestUtils from "react-dom/test-utils";

test("Renders correctly with photo properties. If photo.media is 'video', svg must be blue (#5690F7)", () => {
    const photoTest = {
        id: 1,
        title: "Photo 1",
        description: { _content: "Description Photo 1" },
        media: "video",
        farm: 1,
        server: "server1",
        secret: 123456
    };
    const tree = renderer
        .create(<GalleryItem photo={photoTest} onClick={() => { }} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test("Renders correctly with photo properties. If photo.media is different to 'video', svg must be red (#f55)", () => {
    const photoTest = {
        id: 1,
        title: "Photo 1",
        description: { _content: "Description Photo 1" },
        media: "photo",
        farm: 1,
        server: "server1",
        secret: 123456
    };
    const tree = renderer
        .create(<GalleryItem photo={photoTest} onClick={() => { }} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test("onClick function is triggered when div with 'gallery_item' class is clicked", () => {
    const onClickMock = jest.fn();
    const photoTest = {
        id: 1,
        title: "Photo 1",
        description: { _content: "Description Photo 1" },
        media: "video",
        farm: 1,
        server: "server1",
        secret: 123456
    };

    // Wrapper component for renderIntoDocument functional Component
    class Wrapper extends React.Component {
        render() {
            return this.props.children
        }
    }

    const tree = ReactTestUtils.renderIntoDocument(<Wrapper><GalleryItem photo={photoTest} onClick={onClickMock} /></Wrapper>);
    expect(tree.props.children.props.onClick).toEqual(onClickMock);
});
