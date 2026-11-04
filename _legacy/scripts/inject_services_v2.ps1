$ErrorActionPreference = "Stop"

$servicesFile = "c:\Users\VaanamEMP\selvakumar_learing\NDSE_KG-AS\public\services.html"
$content = Get-Content $servicesFile -Raw

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
        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="$delay">
          <div class="service-card">
            <div class="service-card-img-wrap">
              <img src="images/illustrations/$imgKey.png" alt="$s" loading="lazy">
              <div class="service-card-icon"><span class="$icon"></span></div>
            </div>
            <div class="service-card-body">
              <h3>$s</h3>
              <p>Professional $s services providing accurate measurements and reliable data for your project.</p>
              <a href="$slug.html" class="btn-blue-ndse mt-3" style="padding: 8px 24px; font-size: 0.85rem;">Learn
                More</a>
            </div>
          </div>
        </div>
"@
    $delay += 50
    if ($delay -gt 600) { $delay = 0 }
}

$pattern = '(?s)<div class="row gx-4 gy-5">.*?</div>\s*</div>\s*</section>'
$replacement = @"
<div class="row gx-4 gy-5">
$cardsHtml
      </div>
    </div>
  </section>
"@

$newContent = $content -replace $pattern, $replacement
Set-Content -Path $servicesFile -Value $newContent -Encoding UTF8

Write-Host "Updated services.html Services section."
