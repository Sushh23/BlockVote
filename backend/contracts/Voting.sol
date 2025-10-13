// contracts/VotingSystem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    address public owner;
    uint256 public organizationCount;
    uint256 public candidateCount;
    
    struct Organization {
        uint256 id;
        string name;
        bool isActive;
        uint256 candidateCount;
    }
    
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
        uint256 organizationId;
    }
    
    mapping(uint256 => Organization) public organizations;
    mapping(uint256 => Candidate) public candidates;
    mapping(uint256 => uint256[]) public organizationCandidates;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    
    event OrganizationAdded(uint256 id, string name);
    event CandidateAdded(uint256 id, string name, uint256 organizationId);
    event VoteCasted(address voter, uint256 candidateId);
    
    constructor() {
        owner = msg.sender;
        organizationCount = 0;
        candidateCount = 0;
    }
    
    function addOrganization(string memory _name) public {
        organizationCount++;
        organizations[organizationCount] = Organization(
            organizationCount,
            _name,
            true,
            0
        );
        emit OrganizationAdded(organizationCount, _name);
    }
    
    function addCandidate(string memory _name, uint256 _organizationId) public {
        require(_organizationId > 0 && _organizationId <= organizationCount, "Invalid organization");
        require(organizations[_organizationId].isActive, "Organization not active");
        
        candidateCount++;
        candidates[candidateCount] = Candidate(
            candidateCount,
            _name,
            0,
            _organizationId
        );
        
        organizationCandidates[_organizationId].push(candidateCount);
        organizations[_organizationId].candidateCount++;
        
        emit CandidateAdded(candidateCount, _name, _organizationId);
    }
    
    function vote(uint256 _candidateId) public {
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate");
        Candidate storage candidate = candidates[_candidateId];
        require(!hasVoted[msg.sender][candidate.organizationId], "Already voted in this organization");
        
        hasVoted[msg.sender][candidate.organizationId] = true;
        candidate.voteCount++;
        
        emit VoteCasted(msg.sender, _candidateId);
    }
    
    function getAllOrganizations() public view returns (Organization[] memory) {
        Organization[] memory allOrgs = new Organization[](organizationCount);
        for (uint256 i = 1; i <= organizationCount; i++) {
            allOrgs[i-1] = organizations[i];
        }
        return allOrgs;
    }
    
    function getCandidatesByOrganization(uint256 _organizationId) public view returns (Candidate[] memory) {
        uint256[] memory candidateIds = organizationCandidates[_organizationId];
        Candidate[] memory orgCandidates = new Candidate[](candidateIds.length);
        
        for (uint256 i = 0; i < candidateIds.length; i++) {
            orgCandidates[i] = candidates[candidateIds[i]];
        }
        
        return orgCandidates;
    }
    
    function hasUserVoted(address _user, uint256 _organizationId) public view returns (bool) {
        return hasVoted[_user][_organizationId];
    }
}