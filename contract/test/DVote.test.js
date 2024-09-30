// SPDX-License-Identifier: MIT
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DVote Contract", function () {
    let DVote;
    let dvote;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        DVote = await ethers.getContractFactory("DVote");
        dvote = await DVote.deploy();
        await dvote.deployed();
    });

    it("Should create an election", async function () {
        await dvote.createElection("Test Election");
        const election = await dvote.elections(1);
        expect(election.name).to.equal("Test Election");
        expect(election.isActive).to.equal(true);
    });

    it("Should add a candidate", async function () {
        await dvote.createElection("Test Election");
        await dvote.addCandidate(1, "Alice");
        const candidate = await dvote.elections(1).candidates(1);
        expect(candidate.name).to.equal("Alice");
        expect(candidate.voteCount).to.equal(0);
        expect(candidate.fundsReceived).to.equal(0);
    });

    it("Should allow voting for a candidate", async function () {
        await dvote.createElection("Test Election");
        await dvote.addCandidate(1, "Alice");
        await dvote.vote(1, 1);
        const candidate = await dvote.elections(1).candidates(1);
        expect(candidate.voteCount).to.equal(1);
    });

    it("Should allow donations to a candidate", async function () {
        await dvote.createElection("Test Election");
        await dvote.addCandidate(1, "Alice");
        await dvote.donate(1, 1, { value: ethers.utils.parseEther("1.0") });
        const candidate = await dvote.elections(1).candidates(1);
        expect(candidate.fundsReceived).to.equal(ethers.utils.parseEther("1.0"));
    });

    it("Should end an election", async function () {
        await dvote.createElection("Test Election");
        await dvote.endElection(1);
        const election = await dvote.elections(1);
        expect(election.isActive).to.equal(false);
    });

    it("Should revert voting if election is not active", async function () {
        await dvote.createElection("Test Election");
        await dvote.addCandidate(1, "Alice");
        await dvote.endElection(1);
        await expect(dvote.vote(1, 1)).to.be.revertedWith("Election is not active");
    });

    it("Should revert donation if amount is zero", async function () {
        await dvote.createElection("Test Election");
        await dvote.addCandidate(1, "Alice");
        await expect(dvote.donate(1, 1, { value: 0 })).to.be.revertedWith("Donation must be greater than 0");
    });
});
