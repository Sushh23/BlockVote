import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import OrganizationList from './components/OrganizationList';
import VotingPage from './components/VotingPage';
import AdminDashboard from './components/AdminDashboard';

// UPDATE THIS WITH YOUR ACTUAL DEPLOYED CONTRACT ADDRESS
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE"; // Replace after deployment

const CONTRACT_ABI = [
  "function owner() view returns (address)",
  "function organizationCount() view returns (uint256)",
  "function candidateCount() view returns (uint256)",
  "function organizations(uint256) view returns (uint256 id, string name, bool isActive, uint256 candidateCount)",
  "function candidates(uint256) view returns (uint256 id, string name, uint256 voteCount, uint256 organizationId)",
  "function addOrganization(string memory _name)",
  "function addCandidate(string memory _name, uint256 _organizationId)",
  "function vote(uint256 _candidateId)",
  "function getAllOrganizations() view returns (tuple(uint256 id, string name, bool isActive, uint256 candidateCount)[])",
  "function getCandidatesByOrganization(uint256 _organizationId) view returns (tuple(uint256 id, string name, uint256 voteCount, uint256 organizationId)[])",
  "function hasUserVoted(address _user, uint256 _organizationId) view returns (bool)",
  "event OrganizationAdded(uint256 id, string name)",
  "event CandidateAdded(uint256 id, string name, uint256 organizationId)",
  "event VoteCasted(address voter, uint256 candidateId)"
];

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [currentPage, setCurrentPage] = useState('landing');
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [votedOrganizations, setVotedOrganizations] = useState({});

  // Wallet connection state for LandingPage
  const [isConnecting, setIsConnecting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Connect your MetaMask wallet to begin.');

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setStatusMessage('Waiting for wallet approval...');

      if (!window.ethereum) {
        setStatusMessage("MetaMask not found. Please install the extension.");
        setIsConnecting(false);
        alert('Please install MetaMask!');
        return;
      }

      // Request accounts
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      console.log('✅ Connected accounts:', accounts);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      setProvider(provider);
      setSigner(signer);
      setAccount(accounts[0]);
      setStatusMessage(`Connected to wallet: ${accounts[0].substring(0, 6)}...`);

      // Try to connect to contract
      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(contract);
        
        // Test contract connection
        try {
          const orgCount = await contract.organizationCount();
          console.log('✅ Contract connected. Organization count:', orgCount.toString());
          
          // Check if user is admin/owner
          try {
            const owner = await contract.owner();
            setIsAdmin(owner.toLowerCase() === accounts[0].toLowerCase());
            console.log('👑 Contract owner:', owner);
          } catch (ownerError) {
            console.log('⚠️ Could not get owner:', ownerError.message);
            setIsAdmin(false);
          }
          
          // Load organizations
          await loadOrganizations(contract, accounts[0]);
          
        } catch (testError) {
          console.log('⚠️ Contract may not be initialized:', testError.message);
          setOrganizations([]);
        }
        
      } catch (contractError) {
        console.log('⚠️ Could not connect to contract:', contractError.message);
        setContract(null);
        setOrganizations([]);
      }

      // Redirect to organizations page
      setCurrentPage('organizations');
      setIsConnecting(false);
      
    } catch (error) {
      console.error('❌ Error connecting wallet:', error);
      let userMessage = "Connection failed. Please check your wallet.";

      if (error.code === 4001) {
        userMessage = "Connection rejected by user. Please try again.";
      } else {
        userMessage = `Error: ${error.message}`;
      }

      setAccount(null);
      setStatusMessage(userMessage);
      setIsConnecting(false);
    }
  };

  // Load organizations
  const loadOrganizations = async (contractInstance, userAccount) => {
    if (!contractInstance) {
      console.log('No contract instance');
      setOrganizations([]);
      return;
    }
    
    try {
      console.log('📋 Loading organizations...');
      
      let orgsArray = [];
      
      try {
        const allOrgs = await contractInstance.getAllOrganizations();
        console.log('📋 Raw organizations data:', allOrgs);
        
        orgsArray = allOrgs.map(org => ({
          id: org.id.toNumber(),
          name: org.name,
          isActive: org.isActive,
          candidateCount: org.candidateCount.toNumber()
        }));
      } catch (orgError) {
        console.error('❌ Error loading organizations:', orgError);
        orgsArray = [];
      }
      
      setOrganizations(orgsArray);

      // Check vote status
      const votedStatus = {};
      for (let org of orgsArray) {
        try {
          const hasVoted = await contractInstance.hasUserVoted(userAccount, org.id);
          votedStatus[org.id] = hasVoted;
        } catch (voteError) {
          votedStatus[org.id] = false;
        }
      }
      setVotedOrganizations(votedStatus);
      
    } catch (error) {
      console.error('❌ Error in loadOrganizations:', error);
      setOrganizations([]);
    }
  };

  // Load candidates
  const loadCandidates = async (organizationId) => {
    if (!contract) {
      console.error('No contract available');
      setCandidates([]);
      return;
    }
    
    try {
      const orgCandidates = await contract.getCandidatesByOrganization(organizationId);
      const candidatesArray = orgCandidates.map(candidate => ({
        id: candidate.id.toNumber(),
        name: candidate.name,
        voteCount: candidate.voteCount.toNumber(),
        organizationId: candidate.organizationId.toNumber()
      }));
      setCandidates(candidatesArray);
    } catch (error) {
      console.error('❌ Error loading candidates:', error);
      setCandidates([]);
    }
  };

  // Add organization
  const addOrganization = async (name) => {
    if (!contract) {
      alert('Contract not connected');
      return;
    }
    
    try {
      const tx = await contract.addOrganization(name);
      await tx.wait();
      alert('Organization added successfully!');
      await loadOrganizations(contract, account);
    } catch (error) {
      console.error('❌ Error adding organization:', error);
      alert('Error adding organization: ' + error.message);
    }
  };

  // Add candidate
  const addCandidate = async (name, organizationId) => {
    if (!contract) {
      alert('Contract not connected');
      return;
    }
    
    try {
      const tx = await contract.addCandidate(name, organizationId);
      await tx.wait();
      alert('Candidate added successfully!');
      await loadOrganizations(contract, account);
    } catch (error) {
      console.error('❌ Error adding candidate:', error);
      alert('Error adding candidate: ' + error.message);
    }
  };

  // Cast vote
  const castVote = async (candidateId) => {
    if (!contract) {
      alert('Contract not connected');
      return;
    }
    
    try {
      const tx = await contract.vote(candidateId);
      await tx.wait();
      alert('Vote cast successfully!');
      
      await loadOrganizations(contract, account);
      if (selectedOrganization) {
        await loadCandidates(selectedOrganization.id);
      }
      
      setCurrentPage('organizations');
      setSelectedOrganization(null);
    } catch (error) {
      console.error('❌ Error casting vote:', error);
      alert('Error casting vote: ' + error.message);
    }
  };

  // Select organization for voting
  const handleSelectOrganization = async (org) => {
    setSelectedOrganization(org);
    await loadCandidates(org.id);
    setCurrentPage('voting');
  };

  // Navigate to voting page
  const handleNavigateToVoting = () => {
    if (account) {
      setCurrentPage('organizations');
    }
  };

  // Navigate to admin
  const handleNavigateToAdmin = () => {
    if (account && isAdmin) {
      setCurrentPage('admin');
    }
  };

  // Check if user has voted in organization
  const hasVotedInOrg = (orgId) => {
    return votedOrganizations[orgId] || false;
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setContract(null);
    setProvider(null);
    setSigner(null);
    setIsAdmin(false);
    setCurrentPage('landing');
    setOrganizations([]);
    setSelectedOrganization(null);
    setCandidates([]);
    setStatusMessage('Connect your MetaMask wallet to begin.');
    setIsConnecting(false);
  };

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          window.location.reload();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {account && (
        <Navigation 
          account={account} 
          onDisconnect={disconnectWallet}
          isAdmin={isAdmin}
          onVoteNavigate={handleNavigateToVoting}
          onAdminNavigate={handleNavigateToAdmin}
        />
      )}

      {currentPage === 'landing' && (
        <LandingPage 
          onConnect={connectWallet}
          account={account}
          isConnecting={isConnecting}
          statusMessage={statusMessage}
          onVoteNavigate={handleNavigateToVoting}
          onAdminNavigate={handleNavigateToAdmin}
          isAdmin={isAdmin}
        />
      )}

      {currentPage === 'organizations' && (
        <OrganizationList
          organizations={organizations}
          onSelectOrganization={handleSelectOrganization}
          hasVoted={hasVotedInOrg}
          isAdmin={isAdmin}
          onGoToAdmin={() => setCurrentPage('admin')}
        />
      )}

      {currentPage === 'voting' && selectedOrganization && (
        <VotingPage
          organization={selectedOrganization}
          candidates={candidates}
          onVote={castVote}
          onBack={() => {
            setCurrentPage('organizations');
            setSelectedOrganization(null);
          }}
          hasVoted={hasVotedInOrg}
        />
      )}

      {currentPage === 'admin' && isAdmin && (
        <AdminDashboard
          organizations={organizations}
          onAddOrganization={addOrganization}
          onAddCandidate={addCandidate}
          onBack={() => setCurrentPage('organizations')}
        />
      )}
    </div>
  );
}

export default App;