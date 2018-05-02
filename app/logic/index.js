import Web3 from 'web3';
const provider = new Web3.providers.HttpProvider("http://localhost:7545");
export const web3 = new Web3(provider);
web3.eth.defaultAccount = web3.eth.accounts[0]

import contract from "truffle-contract";

let src = require('../../build/contracts/CrowdfundProject.json');
let Contract;
let instance;

export const ADDR = "0xa465972ce3c68a287339ef9df735837ae01e8c4f";

export function loadContract() {
    Contract = contract(src)
    Contract.setProvider(provider);
    return Contract.at(ADDR).then(instance => {
        instance = instance;
        return Promise.resolve(instance)
    })
}

export {
    Contract,
    instance
};
