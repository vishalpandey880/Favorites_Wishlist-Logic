// Run the script only after the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Store product data
    let products = [];

    // Load cart data from LocalStorage (if available)
    let cart = JSON.parse(localStorage.getItem('riora_cart')) || [];

    // Load wishlist data from LocalStorage
    let wishlist = JSON.parse(localStorage.getItem('riora_wishlist')) || [];


    // Selecting important DOM elements
    const productGrid = document.getElementById('product-grid');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    const wishlistCount = document.getElementById('wishlist-count');
    const wishlistItemsContainer = document.getElementById('wishlist-items');


    // Navbar element
    const navbar = document.querySelector('.navbar');

    // Change navbar style when user scrolls
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // Intersection Observer for scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    // Apply animation to elements with class "reveal"
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    // Fetch product data from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products); // display products on page
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
        } else {
            // Filter products based on selected category
            const filtered = products.filter(p => p.category === category);
            renderProducts(filtered);
        }
    };


    // Render product cards dynamically
    window.renderProducts = (productData) => {

        productGrid.innerHTML = productData.map(product => {

            // Check if product already exists in wishlist
            const inWishlist = wishlist.some(item => item.id === product.id);

            return `
            <div class="product-card">

                <!-- Product Image -->
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">

                    <!-- Wishlist Button -->
                    <button class="add-to-wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlistItem(${product.id}, event)">
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
            `;
        }).join('');
    };


    // Add product to cart
    window.addToCart = (id) => {

        const product = products.find(p => p.id === id);

        if (product) {

            // Check if item already exists in cart
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                // Increase quantity if item already exists
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                // Otherwise add new product to cart
                cart.push({ ...product, quantity: 1 });
            }

            saveCart();
            updateCartUI();
            openCart();
        }
    };


    // Remove product from cart
    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    };


    // Increase or decrease cart quantity
    window.updateQuantity = (index, delta) => {

        if (cart[index]) {

            cart[index].quantity = (cart[index].quantity || 1) + delta;

            // Remove item if quantity becomes zero
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }

            saveCart();
            updateCartUI();
        }
    };


    // Update cart UI (items, count, and total price)
    function updateCartUI() {

        // Calculate total number of items
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCount.textContent = totalItems;

        // Show message if cart is empty
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        }

        // Calculate total price
        const total = cart.reduce((sum, item) =>
            sum + (item.price * (item.quantity || 1)), 0);

        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }


    // Save cart data in LocalStorage
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

        event.stopPropagation(); // prevent parent click event

        const product = products.find(p => p.id === id);

        if (!product) return;

        const index = wishlist.findIndex(item => item.id === id);

        if (index > -1) {
            wishlist.splice(index, 1); // remove item
        } else {
            wishlist.push(product); // add item
        }

        saveWishlist();
        updateWishlistUI();
    };


    // Save wishlist in LocalStorage
    function saveWishlist() {
        localStorage.setItem('riora_wishlist', JSON.stringify(wishlist));
    }


    // Toggle wishlist sidebar
    window.toggleWishlist = () => {
        document.body.classList.toggle('wishlist-open');
    };


    // Initialize cart and wishlist UI on page load
    updateCartUI();
    updateWishlistUI();


    // Checkout Elements
    const checkoutBtn = document.getElementById('start-checkout-btn');
    const checkoutOverlay = document.getElementById('checkout-overlay');

    // Checkout button click event
    checkoutBtn.addEventListener('click', () => {

        // Prevent checkout if cart is empty
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        // Calculate total price
        const total = cart.reduce((sum, item) =>
            sum + (item.price * (item.quantity || 1)), 0);

        // Show checkout modal
        checkoutOverlay.classList.add('open');
    });


    // Payment form submission
    checkoutForm.addEventListener('submit', (e) => {

        e.preventDefault(); // prevent page refresh

        // Simulate payment processing
        setTimeout(() => {

            // Clear cart after successful payment
            cart = [];
            saveCart();
            updateCartUI();

        }, 1500);
    });

});