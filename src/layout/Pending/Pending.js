import React, { Component } from 'react'
import Table from "../../components/Table/Table";
import "./pending.css";

const {coin, publicKey} = require('../../info'); 

export default class Pending extends Component {
    constructor(props) {
        super(props);
                
        this.header = ["#", "From", "To", "Amount", "Timestamp", "Valid"];
        this.state = {body: []};

        this.handleOnClickMine = this.handleOnClickMine.bind(this);
    }

    componentDidMount() {
        // coin.pendingTrans[0].isValid()
        const body = coin.pendingTrans.map((tx, i) => {
            const trans = []
            trans.push(i);
            trans.push(tx.from);
            trans.push(tx.to);
            trans.push(tx.amount);
            trans.push(new Date().toISOString());
            trans.push(tx.isValid() ? "Yes" : "No");
            return trans;
        });

        this.setState({body: body});
    }

    handleOnClickMine(event) {
        event.stopPropagation();
        if(this.state.body.length !== 0) {
            coin.minePendingTrans(publicKey);
            this.setState({body: []});
        }
    }

    render() {
        return (
            <div className="whole-container">
                <Table header={this.header} body={this.state.body} />
                <button className="start-mining" onClick={this.handleOnClickMine}>Start Mining</button>
            </div>
        )
    }
}
