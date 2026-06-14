$ErrorActionPreference = "Stop"

$baseDir = "c:\Users\VaanamEMP\selvakumar_learing\NDSE_KG-AS\public"

$services = @(
    "Land Survey", "Boundary Survey", "Topographical Survey", "DGPS Survey", "GPS Survey",
    "Total Station Survey", "Layout Survey", "Building Setting Out Survey", "Construction Survey", "Route Survey",
    "Road Alignment Survey", "Highway Survey", "Railway Survey", "Canal Survey", "Pipeline Survey",
    "Contour Survey", "Elevation Survey", "Mining Survey", "Industrial Survey", "Engineering Survey",
    "Control Survey", "Hydrographic Survey", "GIS Mapping", "Drone Survey", "As-Built Survey",
    "Property Survey", "Farm Land Survey", "Subdivision Survey", "Site Measurement Survey", "Land Demarcation Survey"
)

$template = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <title>{0} Services in Tamil Nadu | NDSE</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Professional {0} services in Tamil Nadu. Ensure accurate measurements, legal compliance, and fast project execution by partnering with NDSE.">
  <meta name="keywords" content="{0}, Land Survey, DGPS Survey, Total Station Survey, Boundary Survey, Topographical Survey, GIS Mapping, Drone Survey, Survey Company Tamil Nadu">
  
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "{0}",
    "provider": {{
      "@type": "LocalBusiness",
      "name": "Nathan Digital Survey Engineers",
      "image": "https://www.ndse.in/images/LG1.jpg",
      "telephone": "+917397733223",
      "address": {{
        "@type": "PostalAddress",
        "streetAddress": "1 Cross extn, 100 ft road, Ghandipuram",
        "addressLocality": "Coimbatore",
        "postalCode": "641012",
        "addressCountry": "IN"
      }}
    }},
    "areaServed": "Tamil Nadu, India"
  }}
  </script>
  
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {{
        "@type": "Question",
        "name": "What is a {0}?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "A {0} provides precise, reliable measurements and data essential for planning, engineering, and legal purposes across various industries."
        }}
      }},
      {{
        "@type": "Question",
        "name": "How accurate is the survey?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Our surveyors use state-of-the-art DGPS, Total Stations, and Drone technology to deliver millimeter-level accuracy on all projects."
        }}
      }},
      {{
        "@type": "Question",
        "name": "How long will the survey take?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Most surveys are completed within 1 to 3 days depending on the project scale, followed by rapid data processing and report generation."
        }}
      }},
      {{
        "@type": "Question",
        "name": "Do you provide CAD drawings?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Yes, we deliver detailed AutoCAD drawings, precise coordinates, and layout sketches as part of our standard deliverables."
        }}
      }},
      {{
        "@type": "Question",
        "name": "Is this survey legally valid?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Absolutely. Our certified engineers ensure that all measurements comply with statutory regulations and can be used for legal and approval purposes."
        }}
      }}
    ]
  }}
  </script>

  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="fonts/icomoon/style.css">
  <link rel="stylesheet" href="fonts/flaticon/font/flaticon.css">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/aos.css">
  <link rel="stylesheet" href="css/owl.carousel.min.css">
  <link rel="stylesheet" href="css/owl.theme.default.min.css">
  <link rel="stylesheet" href="css/jquery.fancybox.min.css">
  <link rel="stylesheet" href="css/ndse-v2.css">
  
  <style>
    .service-detail-hero {{
      background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
      padding: 100px 0 60px;
      color: #fff;
      text-align: center;
    }}
    .service-detail-hero h1 {{
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 20px;
      color: #fff;
    }}
    .service-detail-hero p {{
      font-size: 1.2rem;
      opacity: 0.95;
      max-width: 700px;
      margin: 0 auto 30px;
    }}
    .service-content-section {{
      padding: 80px 0;
    }}
    .service-img {{
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      width: 100%;
      height: auto;
    }}
    .overview-box {{
      background: #f8f9fa;
      padding: 30px;
      border-radius: 12px;
      border-left: 4px solid var(--primary-color);
      margin-bottom: 30px;
    }}
    .overview-box h4 {{
      color: var(--primary-dark);
      font-size: 1.1rem;
      margin-top: 15px;
      font-weight: 600;
    }}
    .overview-box h4:first-child {{
      margin-top: 0;
    }}
    .benefits-list {{
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }}
    .benefits-list li {{
      background: #fff;
      border: 1px solid #eee;
      padding: 10px 20px;
      border-radius: 30px;
      font-weight: 500;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.02);
    }}
    .benefits-list li span {{
      color: #28a745;
      margin-right: 10px;
      font-size: 1.2rem;
    }}
    .process-timeline {{
      list-style: none;
      padding: 0;
      margin-top: 30px;
    }}
    .process-timeline li {{
      background: #fff;
      border-left: 3px solid var(--primary-color);
      padding: 20px 20px 20px 30px;
      margin-bottom: 15px;
      border-radius: 0 8px 8px 0;
      box-shadow: 0 4px 10px rgba(0,0,0,0.03);
      position: relative;
    }}
    .process-timeline li strong {{
      color: var(--primary-dark);
      font-size: 1.1rem;
      display: block;
      margin-bottom: 5px;
    }}
    .process-timeline li::before {{
      content: '';
      position: absolute;
      left: -9px;
      top: 25px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: var(--primary-color);
      border: 3px solid #fff;
    }}
    .deliverables-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
    }}
    .deliverable-card {{
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      border: 1px solid #e9ecef;
    }}
    .deliverable-card span {{
      font-size: 2rem;
      color: var(--primary-color);
      margin-bottom: 10px;
      display: block;
    }}
  </style>
</head>
<body>

  <!-- Top Bar -->
  <div class="top-bar d-none d-lg-block">
    <div class="container">
      <div class="top-bar-inner">
        <div class="top-bar-item">
          <span class="icon-room"></span>
          <span>Manapparai: No 23, Perumal Kovil Vanika valagam | Coimbatore: 1 Cross extn, 100 ft road, Ghandipuram 641012</span>
        </div>
        <div class="top-bar-item">
          <span class="icon-phone"></span>
          <a href="tel:+917397733223">+91 73977 33223</a>
          <span>|</span>
          <span class="icon-envelope"></span>
          <a href="mailto:info@ndse.in">info@ndse.in</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Navbar -->
  <nav class="ndse-navbar" id="ndseNavbar">
    <div class="nav-container">
      <a href="index.html" class="nav-logo">
        <img src="images/LG1.jpg" alt="NDSE Logo">
      </a>
      <ul class="nav-menu" id="navMenu">
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html" class="active">Services</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="teams.html">Teams</a></li>
        <li><a href="contact.html" class="nav-cta-btn">Contact Us</a></li>
      </ul>
      <button class="nav-hamburger" id="navHamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" id="mobileMenu">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="teams.html">Teams</a></li>
        <li><a href="contact.html" class="mobile-cta">Contact Us</a></li>
      </ul>
    </div>
  </nav>

  <!-- Service Detail Hero -->
  <div class="service-detail-hero">
    <div class="container">
      <div data-aos="fade-up">
        <h1>{0}</h1>
        <p>Premium, high-precision surveying solutions tailored for infrastructure, industrial, and real estate projects.</p>
        <div class="mt-4">
          <a href="contact.html" class="btn btn-light btn-lg px-4 mx-2" style="border-radius:30px; font-weight:600; color:var(--primary-dark);">Get Survey Quote</a>
          <a href="tel:+917397733223" class="btn btn-outline-light btn-lg px-4 mx-2" style="border-radius:30px; font-weight:600;">Contact Our Survey Experts</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Service Content -->
  <section class="service-content-section bg-white">
    <div class="container">
      <div class="row gx-5">
        
        <!-- Left Col -->
        <div class="col-lg-8" data-aos="fade-up">
          <img src="images/illustrations/{1}.png" alt="{0}" class="service-img mb-5" loading="lazy" style="max-height: 400px; object-fit: cover; object-position: center;">
          
          <h2 class="mb-4">Overview</h2>
          <div class="overview-box">
            <h4>What is this survey?</h4>
            <p>Our {0} provides precise, verified measurements of land, boundaries, and infrastructure layouts. Using advanced digital instruments, we capture essential spatial data required for comprehensive engineering and development planning.</p>
            
            <h4>Why is it required?</h4>
            <p>This survey is critical to ensure that every phase of your project is built upon accurate dimensions. It directly mitigates legal boundary disputes, significantly reduces costly construction errors, and ensures seamless compliance with local statutory regulations.</p>
            
            <h4>Who needs it?</h4>
            <p>Our services cater to: Land Owners, Commercial Builders, Real Estate Developers, Industrial Hubs, Government Infrastructure Projects, and Construction Companies.</p>
          </div>

          <h3 class="mt-5 mb-4">Core Benefits</h3>
          <ul class="benefits-list">
            <li><span class="icon-check"></span> Accurate Measurements</li>
            <li><span class="icon-check"></span> Legal Compliance</li>
            <li><span class="icon-check"></span> Faster Project Execution</li>
            <li><span class="icon-check"></span> Reduced Construction Errors</li>
            <li><span class="icon-check"></span> Government Approval Support</li>
            <li><span class="icon-check"></span> Better Project Planning</li>
            <li><span class="icon-check"></span> Improved Land Management</li>
          </ul>

          <h3 class="mt-5 mb-4">Survey Process</h3>
          <ol class="process-timeline">
            <li><strong>1. Site Visit</strong> Initial inspection and evaluation of the project location to determine scope.</li>
            <li><strong>2. Data Collection</strong> Deployment of high-tech instruments (Total Station, GPS, Drones) to capture field data.</li>
            <li><strong>3. Survey Execution</strong> Systematic measurement and marking of the land or property boundaries.</li>
            <li><strong>4. Data Analysis</strong> Processing the captured field data using advanced software like AutoCAD and GIS.</li>
            <li><strong>5. Report Preparation</strong> Compiling accurate drawings, layout sketches, and detailed engineering reports.</li>
            <li><strong>6. Client Delivery</strong> Handing over final digital and physical deliverables to the client.</li>
          </ol>
          
          <h3 class="mt-5 mb-4">Final Deliverables</h3>
          <div class="deliverables-grid">
            <div class="deliverable-card">
              <span class="flaticon-blueprint"></span>
              <strong>Survey Drawings</strong>
            </div>
            <div class="deliverable-card">
              <span class="icon-desktop"></span>
              <strong>CAD Files</strong>
            </div>
            <div class="deliverable-card">
              <span class="icon-location-arrow"></span>
              <strong>Coordinates</strong>
            </div>
            <div class="deliverable-card">
              <span class="icon-pencil"></span>
              <strong>Layout Sketches</strong>
            </div>
            <div class="deliverable-card">
              <span class="icon-file-text-o"></span>
              <strong>Technical Reports</strong>
            </div>
            <div class="deliverable-card">
              <span class="icon-globe"></span>
              <strong>GIS Data & Maps</strong>
            </div>
          </div>
          
        </div>
        
        <!-- Right Col (Sidebar) -->
        <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
          <div class="bg-light p-4 rounded mb-4" style="border: 1px solid #e9ecef;">
            <h4 class="mb-4">Get a Quote</h4>
            <p class="text-muted mb-4">Need reliable {0} services? Contact our engineering experts today for accurate estimations and rapid deployment.</p>
            <a href="contact.html" class="btn-primary-ndse d-block text-center w-100 mb-3">Get Survey Quote</a>
            <a href="tel:+917397733223" class="btn-secondary-ndse d-block text-center w-100">Contact Our Survey Experts</a>
          </div>
          
          <div class="bg-primary p-4 rounded text-white text-center">
            <span class="icon-phone" style="font-size: 2.5rem; margin-bottom: 10px; display: block;"></span>
            <h5>Call Us 24/7</h5>
            <h3 class="mt-2"><a href="tel:+917397733223" class="text-white">+91 73977 33223</a></h3>
          </div>
        </div>
        
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="py-section bg-off-white">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 text-center mb-5" data-aos="fade-up">
          <h2 class="section-title">Frequently Asked <span>Questions</span></h2>
          <p class="section-desc">Common queries about our {0} services.</p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-8" data-aos="fade-up">
          <div class="accordion" id="faqAccordion">
            <div class="accordion-item" style="border:none; border-bottom:1px solid #ddd; border-radius:0;">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed bg-transparent font-weight-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" style="color:var(--primary-dark); box-shadow:none;">
                  What is a {0}?
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body text-muted">
                  A {0} provides precise, reliable measurements and data essential for planning, engineering, and legal purposes across various industries.
                </div>
              </div>
            </div>
            <div class="accordion-item" style="border:none; border-bottom:1px solid #ddd; border-radius:0;">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed bg-transparent font-weight-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" style="color:var(--primary-dark); box-shadow:none;">
                  How accurate is the survey?
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body text-muted">
                  Our surveyors use state-of-the-art DGPS, Total Stations, and Drone technology to deliver millimeter-level accuracy on all projects.
                </div>
              </div>
            </div>
            <div class="accordion-item" style="border:none; border-bottom:1px solid #ddd; border-radius:0;">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed bg-transparent font-weight-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" style="color:var(--primary-dark); box-shadow:none;">
                  How long will the survey take?
                </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body text-muted">
                  Most surveys are completed within 1 to 3 days depending on the project scale, followed by rapid data processing and report generation.
                </div>
              </div>
            </div>
            <div class="accordion-item" style="border:none; border-bottom:1px solid #ddd; border-radius:0;">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed bg-transparent font-weight-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" style="color:var(--primary-dark); box-shadow:none;">
                  Do you provide CAD drawings?
                </button>
              </h2>
              <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body text-muted">
                  Yes, we deliver detailed AutoCAD drawings, precise coordinates, and layout sketches as part of our standard deliverables.
                </div>
              </div>
            </div>
            <div class="accordion-item" style="border:none; border-bottom:1px solid #ddd; border-radius:0;">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed bg-transparent font-weight-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" style="color:var(--primary-dark); box-shadow:none;">
                  Is this survey legally valid?
                </button>
              </h2>
              <div id="collapseFive" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body text-muted">
                  Absolutely. Our certified engineers ensure that all measurements comply with statutory regulations and can be used for legal and approval purposes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="ndse-footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 mb-5">
          <div class="footer-logo">
            <img src="images/NDSELOGO.png" alt="NDSE Logo">
          </div>
          <p class="footer-desc">Precision in Every Point. Leading industry experts in digital survey engineering since 2013.</p>
        </div>
        <div class="col-lg-3 col-md-6 mb-5">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 mb-5">
          <h4 class="footer-heading">Contact</h4>
          <div class="footer-contact-item"><span class="icon-phone"></span><div><a href="tel:+917397733223">+91 7397733223</a></div></div>
          <div class="footer-contact-item"><span class="icon-envelope"></span><a href="mailto:info@ndse.in">info@ndse.in</a></div>
        </div>
        <div class="col-lg-3 col-md-6 mb-5">
          <h4 class="footer-heading">Address</h4>
          <div class="footer-contact-item"><span class="icon-room"></span><div><strong>Manapparai:</strong> No 23, Perumal Kovil Vanika valagam, Trichy 621306</div></div>
          <div class="footer-contact-item mt-2"><span class="icon-room"></span><div><strong>Coimbatore:</strong> 1 Cross extn, 100 ft road, Ghandipuram 641012</div></div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <script>document.write(new Date().getFullYear())</script> Nathan Associates. All Rights Reserved.</p>
    </div>
  </footer>

  <!-- Floating Action Buttons -->
  <div class="floating-actions">
    <a href="https://wa.me/917397733223" target="_blank" class="fab-btn fab-whatsapp" title="WhatsApp"><span class="icon-whatsapp"></span></a>
    <a href="#" class="fab-btn fab-top" id="scrollTopBtn" title="Back to Top"><span class="icon-keyboard_arrow_up"></span></a>
  </div>

  <script src="js/jquery-3.3.1.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/aos.js"></script>
  <script>
    // Navbar mobile toggle
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {{
      hamburger.addEventListener('click', function () {{
        this.classList.toggle('active');
        mobileMenu.classList.toggle('open');
      }});
    }}
    // Navbar scroll shadow
    window.addEventListener('scroll', function () {{
      const navbar = document.getElementById('ndseNavbar');
      if (navbar) {{
        navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.12)' : '0 2px 20px rgba(0,0,0,0.08)';
      }}
    }});
    // Scroll to top
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {{
      scrollBtn.addEventListener('click', function (e) {{
        e.preventDefault();
        window.scrollTo({{ top: 0, behavior: 'smooth' }});
      }});
    }}
    // AOS Init
    if (typeof AOS !== 'undefined') {{ AOS.init({{ duration: 700, once: true, offset: 60 }}); }}
  </script>
</body>
</html>
"@

foreach ($s in $services) {
    $slug = $s.ToLower().Replace(" ", "-")
    $filePath = Join-Path $baseDir "$slug.html"
    
    $lowerName = $s.ToLower()
    $imgKey = "total_station"
    # Fallback to previously generated or existing images
    if ($lowerName -match "drone|aerial") {
        $imgKey = "drone"
    } elseif ($lowerName -match "gps|dgps") {
        $imgKey = "gps"
    } elseif ($lowerName -match "gis|mapping|topo") {
        $imgKey = "drone"
    }
    
    $content = $template -f $s, $imgKey
    Set-Content -Path $filePath -Value $content -Encoding UTF8
    Write-Host "Generated $filePath"
}

Write-Host "Done generating 30 service files."
