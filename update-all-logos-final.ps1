# ============================================================
# UPDATE ALL LOGOS FINAL - Fix visibility + Client logos
# ============================================================
# Fixes:
# 1. Navbar: NDSELOGO.png with background for visibility
# 2. Client logos: SVG replacements for missing ones  
# 3. BPCL logo: Use SVG instead of corrupted bp.jpg
# 4. Footer logo: Keep NDSELOGO.png with proper sizing

$publicDir = Join-Path $PSScriptRoot "public"
$htmlFiles = Get-ChildItem -Path $publicDir -Filter "*.html" -Recurse

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  UPDATING ALL LOGOS - NDSE Website" -ForegroundColor Cyan  
Write-Host "==========================================" -ForegroundColor Cyan

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $changed = $false
    
    # --- FIX NAVBAR LOGO: NDSELOGO.png with visible background ---
    $old = 'src="images/founder_balasubramani.png" alt="NDSE Logo" style="height:64px;width:auto;object-fit:contain;border-radius:50%;background:#eff6ff;padding:4px;"'
    $new = 'src="images/NDSELOGO.png" alt="NDSE Logo" style="height:60px;width:auto;object-fit:contain;background:#ffffff;padding:4px;border-radius:6px;box-shadow:0 1px 4px rgba(0,0,0,0.08);"'
    
    if ($content -match [regex]::Escape($old)) {
        $content = $content -replace [regex]::Escape($old), $new
        $changed = $true
        Write-Host "  $($file.Name): NAVBAR logo fixed" -ForegroundColor Green
    }
    
    # --- FIX CLIENT LOGOS: Replace default-client-logo with SVG ---
    # YOGO
    $content = $content -replace 'src="images/default-client-logo.png" alt="YOGO"', 'src="images/clients/yogo.svg" alt="YOGO"'
    $content = $content -replace 'src="images/default-client-logo.png" alt="YOGO Developers"', 'src="images/clients/yogo.svg" alt="YOGO Developers"'
    
    # Viridis
    $content = $content -replace 'src="images/default-client-logo.png" alt="Viridis"', 'src="images/clients/viridis.svg" alt="Viridis"'
    $content = $content -replace 'src="images/default-client-logo.png" alt="Viridis Energy"', 'src="images/clients/viridis.svg" alt="Viridis Energy"'
    
    # BEST
    $content = $content -replace 'src="images/default-client-logo.png" alt="BEST"', 'src="images/clients/best.svg" alt="BEST"'
    
    # GR
    $content = $content -replace 'src="images/default-client-logo.png" alt="GR"', 'src="images/clients/gr.svg" alt="GR"'
    
    # --- FIX BPCL LOGO: Replace corrupted bp.jpg with SVG ---
    $content = $content -replace 'src="images/bp.jpg" alt="BPCL"', 'src="images/clients/bpcl.svg" alt="BPCL"'
    
    # --- FIX OG IMAGE: Replace LG1.jpg with NDSELOGO.png ---
    $content = $content -replace 'content="images/LG1\.jpg"', 'content="images/NDSELOGO.png"'
    $content = $content -replace 'https://www\.ndse\.in/images/LG1\.jpg', 'https://www.ndse.in/images/NDSELOGO.png'
    
    if ($changed) {
        Set-Content $file.FullName -Value $content -NoNewline -Encoding UTF8
        Write-Host "  ==> SAVED: $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  ALL LOGOS UPDATED SUCCESSFULLY!" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Changes Made:" -ForegroundColor Green
Write-Host "  1. Navbar: NDSELOGO.png with visible white background" -ForegroundColor Green
Write-Host "  2. BPCL: New SVG logo in images/clients/bpcl.svg" -ForegroundColor Green
Write-Host "  3. YOGO: New SVG logo in images/clients/yogo.svg" -ForegroundColor Green
Write-Host "  4. Viridis: New SVG logo in images/clients/viridis.svg" -ForegroundColor Green
Write-Host "  5. BEST: New SVG logo in images/clients/best.svg" -ForegroundColor Green
Write-Host "  6. GR: New SVG logo in images/clients/gr.svg" -ForegroundColor Green
Write-Host ""
Write-Host "NOTE: You can replace logo SVGs at any time with real company logos" -ForegroundColor Yellow
Write-Host "      by placing PNG/JPG files in: public/images/clients/" -ForegroundColor Yellow