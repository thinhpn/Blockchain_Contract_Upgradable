pragma solidity ^0.8.0;

contract Caller {

    uint256 public x;
    address public callee;


    function callCalleeContract(uint256 number) external {
        (bool success, ) = callee.call(abi.encodeWithSignature("setX(uint256)", number));
        require(success, "Call failed");
    }

    function delegateCallCalleeContract(uint256 num) external {
        (bool success, ) =  callee.delegatecall(abi.encodeWithSignature("setX(uint256)", num));
        require(success, "Delegate failed");
    }

    function setCalleeAddress(address _callee) external {
        callee = _callee;
    }
    
    fallback() external {
        (bool success, ) =  callee.delegatecall(msg.data);
        require(success, "Delegate failed");
    }
}