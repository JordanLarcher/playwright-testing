# E-Commerce Application Test Plan

## Application Overview

This is a comprehensive e-commerce web application called "Let's Shop" that allows users to register/login, browse products, manage shopping cart, complete checkout process, and view order history. The application includes product filtering, search functionality, and a complete order management system.

## Test Scenarios

### 1. User Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. User Login with Valid Credentials

**File:** `tests/authentication/valid-login.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: Login form should be displayed with email and password fields
    - expect: Register link should be available
    - expect: Forgot password link should be available
  2. Enter valid email address 'erik.render@gmail.com'
    - expect: Email field should accept the input
  3. Enter valid password 'Alidarosa23'
    - expect: Password field should accept the input and mask the characters
  4. Click the Login button
    - expect: User should be successfully logged in
    - expect: Should redirect to dashboard page
    - expect: Login success message should be displayed
    - expect: User should see the product catalog

#### 1.2. User Login with Invalid Credentials

**File:** `tests/authentication/invalid-login.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: Login form should be displayed
  2. Enter invalid email address 'invalid@email.com'
    - expect: Email field should accept the input
  3. Enter invalid password 'wrongpassword'
    - expect: Password field should accept the input
  4. Click the Login button
    - expect: Login should fail
    - expect: Error message should be displayed
    - expect: User should remain on login page

#### 1.3. User Registration with Valid Information

**File:** `tests/authentication/user-registration.spec.ts`

**Steps:**
  1. Navigate to the login page and click Register link
    - expect: Registration form should be displayed with all required fields
  2. Fill in First Name 'Test', Last Name 'User', Email 'testuser@example.com', Phone Number '1234567890'
    - expect: All personal information fields should accept the input
  3. Select occupation 'Student' and gender 'Male'
    - expect: Occupation dropdown should show selected option
    - expect: Gender radio button should be selected
  4. Enter password 'TestPassword123' and confirm password 'TestPassword123'
    - expect: Password fields should accept input and mask characters
  5. Check 'I am 18 year or Older' checkbox and click Register button
    - expect: Registration should be successful
    - expect: User should be redirected to login page or dashboard
    - expect: Success message should be displayed

#### 1.4. User Logout Functionality

**File:** `tests/authentication/user-logout.spec.ts`

**Steps:**
  1. Login with valid credentials and navigate to dashboard
    - expect: User should be logged in and see the dashboard
  2. Click the Sign Out button in the navigation
    - expect: User should be logged out successfully
    - expect: Should redirect to login page
    - expect: Logout success message should be displayed
    - expect: User session should be cleared

### 2. Product Catalog and Search

**Seed:** `tests/seed.spec.ts`

#### 2.1. Browse Product Catalog

**File:** `tests/catalog/browse-products.spec.ts`

**Steps:**
  1. Login and navigate to the dashboard
    - expect: Product catalog should be displayed
    - expect: Should show 3 products: ADIDAS ORIGINAL, ZARA COAT 3, iphone 13 pro
    - expect: Each product should display name, price, View and Add To Cart buttons
  2. Verify pagination controls
    - expect: Pagination should show 'You're on page 1'
    - expect: Previous and Next buttons should be available
    - expect: Should display 'Showing 3 results' with note about maximum 9 products per page

#### 2.2. View Individual Product Details

**File:** `tests/catalog/product-details.spec.ts`

**Steps:**
  1. Login and navigate to dashboard
    - expect: Product catalog should be displayed
  2. Click View button for ZARA COAT 3 product
    - expect: Should navigate to product detail page
    - expect: Should display product name 'ZARA COAT 3'
    - expect: Should show price '$11500'
    - expect: Should have 'Add to Cart' button
    - expect: Should show 'Continue Shopping' link
  3. Verify social sharing options
    - expect: Should display 'Share It' section with social media sharing options

#### 2.3. Search Products by Name

**File:** `tests/catalog/product-search.spec.ts`

**Steps:**
  1. Login and navigate to dashboard
    - expect: Product catalog should be displayed with search box
  2. Enter 'iphone' in the search textbox
    - expect: Search should filter products containing 'iphone'
    - expect: Should show relevant search results
  3. Clear search and verify all products are shown again
    - expect: All products should be displayed when search is cleared

#### 2.4. Filter Products by Category

**File:** `tests/catalog/product-filters.spec.ts`

**Steps:**
  1. Login and navigate to dashboard
    - expect: Product catalog should be displayed with filter sidebar
  2. Select 'electronics' category checkbox
    - expect: Should filter to show only electronics products
    - expect: Should display 'Showing 1 results'
    - expect: Should only show 'iphone 13 pro' product
  3. Test other category filters (fashion, household)
    - expect: Each category should filter products accordingly
    - expect: Result count should update based on filtered products
  4. Test sub-category filters (t-shirts, shirts, shoes, mobiles, laptops)
    - expect: Sub-category filters should work independently
    - expect: Result count should reflect filtered products

#### 2.5. Filter Products by Price Range

**File:** `tests/catalog/price-filter.spec.ts`

**Steps:**
  1. Login and navigate to dashboard
    - expect: Product catalog should be displayed with price filter options
  2. Enter minimum price '10000' and maximum price '20000'
    - expect: Should filter products within the specified price range
    - expect: Should show products priced between $10000-$20000
  3. Test edge cases with very high or low price ranges
    - expect: Filter should handle edge cases gracefully
    - expect: Should display appropriate message if no products match the price range

### 3. Shopping Cart Management

**Seed:** `tests/seed.spec.ts`

#### 3.1. Add Product to Cart

**File:** `tests/cart/add-to-cart.spec.ts`

**Steps:**
  1. Login and navigate to dashboard
    - expect: Product catalog should be displayed
    - expect: Cart should show empty state
  2. Click 'Add To Cart' button for ADIDAS ORIGINAL product
    - expect: 'Product Added To Cart' message should be displayed
    - expect: Cart button should update to show 'Cart 1'
    - expect: Product should be added to cart
  3. Add multiple different products to cart
    - expect: Each product should be added successfully
    - expect: Cart count should increment for each addition

#### 3.2. View Cart Contents

**File:** `tests/cart/view-cart.spec.ts`

**Steps:**
  1. Add ADIDAS ORIGINAL to cart and click Cart button
    - expect: Should navigate to cart page
    - expect: Should display 'My Cart' header
    - expect: Should show 'Continue Shopping' button
  2. Verify product details in cart
    - expect: Should display product ID
    - expect: Should show product name 'ADIDAS ORIGINAL'
    - expect: Should display price 'MRP $ 11500'
    - expect: Should show 'In Stock' status
  3. Verify cart summary
    - expect: Should display subtotal '$11500'
    - expect: Should display total '$11500'
    - expect: Should have 'Checkout' button available

#### 3.3. Remove Product from Cart

**File:** `tests/cart/remove-from-cart.spec.ts`

**Steps:**
  1. Add ADIDAS ORIGINAL to cart and navigate to cart page
    - expect: Product should be visible in cart
  2. Click the delete button (❯) for the product
    - expect: Product should be removed from cart
    - expect: Cart should update to reflect removal
    - expect: Cart count should decrease
  3. Verify empty cart state
    - expect: Cart should show appropriate empty state message
    - expect: Subtotal and total should be zero or not displayed

#### 3.4. Continue Shopping from Cart

**File:** `tests/cart/continue-shopping.spec.ts`

**Steps:**
  1. Add product to cart and navigate to cart page
    - expect: Cart page should be displayed with products
  2. Click 'Continue Shopping❯' button
    - expect: Should navigate back to product catalog
    - expect: Cart count should be preserved
    - expect: Products should still be in cart

### 4. Checkout and Order Processing

**Seed:** `tests/seed.spec.ts`

#### 4.1. Complete Checkout Process with Valid Information

**File:** `tests/checkout/successful-checkout.spec.ts`

**Steps:**
  1. Add ADIDAS ORIGINAL to cart and navigate to cart page
    - expect: Product should be in cart with correct details
  2. Click 'Checkout❯' button
    - expect: Should navigate to checkout page
    - expect: Should display order summary with product details
    - expect: Should show payment method options
  3. Verify payment methods and select Credit Card
    - expect: Should display payment options: Credit Card, Paypal, SEPA, Invoice
    - expect: Credit card should be selected
    - expect: Credit card form should be visible
  4. Fill personal information: Name 'Test User', CVV '123'
    - expect: Personal information fields should accept input
    - expect: Credit card number should already be pre-filled
  5. Select country 'United States' from shipping dropdown
    - expect: Country dropdown should appear after typing
    - expect: Should select 'United States' from dropdown
    - expect: Shipping information should be completed
  6. Click 'Place Order' button
    - expect: Order should be placed successfully
    - expect: Should navigate to order confirmation page
    - expect: 'Order Placed Successfully' message should be displayed
    - expect: Should show order ID and order details

#### 4.2. Checkout with Missing Required Information

**File:** `tests/checkout/incomplete-checkout.spec.ts`

**Steps:**
  1. Add product to cart and navigate to checkout page
    - expect: Checkout form should be displayed
  2. Leave CVV field empty and attempt to place order
    - expect: Should show validation error
    - expect: Order should not be placed
    - expect: 'Please Enter Full Shipping Information' message should appear
  3. Leave Name on Card field empty and attempt to place order
    - expect: Should show validation error for required field
  4. Leave country unselected and attempt to place order
    - expect: Should show validation error for shipping information

#### 4.3. Payment Method Selection

**File:** `tests/checkout/payment-methods.spec.ts`

**Steps:**
  1. Navigate to checkout page with items in cart
    - expect: Payment methods section should be displayed
  2. Test selection of different payment methods (Paypal, SEPA, Invoice)
    - expect: Each payment method should be selectable
    - expect: Form should update based on selected payment method
  3. Verify credit card form fields
    - expect: Should display fields for credit card number, expiry date, CVV, and name on card

#### 4.4. Coupon Code Application

**File:** `tests/checkout/coupon-application.spec.ts`

**Steps:**
  1. Navigate to checkout page with items in cart
    - expect: Checkout form should include coupon code section
  2. Enter a test coupon code and click 'Apply Coupon'
    - expect: Should attempt to apply the coupon
    - expect: Should show appropriate response (success or error message)
  3. Test with invalid coupon code
    - expect: Should display error message for invalid coupon
    - expect: Order total should not change

### 5. Order History and Management

**Seed:** `tests/seed.spec.ts`

#### 5.1. View Order History

**File:** `tests/orders/order-history.spec.ts`

**Steps:**
  1. Place an order and navigate to Orders section
    - expect: Should display 'Your Orders' page
    - expect: Should show order history table with columns: Order Id, Product Image, Name, Price, Ordered Date, View, Delete
  2. Verify order details in history
    - expect: Recent order should appear in the list
    - expect: Should display correct order ID, product name, price, and order date
    - expect: Should have View and Delete action buttons
  3. Check system limitation notice
    - expect: Should display '*If orders will be more than 7 your last order will get deleted' warning

#### 5.2. View Individual Order Details

**File:** `tests/orders/order-details.spec.ts`

**Steps:**
  1. Navigate to Orders page and click 'View' button for an order
    - expect: Should navigate to order details page
    - expect: Should display 'Thank you for Shopping With Us' message
    - expect: Should show order summary section
  2. Verify order information
    - expect: Should display order ID
    - expect: Should show billing address with email and country
    - expect: Should show delivery address
    - expect: Should display product details with name, price, and 'by ECOM' label
  3. Check navigation options
    - expect: Should have 'View Orders' link to return to order history

#### 5.3. Delete Order from History

**File:** `tests/orders/delete-order.spec.ts`

**Steps:**
  1. Navigate to Orders page with existing orders
    - expect: Order history should be displayed with Delete buttons
  2. Click 'Delete' button for an order
    - expect: Should prompt for confirmation or immediately delete the order
    - expect: Order should be removed from the history
    - expect: Order list should update to reflect the deletion
  3. Verify order deletion
    - expect: Deleted order should no longer appear in order history
    - expect: Remaining orders should still be visible
    - expect: System should handle deletion gracefully

#### 5.4. Navigate Back to Shopping from Orders

**File:** `tests/orders/orders-navigation.spec.ts`

**Steps:**
  1. Navigate to Orders page
    - expect: Orders page should display navigation options
  2. Click 'Go Back to Shop' button
    - expect: Should navigate back to main product catalog
    - expect: Should preserve user session and cart state
  3. Navigate to Orders page and click 'Go Back to Cart'
    - expect: Should navigate to cart page
    - expect: Should display current cart contents

### 6. User Interface and Navigation

**Seed:** `tests/seed.spec.ts`

#### 6.1. Main Navigation Functionality

**File:** `tests/navigation/main-navigation.spec.ts`

**Steps:**
  1. Login and verify main navigation elements
    - expect: Should display navigation with HOME, ORDERS, Cart, and Sign Out buttons
    - expect: Should show 'Automation Practice' brand logo/link
  2. Test navigation between different sections
    - expect: HOME button should navigate to product catalog
    - expect: ORDERS button should navigate to order history
    - expect: Cart button should navigate to shopping cart
    - expect: Sign Out should log user out
  3. Verify cart count display in navigation
    - expect: Cart button should show item count when products are added
    - expect: Count should update dynamically as items are added/removed

#### 6.2. Responsive Design and Layout

**File:** `tests/navigation/responsive-design.spec.ts`

**Steps:**
  1. Test application layout on different screen sizes
    - expect: Application should be responsive
    - expect: Navigation should adapt to different screen sizes
    - expect: Content should be readable and accessible on mobile/tablet/desktop
  2. Verify filter sidebar functionality
    - expect: Filter sidebar should be accessible
    - expect: Filters should work properly across different screen sizes

#### 6.3. Error Handling and Edge Cases

**File:** `tests/navigation/error-handling.spec.ts`

**Steps:**
  1. Test application behavior with slow network conditions
    - expect: Application should handle slow network gracefully
    - expect: Should display appropriate loading states
    - expect: Should not break functionality
  2. Test handling of browser back/forward buttons
    - expect: Application should handle browser navigation properly
    - expect: User state should be preserved
    - expect: URLs should be properly managed
  3. Test session timeout handling
    - expect: Application should handle session expiration appropriately
    - expect: Should redirect to login when session expires
    - expect: Should preserve cart state where possible
