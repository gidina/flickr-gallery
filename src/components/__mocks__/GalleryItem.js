import React from "react";
export default class GalleryItem extends React.Component {
    render() {
        return <gallery-item-mock {...this.props}>{this.props.children}</gallery-item-mock>;
    }
}
