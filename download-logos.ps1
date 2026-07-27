# download-logos.ps1
# This script downloads official logos that were missing or broken.

$ErrorActionPreference = "Stop"
$clientDir = "c:\Users\VaanamEMP\selvakumar_learing\NDSE_KG-AS\public\images\clients"

if (-Not (Test-Path $clientDir)) {
    New-Item -ItemType Directory -Force -Path $clientDir | Out-Null
}

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

Write-Host "Downloading Jio-bp Logo..." -ForegroundColor Cyan
try {
    # Using high quality Wikipedia PNG render to avoid SVG 403 blocks
    $jioBpUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Jio-bp-logo.svg/1024px-Jio-bp-logo.svg.png"
    Invoke-WebRequest -Uri $jioBpUrl -OutFile "$clientDir\jio-bp.png" -Headers $headers
    Write-Host "Success: jio-bp.png downloaded." -ForegroundColor Green
} catch {
    Write-Host "Failed to download Jio-bp logo: $_" -ForegroundColor Red
}

Write-Host "Downloading BEST Engineering Services Logo..." -ForegroundColor Cyan
try {
    # Using Logo.dev / Clearbit as a fallback to get official logos
    $bestUrl = "https://logo.clearbit.com/best-inc.com"
    Invoke-WebRequest -Uri $bestUrl -OutFile "$clientDir\best.png" -Headers $headers
    Write-Host "Success: best.png downloaded." -ForegroundColor Green
} catch {
    Write-Host "Failed to download BEST logo. Please manually place the official BEST logo at $clientDir\best.png" -ForegroundColor Yellow
}

Write-Host "Downloading GR Group Logo..." -ForegroundColor Cyan
try {
    $grUrl = "https://logo.clearbit.com/grgroup.com"
    Invoke-WebRequest -Uri $grUrl -OutFile "$clientDir\gr.png" -Headers $headers
    Write-Host "Success: gr.png downloaded." -ForegroundColor Green
} catch {
    Write-Host "Failed to download GR logo. Please manually place the official GR logo at $clientDir\gr.png" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Done! You can now verify the logos in public/images/clients/" -ForegroundColor Cyan
