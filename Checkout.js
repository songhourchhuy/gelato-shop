// Fetch the cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Default to empty array if no cart
// Function to display cart items on the checkout page
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];  // Retrieve cart data from localStorage

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
    displayCartItems();  // Display cart items
};


// Function to load and display selected items
function loadSelectedItems() {
    const selectedItemsContainer = document.getElementById('selected-items-summary');
    selectedItemsContainer.innerHTML = '';  // Clear previous content

    let totalPrice = 0; // Variable to store total price

    if (cart.length > 0) {
        cart.forEach(cartItem => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item-summary');
            itemDiv.innerHTML = `
                <span>${cartItem.item} - $${cartItem.price} x ${cartItem.quantity}</span>
            `;
            selectedItemsContainer.appendChild(itemDiv);

            // Calculate total price
            totalPrice += cartItem.price * cartItem.quantity;
        });

        // Display the total price at the bottom
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('total-price');
        totalDiv.innerHTML = `<strong>Total Price: $${totalPrice.toFixed(2)}</strong>`;
        selectedItemsContainer.appendChild(totalDiv);

    } else {
        selectedItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
}

// Function to handle the "Add More Items" button
function addMoreItems() {
    window.location.href = "index.html";  // Redirect to the item listing page
}

// Function to apply promo code
function applyPromoCode() {
    const promoCode = document.getElementById('promo-code').value;
    if (promoCode === "DISCOUNT10") {
        alert("Promo code applied! 10% discount.");
    } else {
        alert("Invalid promo code.");
    }
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
