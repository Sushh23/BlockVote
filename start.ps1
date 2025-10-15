# BlockVote - Quick Start Script
# This script helps you start all services in the correct order

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BlockVote - Quick Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Step 1: Install Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check if backend dependencies are installed
if (!(Test-Path "backend\node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
    Write-Host "✅ Backend dependencies installed!" -ForegroundColor Green
} else {
    Write-Host "✅ Backend dependencies already installed" -ForegroundColor Green
}

# Check if frontend dependencies are installed
if (!(Test-Path "frontend\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
    Write-Host "✅ Frontend dependencies installed!" -ForegroundColor Green
} else {
    Write-Host "✅ Frontend dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "You need to open 3 separate terminals and run:" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 1 (Start Blockchain):" -ForegroundColor Cyan
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  npm run node" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 (Deploy Contract - wait for Terminal 1 first):" -ForegroundColor Cyan
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  npm run deploy" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 3 (Start Frontend - wait for Terminal 2 first):" -ForegroundColor Cyan
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open http://localhost:5173 in your browser!" -ForegroundColor Green
Write-Host ""
Write-Host "For detailed instructions, see SETUP_GUIDE.md" -ForegroundColor Yellow
Write-Host ""
