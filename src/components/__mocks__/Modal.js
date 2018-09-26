import React from "react";
export default class Modal extends React.Component {
    render() {
        return <modal-mock {...this.props}>{this.props.children}</modal-mock>;
    }
}