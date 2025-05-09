let cart = [];

function addToCart(item, price) {
    cart.push({ item, price });
    alert(`${item} added to your cart.`);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear cart before updating

    cart.forEach(cartItem => {
        const div = document.createElement('div');
        div.textContent = `${cartItem.item} - $${cartItem.price}`;
        cartItems.appendChild(div);
    });
}

function checkout() {
    let total = 0;
    cart.forEach(item => total += item.price);
    alert(`Your total is $${total.toFixed(2)}. Thank you for your order!`);
    cart = []; // Clear cart after checkout
    updateCart();
}
