const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }

    calculateHash() {
        return SHA256(this.from + this.to + this.amount).toString();
    }

    signTransaction(signKey) {
        if(signKey.getPublic('hex') !== this.from) {
            throw new Error("Invalid transaction. Check your address");
        }

        const hashTx = this.calculateHash();
        const sign = signKey.sign(hashTx, 'base64');
        this.signature = sign.toDER('hex');
    }

    isValid() {
        if(this.from === null) return true;
        
        if(!this.signature || this.signature.length === 0) {
            throw new Error("Signature not found");
        }

        const publicKey = ec.keyFromPublic(this.from, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

class Block {
    constructor(timestamp, transactions, prevHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
        this.nounce = 0;
    }

    calculateHash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.transactions) + this.nounce).toString();
    }

    mineBlock(diff) {
        while(this.hash.substring(0, diff) !== Array(diff + 1).join('0')) {
            this.nounce++;
            this.hash = this.calculateHash();
        }
    }

    hasValidTrans() {
        this.transactions.forEach(trans => {
            if(!trans.isValid()) return false;
        });

        return true;
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.diff = 4;
        this.pendingTrans = [];
        this.miningReward = Math.floor(Math.random() * 100);
    }

    createGenesisBlock() {
        return new Block(new Date().toDateString(), 'Genisis Block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTrans(rewardAddress) {
        const trans = new Transaction(null, rewardAddress, this.miningReward)
        this.pendingTrans.push(trans);

        const block = new Block(new Date().toDateString(), this.pendingTrans);
        block.mineBlock(this.diff);
        this.chain.push(block);

        this.pendingTrans = [];
    }

    addTransaction(trans) {
        const isFromValid = trans.from !== undefined && trans.from !== null && trans.from.trim() !== '';
        const isToValid = trans.to !== undefined && trans.to !== null && trans.to.trim() !== '';
        
        if(!isFromValid || !isToValid) {
            throw new Error('Address not defined');
        }

        if(!trans.isValid()) {
            throw new Error('Invalid trans');
        }

        this.pendingTrans.push(trans);
    }

    getBalance(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if(trans.from === address) {
                    balance -= trans.amount;
                }

                if(trans.to === address) {
                    balance += trans.amount;
                }
            }   
        }

        return balance;
    }

    isChainValid() {
        const realGenesis = JSON.stringify(this.createGenesisBlock());
        if (realGenesis !== JSON.stringify(this.chain[0])) {
            return false;
        }

        for(let index = 1; index < this.chain.length; index++) {
            const currBlock = this.chain[index];

            if(!currBlock.hasValidTrans()) {
                return false;
            }

            if(currBlock.hash !== currBlock.calculateHash()) {
                return false;
            }
        }

        return true;
    }
}

module.exports.BlockChain = BlockChain;
module.exports.Transaction = Transaction;