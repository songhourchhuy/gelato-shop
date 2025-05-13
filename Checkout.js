// Fetch the cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Default to empty array if no cart

// JavaScript function to navigate back to the home page
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


// Function to handle the "Add More Items" button
function addMoreItems() {
    window.location.href = "index.html";  // Redirect to the item listing page
}

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
    window.location.href = 'checkout.html';  // Navigate back to checkout page
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
    window.location.href = 'receipt.html';
}

// Load selected items when the page loads
window.onload = function() {
    loadSelectedItems();
};
