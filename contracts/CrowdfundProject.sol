
pragma solidity ^0.4.16;

contract CrowdfundProject {
	mapping(address => uint256) public backers;
	uint public goal;
	uint public deadline;
    uint public raised;

    event BackerContributed(address from, uint amount, uint time);

    constructor(
        uint goalInEthers,
        uint durationInDays
    ) public {
        goal = goalInEthers * 1 ether;
        deadline = now + (durationInDays * 1 days);
        raised = 0;
    }

    modifier stillRunning() {
        require(deadline > now);
        require(raised >= goal);
        _;
    }

    function () public payable stillRunning
    {
        uint amount = msg.value;
        address from = msg.sender;
        backers[from] += amount;
        raised += amount;

        emit BackerContributed(from, amount, now);
    }

    // function refund() {}

    function isOver() public view returns (bool) {
        return deadline < now;
    }

    function isFunded() public view returns (bool) {
        return raised >= goal;
    }
}


// contract Crowdsale {
//     address public beneficiary;
//     uint public fundingGoal;
//     uint public amountRaised;
//     uint public deadline;
//     uint public price;
//     mapping(address => uint256) public balanceOf;
//     bool fundingGoalReached = false;
//     bool crowdsaleClosed = false;

//     event GoalReached(address recipient, uint totalAmountRaised);
//     event FundTransfer(address backer, uint amount, bool isContribution);

//     /**
//      * Constructor function
//      *
//      * Setup the owner
//      */
//     function Crowdsale(
//         address ifSuccessfulSendTo,
//         uint fundingGoalInEthers,
//         uint durationInMinutes,
//         uint etherCostOfEachToken,
//         address addressOfTokenUsedAsReward
//     ) {
//         beneficiary = ifSuccessfulSendTo;
//         fundingGoal = fundingGoalInEthers * 1 ether;
//         deadline = now + durationInMinutes * 1 minutes;
//         price = etherCostOfEachToken * 1 ether;
//     }

//     /**
//      * Fallback function
//      *
//      * The function without name is the default function that is called whenever anyone sends funds to a contract
//      */
//     function () payable {
//         require(!crowdsaleClosed);
//         uint amount = msg.value;
//         balanceOf[msg.sender] += amount;
//         amountRaised += amount;
// 		return;
//     }

//     modifier afterDeadline() {
// 		if (now >= deadline) _;
// 	}

//     /**
//      * Check if goal was reached
//      *
//      * Checks if the goal or time limit has been reached and ends the campaign
//      */
//     function checkGoalReached() afterDeadline {
//         if (amountRaised >= fundingGoal){
//             fundingGoalReached = true;
//             GoalReached(beneficiary, amountRaised);
//         }
//         crowdsaleClosed = true;
//     }


//     /**
//      * Withdraw the funds
//      *
//      * Checks to see if goal or time limit has been reached, and if so, and the funding goal was reached,
//      * sends the entire amount to the beneficiary. If goal was not reached, each contributor can withdraw
//      * the amount they contributed.
//      */
//     function safeWithdrawal() afterDeadline {
//         if (!fundingGoalReached) {
//             uint amount = balanceOf[msg.sender];
//             balanceOf[msg.sender] = 0;
//             if (amount > 0) {
//                 if (msg.sender.send(amount)) {
//                     FundTransfer(msg.sender, amount, false);
//                 } else {
//                     balanceOf[msg.sender] = amount;
//                 }
//             }
//         }

//         if (fundingGoalReached && beneficiary == msg.sender) {
//             if (beneficiary.send(amountRaised)) {
//                 FundTransfer(beneficiary, amountRaised, false);
//             } else {
//                 //If we fail to send the funds to beneficiary, unlock funders balance
//                 fundingGoalReached = false;
//             }
//         }
//     }
// }
