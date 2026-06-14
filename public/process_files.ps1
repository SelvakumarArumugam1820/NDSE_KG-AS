$publicDir = "c:\Users\VaanamEMP\selvakumar_learing\NDSE_KG-AS\public"
$imagesDir = Join-Path $publicDir "images"

$availableImages = Get-ChildItem -Path $imagesDir | Select-Object -ExpandProperty Name
$fallbackImage = "digital_mapping.png"

$injectContent = @"
        <h3 class="mt-5 mb-4">Our Survey Process</h3>
        <div class="process-step"><div class="step-num">1</div><h6>Site Visit</h6><p>Initial reconnaissance of the project site to assess terrain, access routes, and scope of work.</p></div>
        <div class="process-step"><div class="step-num">2</div><h6>Data Collection</h6><p>Deployment of DGPS, Total Station, and levelling instruments to capture all required field measurements.</p></div>
        <div class="process-step"><div class="step-num">3</div><h6>Survey Execution</h6><p>Systematic field measurement of all boundary points, corners, and reference features.</p></div>
        <div class="process-step"><div class="step-num">4</div><h6>Analysis</h6><p>Processing field data using AutoCAD and GIS software to compute areas, coordinates, and boundary lines.</p></div>
        <div class="process-step"><div class="step-num">5</div><h6>Report Preparation</h6><p>Preparation of certified survey drawings, field notes, and engineering reports for submission.</p></div>
        <div class="process-step"><div class="step-num">6</div><h6>Client Delivery</h6><p>Handover of final CAD files, survey sketches, coordinate sheets, and physical copies to client.</p></div>

        <h3 class="mt-5 mb-4">Deliverables</h3>
        <div class="row g-3">
          <div class="col-6 col-md-4"><div class="deliverable-box"><span class="flaticon-blueprint"></span><strong>Survey Drawing</strong></div></div>
          <div class="col-6 col-md-4"><div class="deliverable-box"><span class="icon-desktop"></span><strong>CAD Files (DWG)</strong></div></div>
          <div class="col-6 col-md-4"><div class="deliverable-box"><span class="icon-location-arrow"></span><strong>Coordinates Sheet</strong></div></div>
          <div class="col-6 col-md-4"><div class="deliverable-box"><span class="icon-pencil"></span><strong>Layout Sketches</strong></div></div>
          <div class="col-6 col-md-4"><div class="deliverable-box"><span class="icon-file-text-o"></span><strong>Survey Report</strong></div></div>
        </div>

        <h3 class="mt-5 mb-4">Frequently Asked Questions</h3>
        <details class="faq-item"><summary>What is this Survey?</summary><p>This survey precisely measures and maps the features of a land parcel using scientific instruments and established methodologies.</p></details>
        <details class="faq-item"><summary>Why is it required?</summary><p>A survey confirms exact boundaries, area, and conditions, protecting you from legal disputes and ensuring what you buy matches what the seller claims.</p></details>
        <details class="faq-item"><summary>How long does a Survey take?</summary><p>Most surveys are completed in 1-3 days on-site, followed by 1-2 days for data processing, drawing preparation, and certified report generation.</p></details>
        <details class="faq-item"><summary>What instruments do you use?</summary><p>We use calibrated Total Stations, Differential GPS (DGPS), Auto Levels, and advanced AutoCAD/GIS software to deliver millimetre-accurate results.</p></details>
        <details class="faq-item"><summary>Is the survey report accepted by the government?</summary><p>Yes. All our survey reports are prepared by licensed surveyors and are legally accepted by revenue departments, registration offices, courts, and planning authorities.</p></details>
      </div>
      <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
"@

$dropdownLinks = @"

            <li><a href="land-survey.html">Land Survey</a></li>
            <li><a href="boundary-survey.html">Boundary Survey</a></li>
            <li><a href="topographical-survey.html">Topographical Survey</a></li>
            <li><a href="dgps-survey.html">DGPS Survey</a></li>
            <li><a href="gps-survey.html">GPS Survey</a></li>
            <li><a href="total-station-survey.html">Total Station Survey</a></li>
            <li><a href="layout-survey.html">Layout Survey</a></li>
            <li><a href="building-setting-out-survey.html">Building Setting Out Survey</a></li>
            <li><a href="construction-survey.html">Construction Survey</a></li>
            <li><a href="route-survey.html">Route Survey</a></li>
            <li><a href="road-alignment-survey.html">Road Alignment Survey</a></li>
            <li><a href="highway-survey.html">Highway Survey</a></li>
            <li><a href="railway-survey.html">Railway Survey</a></li>
            <li><a href="canal-survey.html">Canal Survey</a></li>
            <li><a href="pipeline-survey.html">Pipeline Survey</a></li>
            <li><a href="contour-survey.html">Contour Survey</a></li>
            <li><a href="elevation-survey.html">Elevation Survey</a></li>
            <li><a href="mining-survey.html">Mining Survey</a></li>
            <li><a href="industrial-survey.html">Industrial Survey</a></li>
            <li><a href="engineering-survey.html">Engineering Survey</a></li>
            <li><a href="control-survey.html">Control Survey</a></li>
            <li><a href="hydrographic-survey.html">Hydrographic Survey</a></li>
            <li><a href="gis-mapping.html">GIS Mapping</a></li>
            <li><a href="drone-survey.html">Drone Survey</a></li>
            <li><a href="as-built-survey.html">As-Built Survey</a></li>
            <li><a href="property-survey.html">Property Survey</a></li>
            <li><a href="farm-land-survey.html">Farm Land Survey</a></li>
            <li><a href="subdivision-survey.html">Subdivision Survey</a></li>
            <li><a href="site-measurement-survey.html">Site Measurement Survey</a></li>
            <li><a href="land-demarcation-survey.html">Land Demarcation Survey</a></li>
"@

$servicesList = @("land-survey", "boundary-survey", "topographical-survey", "dgps-survey", "gps-survey", "total-station-survey", "layout-survey", "building-setting-out-survey", "construction-survey", "route-survey", "road-alignment-survey", "highway-survey", "railway-survey", "canal-survey", "pipeline-survey", "contour-survey", "elevation-survey", "mining-survey", "industrial-survey", "engineering-survey", "control-survey", "hydrographic-survey", "gis-mapping", "drone-survey", "as-built-survey", "property-survey", "farm-land-survey", "subdivision-survey", "site-measurement-survey", "land-demarcation-survey")

$htmlFiles = Get-ChildItem -Path $publicDir -Filter "*.html"

foreach ($file in $htmlFiles) {
    $filePath = $file.FullName
    $content = [System.IO.File]::ReadAllText($filePath)
    $modified = $false

    # 1. Image Replacement
    $imgRegex = [regex]'src="images/([^"]+)"'
    $matches = $imgRegex.Matches($content)
    foreach ($match in $matches) {
        $imgName = $match.Groups[1].Value
        if ($availableImages -notcontains $imgName) {
            $content = $content.Replace("src=""images/$imgName""", "src=""images/$fallbackImage""")
            $modified = $true
            Write-Host "[$($file.Name)] Replaced missing image $imgName with $fallbackImage"
        }
    }

    $isServicePage = $false
    foreach ($service in $servicesList) {
        if ($file.Name -eq "$service.html") {
            $isServicePage = $true
            break
        }
    }

    # 2. Inject missing sections
    if ($isServicePage) {
        if (-not $content.Contains("Our Survey Process") -and $content.Contains('<div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">')) {
            $target = '</div>' + "`r`n" + '      <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">'
            $target2 = '</div>' + "`n" + '      <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">'
            $target3 = '</div>' + "`n" + '  <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">'
            
            if ($content.Contains($target)) {
                $content = $content.Replace($target, $injectContent)
                $modified = $true
                Write-Host "[$($file.Name)] Injected Process/Deliverables/FAQ"
            } elseif ($content.Contains($target2)) {
                $content = $content.Replace($target2, $injectContent)
                $modified = $true
                Write-Host "[$($file.Name)] Injected Process/Deliverables/FAQ"
            } elseif ($content.Contains($target3)) {
                $content = $content.Replace($target3, $injectContent)
                $modified = $true
                Write-Host "[$($file.Name)] Injected Process/Deliverables/FAQ"
            }
        }
    }

    # 3. Replace Dropdown Menus
    $desktopRegex = [regex]'(?s)(<ul class="dropdown-menu">)(.*?)(</ul>)'
    $newDesktop = "`${1}`n$dropdownLinks          `${3}"
    $newContent = $desktopRegex.Replace($content, $newDesktop)
    if ($newContent -cne $content) {
        $content = $newContent
        $modified = $true
    }

    $mobileRegex = [regex]'(?s)(<ul class="mobile-services-submenu" id="mobileServicesSubmenu">)(.*?)(</ul>)'
    $newMobile = "`${1}`n$dropdownLinks          `${3}"
    $newContent = $mobileRegex.Replace($content, $newMobile)
    if ($newContent -cne $content) {
        $content = $newContent
        $modified = $true
    }

    if ($modified) {
        [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
    }
}
Write-Host "Done processing files."
