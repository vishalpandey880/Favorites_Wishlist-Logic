document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    let cart = JSON.parse(localStorage.getItem('riora_cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('riora_wishlist')) || [];


    const productGrid = document.getElementById('product-grid');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    const wishlistCount = document.getElementById('wishlist-count');
    const wishlistItemsContainer = document.getElementById('wishlist-items');


    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            renderProducts(products);
        })
        .catch(error => console.error('Error fetching products:', error));


    window.filterProducts = (category) => {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            if (btn.textContent === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (category === 'All') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === category);
            renderProducts(filtered);
        }
    };


    window.renderProducts = (productData) => {
        productGrid.innerHTML = productData.map(product => {
            const inWishlist = wishlist.some(item => item.id === product.id);
            return `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <button class="add-to-wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlistItem(${product.id}, event)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
                <div class="product-info">
                    <div>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-category">${product.category}</p>
                    </div>
                    <span class="product-price">$${product.price}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `}).join('');
    };


    window.addToCart = (id) => {
        const product = products.find(p => p.id === id);
        if (product) {
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            saveCart();
            updateCartUI();
            openCart();
        }
    };


    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    };

    window.updateQuantity = (index, delta) => {
        if (cart[index]) {
            cart[index].quantity = (cart[index].quantity || 1) + delta;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            saveCart();
            updateCartUI();
        }
    };


    function updateCartUI() {

        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        cartCount.textContent = totalItems;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map((item, index) => {
                const qty = item.quantity || 1;
                return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <span class="cart-item-price">$${item.price}</span>
                        <div class="cart-item-quantity">
                            <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="qty-count">${qty}</span>
                            <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                </div>
            `}).join('');
        }


        const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }


    function saveCart() {
        localStorage.setItem('riora_cart', JSON.stringify(cart));
    }


    window.toggleCart = () => {
        const body = document.body;
        body.classList.toggle('cart-open');
    };

    function openCart() {
        document.body.classList.add('cart-open');
    }


    window.toggleWishlistItem = (id, event) => {
        event.stopPropagation();
        const product = products.find(p => p.id === id);
        if (!product) return;

        const index = wishlist.findIndex(item => item.id === id);
        if (index > -1) {
            wishlist.splice(index, 1);
        } else {
            wishlist.push(product);
        }

        saveWishlist();
        updateWishlistUI();
        const currentCategory = document.querySelector('.filter-btn.active').textContent;
        filterProducts(currentCategory);
    };

    window.removeFromWishlist = (index) => {
        wishlist.splice(index, 1);
        saveWishlist();
        updateWishlistUI();
        const currentCategory = document.querySelector('.filter-btn.active').textContent;
        filterProducts(currentCategory);
    };

    window.moveToCart = (index) => {
        const item = wishlist[index];
        if (item) {
            addToCart(item.id);
            removeFromWishlist(index);
        }
    };

    function updateWishlistUI() {
        wishlistCount.textContent = wishlist.length;

        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = '<p class="empty-wishlist-msg">Your wishlist is empty.</p>';
        } else {
            wishlistItemsContainer.innerHTML = wishlist.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <span class="cart-item-price">$${item.price}</span>
                        <div style="display: flex; gap: 1rem; margin-top: 0.5rem; align-items: center;">
                            <button class="move-to-cart-btn" onclick="moveToCart(${index})">Move to Cart</button>
                            <span class="cart-item-remove" onclick="removeFromWishlist(${index})" style="margin-top: 0;">Remove</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    function saveWishlist() {
        localStorage.setItem('riora_wishlist', JSON.stringify(wishlist));
    }

    window.toggleWishlist = () => {
        document.body.classList.toggle('wishlist-open');
    };

    updateCartUI();
    updateWishlistUI();

    // Checkout Logic
    const checkoutBtn = document.getElementById('start-checkout-btn');
    const checkoutOverlay = document.getElementById('checkout-overlay');
    const checkoutClose = document.getElementById('checkout-close');
    const checkoutForm = document.getElementById('checkout-form');
    const paymentSuccess = document.getElementById('payment-success');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const checkoutModalTotal = document.getElementById('checkout-modal-total');
    const submitPaymentBtn = document.getElementById('submit-payment-btn');

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        checkoutModalTotal.textContent = `$${total.toFixed(2)}`;

        checkoutForm.style.display = 'block';
        paymentSuccess.style.display = 'none';
        checkoutForm.reset();
        submitPaymentBtn.innerHTML = `Pay $${total.toFixed(2)}`;
        submitPaymentBtn.disabled = false;

        toggleCart();
        checkoutOverlay.classList.add('open');
    });

    checkoutClose.addEventListener('click', () => {
        checkoutOverlay.classList.remove('open');
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        submitPaymentBtn.textContent = 'Processing...';
        submitPaymentBtn.disabled = true;

        // Simulate payment processing delay
        setTimeout(() => {
            checkoutForm.style.display = 'none';
            paymentSuccess.style.display = 'block';

            // Clear cart after successful payment
            cart = [];
            saveCart();
            updateCartUI();
        }, 1500);
    });

    continueShoppingBtn.addEventListener('click', () => {
        checkoutOverlay.classList.remove('open');
    });
});
