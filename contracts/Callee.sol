pragma solidity ^0.8.0;

contract Callee {

    uint256 public x;

    function setX(uint256 _x) public {
        x = _x;
    }
    
}