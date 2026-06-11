/* Airnet Electrolux - Core Application Logic */

// Global state
let cart = [];
let activeCategory = 'all';
let activeBrand = 'all';
let searchQuery = '';

// Document elements loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    loadCart();
    
    // Initialize components
    updateStoreStatus();
    renderProducts();
    setupEventListeners();
    initTestimonialCarousel();
    
    // Check timing every minute
    setInterval(updateStoreStatus, 60000);
});

// Setup global event listeners
function setupEventListeners() {
    // Search input
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderProducts();
        });
    }

    // Form submissions
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
}

// 1. DYNAMIC STORE STATUS INDICATOR
function updateStoreStatus() {
    const statusBadges = document.querySelectorAll('.store-status-badge');
    if (statusBadges.length === 0) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // 09:00 AM to 10:00 PM (22:00)
    const isOpen = (currentHour > 9 || (currentHour === 9 && currentMinute >= 0)) && (currentHour < 22);

    statusBadges.forEach(badge => {
        if (isOpen) {
            badge.innerHTML = `<span class="status-pulse open"></span>Open Now (Closes 10:00 PM)`;
            badge.className = "store-status-badge text-xs font-semibold px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full flex items-center w-fit";
        } else {
            badge.innerHTML = `<span class="status-pulse closed"></span>Closed Now (Opens 9:00 AM)`;
            badge.className = "store-status-badge text-xs font-semibold px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full flex items-center w-fit";
        }
    });
}

// 2. PRODUCT CATALOG RENDERING
function setCategoryFilter(category) {
    activeCategory = category;
    
    // Update active tab styles
    const tabs = ['all', 'ac', 'laundry'];
    tabs.forEach(tab => {
        const btn = document.getElementById(`tab-btn-${tab}`);
        if (btn) {
            if (tab === category) {
                btn.className = "bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm";
            } else {
                btn.className = "bg-surface-container-high text-on-surface px-6 py-2.5 rounded-full font-label-md text-label-md hover:bg-surface-container-highest active:scale-95 transition-all cursor-pointer";
            }
        }
    });
    
    renderProducts();
}

function setBrandFilter(brand) {
    activeBrand = brand;
    
    // Update chip styles
    const brandsList = ['all', 'MITSUBISHI', 'ELECTROLUX', 'PANASONIC', 'LLOYD', 'O\'GENERAL'];
    brandsList.forEach(b => {
        const chip = document.getElementById(`brand-chip-${b.replace("'", "\\'")}`);
        if (chip) {
            if (b === brand) {
                chip.className = "bg-primary text-on-primary border border-primary px-4 py-1.5 rounded-full text-xs font-semibold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm";
            } else {
                chip.className = "bg-white text-on-surface-variant border border-outline-variant/50 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-surface-container-low hover:border-outline active:scale-95 transition-all cursor-pointer";
            }
        }
    });

    renderProducts();
}

function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    // Filter products
    const filtered = products.filter(p => {
        const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
        const matchesBrand = activeBrand === 'all' || p.brand === activeBrand;
        const matchesSearch = searchQuery === '' || 
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
            
        return matchesCategory && matchesBrand && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-16 text-center">
                <span class="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-3">search_off</span>
                <p class="text-on-surface-variant font-body-lg">No products match your search or filter criteria.</p>
                <button onclick="resetFilters()" class="text-primary font-semibold underline mt-2 block mx-auto">Reset Filters</button>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(prod => {
        const discount = Math.round(((prod.mrp - prod.price) / prod.mrp) * 100);
        return `
            <div class="product-card bg-white rounded-3xl overflow-hidden flex flex-col justify-between h-full apple-ease" onclick="openProductModal('${prod.id}')">
                <div class="relative overflow-hidden aspect-[4/3] bg-surface-container-low group cursor-pointer">
                    <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                    <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-outline-variant/30 px-3 py-1 rounded-full text-[10px] font-bold text-primary tracking-wide uppercase">
                        ${prod.brand}
                    </div>
                    ${discount > 0 ? `
                        <div class="absolute top-4 right-4 bg-red-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">
                            -${discount}% OFF
                        </div>
                    ` : ''}
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-xs font-semibold text-on-surface-variant/70 bg-surface-container px-2.5 py-1 rounded-md">${prod.subCategory}</span>
                            <span class="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-md flex items-center gap-0.5">
                                <span class="material-symbols-outlined text-[12px] fill-current">star</span> ${prod.rating}
                            </span>
                        </div>
                        <h3 class="font-title-md text-[17px] font-semibold text-primary mb-3 leading-snug line-clamp-2 hover:text-black/80 transition-colors">${prod.name}</h3>
                        <ul class="text-xs text-on-surface-variant space-y-1.5 mb-6">
                            ${prod.features.slice(0, 3).map(feat => `
                                <li class="flex items-center gap-1.5">
                                    <span class="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                                    <span class="truncate">${feat}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="border-t border-outline-variant/20 pt-4 flex items-center justify-between">
                        <div>
                            <span class="text-[12px] text-on-surface-variant line-through block leading-none">₹${prod.mrp.toLocaleString('en-IN')}</span>
                            <span class="text-[19px] font-bold text-primary leading-tight">₹${prod.price.toLocaleString('en-IN')}</span>
                        </div>
                        <button onclick="addToCart('${prod.id}'); event.stopPropagation();" class="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 active:scale-90 transition-all shadow-sm">
                            <span class="material-symbols-outlined text-md">add_shopping_cart</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function resetFilters() {
    activeCategory = 'all';
    activeBrand = 'all';
    searchQuery = '';
    
    const searchBar = document.getElementById('search-bar');
    if (searchBar) searchBar.value = '';
    
    setCategoryFilter('all');
    setBrandFilter('all');
}

// 3. PRODUCT DETAILS MODAL
function openProductModal(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const modal = document.getElementById('product-details-modal');
    const content = document.getElementById('product-details-content');
    if (!modal || !content) return;

    const discount = Math.round(((prod.mrp - prod.price) / prod.mrp) * 100);
    
    // Generate specifications table
    const specsHtml = Object.entries(prod.specs).map(([key, val]) => `
        <div class="flex justify-between py-2 border-b border-outline-variant/20 text-body-md">
            <span class="text-on-surface-variant font-medium">${key}</span>
            <span class="text-primary font-semibold text-right">${val}</span>
        </div>
    `).join('');

    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left Side: Image & Highlights -->
            <div>
                <div class="relative rounded-2xl overflow-hidden aspect-[4/3] bg-surface-container-low border border-outline-variant/30 mb-4">
                    <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover">
                    <span class="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">${prod.brand}</span>
                    ${discount > 0 ? `<span class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold">-${discount}% OFF</span>` : ''}
                </div>
                <div class="flex items-center gap-4 py-2">
                    <div class="flex items-center text-yellow-500">
                        <span class="material-symbols-outlined fill-current">star</span>
                        <span class="material-symbols-outlined fill-current">star</span>
                        <span class="material-symbols-outlined fill-current">star</span>
                        <span class="material-symbols-outlined fill-current">star</span>
                        <span class="material-symbols-outlined fill-current">star_half</span>
                    </div>
                    <span class="text-body-md text-on-surface-variant font-semibold">${prod.rating} / 5.0 (${prod.reviews} Customer Reviews)</span>
                </div>
            </div>
            
            <!-- Right Side: Details & Buy -->
            <div class="flex flex-col justify-between">
                <div>
                    <span class="text-xs font-bold text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full uppercase tracking-wider">${prod.subCategory}</span>
                    <h2 class="font-headline-lg text-[22px] md:text-[26px] font-bold text-primary mt-3 mb-2 leading-tight">${prod.name}</h2>
                    
                    <div class="flex items-baseline gap-3 my-4">
                        <span class="text-2xl font-bold text-primary">₹${prod.price.toLocaleString('en-IN')}</span>
                        <span class="text-body-lg text-on-surface-variant line-through">MRP ₹${prod.mrp.toLocaleString('en-IN')}</span>
                    </div>
                    
                    <h3 class="font-semibold text-primary mb-2 text-body-md">Key Features</h3>
                    <ul class="text-body-md text-on-surface-variant space-y-2 mb-6">
                        ${prod.features.map(f => `
                            <li class="flex items-start gap-2">
                                <span class="material-symbols-outlined text-green-600 text-lg mt-0.5">check_circle</span>
                                <span>${f}</span>
                            </li>
                        `).join('')}
                    </ul>
                    
                    <h3 class="font-semibold text-primary mb-2 text-body-md">Technical Specifications</h3>
                    <div class="space-y-1 mb-6">
                        ${specsHtml}
                    </div>
                </div>
                
                <div class="flex gap-4 border-t border-outline-variant/30 pt-6 mt-4">
                    <button onclick="addToCart('${prod.id}'); toggleProductModal();" class="flex-1 bg-primary text-on-primary py-4 rounded-full font-label-md text-label-md flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md">
                        <span class="material-symbols-outlined">add_shopping_cart</span>
                        Add to Cart
                    </button>
                    <button onclick="toggleProductModal(); toggleChatWindow('I would like to enquire about ${prod.name}');" class="border border-outline text-primary px-6 py-4 rounded-full font-label-md text-label-md hover:bg-surface-container-low active:scale-95 transition-all flex items-center justify-center gap-2">
                        <span class="material-symbols-outlined">chat</span>
                        Enquire
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
}

function toggleProductModal() {
    const modal = document.getElementById('product-details-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
}

// 4. CART STATE MANAGEMENT
function toggleCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    
    if (drawer.classList.contains('translate-x-full')) {
        drawer.classList.remove('translate-x-full');
        renderCartItems();
    } else {
        drawer.classList.add('translate-x-full');
    }
}

function addToCart(productId) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    saveCart();
    updateCartBadge();
    
    // Animate badge
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.classList.add('scale-125');
        setTimeout(() => badge.classList.remove('scale-125'), 300);
    }

    // Trigger visual toast confirmation
    showToast("Added to Cart successfully!");
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadge();
    renderCartItems();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartBadge();
        renderCartItems();
    }
}

function updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    badges.forEach(badge => {
        if (totalCount > 0) {
            badge.innerText = totalCount;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    });
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const totalContainer = document.getElementById('cart-total-price');
    const cartActionBtn = document.getElementById('cart-action-btn');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 text-center px-4">
                <span class="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">shopping_bag</span>
                <h3 class="font-title-md text-primary font-bold mb-1">Your Cart is Empty</h3>
                <p class="text-on-surface-variant text-body-md mb-6 max-w-[240px]">Explore our catalog and add items you'd like to purchase or enquire about.</p>
                <button onclick="toggleCartDrawer(); document.getElementById('products-section').scrollIntoView({behavior: 'smooth'})" class="bg-primary text-on-primary px-6 py-2.5 rounded-full text-xs font-bold hover:opacity-90 active:scale-95 transition-all">Start Shopping</button>
            </div>
        `;
        if (totalContainer) totalContainer.innerText = '₹0';
        if (cartActionBtn) cartActionBtn.disabled = true;
        return;
    }

    let totalPrice = 0;
    
    container.innerHTML = cart.map(item => {
        const prod = products.find(p => p.id === item.id);
        if (!prod) return '';
        
        const lineTotal = prod.price * item.quantity;
        totalPrice += lineTotal;
        
        return `
            <div class="flex gap-4 py-4 border-b border-outline-variant/20 items-center">
                <img src="${prod.image}" alt="${prod.name}" class="w-16 h-16 object-cover rounded-xl border border-outline-variant/30">
                <div class="flex-1 min-w-0">
                    <h4 class="text-body-md font-semibold text-primary leading-tight truncate">${prod.name}</h4>
                    <span class="text-xs text-on-surface-variant block mb-2">${prod.brand} | ${prod.capacity}</span>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center border border-outline-variant/55 rounded-full overflow-hidden bg-surface-container-low">
                            <button onclick="updateQuantity('${prod.id}', -1)" class="w-7 h-7 flex items-center justify-center hover:bg-surface-container-high text-primary font-bold text-sm select-none cursor-pointer">-</button>
                            <span class="w-8 text-center text-xs font-bold text-primary select-none">${item.quantity}</span>
                            <button onclick="updateQuantity('${prod.id}', 1)" class="w-7 h-7 flex items-center justify-center hover:bg-surface-container-high text-primary font-bold text-sm select-none cursor-pointer">+</button>
                        </div>
                        <span class="text-body-md font-bold text-primary">₹${lineTotal.toLocaleString('en-IN')}</span>
                    </div>
                </div>
                <button onclick="removeFromCart('${prod.id}')" class="text-on-surface-variant hover:text-red-600 transition-colors p-1.5 cursor-pointer">
                    <span class="material-symbols-outlined text-lg">delete</span>
                </button>
            </div>
        `;
    }).join('');

    if (totalContainer) totalContainer.innerText = `₹${totalPrice.toLocaleString('en-IN')}`;
    if (cartActionBtn) cartActionBtn.disabled = false;
}

function saveCart() {
    localStorage.setItem('airnet_cart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('airnet_cart');
    if (saved) {
        try {
            cart = JSON.parse(saved);
            updateCartBadge();
        } catch (e) {
            cart = [];
        }
    }
}

// 5. WHATSAPP ENQUIRY GENERATION
function sendCartEnquiry() {
    if (cart.length === 0) return;

    let message = "Hello Airnet Electrolux! I would like to make an enquiry about the following items:\n\n";
    let total = 0;

    cart.forEach((item, index) => {
        const prod = products.find(p => p.id === item.id);
        if (prod) {
            const lineTotal = prod.price * item.quantity;
            total += lineTotal;
            message += `${index + 1}. *${prod.name}*\n   Quantity: ${item.quantity} | Est: ₹${lineTotal.toLocaleString('en-IN')}\n\n`;
        }
    });

    message += `*Total Estimated Value:* ₹${total.toLocaleString('en-IN')}\n`;
    message += `Please check availability at your Kalkaji showroom and let me know about active discount/installment offers. Thank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917942694246?text=${encoded}`;
    
    // Open in new window
    window.open(whatsappUrl, '_blank');
    
    // Optional: clear cart on successful redirect
    cart = [];
    saveCart();
    updateCartBadge();
    toggleCartDrawer();
    showToast("Enquiry sent via WhatsApp!");
}

// 6. BOOKING CONSULTATION SYSTEM
function openBookingModal(defaultService = 'In-Store Consultation') {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;
    
    // Set default service
    const serviceSelect = document.getElementById('booking-service');
    if (serviceSelect) {
        serviceSelect.value = defaultService;
    }

    // Set minimum date to today
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
    
    // Reset booking forms status
    document.getElementById('booking-form').classList.remove('hidden');
    document.getElementById('booking-success-panel').classList.add('hidden');
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('booking-name').value.trim();
    const phone = document.getElementById('booking-phone').value.trim();
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const service = document.getElementById('booking-service').value;
    
    if (!name || !phone || !date || !time) {
        alert("Please fill in all details.");
        return;
    }

    // Generate reference code
    const refCode = "AN-" + Math.floor(100000 + Math.random() * 900000);

    // Populate success screen
    document.getElementById('success-ref-code').innerText = refCode;
    document.getElementById('success-name').innerText = name;
    document.getElementById('success-service').innerText = service;
    document.getElementById('success-datetime').innerText = `${date} at ${time}`;

    // Toggle panels
    document.getElementById('booking-form').classList.add('hidden');
    document.getElementById('booking-success-panel').classList.remove('hidden');
    
    // Setup WhatsApp trigger on completion screen
    const whatsappBtn = document.getElementById('booking-whatsapp-confirm-btn');
    if (whatsappBtn) {
        whatsappBtn.onclick = () => {
            const msg = `Hi Airnet Electrolux! I have booked a showroom appointment (Ref: ${refCode}).\nDetails:\n- Name: ${name}\n- Service: ${service}\n- Date/Time: ${date} @ ${time}.\n\nPlease confirm availability. Thank you!`;
            window.open(`https://wa.me/917942694246?text=${encodeURIComponent(msg)}`, '_blank');
        };
    }
}

// 7. TESTIMONIAL CAROUSEL
let currentSlide = 0;
const testimonials = [
    {
        name: "Vaibhav",
        role: "Verified Buyer",
        rating: 5,
        text: "Got the best deal on my new split air conditioner. Highly recommend the Mitsubishi AC, it works perfectly and cools the room in minutes. Great service by Airnet Kalkaji!"
    },
    {
        name: "Amit Kumar",
        role: "Local Guide",
        rating: 5,
        text: "Good range of products on display at the showroom. The sales executives are very polite and knowledgeable. Excellent price compared to other dealers in Delhi."
    },
    {
        name: "Fazil",
        role: "Kalkaji Customer",
        rating: 5,
        text: "The technicians sent by Airnet for installation were highly efficient and professional. They completed the clean installation quickly and explained the features."
    },
    {
        name: "Sanjay",
        role: "Resident",
        rating: 5,
        text: "I would highly recommend buying from here. The pricing is very transparent, and their post-sales service is up to the mark. Genuine authorized showroom."
    },
    {
        name: "Shankar Shah",
        role: "Business Owner",
        rating: 5,
        text: "Great place, great staff, and great service! Bought Lloyd ACs for my office, fast delivery and proper installation guidance. Best AC dealers in Kalkaji."
    }
];

function initTestimonialCarousel() {
    renderTestimonial();
}

function renderTestimonial() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    const t = testimonials[currentSlide];
    
    // Stars
    const stars = `<span class="material-symbols-outlined text-yellow-500 fill-current text-sm">star</span>`.repeat(t.rating);

    container.innerHTML = `
        <div class="animate-fade-in-up bg-white p-8 md:p-12 rounded-3xl border border-outline-variant/30 max-w-2xl mx-auto shadow-sm text-center">
            <div class="flex justify-center mb-4">${stars}</div>
            <p class="font-body-lg text-body-lg text-on-surface-variant italic leading-relaxed mb-6">"${t.text}"</p>
            <h4 class="font-title-md text-primary font-bold leading-none mb-1">${t.name}</h4>
            <span class="text-xs text-on-surface-variant/70 uppercase tracking-wider">${t.role}</span>
        </div>
    `;
}

function nextTestimonial() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    renderTestimonial();
}

function prevTestimonial() {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
}

// Toast utility
function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'app-toast';
        toast.className = 'fixed bottom-28 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface font-label-md px-6 py-3 rounded-full shadow-2xl z-[200] opacity-0 transition-opacity duration-300 pointer-events-none';
        document.body.appendChild(toast);
    }
    
    toast.innerText = message;
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');
    
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
    }, 2500);
}
