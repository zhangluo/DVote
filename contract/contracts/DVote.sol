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
        require(msg.sender == admin, "仅管理员可执行此操作");
        _;
    }

    modifier electionOngoing(uint _electionId) {
        require(block.timestamp >= elections[_electionId].startTime, "选举尚未开始");
        require(block.timestamp <= elections[_electionId].endTime, "选举已结束");
        _;
    }

    modifier electionEnded(uint _electionId) {
        require(block.timestamp > elections[_electionId].endTime, "选举尚未结束");
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
        require(!election.voters[msg.sender], "您已投票");
        require(_candidateId > 0 && _candidateId <= election.candidatesCount, "无效的候选人ID");

        election.voters[msg.sender] = true;
        election.candidates[_candidateId].voteCount++;
        emit Voted(_electionId, msg.sender, _candidateId);
    }

    // 捐款给候选人
    function donate(uint _electionId, uint _candidateId) public payable electionOngoing(_electionId) {
        Election storage election = elections[_electionId];
        require(_candidateId > 0 && _candidateId <= election.candidatesCount, "无效的候选人ID");
        require(msg.value > 0, "捐款金额必须大于0");

        election.candidates[_candidateId].donationAmount += msg.value;
        emit DonationReceived(_electionId, msg.sender, _candidateId, msg.value);
    }

    // 候选人提款
    function withdraw(uint _electionId, uint _amount) public electionEnded(_electionId) {
        Election storage election = elections[_electionId];
        uint candidateId = getCandidateIdByAddress(_electionId, msg.sender);
        require(candidateId > 0, "您不是候选人");
        require(election.candidates[candidateId].donationAmount >= _amount, "提款金额超过总捐款");
        require(election.candidateWithdrawals[msg.sender] + _amount <= election.candidates[candidateId].donationAmount, "超出可提款金额");

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
}
