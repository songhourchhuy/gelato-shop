let cart = [];
const flavors = [
    { name: 'Vanilla', price: 1.90, category: 'normal', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Vanilla.png' },
    { name: 'Mango', price: 1.90, category: 'normal', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Mango.png' },
    { name: 'Strawberry', price: 1.90, category: 'normal', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Strawberry.png' },
    { name: 'Mint', price: 1.90, category: 'normal', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Mint.png' },
    { name: 'Passion', price: 1.90, category: 'normal', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Passion.png' },
    { name: 'Chocolate', price: 1.90, category: 'normal', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Chocolate.png' },
    { name: 'Pistachio', price: 2.10, category: 'special', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Pistachio.png' },
    { name: 'Coconut', price: 2.10, category: 'special', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Coconut.png' },
    { name: 'White Truffle', price: 2.10, category: 'special', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/White%20Truffle.png' },
    { name: 'Matcha Green Tea', price: 2.10, category: 'special', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Matcha%20Green%20Tea.png' },
    { name: 'Caramel Popcorn', price: 2.10, category: 'special', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Caramel%20Popcorn.png' },
    { name: 'Blueberry', price: 2.10, category: 'special', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Blueberry.png' },
    { name: '500g Family Pack', price: 15.90, category: 'takeaway', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Durian.png' },
    { name: '750g Family Pack', price: 24.50, category: 'takeaway', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Durian.png' },
    { name: '1000g Family Pack', price: 30.00, category: 'takeaway', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Durian.png' },
    { name: 'Extra Waffle x10', price: 0.80, category: 'add-ons', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Hazelnut.png' },
    { name: 'Cone', price: 0.30, category: 'add-ons', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Yogurt.png' }
];

// Function to render the categories
function displayCategories() {
    const categories = ['normal', 'special', 'takeaway', 'add-ons'];
    categories.forEach(category => {
        const categoryDiv = document.getElementById('category-items');
        const categoryItems = flavors.filter(flavor => flavor.category === category);

        categoryItems.forEach(flavor => {
            const flavorDiv = document.createElement('div');
            flavorDiv.classList.add('item');
            flavorDiv.innerHTML = `
                <img src="${flavor.image}" alt="${flavor.name}">
                <h3>${flavor.name}</h3>
                <div class="price">$${flavor.price}</div>
                <button onclick="addToCart('${flavor.name}', ${flavor.price})">Add to Cart</button>
            `;
            categoryDiv.appendChild(flavorDiv);
        });
    });
}

// Function to filter items based on the category selected
function filterCategory(category) {
    const categoryItems = flavors.filter(flavor => flavor.category === category);
    
    // Clear the current category items
    const itemsContainer = document.getElementById('category-items');
    itemsContainer.innerHTML = ''; // Clear existing items

    // Render the filtered items
    categoryItems.forEach(flavor => {
        const flavorDiv = document.createElement('div');
        flavorDiv.classList.add('item');
        flavorDiv.innerHTML = `
            <img src="${flavor.image}" alt="${flavor.name}">
            <h3>${flavor.name} - $${flavor.price}</h3>
            <button onclick="addToCart('${flavor.name}', ${flavor.price})">Add to Cart</button>
        `;
        itemsContainer.appendChild(flavorDiv);
    });

    // Update active category bar
    document.querySelectorAll('.category-bar').forEach(bar => {
        bar.classList.remove('active');
    });
    document.querySelector(`.category-bar[onclick="filterCategory('${category}')"]`).classList.add('active');
}

// Function to add an item to the cart (or increase the quantity if item already exists)
function addToCart(item, price) {
    // Fetch current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.item === item);
    
    if (existingItem) {
        // If the item already exists, increase the quantity
        existingItem.quantity++;
    } else {
        // If the item doesn't exist, add a new item with quantity 1
        cart.push({ item, price, quantity: 1 });
    }

    // Save updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCart(); // Update the cart UI and the count on the View Cart button
}


// Function to update the cart count and cart items (to sync with localStorage)
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0); // Calculate the total number of items
}

// Function to update the quantity of an item in the cart
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  // Retrieve cart data from localStorage
    const cartItem = cart[index];
    
    // Update the quantity
    cartItem.quantity += change;

    // Ensure quantity doesn't go below 1
    if (cartItem.quantity < 1) {
        cartItem.quantity = 1;  // You can choose to remove the item instead if you'd prefer
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart UI and update the cart count
    updateCart();
    renderCart();  // Re-render the cart modal content
}



// Function to render the cart modal content
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';  // Clear current items in the cart


    let totalPrice = 0; // Variable to store total price
 
    // Fetch current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length > 0) {
        cart.forEach((cartItem, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <span>${cartItem.item} - $${cartItem.price} x ${cartItem.quantity}</span>
                <button onclick="updateQuantity(${index}, -1)">-</button> <!-- Decrease quantity -->
                <button onclick="updateQuantity(${index}, 1)">+</button> <!-- Increase quantity -->
                <button onclick="removeItem(${index})" class="remove-btn">
 <!-- Trash Can Icon -->
                    <img src="https://raw.githubusercontent.com/songhourchhuy/gelato-shop/50968d41966f4efa1d09e072fba1ac281a30a9a9/Mini%20App%20Icon/big-trash-can.svg" alt="Remove" class="remove-icon" />
                </button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);

            // Calculate total price
            totalPrice += cartItem.price * cartItem.quantity;
        });

        // Add the Total Price at the bottom of the cart modal
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('total-price');
        totalDiv.innerHTML = `<strong>Total Price: $${totalPrice.toFixed(2)}</strong>`;
        cartItemsContainer.appendChild(totalDiv);

    } else {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
    }
}

// Function to remove an item from the cart
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  // Retrieve cart data from localStorage
    cart.splice(index, 1);  // Remove the item at the specified index

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart UI and update the cart count
    updateCart();
    renderCart();  // Re-render the cart modal content
}

// Function to display the cart modal
function showCart() {
    renderCart();  // Render cart items inside the modal
    const cartModal = document.getElementById('cart-modal');
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay'); // Create overlay div
    document.body.appendChild(overlay); // Append overlay to the body

    // Display the overlay (grey background)
    overlay.style.display = 'block'; // Make sure the overlay is visible

    // Disable interaction with the body behind the modal (grey out)
    overlay.addEventListener('click', closeCart); // Close modal when clicking on overlay

    cartModal.style.position = 'fixed'; // Ensure the modal is fixed
    cartModal.style.left = 'calc(50% - 200px)'; // Shift modal halfway to the left
    cartModal.style.bottom = '20px'; // Position modal at the bottom of View Cart button
    cartModal.style.transform = 'translateY(100%)'; // Start off-screen

    // Show the modal and animate it sliding up
    cartModal.style.display = 'block'; // Ensure the modal is visible
    setTimeout(() => {
        cartModal.style.transform = 'translateY(0)'; // Animate modal sliding up into position
    }, 10); // Delay the animation to allow it to be triggered

    // Hide the View Cart button
    document.getElementById('view-cart-btn').style.display = 'none'; 
}

// Function to close the cart modal
function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    const overlay = document.querySelector('.modal-overlay');
    
    // Slide the modal down to hide it
    cartModal.style.transform = 'translateY(100%)'; // Slide down the modal
    setTimeout(() => {
        cartModal.style.display = 'none';
        overlay.remove(); // Remove the overlay
        document.getElementById('view-cart-btn').style.display = 'block'; // Show the View Cart button again
    }, 300); // Wait for the animation to complete before hiding the modal
}
// Function to handle the checkout process
function checkout() {
    // Redirect to checkout.html page
    window.location.href = 'checkout.html';  // Navigate to the checkout page
}


// Initialize the app
window.onload = function() {
    filterCategory('normal'); // Load 'normal' category by default
};

// Event Listener for the View Cart Button to open the Cart Modal
document.getElementById('view-cart-btn').addEventListener('click', showCart);

let currentBannerIndex = 0;
const banners = document.querySelectorAll('.banner-slide');
const totalBanners = banners.length;
const bannerSlidesContainer = document.querySelector('.banner-slides');

// Function to show the current banner and hide others
function showBanner(index) {
    // Slide the banner container to the correct index
    bannerSlidesContainer.style.transform = `translateX(-${index * 100}%)`;
}

// Function to cycle through the banners automatically
function cycleBanners() {
    currentBannerIndex = (currentBannerIndex + 1) % totalBanners;
    showBanner(currentBannerIndex);
}

// Function to navigate to the previous banner manually
function prevBanner() {
    currentBannerIndex = (currentBannerIndex - 1 + totalBanners) % totalBanners;
    showBanner(currentBannerIndex);
}

// Function to navigate to the next banner manually
function nextBanner() {
    currentBannerIndex = (currentBannerIndex + 1) % totalBanners;
    showBanner(currentBannerIndex);
}

// Start the automatic banner cycle every 3 seconds
setInterval(cycleBanners, 3000);

// Function to add swipe functionality
let touchStartX = 0;
let touchEndX = 0;

bannerSlidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

bannerSlidesContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
}, false);

// Function to handle swipe gesture
function handleSwipeGesture() {
    if (touchStartX - touchEndX > 50) {
        // Swipe left (next banner)
        nextBanner();
    }
    if (touchEndX - touchStartX > 50) {
        // Swipe right (previous banner)
        prevBanner();
    }
}

// Initialize the first banner to be visible
showBanner(currentBannerIndex);
