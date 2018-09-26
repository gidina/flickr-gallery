import React from "react";
export default class Gallery extends React.Component {
    render() {
        return <gallery-mock {...this.props}>{this.props.children}</gallery-mock>;
    }
}