import React, { Component } from "react";
import "./block.css";

export default class Block extends Component {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    this.props.onClick(event);
  }

  render() {
    return (
      <div className="container" onClick={this.handleOnClick}>
        <h1 className="title">{this.props.title}</h1>
        <div className="hashes">
          <div className="hash">
            <h2>Hash</h2>
            <p>{this.props.currHash}</p>
          </div>
          <div className="hash">
            <h2>Hash of previous block</h2>
            <p>{this.props.prevHash}</p>
          </div>
        </div>
        <div className="nounce">
          <h2>Nounce</h2>
          <p>{this.props.nounce}</p>
        </div>
        <div className="timestamp">
          <h2>Timestamp</h2>
          <p>{this.props.timestamp}</p>
        </div>
      </div>
    );
  }
}
