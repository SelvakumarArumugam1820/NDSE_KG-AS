import os
import glob

html_files = glob.glob('d:/backup/Backup/Projects/NDSE/public/*.html')

target_str = """<div class="col-lg-3">
<p class="mb-4"><img src="images/NDSELOGO.png" alt="Image" class="img-fluid" style="max-height: 80px;"></p>
<p>Precision in Every Point. Leading industry experts in digital survey engineering.</p>
</div>
<div class="col-lg-3">
<h3 class="footer-heading"><span>Mobile</span></h3>
<p class="text-white mb-1"><span class="icon-phone mr-2"></span> 7397733223</p>
<p class="text-white"><span class="icon-phone mr-2"></span> 7397733229</p>
</div>
<div class="col-lg-3">
<h3 class="footer-heading"><span>Email</span></h3>
<p class="text-white"><span class="icon-envelope mr-2"></span> info@ndse.in</p>
</div>
<div class="col-lg-3">
<h3 class="footer-heading"><span>Address</span></h3>
<p class="mb-3"><strong>Manapparai:</strong> No 23, Perumal Kovil Vanika valagam, Trichy 621306</p>
<p><strong>Coimbatore:</strong> 1 Cross extn, 100 ft road, Ghandipuram 641012</p>
</div>"""

replacement_str = """<div class="col-lg-3">
<p class="mb-4"><img src="images/NDSELOGO.png" alt="Image" class="img-fluid" style="max-height: 80px;"></p>
<p>Precision in Every Point. Leading industry experts in digital survey engineering.</p>
</div>
<div class="col-lg-2">
<h3 class="footer-heading"><span>Teams</span></h3>
<p class="text-white mb-1"><a href="teams.html" class="text-white" style="text-decoration: none;"><span class="icon-users mr-2"></span> Our Experts</a></p>
</div>
<div class="col-lg-2">
<h3 class="footer-heading"><span>Mobile</span></h3>
<p class="text-white mb-1"><span class="icon-phone mr-2"></span> +91 7397733223</p>
<p class="text-white"><span class="icon-phone mr-2"></span> +91 7397733229</p>
</div>
<div class="col-lg-2">
<h3 class="footer-heading"><span>Email</span></h3>
<p class="text-white"><span class="icon-envelope mr-2"></span> info@ndse.in</p>
</div>
<div class="col-lg-3">
<h3 class="footer-heading"><span>Address</span></h3>
<p class="mb-3"><strong>Manapparai:</strong> No 23, Perumal Kovil Vanika valagam, Trichy 621306</p>
<p><strong>Coimbatore:</strong> 1 Cross extn, 100 ft road, Ghandipuram 641012</p>
</div>"""

for filepath in html_files:
    if filepath.endswith('index.html') or filepath.endswith('teams.html'):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if target_str in content:
        new_content = content.replace(target_str, replacement_str)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Target not found in {filepath}")
