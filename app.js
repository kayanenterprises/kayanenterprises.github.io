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

// --- Form Formspree Actions & Browser Caching ---
function initializeContactForm() {
    const form = document.getElementById("contact-form");
    const statusAlert = document.getElementById("form-status-alert");
    const submitBtn = document.getElementById("submit-btn");

    if (!form || !statusAlert) return;

    // 1. Check browser cache on page load to prevent duplicate entries
    if (localStorage.getItem("kayan_form_submitted") === "true") {
        statusAlert.style.display = "block";
        statusAlert.style.backgroundColor = "#FEF9E7"; // Warm cream
        statusAlert.style.color = "#2C3E2B";
        statusAlert.style.borderColor = "#F4C430";
        statusAlert.innerHTML = "You have already submitted an inquiry. We are reviewing your details!";
        
        // Lock form inputs cleanly
        Array.from(form.elements).forEach(element => element.disabled = true);
        if (submitBtn) {
            submitBtn.innerText = "Inquiry Already Submitted";
            submitBtn.style.opacity = "0.6";
            submitBtn.style.cursor = "not-allowed";
        }
        return;
    }

    // 2. Intercept submission using a native Promise-based handler
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Stop default browser redirect behavior

        // Update button state immediately to give visual feedback
        submitBtn.innerText = "Sending Inquiry...";
        submitBtn.disabled = true;
        statusAlert.style.display = "none"; // Clear any lingering messages

        const formData = new FormData(form);

        try {
            // Perform a direct backend POST query to Formspree
            const response = await fetch("https://formspree.io/f/xeewyyob", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // Handle successful HTTP 200 responses
            if (response.ok) {
                statusAlert.style.display = "block";
                statusAlert.style.backgroundColor = "#E8F0E8"; // Emerald Green
                statusAlert.style.color = "#1E4620";
                statusAlert.style.borderColor = "#C3E6CB";
                statusAlert.innerHTML = "Thank you! Your inquiry has been sent successfully. Our team will contact you shortly.";

                // Save submission flag to browser memory cache
                localStorage.setItem("kayan_form_submitted", "true");

                // Lock fields without removing them from view
                Array.from(form.elements).forEach(element => element.disabled = true);
                submitBtn.innerText = "Inquiry Sent";
                submitBtn.style.opacity = "0.6";
            } 
            // Catch specific validation or system errors (e.g., 400, 403, 429)
            else {
                const responseData = await response.json();
                if (responseData.errors) {
                    // Pull specific backend verification issues if present
                    statusAlert.innerHTML = "Submission Error: " + responseData.errors.map(err => err.message).join(", ");
                } else {
                    statusAlert.innerHTML = "Oops! Formspree rejected this request. Code: " + response.status;
                }
                throw new Error("Server rejected request");
            }

        } catch (error) {
            // Catch general offline network disconnect errors or throw parameters
            statusAlert.style.display = "block";
            statusAlert.style.backgroundColor = "#FDF2F2"; // Soft crimson red
            statusAlert.style.color = "#9B1C1C";
            statusAlert.style.borderColor = "#FDE8E8";
            if (!statusAlert.innerHTML || statusAlert.innerHTML.includes("Thank you")) {
                statusAlert.innerHTML = "Network connection issue. Please check your internet connectivity and try again.";
            }
            
            // Re-enable button so they can try re-submitting
            submitBtn.innerText = "Send Inquiry";
            submitBtn.disabled = false;
        }
    });

    console.log("Custom HTTP Form Lifecycle Engine initialized successfully.");
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