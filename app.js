// --- Configuration & Data Engine ---
const FORMSPREE_ID = "xeewyyob"; // <-- Drop your unique Formspree Endpoint ID code here

const CATALOG_DATA = [
    {
        name: "Premium Raw Banana Powder",
        description: "Gluten-free, nutrient-rich, and perfect for functional food manufacturing, baking formulation, and premium wellness supplements.",
        imagePath: "media/product-powder.png",
        altText: "High Grade Organic Green Banana Powder"
    },
    {
        name: "Dehydrated Banana Chips",
        description: "100% natural, crisp, low-moisture healthy ingredients optimized using advanced structural dehydration systems.",
        imagePath: "media/product-chips.png",
        altText: "Crisp Organic Banana Chips and Dehydrated Slices"
    },
    {
        name: "Premium Banana Biscuits",
        description: "Crispy, naturally sweetened biscuits baked with organic banana flour. Packed with micro-nutrients and optimized for long shelf-life export markets.",
        imagePath: "media/product-biscuits.png",
        altText: "Premium Baked Organic Banana Biscuits Packaging"
    }
];

const LICENSE_DATA = [
    { title: "FSSAI Certified", desc: "Absolute food safety management benchmarks strictly audited." },
    { title: "APEDA Registered", desc: "Authorized processing operations across global agricultural exports." },
    { title: "IEC Registered", desc: "Verified Import Export Code status for smooth customs handling." },
    { title: "ISO 22000 Aligned", desc: "Processing floors match strict worldwide hazard control guidelines." }
];

// --- Initialization Logic ---
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    renderLicenses();
    initializeContactForm();
});

// --- UI Rendering Engines ---
function renderProducts() {
    const catalogContainer = document.getElementById("product-catalog");
    if (!catalogContainer) return;

    catalogContainer.innerHTML = CATALOG_DATA.map(product => `
        <div class="product-card">
            <div class="product-img-wrapper">
                <img src="${product.imagePath}" alt="${product.altText}" onerror="this.src='https://placehold.co/600x400?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            </div>
        </div>
    `).join('');
}

function renderLicenses() {
    const licenseContainer = document.getElementById("license-list");
    if (!licenseContainer) return;

    licenseContainer.innerHTML = LICENSE_DATA.map(lic => `
        <div class="license-card">
            <h3>${lic.title}</h3>
            <p>${lic.desc}</p>
        </div>
    `).join('');
}

// --- Form Formspree Actions ---
function initializeContactForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");
    
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // <-- This stops the page from redirecting!
        
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;
        
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: "POST",
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                status.style.display = "block";
                status.style.backgroundColor = "#E8F0E8";
                status.style.color = "var(--primary)";
                status.innerHTML = "Thank you! Your inquiry has been sent successfully.";
                form.reset(); // Clears the form fields
                form.style.display = "none"; // Hides the form entirely
            } else {
                throw new Error("Submission failed");
            }
        } catch (error) {
            status.style.display = "block";
            status.style.backgroundColor = "#FDF2F2";
            status.style.color = "#9B1C1C";
            status.innerHTML = "Oops! There was a problem submitting your form. Please try again.";
            submitBtn.innerText = "Send Inquiry";
            submitBtn.disabled = false;
        }
    });
}

// --- Mobile Menu Interaction logic ---
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-list');

if (menuToggle && navLinks) {
    // Open/Close menu when burger icon is clicked
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu smoothly when any selection is tapped
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}