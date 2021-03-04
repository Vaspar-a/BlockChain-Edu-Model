const {BlockChain} = require('./BlockChain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.keyFromPrivate('0adcec77b7adfd715cf26df0a90c72bed8a345c3bae103ffa83321be3a1de7cb');
const add = key.getPublic('hex');

module.exports.coin = new BlockChain();
module.exports.privateKey = key;
module.exports.publicKey = add;