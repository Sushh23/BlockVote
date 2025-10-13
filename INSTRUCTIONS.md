# Blockchain Voting System

A decentralized voting application built with Hardhat, Solidity, and React.

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Project Structure

```
blockchain-voting-system/
├── backend/          # Smart contracts and Hardhat configuration
├── frontend/         # React application
└── INSTRUCTIONS.md
```

## Setup Instructions

### 1. Install Dependencies

**Backend Dependencies:**
```bash
cd backend
npm install
```

**Frontend Dependencies:**
```bash
cd frontend
npm install
```

### 2. Run the Application

You need to open **three separate terminals** and run the following commands in order:

#### Terminal 1: Start Local Blockchain
```bash
cd backend
npx hardhat node
```
This starts a local Ethereum network on `http://127.0.0.1:8545` with 20 test accounts.

#### Terminal 2: Deploy Smart Contract
```bash
cd backend
npx hardhat run scripts/deploy.js --network localhost
```
This deploys the Voting contract to your local blockchain and saves the contract address.

#### Terminal 3: Start Frontend Development Server
```bash
cd frontend
npm run dev
```
This starts the React development server, usually on `http://localhost:3000`

## Access the Application

1. Open your browser and go to `http://localhost:3000`
2. Connect your MetaMask wallet to the local network:
   - Network: `Localhost 8545`
   - Chain ID: `31337`
3. Import one of the test accounts from Terminal 1 into MetaMask for testing

## Troubleshooting

### Common Issues

1. **MetaMask Connection Issues:**
   - Make sure MetaMask is connected to `Localhost 8545`
   - Chain ID should be `31337`
   - Import accounts using private keys from the hardhat node output

2. **Contract Deployment Issues:**
   - Ensure the local blockchain is running in Terminal 1
   - Check that all dependencies are installed
   - Verify the contract compiled successfully

3. **Frontend Connection Issues:**
   - Ensure the contract was deployed successfully
   - Check that the contract address was saved correctly
   - Verify the frontend is using the correct contract ABI

### Reset Instructions

If you encounter issues, you can reset by:

1. Stop all three terminals (Ctrl+C)
2. Restart in the same order:
   - Terminal 1: `npx hardhat node`
   - Terminal 2: `npx hardhat run scripts/deploy.js --network localhost`
   - Terminal 3: `npm run dev` (in frontend directory)

## Smart Contract Features

- Create elections with candidates
- Vote for candidates (one vote per address)
- View election results
- Admin functions for election management

## Frontend Features

- Connect/disconnect wallet
- View active elections
- Vote in elections
- View real-time results
- Admin panel for creating elections


```

