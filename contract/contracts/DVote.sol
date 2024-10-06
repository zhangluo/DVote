// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract DVote {
     struct Candidate {
        uint id;
        string name;
        string description;
        string imageUrl;
        uint voteCount;
        uint donationAmount;
        address payable candidateAddress;
    }

    struct Election {
        uint id;
        string name;
        uint startTime;
        uint endTime;
        uint candidatesCount;
        mapping(uint => Candidate) candidates; // 每个选举的候选人
        mapping(address => bool) voters;       // 记录投票者
        mapping(address => uint) candidateWithdrawals; // 候选人的提款记录
    }

    address public admin;
    uint public electionsCount;
    mapping(uint => Election) public elections; // 选举池

    event ElectionCreated(uint electionId, string name, uint endTime);
    event CandidateAdded(uint electionId, uint candidateId, string name);
    event Voted(uint electionId, address voter, uint candidateId);
    event DonationReceived(uint electionId, address donor, uint candidateId, uint amount);
    event Withdrawn(uint electionId, address candidate, uint amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can execute this operation");
        _;
    }

    modifier electionOngoing(uint _electionId) {
        require(block.timestamp >= elections[_electionId].startTime, "election is not started yet");
        require(block.timestamp <= elections[_electionId].endTime, "election is already ended");
        _;
    }

    modifier electionEnded(uint _electionId) {
        require(block.timestamp > elections[_electionId].endTime, "election is not ended yet");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // 创建新选举
    function createElection(string memory _name, uint _duration) public onlyAdmin {
        electionsCount++;
        Election storage newElection = elections[electionsCount];
        newElection.id = electionsCount;
        newElection.name = _name;
        newElection.startTime = block.timestamp;
        newElection.endTime = block.timestamp + _duration;
        emit ElectionCreated(electionsCount, _name, newElection.endTime);
    }

    // 为指定选举添加候选人
    function addCandidate(uint _electionId, string memory _name, string memory _description, string memory _imageUrl) public onlyAdmin {
        Election storage election = elections[_electionId];
        election.candidatesCount++;
        election.candidates[election.candidatesCount] = Candidate(election.candidatesCount, _name, _description, _imageUrl, 0, 0, payable(msg.sender));
        emit CandidateAdded(_electionId, election.candidatesCount, _name);
    }

    // 为候选人投票
    function vote(uint _electionId, uint _candidateId) public electionOngoing(_electionId) {
        Election storage election = elections[_electionId];
        require(!election.voters[msg.sender], "you have already voted");
        require(_candidateId > 0 && _candidateId <= election.candidatesCount, "invalid candidate id");

        election.voters[msg.sender] = true;
        election.candidates[_candidateId].voteCount++;
        emit Voted(_electionId, msg.sender, _candidateId);
    }

    // 捐款给候选人
    function donate(uint _electionId, uint _candidateId) public payable electionOngoing(_electionId) {
        Election storage election = elections[_electionId];
        require(_candidateId > 0 && _candidateId <= election.candidatesCount, "invalid candidate id");
        require(msg.value > 0, "donation amount should be greater than 0");

        // 更新候选人的捐款总额
        election.candidates[_candidateId].donationAmount += msg.value;

        // 这里可以添加额外的转账逻辑，尽管这在实际中是不必要的
        payable(address(this)).transfer(msg.value); // 明确转账到合约自身（通常不需要）

        // 发出捐款接收事件
        emit DonationReceived(_electionId, msg.sender, _candidateId, msg.value);
    }

    

    // 候选人提款
    function withdraw(uint _electionId, uint _amount) public electionEnded(_electionId) {
        Election storage election = elections[_electionId];
        uint candidateId = getCandidateIdByAddress(_electionId, msg.sender);
        require(candidateId > 0, "you are not a candidate");
        require(election.candidates[candidateId].donationAmount >= _amount, "insufficient balance");
        require(election.candidateWithdrawals[msg.sender] + _amount <= election.candidates[candidateId].donationAmount, "over withdrawal limit");

        election.candidates[candidateId].donationAmount -= _amount;
        election.candidateWithdrawals[msg.sender] += _amount;
        election.candidates[candidateId].candidateAddress.transfer(_amount);

        emit Withdrawn(_electionId, msg.sender, _amount);
    }

    // 获取候选人ID
    function getCandidateIdByAddress(uint _electionId, address _candidateAddress) internal view returns (uint) {
        Election storage election = elections[_electionId];
        for (uint i = 1; i <= election.candidatesCount; i++) {
            if (election.candidates[i].candidateAddress == _candidateAddress) {
                return i;
            }
        }
        return 0;
    }

    // 获取选举信息
    function getElectionInfo(uint _electionId) public view returns (string memory, uint, uint) {
        Election storage election = elections[_electionId];
        return (election.name, election.startTime, election.endTime);
    }

    // 获取候选人信息
    function getCandidateInfo(uint _electionId, uint _candidateId) public view returns (string memory, string memory, string memory, uint, uint) {
        Election storage election = elections[_electionId];
        Candidate storage candidate = election.candidates[_candidateId];
        return (candidate.name, candidate.description, candidate.imageUrl, candidate.voteCount, candidate.donationAmount);
    }

    // 获取所有选举的概要信息，不包含映射
    function getAllElections() public view returns (uint[] memory, string[] memory, uint[] memory, uint[] memory) {
        uint[] memory ids = new uint[](electionsCount);
        string[] memory names = new string[](electionsCount);
        uint[] memory startTimes = new uint[](electionsCount);
        uint[] memory endTimes = new uint[](electionsCount);

        for (uint i = 1; i <= electionsCount; i++) {
            Election storage election = elections[i];
            ids[i - 1] = election.id;
            names[i - 1] = election.name;
            startTimes[i - 1] = election.startTime;
            endTimes[i - 1] = election.endTime;
        }

        return (ids, names, startTimes, endTimes);
    }

    // 获取指定选举的所有候选人信息，不包含映射
    function getCandidates(uint _electionId) public view returns (uint[] memory, string[] memory, string[] memory, string[] memory, uint[] memory, uint[] memory) {
        Election storage election = elections[_electionId];
        uint candidatesCount = election.candidatesCount;

        uint[] memory ids = new uint[](candidatesCount);
        string[] memory names = new string[](candidatesCount);
        string[] memory descriptions = new string[](candidatesCount);
        string[] memory imageUrls = new string[](candidatesCount);
        uint[] memory voteCounts = new uint[](candidatesCount);
        uint[] memory donationAmounts = new uint[](candidatesCount);

        for (uint i = 1; i <= candidatesCount; i++) {
            Candidate storage candidate = election.candidates[i];
            ids[i - 1] = candidate.id;
            names[i - 1] = candidate.name;
            descriptions[i - 1] = candidate.description;
            imageUrls[i - 1] = candidate.imageUrl;
            voteCounts[i - 1] = candidate.voteCount;
            donationAmounts[i - 1] = candidate.donationAmount;
        }

        return (ids, names, descriptions, imageUrls, voteCounts, donationAmounts);
    }
    
}
