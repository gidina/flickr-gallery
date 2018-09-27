import React from "react";
import renderer from "react-test-renderer";
import Loader from "../Loader";

test("Renders correctly with pink color", () => {
    const color = "pink";
    const tree = renderer
        .create(<Loader color={color}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});