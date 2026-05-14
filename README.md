# RIORA — Luxury Fashion E-Commerce Website

> A minimal, elegant, luxury-style fashion brand website built with pure HTML, CSS, and JavaScript.

---

## 📋 Project Overview

**RIORA** is a premium fashion e-commerce website designed to deliver a refined, high-end shopping experience. Users can explore a curated collection of stylish clothing products, view detailed product cards, add items to their wishlist or cart, and enjoy a seamless brand-style interface — all wrapped in a quiet luxury aesthetic.

The website features smooth animations, a glassmorphism-inspired navbar, responsive layouts for every screen size, and a modern checkout flow. RIORA is designed to feel like a real fashion brand's online storefront, making it an ideal project for portfolios, presentations, and learning front-end development.

---

## ✨ Features

- **Responsive Glassmorphism Navbar** — Floating, rounded navbar with blur effect that adapts on scroll
- **Hero Section** — Full-screen hero banner with brand tagline and call-to-action
- **Product Listing** — Dynamic product grid loaded from a JSON data source
- **Category Filters** — Filter products by category (Coats, Jackets, Knitwear, Tops, Bottoms, Dresses, Accessories)
- **Wishlist System** — Add/remove products to a wishlist with a live count badge
- **Shopping Cart** — Slide-out cart drawer with quantity controls, item removal, and total calculation
- **Checkout Modal** — Complete order form with card payment UI and success confirmation
- **Product Cards** — Hover effects with add-to-cart and wishlist buttons
- **Smooth UI Animations** — Fade-in reveals, hover transitions, and micro-interactions
- **Preloader** — Branded logo preloader animation on page load
- **Custom Favicon** — Custom browser tab icon for professional branding
- **Minimal Luxury Design** — Quiet luxury theme with soft colors, premium typography, and generous spacing
- **Fully Responsive** — Optimized layout for desktop, tablet, and mobile devices
- **Clean Code Structure** — Well-organized HTML, CSS, and JavaScript with no external frameworks

---

## 🛠️ Technologies Used

| Technology       | Purpose                                      |
| ---------------- | -------------------------------------------- |
| **HTML5**        | Semantic page structure and content           |
| **CSS3**         | Styling, animations, responsive design        |
| **JavaScript**   | Interactivity, cart/wishlist logic, DOM manipulation |
| **Google Fonts** | Playfair Display (serif) & Lato (sans-serif)  |
| **SVG Icons**    | Inline SVG icons for cart, wishlist, and UI    |
| **JSON**         | Product data storage (`products.json`)         |
| **Vercel**       | Deployment and hosting                        |

---

## 📁 Folder Structure

```
RIORA/
│
├── index.html          # Main HTML page
├── style.css           # All styles and responsive design
├── app.js              # JavaScript logic (cart, wishlist, filters, checkout)
├── products.json       # Product data (names, prices, images, categories)
├── favicon.png         # Custom favicon for browser tab
│
├── images/
│   ├── image.png       # Product image
│   ├── image1.png      # Product image
│   ├── image2.png      # Product image
│   └── image3.png      # Product image
│
└── README.md           # Project documentation
```

---

## 🚀 How to Run the Project

### Option 1 — Open Directly

1. Download or clone the repository:
   ```bash
   git clone https://github.com/your-username/riora.git
   ```
2. Open the project folder.
3. Double-click `index.html` to open it in your browser.

### Option 2 — Using VS Code Live Server (Recommended)

1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` → **Open with Live Server**.
4. The website will open in your browser with hot-reloading enabled.

---

## 🌐 Deployment

This project can be deployed on any static hosting platform:

| Platform           | How to Deploy                                           |
| ------------------ | ------------------------------------------------------- |
| **Vercel**         | Import the GitHub repo → Deploy automatically           |
| **Netlify**        | Drag and drop the project folder → Instant deploy       |
| **GitHub Pages**   | Push to a GitHub repo → Enable Pages in Settings        |

### 🔗 Live Demo

> **Live Demo:** [Add your deployed link here](#)

---

## 🏗️ Main Sections of the Website

### 🔹 Navbar
A floating, rounded glassmorphism navbar with navigation links (Home, About, Contact), the centered RIORA logo, and wishlist/cart icons with live count badges. The navbar changes style on scroll for a polished experience.

### 🔹 Hero Section
A full-viewport hero banner with an immersive background image, brand tagline ("Elevate Your Essence"), descriptive text, and a prominent "Shop Now" call-to-action button.

### 🔹 Product Section
A responsive grid of product cards dynamically loaded from `products.json`. Each card features a product image, name, category, price, hover-to-reveal add-to-cart button, and a wishlist heart icon.

### 🔹 Category Filters
Interactive filter buttons allow users to browse products by category — All, Coats, Jackets, Knitwear, Tops, Bottoms, Dresses, and Accessories.

### 🔹 Wishlist
A slide-out wishlist drawer accessible from the navbar heart icon. Users can view saved items, move them to the cart, or remove them. The wishlist count updates in real-time.

### 🔹 Shopping Cart
A slide-out cart drawer with full item management — view product thumbnails, adjust quantities with +/− buttons, see individual prices, remove items, and view the running total. Includes a "Proceed to Checkout" button and payment method icons (Visa, Mastercard, Pay, PayPal).

### 🔹 Checkout
A modal checkout form with fields for email, full name, card number, expiry, and CVV. On successful submission, a payment success screen with a checkmark animation is displayed.

### 🔹 Footer
A three-column footer with brand description, quick navigation links (About Us, Collection, Sustainability, Contact), and a newsletter subscription form.

---

## 🎨 Design Theme

RIORA follows a **quiet luxury** design philosophy:

- **Color Palette** — Clean whites, soft blacks, and gold accents (`#D4AF37`)
- **Typography** — Playfair Display for headings (serif elegance) and Lato for body text (modern clarity)
- **Layout** — Generous whitespace, premium spacing, and balanced visual hierarchy
- **Navbar** — Rounded pill-shape with glassmorphism blur effect
- **Interactions** — Smooth CSS transitions, hover scale effects, and fade-in reveal animations
- **Icons** — Minimal inline SVG icons for a lightweight, consistent look
- **Overall Feel** — The design evokes the sophistication of brands like Zara, COS, and The Row

---

## 🔮 Future Improvements

- [ ] **User Authentication** — Login and signup system with session management
- [ ] **Payment Gateway** — Integrate Stripe or Razorpay for real transactions
- [ ] **Advanced Filters** — Filter by price range, color, size, and availability
- [ ] **Search Functionality** — Search bar with auto-suggestions and product search
- [ ] **User Profile Page** — View account details, saved addresses, and preferences
- [ ] **Order History** — Track past orders with status updates
- [ ] **Backend Database** — Connect to a backend (Node.js/Express + MongoDB) for persistent data
- [ ] **Admin Panel** — Dashboard to manage products, orders, and inventory
- [ ] **Real Checkout Flow** — Full e-commerce checkout with shipping and order confirmation
- [ ] **Product Detail Page** — Dedicated page for each product with multiple images and size selection
- [ ] **Dark Mode** — Toggle between light and dark themes

---

## 📚 Learning Outcomes

Through building RIORA, I gained hands-on experience in:

- **E-Commerce Architecture** — Structuring a complete online store with product listings, cart, wishlist, and checkout
- **HTML + CSS + JavaScript** — Building a fully functional website without any frameworks or libraries
- **Responsive Design** — Creating layouts that adapt seamlessly across desktop, tablet, and mobile
- **State Management** — Managing cart and wishlist item counts, quantities, and totals with vanilla JavaScript
- **UI/UX Design** — Designing a premium, brand-quality interface with attention to typography, spacing, and micro-interactions
- **DOM Manipulation** — Dynamically rendering products, updating the cart, and handling user interactions
- **JSON Data Handling** — Loading and parsing product data from an external JSON file
- **Deployment** — Deploying a static frontend website to platforms like Vercel and GitHub Pages
- **CSS Animations** — Implementing smooth transitions, reveals, and hover effects for a polished experience

---

## 👤 Author

Created by **Vishal Pandey**

---

## 📄 License

This project is created for **educational and portfolio purposes**.  
Feel free to use it as a reference or inspiration for your own projects.

---

<p align="center">
  <b>⭐ If you liked this project, give it a star on GitHub! ⭐</b>
</p>
