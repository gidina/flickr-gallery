import React from "react";
import renderer from "react-test-renderer";
import Modal from "../Modal";

jest.mock("../Loader");

test("Renders blue (#5690F7) Loader component if isLoading property is true", () => {
    const tree = renderer
        .create(<Modal isLoading={true} photo={{}} onClose={() => {}}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

describe("Renders photo properties if isLoading property is false", () => {
    test("Renders 'embed' with properly source if isVideo property is true", () => {
        const photoTest = {
            isVideo: true,
            source: "/source",
            title: "Photo 1",
            redirectURL: "/redirect-url",
            username: "username",
            description: "Description Photo 1",
        };
        const tree = renderer
            .create(<Modal isLoading={false} photo={photoTest} onClose={() => {}}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    test("Renders 'img' with properly source if isVideo property is false", () => {
        const photoTest = {
            isVideo: false,
            source: "/source",
            title: "Photo 1",
            redirectURL: "/redirect-url",
            username: "username",
            description: "Description Photo 1",
        };
        const tree = renderer
            .create(<Modal isLoading={false} photo={photoTest} onClose={() => {}}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});