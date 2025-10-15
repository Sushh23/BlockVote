# BlockVote - System Check Script
# This script checks if everything is set up correctly

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BlockVote - System Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Node.js
Write-Host "[1/7] Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "  ✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Node.js NOT installed!" -ForegroundColor Red
    Write-Host "     Download from: https://nodejs.org/" -ForegroundColor Yellow
    $allGood = $false
}

# Check npm
Write-Host ""
Write-Host "[2/7] Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "  ✅ npm installed: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "  ❌ npm NOT installed!" -ForegroundColor Red
    $allGood = $false
}

# Check backend dependencies
Write-Host ""
Write-Host "[3/7] Checking backend dependencies..." -ForegroundColor Yellow
if (Test-Path "backend\node_modules") {
    Write-Host "  ✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  ❌ Backend dependencies NOT installed" -ForegroundColor Red
    Write-Host "     Run: cd backend && npm install" -ForegroundColor Yellow
    $allGood = $false
}

# Check frontend dependencies
Write-Host ""
Write-Host "[4/7] Checking frontend dependencies..." -ForegroundColor Yellow
if (Test-Path "frontend\node_modules") {
    Write-Host "  ✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  ❌ Frontend dependencies NOT installed" -ForegroundColor Red
    Write-Host "     Run: cd frontend && npm install" -ForegroundColor Yellow
    $allGood = $false
}

# Check smart contract compilation
Write-Host ""
Write-Host "[5/7] Checking smart contract..." -ForegroundColor Yellow
if (Test-Path "backend\contracts\Voting.sol") {
    Write-Host "  ✅ Smart contract found: Voting.sol" -ForegroundColor Green
    
    # Check if compiled
    if (Test-Path "backend\artifacts\contracts\Voting.sol") {
        Write-Host "  ✅ Smart contract compiled" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Smart contract not compiled yet" -ForegroundColor Yellow
        Write-Host "     Run: cd backend && npx hardhat compile" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ❌ Smart contract NOT found!" -ForegroundColor Red
    $allGood = $false
}

# Check contract config
Write-Host ""
Write-Host "[6/7] Checking contract configuration..." -ForegroundColor Yellow
if (Test-Path "frontend\src\contractConfig.js") {
    Write-Host "  ✅ Contract config file exists" -ForegroundColor Green
    $content = Get-Content "frontend\src\contractConfig.js" -Raw
    if ($content -match "0x[a-fA-F0-9]{40}") {
        Write-Host "  ✅ Contract address found in config" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Contract address not set (using default)" -ForegroundColor Yellow
        Write-Host "     This is OK, it will be updated when you deploy" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ⚠️  Contract config not created yet" -ForegroundColor Yellow
    Write-Host "     This will be auto-created when you deploy" -ForegroundColor Yellow
}

# Check if Hardhat node is running
Write-Host ""
Write-Host "[7/7] Checking if Hardhat node is running..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:8545" -Method POST -Body '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' -ContentType "application/json" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "  ✅ Hardhat node is RUNNING on port 8545" -ForegroundColor Green
} catch {
    Write-Host "  ⚠️  Hardhat node is NOT running" -ForegroundColor Yellow
    Write-Host "     This is OK if you haven't started it yet" -ForegroundColor Yellow
    Write-Host "     Start it with: cd backend && npm run node" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Check Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($allGood) {
    Write-Host "✅ All critical checks passed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "You're ready to run the application!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Terminal 1: cd backend && npm run node" -ForegroundColor White
    Write-Host "2. Terminal 2: cd backend && npm run deploy" -ForegroundColor White
    Write-Host "3. Terminal 3: cd frontend && npm run dev" -ForegroundColor White
} else {
    Write-Host "❌ Some issues need to be fixed first" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please follow the suggestions above to fix the issues." -ForegroundColor Yellow
    Write-Host "Then run this script again to verify." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "For detailed instructions, see SETUP_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
