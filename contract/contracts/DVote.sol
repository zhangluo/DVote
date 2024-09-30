// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract DVote {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        uint fundsReceived;
    }

    struct Election {
        uint id;
        string name;
        bool isActive;
        mapping(uint => Candidate) candidates;
        uint candidateCount;
    }

    mapping(uint => Election) public elections;
    uint public electionCount;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }


    function createElection(string memory _name) public onlyOwner {
        electionCount++;
        elections[electionCount].id = electionCount;
        elections[electionCount].name = _name;
        elections[electionCount].isActive = true;
    }


    function addCandidate(uint _electionId, string memory _candidateName) public onlyOwner {
        Election storage election = elections[_electionId];
        election.candidateCount++;
        election.candidates[election.candidateCount] = Candidate(election.candidateCount, _candidateName, 0, 0);
    }


    function vote(uint _electionId, uint _candidateId) public {
        Election storage election = elections[_electionId];
        require(election.isActive, "Election is not active");
        Candidate storage candidate = election.candidates[_candidateId];
        candidate.voteCount++;
    }


    function donate(uint _electionId, uint _candidateId) public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        Election storage election = elections[_electionId];
        Candidate storage candidate = election.candidates[_candidateId];
        candidate.fundsReceived += msg.value;
    }


    function endElection(uint _electionId) public onlyOwner {
        elections[_electionId].isActive = false;
    }

 
    function getCandidateFunds(uint _electionId, uint _candidateId) public view returns (uint) {
        return elections[_electionId].candidates[_candidateId].fundsReceived;
    }


    function getCandidateVotes(uint _electionId, uint _candidateId) public view returns (uint) {
        return elections[_electionId].candidates[_candidateId].voteCount;
    }
}
