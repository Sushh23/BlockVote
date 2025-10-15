# 🚀 BlockVote - QUICK START GUIDE (Print This!)

## ⚡ 3-Step Quick Start

### STEP 1: Setup (One-Time Only)
```powershell
# Option A: Automatic
.\start.ps1

# Option B: Manual
cd backend && npm install
cd ..\frontend && npm install
```

### STEP 2: Run Application (3 Terminals)
```powershell
# Terminal 1: Start Blockchain (KEEP OPEN)
cd backend && npm run node

# Terminal 2: Deploy Contract (wait for Terminal 1)
cd backend && npm run deploy

# Terminal 3: Start Frontend (wait for Terminal 2)
cd frontend && npm run dev
```

### STEP 3: Open & Connect
```
1. Open: http://localhost:5173
2. Click "Connect Wallet"
3. Approve in MetaMask
```

---

## 🦊 MetaMask Quick Setup

### Add Network:
```
Network:     Localhost 8545
RPC URL:     http://127.0.0.1:8545
Chain ID:    31337
Symbol:      ETH
```

### Import Account:
```
1. Copy private key from Terminal 1
2. MetaMask → Import Account
3. Paste key
4. See 10,000 ETH
```

---

## 🎮 Testing Steps

### As Admin (First Account):
```
1. Click "Admin"
2. Add Organization (e.g., "Student Council")
3. Add Candidates (e.g., "Alice", "Bob", "Carol")
```

### As Voter (Switch Account):
```
1. Switch account in MetaMask
2. Go to "Organizations"
3. Click "Vote"
4. Select candidate
5. Submit vote
6. See results update
```

---

## ❌ Troubleshooting

| Problem | Solution |
|---------|----------|
| "Nonce too high" | Reset MetaMask account |
| Contract not found | Restart Terminal 1 & 2 |
| Wrong network | Switch to Localhost 8545 |
| No connection | Check all 3 terminals running |

---

## 📁 Important Files

```
backend/
  scripts/deploy.js          # Deploys contract
  hardhat.config.cjs         # Network config

frontend/
  src/
    App.jsx                  # Main app
    contractConfig.js        # Contract address
```

---

## ✅ Quick Checklist

Before starting:
- [ ] Node.js installed (v16+)
- [ ] MetaMask installed
- [ ] Dependencies installed (`npm install`)

When running:
- [ ] Terminal 1: Hardhat node running
- [ ] Terminal 2: Contract deployed
- [ ] Terminal 3: Frontend running
- [ ] MetaMask on Localhost 8545
- [ ] Test account imported

When testing:
- [ ] Wallet connected
- [ ] Can add organization (admin)
- [ ] Can add candidates (admin)
- [ ] Can vote (any account)
- [ ] Vote counts update
- [ ] Can't vote twice

---

## 📚 Full Documentation

- **SETUP_GUIDE.md** - Complete instructions
- **VISUAL_GUIDE.md** - Diagrams & flowcharts
- **BLOCKCHAIN_CONNECTION.md** - How it works
- **PROJECT_SUMMARY.md** - Everything fixed

---

## 🆘 Emergency Reset

```powershell
# Stop all terminals (Ctrl+C)
# Reset MetaMask: Settings → Advanced → Reset Account
# Restart in order:
cd backend && npm run node      # Terminal 1
cd backend && npm run deploy    # Terminal 2 (wait)
cd frontend && npm run dev      # Terminal 3 (wait)
```

---

## 🎯 Success Indicators

✅ Terminal 1: "Started HTTP and WebSocket JSON-RPC server"
✅ Terminal 2: "VotingSystem contract deployed to: 0x..."
✅ Terminal 3: "Local: http://localhost:5173/"
✅ Browser: Landing page loads
✅ MetaMask: Connected to Localhost 8545
✅ Application: Can vote successfully

---

## 💡 Pro Tips

1. Keep Terminal 1 & 3 open while working
2. Use `.\check-system.ps1` to verify setup
3. Check browser console (F12) for errors
4. MetaMask must be on Localhost 8545
5. Reset MetaMask after restarting Hardhat

---

**Need help? See SETUP_GUIDE.md for detailed instructions!**

**Happy Voting! 🗳️**
