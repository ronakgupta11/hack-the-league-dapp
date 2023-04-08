// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
contract Defi{
        address payable owner;
        uint id;
        uint TotalStake;
// 0x897058DfB39113d0F4F1E5081f0C06721B7BDEd9s

        constructor(){
            owner = payable(msg.sender);
            id = 0;
            TotalStake = 0;

        }


        event StakeMade(uint id, address staker, uint amount);
        event PaymentMade(address payer,uint amount);





    mapping (address staker => uint stake ) public StakerToStake;
    mapping(address borrower => uint borrow) public BorrowerToBorrow;




    function Stake(uint _amount) external payable{
        id++;
        require(msg.value > 0, "Amount to stake must be greater than zero.");
        require(msg.value>=_amount,"sent amount is less than specified amount");
        //  require(msg.value == _amount, "Amount sent must be equal to the specified amount");
        uint amount = msg.value;
        
        StakerToStake[msg.sender]+=amount;
        TotalStake+=amount;
        emit StakeMade(id,msg.sender,amount);
    }



    function viewMyStake(address user) public view returns(uint){
        return StakerToStake[user];
    }

    function viewMyBorrow(address user) public view returns(uint){
        return BorrowerToBorrow[user];
    }

    function viewTotalStake() public view returns(uint){
        return TotalStake;

    }


    function withdrawUser(address user) external{
        require(StakerToStake[msg.sender]>0,"not enough amount to withdraw");
        TotalStake-= StakerToStake[msg.sender];
        StakerToStake[msg.sender] = 0;
        
        payable(user).transfer(StakerToStake[user]);
        
        

    }

    function borrow(uint _amount) public{
        require(_amount < TotalStake,"not enough amount available to borrow");
        TotalStake-=_amount;
        BorrowerToBorrow[msg.sender]+=_amount;
        payable(msg.sender).transfer(_amount);

    }
    function payEmi(uint _amount) public payable {
        require(msg.value > 0, "Amount must be greater than zero.");
        require(msg.value>=_amount,"sent amount is less than specified amount");
        uint amount = msg.value;
        
        BorrowerToBorrow[msg.sender]-=amount;
        TotalStake+=amount;
        emit PaymentMade(msg.sender,amount);

    }



    



}