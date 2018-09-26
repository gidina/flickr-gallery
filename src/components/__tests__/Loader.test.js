import React from "react";
import Loader from "../Loader";
import renderer from "react-test-renderer";

test("Renders correctly with pink color", () => {
    const color = "pink";
    const tree = renderer
        .create(<Loader color={color}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});