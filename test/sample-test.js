const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Upgradable", function () {

  beforeEach("Deploy first", async function () {
    [deployer, attacker, user] = await ethers.getSigners();   
    const Callee = await ethers.getContractFactory("Callee", deployer);
    this.callee = await Callee.deploy();

    const Caller = await ethers.getContractFactory("Caller", deployer);
    this.caller = await Caller.deploy();
  });

  describe("Test function first", function() {
    it.skip("Should be setX work correctly", async function() {
      await this.callee.setX(5);
      expect(await this.callee.x()).to.equal(5);
      await this.caller.setCalleeAddress(this.callee.address);
      expect(await this.caller.callee()).to.eq(this.callee.address);
    });

    it.skip("Should be update x from Caller by call Callee", async function() {   
      console.log("===================BY CALL FROM CALLER===============")   
      await this.caller.setCalleeAddress(this.callee.address);
      await this.caller.callCalleeContract(5);      
      console.log("x from callee = ", await this.callee.x());
      console.log("x from caller = ", await this.caller.x());
      console.log("===================BY DELEGATE CALL FROM CALLER===============")
      await this.caller.setCalleeAddress(this.callee.address);
      await this.caller.delegateCallCalleeContract(5);      
      console.log("x from callee = ", await this.callee.x());
      console.log("x from caller = ", await this.caller.x());
    });

    it("Should be update x from Caller by call fallback", async function() {   
      console.log("===================BY CALL FROM FALLBACK===============")   
      await this.caller.setCalleeAddress(this.callee.address);
      await this.caller.setX(5);      
      console.log("x from callee = ", await this.callee.x());
      console.log("x from caller = ", await this.caller.x());
     
    });
  })
  
  });

