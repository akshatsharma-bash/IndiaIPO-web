 # ============================================================
# Build & Package Script — India IPO
# Yeh script frontend build karke server ke andar copy karti hai
# Phir server folder ka zip banati hai deployment ke liye
# ============================================================

Write-Host "🚀 Step 1: Frontend build kar raha hun..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "📁 Step 2: dist folder server ke andar copy kar raha hun..." -ForegroundColor Cyan
$distSource = ".\dist"
$distDest = ".\server\dist"

# Pehle purani dist delete karo
if (Test-Path $distDest) {
    Remove-Item -Recurse -Force $distDest
    Write-Host "  🗑️  Purani server/dist delete ki" -ForegroundColor Yellow
}

# Nayi dist copy karo
Copy-Item -Recurse $distSource $distDest
Write-Host "  ✅ dist/ → server/dist/ copy ho gayi" -ForegroundColor Green

Write-Host "📦 Step 3: server.zip bana raha hun..." -ForegroundColor Cyan
$zipPath = ".\server-deploy.zip"

# Purana zip delete karo
if (Test-Path $zipPath) {
    Remove-Item $zipPath
}

# server folder ka zip banao
Compress-Archive -Path ".\server\*" -DestinationPath $zipPath
Write-Host "  ✅ server-deploy.zip ready!" -ForegroundColor Green

Write-Host ""
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "✅ DONE! Ab yeh karo:" -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green
Write-Host "1. 'server-deploy.zip' Hostinger pe upload karo" -ForegroundColor White
Write-Host "2. Extract karo apne Node.js app folder mein" -ForegroundColor White
Write-Host "3. npm install run karo (agar naye packages hain)" -ForegroundColor White
Write-Host "4. App restart karo Hostinger panel se" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  NOTE: uploads/ folder zip mein nahi hai (server pe already hai)" -ForegroundColor Yellow
Write-Host "=====================================================" -ForegroundColor Green
