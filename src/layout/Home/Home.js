import React, { Component } from 'react'
import Block from '../../components/Block/Block';
import Table from '../../components/Table/Table';
import "./home.css";

const {coin, publicKey} = require('../../info'); 

export default class Home extends Component {
    constructor(props) {
        super(props);
                
        this.header = ["#", "From", "To", "Amount", "Timestamp", "Valid"];
        this.state = {body: [], index: 0, balance: coin.getBalance(publicKey)};

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event, index) {
        event.stopPropagation();
        if(index > 0) {
            const tx = coin.chain[index].transactions;
            const body = tx.map((trans, i) => {
                const row = [];
                row.push(i);
                row.push(trans.from === null ? "System (Rewards)" : trans.from);
                row.push(trans.to);
                row.push(trans.amount);
                row.push(coin.chain[index].timestamp);
                row.push(trans.isValid() ? "Yes" : "No");
                return row;
            });

            this.setState({body: [...body], index: index});
        } else {
            this.setState({body: [[]], index: index});
        }
    }

    render() {
        const blocks = coin.chain.map((block, index) => {
            return  (<Block key={`block${index}`} onClick={(event) => this.handleOnClick(event, index)} title={`Block ${index}`} currHash={block.hash} prevHash={block.prevHash} timestamp={block.timestamp} nounce={block.nounce}  />);
        });

        return (
            <div className="whole-container">
                <div className="blockchain-wrapper">
                    <div className="blockchain">
                        {blocks}
                    </div>
                </div>
                <div className="block-transaction">
                    Transactions inside block {this.state.index}
                </div>
                <Table header={this.header} body={this.state.body} />
                <h2 className="balance">
                    Balance: {this.state.balance}
                </h2>
            </div>
        )
    }
}
