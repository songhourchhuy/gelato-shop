let cart = [];
const flavors = [
    { name: 'Vanilla', price: 1.90, category: 'normal', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Vanilla.png' },
    { name: 'Chocolate', price: 1.90, category: 'normal', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Chocolate.png' },
    { name: 'Pistachio', price: 2.10, category: 'special', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Pistachio.png' },
    { name: 'Mango', price: 2.10, category: 'special', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Mango.png' },
    { name: 'Ice Cream Pack', price: 5.00, category: 'takeaway', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Durian.png' },
    { name: 'Chocolate Chips', price: 0.50, category: 'add-ons', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Hazelnut.png' },
    { name: 'Fruit Toppings', price: 0.80, category: 'add-ons', image: 'https://raw.githubusercontent.com/songhourchhuy/gelato-shop/main/Menu%20image/Yogurt.png' }
];

// Function to render the categories
function displayCategories() {
    const categories = ['normal', 'special', 'takeaway', 'add-ons'];
    categories.forEach(category => {
        const categoryDiv = document.getElementById(`${category}-gelato`);
        const categoryItems = flavors.filter(flavor => flavor.category === category);

        categoryItems.forEach(flavor => {
            const flavorDiv = document.createElement('div');
            flavorDiv.classList.add('item');
            flavorDiv.innerHTML = `
                <img src="${flavor.image}" alt="${flavor.name}">
                <h3>${flavor.name} - $${flavor.price}</h3>
                <button onclick="addToCart('${flavor.name}', ${flavor.price})">Add to Cart</button>
            `;
            categoryDiv.appendChild(flavorDiv);
        });
    });
}

// Function to add items to the cart
function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
}

// Function to update the cart count and display the cart items
function updateCart() {
    // Update cart count
    document.getElementById('cart-count').innerText = cart.length;
}

// Function to render the cart modal content
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';  // Clear current items in the cart

    if (cart.length > 0) {
        cart.forEach((cartItem, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <span>${cartItem.item} - $${cartItem.price}</span>
                <button onclick="removeItem(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    } else {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
    }
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1); // Remove item from the cart
    updateCart(); // Re-render the cart count and items
    renderCart(); // Re-render the cart modal content
}

// Function to display the cart modal
function showCart() {
    renderCart();  // Render cart items inside the modal
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'block';
}

// Function to close the cart modal
function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
}

// Initialize the app
window.onload = displayCategories;

// Event Listener for the Cart Icon to open the Cart Modal
document.getElementById('cart-icon').addEventListener('click', showCart);
