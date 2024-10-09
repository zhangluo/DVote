// SPDX-License-Identifier: MIT
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DVote Contract", function () {
    let DVote;
    let dvote;
    let admin;
    let addr1;
    let addr2;

    beforeEach(async function () {
        // 获取账户
        [admin, addr1, addr2] = await ethers.getSigners();

        // 获取合约工厂并部署合约
        DVote = await ethers.getContractFactory("DVote");
        dvote = await DVote.deploy();
        await dvote.deployed();
    });

    describe("Election Management", function () {
        it("Should create an election successfully", async function () {
            await dvote.createElection("Test Election", 3600);
            const [name, startTime, endTime] = await dvote.getElectionInfo(1);

            expect(name).to.equal("Test Election");
            // expect(startTime).to.be.closeTo(Math.floor(Date.now() / 1000), 5);
        });

        it("Should add a candidate to the election", async function () {
            await dvote.createElection("Test Election", 3600);
            await dvote.addCandidate(1, "Candidate 1", "Description", "http://image.url");

            const [name] = await dvote.getCandidateInfo(1, 1);
            expect(name).to.equal("Candidate 1");
        });

        it("Should allow voting", async function () {
            await dvote.createElection("Test Election", 3600);
            await dvote.addCandidate(1, "Candidate 1", "Description", "http://image.url");

            await dvote.connect(addr1).vote(1, 1);
            const [, , , voteCount] = await dvote.getCandidateInfo(1, 1);
            console.log("voteCount:", voteCount); // 输出日志
            expect(voteCount).to.equal(1);
        });

        it("Should not allow duplicate votes", async function () {
            await dvote.createElection("Test Election", 3600);
            await dvote.addCandidate(1, "Candidate 1", "Description", "http://image.url");

            await dvote.connect(addr1).vote(1, 1);
            await expect(dvote.connect(addr1).vote(1, 1)).to.be.revertedWith("you have already voted");
        });

        it("Should allow donations", async function () {
            await dvote.createElection("Test Election", 3600);
            await dvote.addCandidate(1, "Candidate 1", "Description", "http://image.url");

            await dvote.connect(addr1).donate(1, 1, { value: ethers.utils.parseEther("1") });

            const [, , , , donationAmount] = await dvote.getCandidateInfo(1, 1);
            expect(donationAmount).to.equal(ethers.utils.parseEther("1"));
        });

        it("Should allow candidate to withdraw donations after election ends", async function () {
            await dvote.createElection("Test Election", 1); // 短时间选举
            await dvote.addCandidate(1, "Candidate 1", "Description", "http://image.url");

            await dvote.connect(addr1).donate(1, 1, { value: ethers.utils.parseEther("1") });

            // 快进时间，使得选举结束
            await ethers.provider.send("evm_increaseTime", [2]);
            await ethers.provider.send("evm_mine");

            await dvote.connect(addr1).withdraw(1, ethers.utils.parseEther("1"));
            const [, , , , donationAmount] = await dvote.getCandidateInfo(1, 1);
            expect(donationAmount).to.equal(0);
        });

        it("Should not allow withdrawal if candidate is not found", async function () {
            await dvote.createElection("Test Election", 3600);
            await dvote.addCandidate(1, "Candidate 1", "Description", "http://image.url");

            await ethers.provider.send("evm_increaseTime", [3600]);
            await ethers.provider.send("evm_mine");

            await expect(dvote.connect(addr2).withdraw(1, 1)).to.be.revertedWith("you are not a candidate");
        });
    });
});
