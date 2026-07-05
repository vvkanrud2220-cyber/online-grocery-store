const topProducts = [
    {
        id: 1,
        name: "Fresh Organic Avocados",
        category: "Fruits",
        price: 400,
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600",
        badge: "Organic"
    },
    {
        id: 2,
        name: "Crisp Red Apples",
        category: "Fruits",
        price: 200,
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&q=80&w=600",
        badge: ""
    },
    {
        id: 3,
        name: "Artisan Sourdough Bread",
        category: "Bakery",
        price: 150,
        image: "https://images.unsplash.com/photo-1589367920969-ab8e050bf0ef?auto=format&fit=crop&q=80&w=600",
        badge: "Fresh Baked"
    },
    {
        id: 4,
        name: "Farm Fresh Eggs",
        category: "Dairy",
        price: 90,
        image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&q=80&w=600",
        badge: "Local"
    },
    {
        id: 5,
        name: "Organic Vine Tomatoes",
        category: "Vegetables",
        price: 120,
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600",
        badge: ""
    },
    {
        id: 6,
        name: "Almond Milk",
        category: "Dairy Alternatives",
        price: 350,
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600",
        badge: "Vegan"
    },
    {
        id: 7,
        name: "Fresh Yellow Bananas",
        category: "Fruits",
        price: 60,
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600",
        badge: "Fresh"
    },
    {
        id: 8,
        name: "Crunchy Carrots",
        category: "Vegetables",
        price: 50,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600",
        badge: ""
    },
    {
        id: 9,
        name: "Juicy Oranges",
        category: "Fruits",
        price: 150,
        image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600",
        badge: "Seasonal"
    },
    {
        id: 10,
        name: "Organic Baby Spinach",
        category: "Vegetables",
        price: 40,
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600",
        badge: "Organic"
    }
];

const categories = ["Fruits", "Vegetables", "Dairy", "Bakery", "Meat", "Snacks", "Beverages", "Household", "Personal Care"];
const adjectives = ["Fresh", "Organic", "Premium", "Local", "Classic", "Everyday", "Natural", "Pure"];
const nouns = ["Blend", "Pack", "Selection", "Bundle", "Assortment", "Variety", "Choice"];

const products = [...topProducts];
const safeImages = [
    "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1589367920969-ab8e050bf0ef?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600"
];

for (let i = 11; i <= 150; i++) {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    products.push({
        id: i,
        name: `${adj} ${cat} ${noun}`,
        category: cat,
        price: Math.floor(Math.random() * 400) + 50,
        image: safeImages[i % safeImages.length],
        badge: Math.random() > 0.85 ? "New" : ""
    });
}

let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const shopGrid = document.getElementById('shop-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const totalPriceElement = document.getElementById('total-price');
const emptyCartMsg = document.querySelector('.empty-cart-msg');

// Initialize App
function init() {
    renderProducts();
    setupEventListeners();
    updateCartUI();
}

// Render Products
function renderProducts() {
    if (productsGrid) {
        productsGrid.innerHTML = products.slice(0, 10).map(productTemplate).join('');
    }
    if (shopGrid) {
        shopGrid.innerHTML = products.map(productTemplate).join('');
    }
}

function productTemplate(product) {
    return `
        <div class="product-card">
            <div class="product-img-wrapper">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-footer">
                    <span class="product-price">₹${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})" title="Add to Cart">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    
    // Add visual feedback (animation)
    const btn = event.currentTarget;
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    btn.style.backgroundColor = 'var(--primary)';
    btn.style.color = 'white';
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        btn.style.backgroundColor = '';
        btn.style.color = '';
    }, 1000);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update Cart UI
function updateCartUI() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    // Update total price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.textContent = `₹${totalPrice.toFixed(2)}`;

    // Render items
    if (cart.length === 0) {
        emptyCartMsg.classList.add('show');
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.appendChild(emptyCartMsg);
    } else {
        emptyCartMsg.classList.remove('show');
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Event Listeners
function setupEventListeners() {
    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            showDeliveryOptions();
        } else {
            alert('Your cart is empty!');
        }
    });
}

function showDeliveryOptions() {
    const overlay = document.createElement('div');
    overlay.className = 'delivery-modal-overlay';
    
    const modal = document.createElement('div');
    modal.className = 'delivery-modal';
    
    modal.innerHTML = `
        <h3>Select Delivery Partner</h3>
        <p>Choose your preferred quick-commerce partner to complete the order:</p>
        <div class="delivery-options">
            <a href="https://www.zeptonow.com/" target="_blank" class="delivery-btn zepto">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Zepto_Logo.svg/1200px-Zepto_Logo.svg.png" alt="Zepto">
                Zepto
            </a>
            <a href="https://www.swiggy.com/instamart" target="_blank" class="delivery-btn instamart">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/2560px-Swiggy_logo.svg.png" alt="Swiggy Instamart">
                Swiggy Instamart
            </a>
            <a href="https://blinkit.com/" target="_blank" class="delivery-btn blinkit">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Blinkit-yellow-app-icon.svg/2048px-Blinkit-yellow-app-icon.svg.png" alt="Blinkit">
                Blinkit
            </a>
        </div>
        <button class="close-modal-btn">Cancel</button>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    requestAnimationFrame(() => {
        overlay.classList.add('show');
    });
    
    const closeBtn = modal.querySelector('.close-modal-btn');
    closeBtn.onclick = () => closeDeliveryModal(overlay);
    overlay.onclick = (e) => {
        if (e.target === overlay) closeDeliveryModal(overlay);
    };
    
    const partnerBtns = modal.querySelectorAll('.delivery-btn');
    partnerBtns.forEach(btn => {
        btn.onclick = () => {
            cart = [];
            updateCartUI();
            toggleCart();
            closeDeliveryModal(overlay);
        };
    });
}

function closeDeliveryModal(overlay) {
    overlay.classList.remove('show');
    setTimeout(() => {
        overlay.remove();
    }, 300);
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('show');
    // Prevent body scrolling when cart is open
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : '';
}

// Run app
document.addEventListener('DOMContentLoaded', init);
