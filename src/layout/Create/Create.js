import React, { Component } from "react";
import "./create.css";

const { Transaction } = require("../../BlockChain");
const { coin, privateKey, publicKey } = require("../../info");

export default class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: publicKey,
      to: "",
      amount: "",
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClickCreate = this.handleOnClickCreate.bind(this);
  }

  handleOnChange(event) {
    event.stopPropagation();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleOnClickCreate(event) {
    event.stopPropagation();
    const pattern = new RegExp("[0-9]*");
    if (pattern.test(this.state.amount)) {
      const tx = new Transaction(
        publicKey,
        this.state.to,
        parseInt(this.state.amount)
      );
      tx.signTransaction(privateKey);
      coin.addTransaction(tx);
    }
  }

  render() {
    return (
      <div className="whole-container">
        <div className="form">
          <div className="field">
            <div className="input">
              <label htmlFor="from">From</label>
              <input
                value={this.state.from}
                disabled
                onChange={this.handleOnChange}
                type=""
                name="from"
                placeholder="From"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="input">
              <label htmlFor="to">To</label>
              <input
                value={this.state.to}
                onChange={this.handleOnChange}
                type=""
                name="to"
                placeholder="To"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="input">
              <label htmlFor="amount">Amount</label>
              <input
                value={this.state.amount}
                onChange={this.handleOnChange}
                type=""
                name="amount"
                placeholder="Amount"
                autoComplete="off"
                pattern="[0-9]*"
                required
              />
            </div>
          </div>
          <div className="field">
            <div className="input">
              <button
                className="create-trans"
                onClick={this.handleOnClickCreate}
              >
                Sign & Create Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
