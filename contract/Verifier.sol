// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "https://github.com/0xPolygonID/tutorial-examples/blob/main/on-chain-verification/contracts/lib/GenesisUtils.sol";
import "https://github.com/0xPolygonID/tutorial-examples/blob/main/on-chain-verification/contracts/interfaces/ICircuitValidator.sol";
import "https://github.com/0xPolygonID/tutorial-examples/blob/main/on-chain-verification/contracts//verifiers/ZKPVerifier.sol";

contract Verifier is ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID = 1;
    // 0xeA0D144814Fdd5B6A6B0F89c72846A09Eb9c7346

    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public addressToId;
    mapping(address => bool) public addressToVerified;

    function getUserData(address user) public view returns(bool){
        return addressToVerified[user];

    }


    function _beforeProofSubmit(
        uint64, /* requestId */
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that  challenge input is address of sender
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        // this is linking between msg.sender and
        require(
            _msgSender() == addr,
            "address in proof is not a sender address"
        );
    }

    function _afterProofSubmit(
        uint64 requestId,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override {
        require(
            requestId == TRANSFER_REQUEST_ID && addressToId[_msgSender()] == 0,
            "proof can not be submitted more than once"
        );

        // address didn't get airdrop tokens
        uint256 id = inputs[validator.getChallengeInputIndex()];
        // additional check didn't get airdrop tokens before
        if (idToAddress[id] == address(0)) {
           addressToVerified[_msgSender()] = true;
            addressToId[_msgSender()] = id;
            idToAddress[id] = _msgSender();
        }
    }


}