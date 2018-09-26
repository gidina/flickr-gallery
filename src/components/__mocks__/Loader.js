import React from "react";
export default class Loader extends React.Component {
    render() {
        return <loader-mock {...this.props}>{this.props.children}</loader-mock>;
    }
}