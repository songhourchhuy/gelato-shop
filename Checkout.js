// Fetch the cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Default to empty array if no cart

// Function to go back to the home page
function goBack() {
    window.location.href = "index.html";  // Redirect to index.html
}

// Function to display cart items on the checkout page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('checkout-cart-items');
    cartItemsContainer.innerHTML = '';  // Clear any previous items

    if (cart.length > 0) {
        cart.forEach(cartItem => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <span>${cartItem.item} - $${cartItem.price} x ${cartItem.quantity}</span>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    } else {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
    }
}

// Call this function when the checkout page loads
window.onload = function() {
    displayCartItems();  // Display cart items on page load
};

// Function to load and display selected items in the checkout page
function loadSelectedItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  // Retrieve cart data from localStorage
    const selectedItemsContainer = document.getElementById('selected-items-list');
    const totalPriceElement = document.getElementById('total-price');

    selectedItemsContainer.innerHTML = '';  // Clear previous content

    let totalPrice = 0; // Variable to store total price

    if (cart.length > 0) {
        cart.forEach(cartItem => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('selected-item-list');
            itemDiv.innerHTML = `
                <span>${cartItem.item} - $${cartItem.price} x ${cartItem.quantity}</span>
                <span class="selected-item-price">$${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
            `;
            selectedItemsContainer.appendChild(itemDiv);

            // Calculate total price
            totalPrice += cartItem.price * cartItem.quantity;
        });

        // Display the total price
        totalPriceElement.innerText = totalPrice.toFixed(2);
    } else {
        selectedItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.innerText = '0.00';  // Set total price to 0 if no items in the cart
    }
}

// Load selected items when the page loads
window.onload = function() {
    loadSelectedItems();  // Display cart items
};


// Function to add more items (redirect to home page)
function addMoreItems() {
    window.location.href = "index.html";  // Redirect to index.html
}

// Add event listeners to buttons
document.getElementById("back-btn").addEventListener("click", goBack);
document.getElementById("add-more-btn").addEventListener("click", addMoreItems);

// Function to apply promo code
function applyPromoCode() {
    const promoCode = document.getElementById('promo-code-input').value;
    const promoCodeText = document.getElementById('promo-code-text');
    if (promoCode === "DISCOUNT10") {
        promoCodeText.innerText = "10% OFF Applied"; // Update text when promo code is applied
    } else {
        promoCodeText.innerText = "Invalid Promo Code"; // If invalid code, update text
    }
}

// Function to update the Payment Method display
function updatePaymentMethod(paymentMethod, methodIcon) {
    const paymentMethodText = document.getElementById('payment-method-text');
    paymentMethodText.innerText = paymentMethod;  // Update the selected payment method
    const paymentMethodIcon = document.querySelector('.payment-method-icon');
    paymentMethodIcon.src = methodIcon;  // Update the payment method icon
}

// If no payment method or promo code is selected, default text
if (!paymentMethod) {
    document.getElementById('payment-method-text').innerText = 'Select payment method';
}
if (!promoCode) {
    document.getElementById('promo-code-text').innerText = 'Use Offers';
}

// Function to navigate back to checkout page
function goBack() {
    window.location.href = 'index.html';  // Navigate back to checkout page
}


// Function to handle checkout and proceed to receipt
function continueToReceipt() {
    const deliveryOption = document.querySelector('input[name="deliveryOption"]:checked').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    // Save checkout details (optional, for future use)
    localStorage.setItem('checkoutDetails', JSON.stringify({ deliveryOption, paymentMethod }));

    // Redirect to the receipt page (or a confirmation page)
    window.location.href = 'order-confirmation.html';
}

// Load selected items when the page loads
window.onload = function() {
    loadSelectedItems();
};

// Array of store data (with fixed coordinates for simplicity)
const stores = [
    { name: 'Store 1 - Near You', latitude: 37.7749, longitude: -122.4194, distance: null }, // San Francisco example coordinates
    { name: 'Store 2', latitude: 37.7849, longitude: -122.4294, distance: null }, // Another store example
    { name: 'Store 3', latitude: 37.7949, longitude: -122.4394, distance: null }, 
    { name: 'Store 4', latitude: 37.8049, longitude: -122.4494, distance: null }
];

// Function to get the user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(calculateDistances, handleError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to calculate distance between two points (in kilometers)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

// Convert degrees to radians
function toRad(degrees) {
    return degrees * Math.PI / 180;
}

// Function to handle geolocation success and calculate store distances
function calculateDistances(position) {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

    // Calculate distance for each store
    stores.forEach(store => {
        store.distance = calculateDistance(userLatitude, userLongitude, store.latitude, store.longitude);
    });

    // Sort stores based on distance (nearest first)
    stores.sort((a, b) => a.distance - b.distance);

    // Automatically select the nearest store
    selectNearestStore();
}

// Handle geolocation error (if user denies location access)
function handleError(error) {
    alert("Unable to retrieve your location. Showing stores by default.");
    selectNearestStore(); // Continue with the default selection
}

// Function to automatically select the nearest store
function selectNearestStore() {
    // Get the store selection list
    const storeListContainer = document.getElementById('store-list');
    storeListContainer.innerHTML = ''; // Clear previous content

    // Populate the list with store data
    stores.forEach(store => {
        const storeItem = document.createElement('li');
        storeItem.textContent = `${store.name} - ${store.distance.toFixed(2)} km away`;
        storeItem.onclick = () => selectStore(store);
        storeListContainer.appendChild(storeItem);
    });

    // Automatically select the nearest store
    const nearestStore = stores[0];
    alert(`Automatically selecting: ${nearestStore.name} (${nearestStore.distance.toFixed(2)} km away)`);
}

// Function to select a store from the list
function selectStore(store) {
    alert(`You have selected: ${store.name}`);
    closeStorePopup();
}

// Function to close the store popup
function closeStorePopup() {
    const popup = document.getElementById('store-popup');
    popup.style.display = 'none';
}

// Open the store selection popup when the "Select Nearest Store" button is clicked
function openStorePopup() {
    const popup = document.getElementById('store-popup');
    popup.style.display = 'flex';
}

// Call this function when the checkout page loads to get the user's location
window.onload = function() {
    getUserLocation();
};

