# 🗳️ BlockVote - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Running the Application](#running-the-application)
4. [MetaMask Configuration](#metamask-configuration)
5. [Testing the Application](#testing-the-application)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before starting, ensure you have the following installed:

### Required Software:
1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/
   - Verify installation: `node --version`
   - Should show v16.x.x or higher

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **MetaMask Browser Extension**
   - Chrome: https://chrome.google.com/webstore/detail/metamask/
   - Firefox: https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/
   - Brave/Edge: Available in respective extension stores

---

## 🚀 Initial Setup

### Step 1: Install Dependencies

#### Backend Setup
```powershell
cd backend
npm install
```

**What this does:**
- Installs Hardhat (Ethereum development environment)
- Installs ethers.js (library to interact with Ethereum)
- Installs development tools

#### Frontend Setup
```powershell
cd ..\frontend
npm install
```

**What this does:**
- Installs React and related dependencies
- Installs ethers.js for blockchain interaction
- Installs Tailwind CSS for styling
- Installs Vite for fast development

---

## 🎮 Running the Application

You need **THREE separate PowerShell/Terminal windows**. Follow these steps in order:

### Terminal 1: Start Local Blockchain Network

```powershell
cd backend
npm run node
# OR
npx hardhat node
```

**What this does:**
- Starts a local Ethereum blockchain on `http://127.0.0.1:8545`
- Creates 20 test accounts with 10,000 ETH each
- Displays private keys for testing

**Expected Output:**
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

... (18 more accounts)
```

**⚠️ IMPORTANT:** Keep this terminal running! Closing it will shut down the blockchain.

---

### Terminal 2: Deploy Smart Contract

**Wait until Terminal 1 is fully running**, then in a NEW terminal:

```powershell
cd backend
npm run deploy
# OR
npx hardhat run scripts/deploy.js --network localhost
```

**What this does:**
- Compiles the Solidity smart contract
- Deploys it to your local blockchain
- Saves the contract address to `frontend/src/contractConfig.js`
- Saves a backup to `backend/contractAddress.txt`

**Expected Output:**
```
Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Account balance: 10000000000000000000000
✅ VotingSystem contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
✅ Contract address saved to frontend/src/contractConfig.js
✅ Contract address saved to backend/contractAddress.txt
```

**Note:** The contract address will be different each time you restart the blockchain.

---

### Terminal 3: Start Frontend Development Server

**After successful deployment**, in a NEW terminal:

```powershell
cd frontend
npm run dev
```

**What this does:**
- Starts the React development server
- Usually runs on `http://localhost:5173` (Vite default)

**Expected Output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**🎉 Your application is now running!**

---

## 🦊 MetaMask Configuration

### Step 1: Install MetaMask
If you haven't already, install MetaMask from the official website.

### Step 2: Add Local Network to MetaMask

1. **Open MetaMask** extension in your browser
2. **Click on the network dropdown** (usually shows "Ethereum Mainnet")
3. **Click "Add Network"** or "Add a network manually"
4. **Enter the following details:**

   ```
   Network Name: Localhost 8545
   New RPC URL: http://127.0.0.1:8545
   Chain ID: 31337
   Currency Symbol: ETH
   Block Explorer URL: (leave blank)
   ```

5. **Click "Save"**
6. **Switch to the "Localhost 8545" network**

### Step 3: Import Test Account

1. **Copy a private key** from Terminal 1 (the one running `hardhat node`)
   - Example: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
   
2. **In MetaMask:**
   - Click on your account icon (top right)
   - Select "Import Account"
   - Select "Private Key" as import type
   - Paste the private key
   - Click "Import"

3. **You should now see 10,000 ETH** in your imported account

**⚠️ SECURITY NOTE:** These are TEST accounts only. NEVER use these private keys on mainnet or with real funds!

### Step 4: Multiple Accounts (Optional)

To test voting from different accounts:
1. Import 2-3 different private keys from Terminal 1
2. You can switch between accounts in MetaMask to simulate different users

---

## 🧪 Testing the Application

### Open the Application

1. **Open your browser** and go to: `http://localhost:5173`
2. **You should see the Landing Page** with "Connect Wallet" button

### Connect Your Wallet

1. **Click "Connect Wallet"**
2. **MetaMask will pop up** asking for permission
3. **Click "Next"** then **"Connect"**
4. **Your wallet is now connected!** 

### Test as Admin (First Account)

The first account (Account #0) from Hardhat is the contract owner/admin.

**Admin Functions:**
1. **Add Organization:**
   - Click on "Admin" in navigation
   - Enter organization name (e.g., "Student Council")
   - Click "Add Organization"
   - Confirm transaction in MetaMask
   - Wait for confirmation

2. **Add Candidates:**
   - Select the organization you created
   - Enter candidate name (e.g., "Alice")
   - Click "Add Candidate"
   - Confirm transaction
   - Add 2-3 more candidates

### Test as Voter

1. **Switch to a different account in MetaMask**
   - Click MetaMask extension
   - Switch to Account #1 or another imported account

2. **Refresh the page** (or reconnect wallet)

3. **Vote for a candidate:**
   - Go to "Organizations" page
   - Click "Vote" on an organization
   - Select a candidate
   - Click "Submit Vote"
   - Confirm transaction in MetaMask
   - Wait for confirmation

4. **View Results:**
   - You should see vote counts update
   - Try voting again - it should prevent you (already voted)

### Test Multiple Voters

1. **Switch to different accounts** in MetaMask
2. **Each account can vote once** per organization
3. **Watch the vote counts increase** in real-time

---

## 🐛 Troubleshooting

### Issue 1: MetaMask shows "Nonce too high" error

**Solution:**
1. Open MetaMask
2. Click Settings → Advanced
3. Click "Clear activity tab data" or "Reset Account"
4. This resets the transaction history
5. Try your transaction again

**When this happens:** After restarting the Hardhat node

---

### Issue 2: "Cannot connect to network" error

**Checklist:**
- ✅ Is Terminal 1 (hardhat node) still running?
- ✅ Is MetaMask connected to "Localhost 8545"?
- ✅ Is the Chain ID 31337?
- ✅ Is the RPC URL `http://127.0.0.1:8545`?

**Solution:** Verify all the above, restart terminals if needed.

---

### Issue 3: "Contract not deployed" or wrong contract address

**Solution:**
1. Stop Terminal 2 (if running)
2. Make sure Terminal 1 (hardhat node) is running
3. Run deployment again: `cd backend && npm run deploy`
4. Restart frontend (Terminal 3): Press Ctrl+C, then `npm run dev`

---

### Issue 4: Frontend shows old data after restarting

**Why this happens:** When you restart the Hardhat node, it creates a fresh blockchain with no data.

**Expected behavior:**
- No organizations will exist
- You need to add them again through the Admin panel
- This is normal for local development

**Solution:**
- Just create new organizations/candidates
- OR: Don't restart the Hardhat node unless necessary

---

### Issue 5: Transaction fails with "insufficient funds"

**Solution:**
1. Make sure you imported an account with 10,000 ETH
2. Check you're on the correct network (Localhost 8545)
3. The test accounts should have plenty of ETH

---

### Issue 6: Page shows "Please deploy contract first"

**Solution:**
1. The contract hasn't been deployed
2. Run: `cd backend && npm run deploy`
3. Check that `frontend/src/contractConfig.js` was created
4. Refresh the frontend

---

## 🔄 Complete Reset (Start Fresh)

If everything is broken, follow these steps:

### Step 1: Stop Everything
```powershell
# Press Ctrl+C in all three terminals
```

### Step 2: Clear MetaMask
1. Open MetaMask
2. Settings → Advanced → Reset Account
3. This clears transaction history

### Step 3: Restart in Order

**Terminal 1:**
```powershell
cd backend
npm run node
```

**Wait for it to start, then Terminal 2:**
```powershell
cd backend
npm run deploy
```

**Wait for deployment, then Terminal 3:**
```powershell
cd frontend
npm run dev
```

### Step 4: Refresh Browser
- Hard refresh: `Ctrl + Shift + R` (Chrome/Firefox)
- Or close and reopen browser

---

## 📝 Quick Command Reference

### Backend Commands
```powershell
cd backend
npm install              # Install dependencies
npm run compile          # Compile smart contracts
npm run node            # Start local blockchain
npm run deploy          # Deploy to local network
```

### Frontend Commands
```powershell
cd frontend
npm install              # Install dependencies
npm run dev             # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
```

---

## 🎯 Common Workflow

### Daily Development Workflow:

1. **Start Hardhat node** (Terminal 1)
   ```powershell
   cd backend && npm run node
   ```

2. **Deploy contract** (Terminal 2)
   ```powershell
   cd backend && npm run deploy
   ```

3. **Start frontend** (Terminal 3)
   ```powershell
   cd frontend && npm run dev
   ```

4. **Open browser** → `http://localhost:5173`

5. **Connect MetaMask** → Start testing!

---

## 🎓 Understanding the Components

### Backend (Blockchain)
- **Hardhat**: Development environment for Ethereum
- **Solidity**: Smart contract programming language
- **VotingSystem.sol**: The smart contract code
- **deploy.js**: Script to deploy the contract

### Frontend (User Interface)
- **React**: JavaScript library for building UI
- **ethers.js**: Library to interact with blockchain
- **Vite**: Fast development server
- **Tailwind CSS**: Utility-first CSS framework

### MetaMask
- **Wallet**: Stores your private keys
- **Bridge**: Connects your browser to blockchain
- **Transaction Signer**: Signs transactions to prove identity

---

## 🆘 Still Having Issues?

### Check the Console Logs

**Browser Console:**
1. Press `F12` in browser
2. Go to "Console" tab
3. Look for error messages (red text)

**Terminal Output:**
- Check all three terminals for error messages
- Look for red text or "Error" messages

### Common Error Messages and Solutions

| Error Message | Solution |
|--------------|----------|
| "MetaMask not found" | Install MetaMask extension |
| "Wrong network" | Switch to Localhost 8545 in MetaMask |
| "Contract not deployed" | Run deployment script |
| "Transaction failed" | Reset MetaMask account |
| "ECONNREFUSED" | Start Hardhat node first |

---

## 🎉 Success Checklist

You know everything is working when:

- ✅ Terminal 1 shows "Started HTTP and WebSocket JSON-RPC server"
- ✅ Terminal 2 shows "VotingSystem contract deployed to: 0x..."
- ✅ Terminal 3 shows "Local: http://localhost:5173/"
- ✅ MetaMask is connected to Localhost 8545
- ✅ Browser shows the landing page
- ✅ You can connect your wallet
- ✅ Admin can add organizations
- ✅ Admin can add candidates
- ✅ Users can vote
- ✅ Vote counts update correctly

---

## 📚 Additional Resources

- **Hardhat Documentation**: https://hardhat.org/docs
- **Ethers.js Documentation**: https://docs.ethers.org/
- **Solidity Documentation**: https://docs.soliditylang.org/
- **MetaMask Documentation**: https://docs.metamask.io/
- **React Documentation**: https://react.dev/

---

## 🔒 Security Notes

**For Local Development:**
- ✅ Safe to use test private keys
- ✅ No real money involved
- ✅ Network is isolated on your computer

**⚠️ WARNING for Production:**
- ❌ NEVER commit private keys to GitHub
- ❌ NEVER use test private keys on mainnet
- ❌ ALWAYS use environment variables for secrets
- ❌ NEVER share your real private keys

---

**Happy Voting! 🗳️**

If you have any questions, check the troubleshooting section or review the console logs for specific errors.
