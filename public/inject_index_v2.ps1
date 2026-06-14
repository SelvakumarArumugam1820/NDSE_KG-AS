$ErrorActionPreference = "Stop"

$indexFile = "c:\Users\VaanamEMP\selvakumar_learing\NDSE_KG-AS\public\index.html"
$content = Get-Content $indexFile -Raw

$services = @(
    "Land Survey", "Boundary Survey", "Topographical Survey", "DGPS Survey", "GPS Survey",
    "Total Station Survey", "Layout Survey", "Building Setting Out Survey", "Construction Survey", "Route Survey",
    "Road Alignment Survey", "Highway Survey", "Railway Survey", "Canal Survey", "Pipeline Survey",
    "Contour Survey", "Elevation Survey", "Mining Survey", "Industrial Survey", "Engineering Survey",
    "Control Survey", "Hydrographic Survey", "GIS Mapping", "Drone Survey", "As-Built Survey",
    "Property Survey", "Farm Land Survey", "Subdivision Survey", "Site Measurement Survey", "Land Demarcation Survey"
)

$cardsHtml = ""
$delay = 0

foreach ($s in $services) {
    $slug = $s.ToLower().Replace(" ", "-")
    $lowerName = $s.ToLower()
    $imgKey = "total_station"
    $icon = "icon-file-text-o"
    if ($lowerName -match "drone|aerial") {
        $imgKey = "drone"
        $icon = "icon-camera"
    } elseif ($lowerName -match "gps|dgps") {
        $imgKey = "gps"
        $icon = "icon-location-arrow"
    } elseif ($lowerName -match "layout|subdivision") {
        $icon = "flaticon-blueprint"
    } elseif ($lowerName -match "construction|engineering") {
        $icon = "flaticon-crane"
    } elseif ($lowerName -match "gis|mapping|topo") {
        $imgKey = "drone"
        $icon = "icon-bar-chart"
    }
    
    $cardsHtml += @"
      <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="$delay">
        <a href="$slug.html" style="text-decoration: none; color: inherit;">
        <div class="service-card-icon-only">
          <div class="service-card-top">
            <div class="service-icon-box"><span class="$icon"></span></div>
            <div class="service-card-thumb"><img src="images/illustrations/$imgKey.png" alt="$s" loading="lazy"></div>
          </div>
          <h3>$s</h3>
          <p>Professional and precise $lowerName services tailored for your requirements.</p>
        </div>
        </a>
      </div>
"@
    $delay += 50
    if ($delay -gt 350) { $delay = 0 }
}

# 1. Replace Services Grid
$patternServices = '(?s)<div class="row g-4">\s*<!-- Card 1 -->.*?</div>\s*<div class="text-center mt-5" data-aos="fade-up">'
$replacementServices = @"
<div class="row g-4">
$cardsHtml
      </div>
      <div class="text-center mt-5" data-aos="fade-up">
"@

$content = $content -replace $patternServices, $replacementServices

# 2. Update Client Section Header
$patternClientHeader = '(?s)<span class="section-tag">Our Trusted Partners</span>\s*<h2 class="section-title">Valued <span>Clients</span></h2>'
$replacementClientHeader = @"
<h2 class="section-title">Trusted By Leading Organizations <span>Across Industries</span></h2>
        <p class="section-desc mt-3">We are proud to provide professional survey solutions for government, industrial, infrastructure, real estate, and corporate clients.</p>
"@

$content = $content -replace $patternClientHeader, $replacementClientHeader

Set-Content -Path $indexFile -Value $content -Encoding UTF8

Write-Host "Updated index.html Services and Clients section."
