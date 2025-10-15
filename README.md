# 🗳️ BlockVote - Blockchain Voting System

A decentralized voting application built with Hardhat, Solidity, React, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- MetaMask browser extension

### Installation & Setup

```powershell
# Run the setup script (Windows)
.\start.ps1

# OR manually install dependencies
cd backend
npm install
cd ..\frontend
npm install
```

### Running the Application

**You need 3 separate terminals:**

**Terminal 1 - Start Blockchain:**
```powershell
cd backend
npm run node
```

**Terminal 2 - Deploy Contract (after Terminal 1 is running):**
```powershell
cd backend
npm run deploy
```

**Terminal 3 - Start Frontend (after deployment):**
```powershell
cd frontend
npm run dev
```

Open http://localhost:5173 in your browser!

## 📚 Documentation

- **[Complete Setup Guide](SETUP_GUIDE.md)** - Detailed step-by-step instructions
- **[Original Instructions](INSTRUCTIONS.md)** - Basic overview

## 🔧 Configuration

### MetaMask Setup
1. Add network: Localhost 8545
2. RPC URL: http://127.0.0.1:8545
3. Chain ID: 31337
4. Import test account from Hardhat output

## 🏗️ Project Structure

```
BlockVote/
├── backend/              # Smart contracts & Hardhat
│   ├── contracts/        # Solidity contracts
│   ├── scripts/          # Deployment scripts
│   └── hardhat.config.cjs
├── frontend/             # React application
│   └── src/
│       ├── components/   # React components
│       └── contractConfig.js  # Auto-generated contract address
├── SETUP_GUIDE.md       # Detailed setup instructions
└── README.md            # This file
```

## ✨ Features

- 🔐 Wallet authentication with MetaMask
- 🏢 Create multiple voting organizations
- 👥 Add candidates to organizations
- 🗳️ Cast votes on blockchain
- 📊 Real-time vote counting
- 👑 Admin panel for management
- 🚫 Prevent double voting
- ⛓️ Transparent blockchain records

## 🐛 Troubleshooting

### "Nonce too high" error
- Reset MetaMask account: Settings → Advanced → Reset Account

### Contract not found
- Ensure Terminal 1 (hardhat node) is running
- Re-run deployment: `cd backend && npm run deploy`

### Wrong network
- Switch MetaMask to "Localhost 8545"
- Verify Chain ID is 31337

For more troubleshooting, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

## 🔒 Security

**⚠️ This is for development only!**
- Never use test private keys on mainnet
- Keep private keys secure
- Don't commit .env files

## 📝 License

ISC

## 👥 Contributing

This is a college project for TSEC BE Sem 7 Blockchain course.

---

**Need help?** Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions!
