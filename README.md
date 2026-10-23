# FreshMart — React Native Grocery Shopping Mobile Application

A complete, fully functional, and modern **React Native Grocery Shopping Mobile Application** built for college practical examinations using **Expo, JavaScript, and React Navigation**.

The application provides dual-role access for **Admin** and **Customer**, implementing **Stack Navigation**, **Bottom Tab Navigation**, and **Side Drawer Navigation** seamlessly alongside real-time shared state management for authentication, grocery catalog management, customer favorites, and shopping cart checkout.

---

## 🌟 Demo Credentials & Login Instructions

| User Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@freshmart.com` | `Admin@123` | Full Inventory Management (Add, Edit, Delete), Admin Dashboard, Catalog Control |
| **Customer (Demo)** | `customer@freshmart.com` | `Customer@123` | Browse Catalog, Favorites, Shopping Cart, Quantity Selection, Profile Editing, Checkout |

> **Practical Exam Pro-Tip:** On the **Sign In Screen**, tap the **"Fill Demo Admin"** or **"Fill Demo Customer"** quick-fill button to populate credentials in one tap without typing!

---

## 📋 Implemented Features Checklist

### 1. Welcome & Home Screen
- FreshMart grocery brand logo and tagline.
- High-resolution promotional grocery banner with discount badges.
- Feature assurance cards: 100% Organic, 15-Minute Express Delivery, Cash on Delivery.
- Role-specific access cards: Admin Portal & Customer Portal.
- Direct quick links to Browse Groceries, My Favorites, My Cart, and Profile.

### 2. Authentication System (Sign In & Sign Up)
- **Role Selector:** Toggle between Customer and Admin login modes.
- **Form Validations:**
  - Required field validation.
  - Standard regex email format validation.
  - 10-digit phone number validation.
  - Minimum 6-character password length.
  - Password and confirm password match confirmation.
- **Session Persistence:** Remembers user session locally via AsyncStorage.
- **Registration:** Instant customer registration with immediate login.

### 3. Daily Grocery Food Products List (Two-Column Grid)
- Display in responsive two-column grid.
- **12 Initial Sample Products:**
  1. *Fresh Red Apple* (₹160 / 1 kg)
  2. *Ripe Yellow Bananas* (₹60 / 1 dozen)
  3. *Nagpur Sweet Oranges* (₹120 / 1 kg)
  4. *Farm Fresh Tomatoes* (₹40 / 1 kg)
  5. *Organic Baby Potatoes* (₹35 / 1 kg)
  6. *Fresh Red Onions* (₹45 / 1 kg)
  7. *Crunchy Ooty Carrots* (₹55 / 500 g)
  8. *Pasteurized Full Cream Milk* (₹66 / 1 Litre)
  9. *Whole Wheat Brown Bread* (₹45 / 400 g pack)
  10. *Farm Fresh White Eggs* (₹85 / 12 pcs pack)
  11. *Premium Basmati Rice* (₹135 / 1 kg pack)
  12. *Fresh Tender Spinach (Palak)* (₹30 / 250 g bunch)
- Search filter input with instant matching across name and category.
- Horizontal category chips filter: `All`, `Fruits`, `Vegetables`, `Dairy & Bakery`, `Staples`.
- Discount percentages (`OFF%`) and star ratings.
- Quick "Add to Cart" and "Details" buttons.
- Heart toggle icon for favorites.
- Admin quick action buttons (Edit & Delete) on product cards.

### 4. Customer Favorites
- Displays all saved favorite grocery items.
- Real-time synchronization across the app.
- Direct "Add to Cart" and "Details" buttons.
- Empty state with "Explore Groceries" call-to-action.

### 5. Product Details Screen
- High-resolution product banner with floating favorite heart button.
- Pricing in Indian Rupees (₹), original MRP, and percentage savings badge.
- Stock availability indicator.
- Comprehensive description and organic quality highlights.
- **Quantity Selector:** Interactive `+` and `-` buttons with a strict guard preventing quantities less than 1.
- Adds exact selected quantity to the shared cart.

### 6. My Shopping Cart & Checkout
- Lists each added grocery item with image, name, unit price, and subtotal.
- Quantity adjustment (`+` and `-`) with real-time subtotal and total recalculations.
- Individual item removal and "Clear Cart" confirmation dialog.
- Bill Breakdown: Items Total, Delivery Fee (FREE above ₹200), and Total Savings badge.
- **Checkout Screen:**
  - Recipient delivery address form (Full Name, Phone, Street, Locality, PIN code).
  - Payment method selector: Cash on Delivery (COD), UPI / Google Pay / PhonePe, and Credit/Debit Card.
  - "Confirm & Place Order" action with animated order ID confirmation dialog and cart reset.

### 7. Customer Profile & Profile Editing
- User initials avatar with role indicator badge.
- Displays Name, Email, and Phone number.
- Account statistics (Cart items count, Saved favorites count, Orders count).
- **Edit Profile Screen:** Editable form for Name, Email, and Phone with live validation and immediate session update.
- Secure Logout action.

### 8. Admin Dashboard & Product Management (Admin-Only)
- Protected Admin-Only screens hidden from customer view.
- KPI cards: Total Products, Active Categories, Units in Stock, Low Stock Alerts.
- Restock alert list for products below threshold.
- **Manage Products Form:**
  - Add new products or edit existing items.
  - Preset image selector (Apple, Banana, Mango, Tomato, Potato, Milk, Bread, Eggs) or custom URL.
  - Validations for price, stock, category, unit, and name.
  - Catalog reset button restoring initial 12 exam products.

---

## 🧭 Navigation Architecture (30 Marks Complete)

### A. Stack Navigation (10 Marks)
Managed by `RootNavigator.js`:
- `Home` ➔ `SignIn` ➔ `SignUp`
- `Products` ➔ `ProductDetails`
- `Profile` ➔ `EditProfile`
- `Cart` ➔ `Checkout`
- `AdminDashboard` ➔ `ManageProducts`
- Full hardware and software back button navigation support.

### B. Bottom Tab Navigation (10 Marks)
Managed by `MainTabNavigator.js`:
1. 🏠 **Home** (`TabHome`)
2. 🛒 **Products** (`TabProducts`)
3. ❤️ **Favorites** (`TabFavorites` for Customer) / 📊 **Dashboard** (`TabAdminDashboard` for Admin)
4. 🛍️ **Cart** (`TabCart` with dynamic item count badge)
5. 👤 **Profile** (`TabProfile`)

### C. Side Drawer Navigation (10 Marks)
Managed by `AppDrawerNavigator.js`:
- Integrated hamburger menu button in top header.
- Custom drawer header with user profile, initials, email, and role badge.
- Permitted navigation links with role enforcement:
  - Admin view hides customer-only screens (Favorites, Profile) and exposes Admin Dashboard & Manage Products.
  - Customer view hides Admin Dashboard & Manage Products.
  - Logout action returning to Home screen.

---

## 🎨 Theme & Color Palette

- **Primary Green:** `#2E7D32`
- **Primary Dark:** `#1B5E20`
- **Light Green Soft:** `#E8F5E9` / `#F1F8F3`
- **White Background:** `#FFFFFF`
- **Text Primary:** `#1C2826`
- **Text Secondary:** `#617267`
- **Accent / Warnings:** `#FF9800`
- **Danger / Favorites:** `#D32F2F`
- **Borders & Cards:** `#E0E7E2`

---

## 📁 Project Folder Structure

```
FreshMart/
├── App.js                     # Root component with Context Providers & Navigation
├── index.js                   # Expo root registration
├── app.json                   # Expo application metadata & branding
├── package.json               # Dependencies and execution scripts
├── babel.config.js            # Babel preset & reanimated plugin configuration
├── metro.config.js            # Metro bundler configuration
├── README.md                  # Project documentation & examination guide
├── assets/                    # App icons, splash, and background assets
└── src/
    ├── components/
    │   ├── CustomButton.js       # Reusable button with variants, sizes & loader
    │   ├── ProductCard.js        # Two-column grocery card with badges & actions
    │   └── QuantitySelector.js   # Interactive minus/plus counter (guarded >= 1)
    ├── context/
    │   ├── AuthContext.js        # Authentication, session & profile state
    │   ├── ProductContext.js     # Products catalog, CRUD & favorites state
    │   └── CartContext.js        # Cart items, quantities & bill calculations
    ├── data/
    │   └── products.js           # 12 initial grocery items with INR prices & categories
    ├── navigation/
    │   ├── RootNavigator.js      # Stack Navigator (Home, Auth, Details, Edit, Checkout)
    │   ├── MainTabNavigator.js   # Bottom Tab Navigator with 5 tabs & badge
    │   ├── AppDrawerNavigator.js # Side Drawer Navigator with role protection
    │   └── AuthNavigator.js      # Dedicated Auth Stack
    ├── screens/
    │   ├── HomeScreen.js            # Welcome banner, branding & portal selection
    │   ├── LoginScreen.js           # Role selection, validation & demo autofill
    │   ├── SignupScreen.js          # Customer registration form with validation
    │   ├── ProductsScreen.js        # 2-column grocery grid with search & category filters
    │   ├── ProductDetailsScreen.js  # Large image, description, quantity selector & cart CTA
    │   ├── FavoritesScreen.js       # Customer wishlist with add to cart & details
    │   ├── CartScreen.js            # Shopping cart, quantity adjustment & bill breakdown
    │   ├── ProfileScreen.js         # Customer avatar, info, order stats & logout
    │   ├── EditProfileScreen.js     # Personal information editing form
    │   ├── AdminDashboardScreen.js  # Store metrics, low stock warnings & quick tools
    │   ├── ManageProductsScreen.js  # Admin product CRUD with validation & presets
    │   └── CheckoutScreen.js        # Delivery address, payment options & order confirmation
    └── styles/
        └── theme.js                 # Shared color palette, spacing, borders & shadows
```

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js (v18, v20, or v22)
- Expo Go application installed on your Android or iOS device (available on Google Play Store & Apple App Store), or an Android Emulator / iOS Simulator.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
```
or
```bash
npx expo start
```

### 3. Open the Application
- **Android Device:** Scan the QR code displayed in the terminal using the **Expo Go** app.
- **Android Emulator:** Press `a` in the terminal to launch the app on your emulator.
- **Web Browser:** Press `w` in the terminal to open in your browser.
- **Clear Cache if needed:** `npx expo start -c`

---

## 🎓 Examination Verification Guide

1. **Role Testing:**
   - Sign in as **Admin** (`admin@freshmart.com` / `Admin@123`): Open side drawer to view **Admin Dashboard** and **Manage Products**.
   - Add a new product or edit prices in **Manage Products**; verify it updates in the catalog instantly.
   - Logout and sign in as **Customer** (`customer@freshmart.com` / `Customer@123`): Verify Admin screens are hidden and **Favorites** and **Profile** are visible.
2. **Catalog & Cart Testing:**
   - Tap heart icons to save items into Favorites.
   - Open a product's details, increase quantity to `3`, and tap **Add to Cart**.
   - Open Cart tab; verify item badge shows updated count, and total bill calculations (including free delivery over ₹200) update dynamically.
   - Tap **Proceed to Checkout**, enter address details, select payment method, and confirm order.
3. **Profile Testing:**
   - Go to Profile screen, tap **Edit Profile**, change full name or phone number, and tap **Save Changes**; verify immediate update on screen.
