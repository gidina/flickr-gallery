import React from "react";
export default class Pagination extends React.Component {
    render() {
        return <pagination-mock {...this.props}>{this.props.children}</pagination-mock>;
    }
}