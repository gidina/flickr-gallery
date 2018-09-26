import React from "react";
import Gallery from "../Gallery";
import renderer from "react-test-renderer";
import ReactTestUtils from "react-dom/test-utils";
import GalleryItem from "../GalleryItem";

jest.mock("../GalleryItem", () => "gallery-item-mock");
jest.mock("../Pagination", () => "PaginationMock");

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
    }
];

// photos: PropTypes.array.isRequired,
// onClickPhoto: PropTypes.func.isRequired
const breakpointDesktop = 1047;

test("Renders as many 'GalleryItem' as photos recived", () => {
    const tree = renderer
        .create(<Gallery photos={photosTest} onClickPhoto={() => {}} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test(`Desktop resolution (>${breakpointDesktop}): 'Pagination' is rendered`, () => {
    window.resizeTo(breakpointDesktop+1, window.innerHeight);

    const tree = renderer
    .create(<Gallery photos={photosTest} onClickPhoto={() => {}} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

test(`Mobile or Tablet resolution (<=${breakpointDesktop}): 'Pagination' isn't rendered`, () => {
    window.resizeTo(breakpointDesktop, window.innerHeight);

    const tree = renderer
    .create(<Gallery photos={photosTest} onClickPhoto={() => {}} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});

test("onClick GalleryItem, argument: photo", () => {
    const onClickPhotoMock = jest.fn();
    const tree = ReactTestUtils.renderIntoDocument(<Gallery photos={photosTest} onClickPhoto={onClickPhotoMock} />);

    console.log(tree);
    const galleryItems = ReactTestUtils.scryRenderedComponentsWithType(tree, GalleryItem);
    console.log(galleryItems.length);
    // expect(tree.props.children.props.onClick).toEqual(onClickMock);
});

// test("Renders correctly with photo properties. If photo.media is different to 'video', svg must be red (#f55)", () => {
//     const photoTest = {
//         id: 1,
//         title: "Photo 1",
//         description: { _content: "Description Photo 1" },
//         media: "photo",
//         farm: 1,
//         server: "server1",
//         secret: 123456
//     };
//     const tree = renderer
//         .create(<Gallery photo={photoTest} onClick={() => { }} />)
//         .toJSON();
//     expect(tree).toMatchSnapshot();
// });

// test("onClick function is triggered when div with 'gallery_item' class is clicked", () => {
//     const onClickMock = jest.fn();
//     const photoTest = {
//         id: 1,
//         title: "Photo 1",
//         description: { _content: "Description Photo 1" },
//         media: "video",
//         farm: 1,
//         server: "server1",
//         secret: 123456
//     };

//     class Wrapper extends React.Component {
//         render() {
//             return this.props.children
//         }
//     }

//     const tree = ReactTestUtils.renderIntoDocument(<Wrapper><Gallery photo={photoTest} onClick={onClickMock} /></Wrapper>);

//     expect(tree.props.children.props.onClick).toEqual(onClickMock);

//     // // trigger the onClick event for the Gallery
//     // tree.props.children.props.onClick();
//     // expect(onClickMock).toHaveBeenCalledWith();
// });

// // describe('the simplest way to test a react component', () => {
// //     it ('mount should render a simple component', () => {
// //         let component = mount(Bar, { title: 'fooBar' });
// //         let node = findDOMNode(component);
// //         expect(node.textContent).toEqual('fooBar')
// //     });
// // });

// // import React from 'react';
// // import { shallow } from 'enzyme';
// // import Button from './Button';

// // describe('Test Button component', () => {
// //   it('Test click event', () => {
// //     const mockCallBack = jest.fn();

// //     const button = shallow((<Button onClick={mockCallBack}>Ok!</Button>));
// //     button.find('button').simulate('click');
// //     expect(mockCallBack.mock.calls.length).toEqual(1);
// //   });
// // });