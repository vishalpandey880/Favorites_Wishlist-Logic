// Run the code only after the HTML page is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Store all products from JSON
    let products = [];

    // Get cart data from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('riora_cart')) || [];

    // Get wishlist data from localStorage or create empty wishlist
    let wishlist = JSON.parse(localStorage.getItem('riora_wishlist')) || [];


    // Get important HTML elements
    const productGrid = document.getElementById('product-grid');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    const wishlistCount = document.getElementById('wishlist-count');
    const wishlistItemsContainer = document.getElementById('wishlist-items');

    const navbar = document.querySelector('.navbar');


    // Change navbar style when page scrolls
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // Reveal animation when elements appear on screen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    // Apply animation to all elements with class "reveal"
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    // Fetch product data from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products); // show products on page
        })
        .catch(error => console.error('Error fetching products:', error));


    // Filter products by category
    window.filterProducts = (category) => {

        // Highlight active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.textContent === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Show all products if category is "All"
        if (category === 'All') {
            renderProducts(products);
        }
        else {
            // Filter products by category
            const filtered = products.filter(p => p.category === category);
            renderProducts(filtered);
        }
    };


    // Display products on the page
    window.renderProducts = (productData) => {

        productGrid.innerHTML = productData.map(product => {

            // Check if product already in wishlist
            const inWishlist = wishlist.some(item => item.id === product.id);

            return `
            <div class="product-card">

                <!-- Product Image -->
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">

                    <!-- Wishlist Button -->
                    <button class="add-to-wishlist-btn ${inWishlist ? 'active' : ''}" 
                    onclick="toggleWishlistItem(${product.id}, event)">

                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24" fill="${inWishlist ? 'currentColor' : 'none'}"
                        stroke="currentColor" stroke-width="2">

                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06
                        a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23
                        l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>

                    </button>
                </div>

                <!-- Product Information -->
                <div class="product-info">
                    <div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-category">${product.category}</p>
                    </div>

                    <span class="product-price">$${product.price}</span>
                </div>

                <!-- Add to Cart Button -->
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
                </button>

            </div>
        `}).join('');
    };


    // Add product to cart
    window.addToCart = (id) => {

        // Find product by id
        const product = products.find(p => p.id === id);

        if (product) {

            // Check if product already exists in cart
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                // Increase quantity
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            }
            else {
                // Add new product
                cart.push({ ...product, quantity: 1 });
            }

            saveCart();      // save cart in localStorage
            updateCartUI();  // update cart UI
            openCart();      // open cart panel
        }
    };


    // Remove item from cart
    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    };


    // Increase or decrease product quantity
    window.updateQuantity = (index, delta) => {

        if (cart[index]) {

            cart[index].quantity = (cart[index].quantity || 1) + delta;

            // Remove item if quantity becomes 0
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }

            saveCart();
            updateCartUI();
        }
    };


    // Update cart UI
    function updateCartUI() {

        // Calculate total items
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCount.textContent = totalItems;

        // Show message if cart empty
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        }
        else {

            // Display all cart items
            cartItemsContainer.innerHTML = cart.map((item, index) => {

                const qty = item.quantity || 1;

                return `
                <div class="cart-item">

                    <img src="${item.image}" class="cart-item-img">

                    <div class="cart-item-details">

                        <h4>${item.name}</h4>
                        <span>$${item.price}</span>

                        <!-- Quantity controls -->
                        <div class="cart-item-quantity">
                            <button onclick="updateQuantity(${index}, -1)">-</button>
                            <span>${qty}</span>
                            <button onclick="updateQuantity(${index}, 1)">+</button>
                        </div>

                    </div>

                </div>
            `;
            }).join('');
        }

        // Calculate total cart price
        const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }


    // Save cart data in browser storage
    function saveCart() {
        localStorage.setItem('riora_cart', JSON.stringify(cart));
    }


    // Open / Close cart panel
    window.toggleCart = () => {
        document.body.classList.toggle('cart-open');
    };

    function openCart() {
        document.body.classList.add('cart-open');
    }


    // Add or remove item from wishlist
    window.toggleWishlistItem = (id, event) => {

        event.stopPropagation();

        const product = products.find(p => p.id === id);
        if (!product) return;

        const index = wishlist.findIndex(item => item.id === id);

        if (index > -1) {
            wishlist.splice(index, 1); // remove
        }
        else {
            wishlist.push(product); // add
        }

        saveWishlist();
        updateWishlistUI();

        // refresh product UI
        const currentCategory = document.querySelector('.filter-btn.active').textContent;
        filterProducts(currentCategory);
    };


    // Remove item from wishlist
    window.removeFromWishlist = (index) => {
        wishlist.splice(index, 1);
        saveWishlist();
        updateWishlistUI();

        const currentCategory = document.querySelector('.filter-btn.active').textContent;
        filterProducts(currentCategory);
    };


    // Move wishlist item to cart
    window.moveToCart = (index) => {
        const item = wishlist[index];

        if (item) {
            addToCart(item.id);
            removeFromWishlist(index);
        }
    };


    // Update wishlist UI
    function updateWishlistUI() {

        wishlistCount.textContent = wishlist.length;

        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = '<p>Your wishlist is empty.</p>';
        }
        else {

            wishlistItemsContainer.innerHTML = wishlist.map((item, index) => `
                <div class="cart-item">

                    <img src="${item.image}" class="cart-item-img">

                    <div class="cart-item-details">

                        <h4>${item.name}</h4>
                        <span>$${item.price}</span>

                        <button onclick="moveToCart(${index})">Move to Cart</button>
                        <span onclick="removeFromWishlist(${index})">Remove</span>

                    </div>

                </div>
            `).join('');
        }
    }


    // Save wishlist in localStorage
    function saveWishlist() {
        localStorage.setItem('riora_wishlist', JSON.stringify(wishlist));
    }


    // Open / close wishlist panel
    window.toggleWishlist = () => {
        document.body.classList.toggle('wishlist-open');
    };


    // Initialize UI
    updateCartUI();
    updateWishlistUI();
});