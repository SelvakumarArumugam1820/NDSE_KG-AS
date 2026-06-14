# Update navbar logo: make founder_balasubramani.png bigger
$navReplacement = '<img src="images/founder_balasubramani.png" alt="NDSE Logo" style="height:64px;width:auto;object-fit:contain;border-radius:50%;background:#eff6ff;padding:4px;">'

# Update footer logo: change to NDSELOGO.png
$footerReplacement = '<img src="images/NDSELOGO.png" alt="NDSE Logo" style="height:120px;width:auto;object-fit:contain;">'

$htmlFiles = Get-ChildItem -Path "NDSE_KG-AS\public\*.html" -Recurse

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Replace navbar logo - increase height from 52px to 64px
    $content = $content -replace 'src="images/founder_balasubramani\.png" alt="NDSE Logo" style="height:52px', 'src="images/founder_balasubramani.png" alt="NDSE Logo" style="height:64px'
    
    # Replace footer logo: founder_balasubramani.png -> NDSELOGO.png
    $content = $content -replace 'src="images/founder_balasubramani\.png" alt="NDSE Logo" style="height:120px', 'src="images/NDSELOGO.png" alt="NDSE Logo" style="height:120px'
    
    Set-Content $file.FullName -Value $content -NoNewline -Encoding UTF8
    Write-Host "Updated: $($file.Name)"
}

Write-Host "Done! All files updated."