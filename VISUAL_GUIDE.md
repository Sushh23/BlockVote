# 🎯 BlockVote - Visual Step-by-Step Guide

This guide provides a visual walkthrough of setting up and running your blockchain voting application.

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR COMPUTER                           │
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌─────────────┐  │
│  │   Browser    │    │   Frontend   │    │   Backend   │  │
│  │  (React UI)  │◄──►│   (Vite)     │◄──►│  (Hardhat)  │  │
│  │              │    │              │    │             │  │
│  │  Port: 5173  │    │  Port: 5173  │    │Port: 8545   │  │
│  └──────┬───────┘    └──────────────┘    └──────┬──────┘  │
│         │                                        │         │
│         │              ┌──────────────┐         │         │
│         └─────────────►│   MetaMask   │◄────────┘         │
│                        │   (Wallet)   │                   │
│                        └──────┬───────┘                   │
│                               │                           │
│                               ▼                           │
│                        ┌──────────────┐                   │
│                        │  Blockchain  │                   │
│                        │   (Hardhat   │                   │
│                        │   Network)   │                   │
│                        └──────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Setup Flow Diagram

```
┌────────────────────────────────────────────────────────────┐
│                    INITIAL SETUP (ONE TIME)                │
└────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Install Node.js │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │Install MetaMask │
                    └────────┬─────────┘
                             │
                             ▼
            ┌────────────────────────────────┐
            │  cd backend && npm install     │
            └────────────┬───────────────────┘
                         │
                         ▼
            ┌────────────────────────────────┐
            │  cd frontend && npm install    │
            └────────────┬───────────────────┘
                         │
                         ▼
                    ┌─────────────────┐
                    │  Setup Complete! │
                    └─────────────────┘

┌────────────────────────────────────────────────────────────┐
│              DAILY DEVELOPMENT WORKFLOW                    │
└────────────────────────────────────────────────────────────┘

    Terminal 1          Terminal 2          Terminal 3
        │                   │                   │
        ▼                   │                   │
┌──────────────┐            │                   │
│Start Hardhat │            │                   │
│     Node     │            │                   │
└──────┬───────┘            │                   │
       │                    │                   │
       │ (Wait for          │                   │
       │  "Started HTTP..." │                   │
       │   message)         │                   │
       │                    ▼                   │
       │            ┌──────────────┐            │
       │            │Deploy Contract│            │
       │            └──────┬───────┘            │
       │                   │                    │
       │                   │ (Wait for          │
       │                   │  "deployed to"     │
       │                   │   message)         │
       │                   │                    ▼
       │                   │            ┌──────────────┐
       │                   │            │Start Frontend│
       │                   │            └──────┬───────┘
       │                   │                   │
       ▼                   ▼                   ▼
   [Running]           [Complete]         [Running]
       │                                       │
       │                                       ▼
       │                            Open http://localhost:5173
       │                                       │
       │                                       ▼
       │                                 Connect MetaMask
       │                                       │
       │                                       ▼
       └──────────►  Application Ready! ◄─────┘
```

---

## 🖥️ Terminal Commands Cheat Sheet

### Terminal 1: Start Blockchain
```powershell
cd "d:\2022-2026 TSEC\TSEC\TSEC BE\BE SEM7\BC\BlockVote\backend"
npm run node
```
**Status:** Keep running (don't close!)
**Expected output:** List of 20 test accounts with private keys

---

### Terminal 2: Deploy Contract
```powershell
cd "d:\2022-2026 TSEC\TSEC\TSEC BE\BE SEM7\BC\BlockVote\backend"
npm run deploy
```
**Status:** Runs once, then you can close
**Expected output:** "VotingSystem contract deployed to: 0x..."

---

### Terminal 3: Start Frontend
```powershell
cd "d:\2022-2026 TSEC\TSEC\TSEC BE\BE SEM7\BC\BlockVote\frontend"
npm run dev
```
**Status:** Keep running (don't close!)
**Expected output:** "Local: http://localhost:5173/"

---

## 🦊 MetaMask Setup - Step by Step

### Adding Local Network

```
┌─────────────────────────────────────────────────────┐
│  MetaMask Window                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Network Name:        Localhost 8545                │
│  New RPC URL:         http://127.0.0.1:8545        │
│  Chain ID:            31337                         │
│  Currency Symbol:     ETH                           │
│  Block Explorer URL:  (leave blank)                 │
│                                                     │
│                      [Save]                         │
└─────────────────────────────────────────────────────┘
```

### Importing Test Account

1. Copy private key from Terminal 1:
   ```
   Example:
   0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

2. In MetaMask:
   - Click account icon → "Import Account"
   - Paste private key
   - Click "Import"

3. Result: You'll see **10,000 ETH** balance

---

## 🎮 User Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│                    USER JOURNEY                          │
└──────────────────────────────────────────────────────────┘

                    ┌─────────────┐
                    │Landing Page │
                    └──────┬──────┘
                           │
                           ▼
                ┌──────────────────┐
                │  Click "Connect  │
                │     Wallet"      │
                └────────┬─────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   MetaMask Popup     │
              │   (Select Account)   │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │  Wallet Connected!   │
              │  → Organizations     │
              │       Page           │
              └──────────┬───────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
            ▼                         ▼
    ┌──────────────┐         ┌──────────────┐
    │  Admin User? │         │ Regular User?│
    │              │         │              │
    │  • Add Orgs  │         │  • View Orgs │
    │  • Add       │         │  • Vote      │
    │    Candidates│         │  • See       │
    │  • View      │         │    Results   │
    │    Results   │         │              │
    └──────────────┘         └──────────────┘
```

---

## 🔢 Transaction Flow

```
┌───────────────────────────────────────────────────────────┐
│               VOTING TRANSACTION FLOW                     │
└───────────────────────────────────────────────────────────┘

User clicks "Vote"
        │
        ▼
┌───────────────────┐
│Select Candidate   │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│Click "Submit Vote"│
└────────┬──────────┘
         │
         ▼
┌───────────────────┐       ┌─────────────────────────┐
│  MetaMask Popup   │       │  Transaction Details:   │
│                   │       │  • Gas Fee: ~0.001 ETH  │
│  Confirm?         │──────►│  • To: Contract Address │
│                   │       │  • Data: vote(candidateId)│
└────────┬──────────┘       └─────────────────────────┘
         │
         ▼
┌───────────────────┐
│User Clicks        │
│   "Confirm"       │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│Transaction Sent   │
│to Blockchain      │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│Blockchain         │
│Processes          │
│(~2 seconds)       │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│Transaction        │
│Confirmed!         │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│Vote Count         │
│Updates on Screen  │
└───────────────────┘
```

---

## 🗂️ File Structure Explained

```
BlockVote/
│
├── backend/                          # Blockchain & Smart Contracts
│   ├── contracts/
│   │   └── Voting.sol               # 📝 Smart contract code
│   ├── scripts/
│   │   ├── deploy.js                # 🚀 Deployment script
│   │   └── mineBlocks.js            # ⛏️ Utility script
│   ├── artifacts/                   # 🏗️ Compiled contracts (auto-generated)
│   ├── cache/                       # 💾 Build cache (auto-generated)
│   ├── hardhat.config.cjs           # ⚙️ Hardhat configuration
│   ├── package.json                 # 📦 Backend dependencies
│   ├── contractAddress.txt          # 📍 Deployed address (auto-generated)
│   └── .env.example                 # 🔐 Environment template
│
├── frontend/                         # React User Interface
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.jsx     # 🏠 Home page
│   │   │   ├── Navigation.jsx      # 🧭 Navigation bar
│   │   │   ├── OrganizationList.jsx # 📋 List organizations
│   │   │   ├── VotingPage.jsx      # 🗳️ Voting interface
│   │   │   └── AdminDashboard.jsx  # 👑 Admin panel
│   │   ├── App.jsx                  # 🎯 Main app component
│   │   ├── main.jsx                 # 🚪 Entry point
│   │   ├── contractConfig.js        # 📍 Contract address (auto-generated)
│   │   └── index.css                # 🎨 Styles
│   ├── public/                      # 📁 Static assets
│   ├── package.json                 # 📦 Frontend dependencies
│   ├── vite.config.js               # ⚡ Vite configuration
│   └── tailwind.config.js           # 🎨 Tailwind configuration
│
├── SETUP_GUIDE.md                   # 📖 Detailed setup guide
├── README.md                         # 📘 Project overview
├── INSTRUCTIONS.md                   # 📝 Original instructions
├── start.ps1                         # 🚀 Windows setup script
└── VISUAL_GUIDE.md                   # 📊 This file
```

---

## 🎨 Application Screens

### 1. Landing Page
```
┌──────────────────────────────────────────────────┐
│                    BlockVote                     │
│              Decentralized Voting                │
├──────────────────────────────────────────────────┤
│                                                  │
│        🗳️  Welcome to BlockVote                  │
│                                                  │
│    A secure, transparent blockchain-based        │
│           voting platform                        │
│                                                  │
│           ┌──────────────────┐                   │
│           │  Connect Wallet  │                   │
│           └──────────────────┘                   │
│                                                  │
└──────────────────────────────────────────────────┘
```

### 2. Organizations Page
```
┌──────────────────────────────────────────────────┐
│  Home | Organizations | Admin    [0x1234...5678]│
├──────────────────────────────────────────────────┤
│                                                  │
│  Available Organizations:                        │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ 🏛️  Student Council                      │    │
│  │ Candidates: 3                            │    │
│  │ Status: ✅ Not Voted                     │    │
│  │                        [Vote Now]        │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ 🏛️  Sports Committee                     │    │
│  │ Candidates: 4                            │    │
│  │ Status: ✅ Not Voted                     │    │
│  │                        [Vote Now]        │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
└──────────────────────────────────────────────────┘
```

### 3. Voting Page
```
┌──────────────────────────────────────────────────┐
│  Home | Organizations | Admin    [0x1234...5678]│
├──────────────────────────────────────────────────┤
│                                                  │
│  Vote for: Student Council                       │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ ⚪ Alice Johnson        Votes: 5         │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ ⚪ Bob Smith           Votes: 3          │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ ⚪ Carol White         Votes: 7          │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│          ┌────────────┐  ┌─────────┐            │
│          │Submit Vote │  │  Back   │            │
│          └────────────┘  └─────────┘            │
│                                                  │
└──────────────────────────────────────────────────┘
```

### 4. Admin Dashboard
```
┌──────────────────────────────────────────────────┐
│  Home | Organizations | Admin    [0x1234...5678]│
├──────────────────────────────────────────────────┤
│                                                  │
│  👑 Admin Dashboard                              │
│                                                  │
│  Add Organization:                               │
│  ┌─────────────────────────────────────────┐    │
│  │ Organization Name                       │    │
│  └─────────────────────────────────────────┘    │
│                    [Add Organization]            │
│                                                  │
│  ──────────────────────────────────────────      │
│                                                  │
│  Add Candidate:                                  │
│  ┌─────────────────────────────────────────┐    │
│  │ Select Organization            ▼        │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │ Candidate Name                          │    │
│  └─────────────────────────────────────────┘    │
│                    [Add Candidate]               │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## 🔍 Debugging Checklist

Use this checklist when troubleshooting:

```
┌─────────────────────────────────────────────────┐
│            DEBUGGING CHECKLIST                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  Backend:                                       │
│  □ Node.js is installed (node --version)       │
│  □ Backend dependencies installed               │
│  □ Terminal 1: Hardhat node is running          │
│  □ Terminal 1 shows "Started HTTP and           │
│    WebSocket JSON-RPC server"                   │
│  □ Terminal 2: Contract deployed successfully   │
│  □ contractConfig.js file exists in frontend/src│
│                                                 │
│  Frontend:                                      │
│  □ Frontend dependencies installed              │
│  □ Terminal 3: Vite dev server is running       │
│  □ Browser can access http://localhost:5173     │
│                                                 │
│  MetaMask:                                      │
│  □ MetaMask extension is installed              │
│  □ Network "Localhost 8545" is added            │
│  □ Chain ID is 31337                            │
│  □ RPC URL is http://127.0.0.1:8545             │
│  □ MetaMask is connected to Localhost 8545      │
│  □ Test account imported with 10,000 ETH        │
│  □ Account is unlocked                          │
│                                                 │
│  Browser:                                       │
│  □ Browser console shows no errors (F12)        │
│  □ MetaMask shows correct network               │
│  □ Page loaded successfully                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📊 Gas Costs Reference

Approximate gas costs for operations (on local network):

```
┌──────────────────────────────────────────┐
│  Operation          │  Gas Cost (ETH)    │
├──────────────────────────────────────────┤
│  Add Organization   │  ~0.001 ETH        │
│  Add Candidate      │  ~0.0008 ETH       │
│  Cast Vote          │  ~0.0006 ETH       │
│  View Results       │  FREE (read-only)  │
└──────────────────────────────────────────┘

Note: Local network gas is fake - no real cost!
```

---

## 🎯 Testing Scenarios

### Scenario 1: Single Organization, Multiple Voters
```
1. Admin creates "Student Council"
2. Admin adds 3 candidates
3. Import 5 test accounts to MetaMask
4. Each account votes for different candidates
5. View results showing vote distribution
```

### Scenario 2: Multiple Organizations
```
1. Admin creates "Student Council"
2. Admin creates "Sports Committee"
3. Admin adds candidates to both
4. User can vote in both organizations
5. Results shown separately for each
```

### Scenario 3: Double Vote Prevention
```
1. User votes in "Student Council"
2. User tries to vote again
3. Transaction rejected: "Already voted"
4. Success! Double voting prevented
```

---

## 📈 Success Indicators

You know everything is working when you see:

### Terminal 1 (Hardhat Node)
```
✅ "Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/"
✅ List of 20 accounts with private keys
✅ Terminal stays open and shows transaction logs
```

### Terminal 2 (Deployment)
```
✅ "Deploying contracts with the account: 0x..."
✅ "VotingSystem contract deployed to: 0x..."
✅ "Contract address saved to frontend/src/contractConfig.js"
```

### Terminal 3 (Frontend)
```
✅ "VITE v5.x.x ready in XXX ms"
✅ "Local: http://localhost:5173/"
✅ No error messages
```

### Browser
```
✅ Landing page loads
✅ MetaMask connects successfully
✅ Organizations page shows
✅ Can add organizations (admin)
✅ Can add candidates (admin)
✅ Can vote successfully
✅ Vote counts update in real-time
```

### MetaMask
```
✅ Connected to "Localhost 8545"
✅ Shows 10,000 ETH (or slightly less after transactions)
✅ Transaction history shows successful votes
✅ No "nonce too high" errors
```

---

## 🎓 Key Concepts

### What is Hardhat?
- Local Ethereum development environment
- Provides test blockchain and accounts
- Fast and easy for development
- NO real money involved

### What is MetaMask?
- Browser wallet for Ethereum
- Stores your private keys
- Signs transactions
- Connects websites to blockchain

### What is a Smart Contract?
- Code that runs on blockchain
- Immutable once deployed
- Executes automatically
- Transparent and verifiable

### What is Gas?
- Fee to execute transactions
- Paid in ETH
- Prevents spam
- On local network: fake/free

---

## 🚀 Next Steps

Once you have everything working:

1. **Experiment:**
   - Create multiple organizations
   - Add many candidates
   - Test with different accounts

2. **Learn More:**
   - Read the smart contract code
   - Understand how voting works
   - Explore React components

3. **Extend:**
   - Add vote start/end times
   - Add candidate descriptions
   - Add voter registration
   - Add result charts

4. **Deploy to Testnet:**
   - Deploy to Sepolia testnet
   - Use real (test) ETH
   - Share with others

---

**Happy Voting! 🗳️**

For detailed instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)
