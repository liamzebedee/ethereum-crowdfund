import { 
    loadContract,
    Contract,
    ADDR
} from '../logic'

import { web3 } from '../logic';


export function loadProjectInfo() {
    return (dispatch) => {
        loadContract().then(contract => {
            Promise.all([
                contract.goal(),
                contract.raised(),
                contract.deadline(),
            ]).then(values => {
                let goal = web3.fromWei(values[0].toNumber(), "ether")
                let raised = web3.fromWei(values[1].toNumber(), "ether")
                let deadline = new Date(1000 * values[2].toNumber())

                var contributions = contract.BackerContributed({}, {fromBlock: 0, toBlock: 'latest'});
                // contributions.get(function(error, logs) {
                //     console.log(error, logs)
                // });

                dispatch({
                    type: 'loadProjectInfo',
                    project: {
                        goal,
                        raised,
                        deadline,
                    }
                })
            })
            
        })
    }
}

export function pledge(amount) {
    return dispatch => {
        web3.eth.getAccounts((err, accounts) => {
            if (err) {
                throw new Error(err);
            }
            
            web3.eth.sendTransaction({
                to: ADDR, 
                from: accounts[0],
                value: amount,
                gas: "30000"
            }, (err, txHash) => {
                if (err) {
                    throw new Error(err);
                }

                console.log(txHash)
            });
        })
    }
}