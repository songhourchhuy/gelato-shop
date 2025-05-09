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

// Function to add items to the cart
function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
}

// Function to update the cart count and cart items
function updateCart() {
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
    cartModal.style.transform = 'translateY(0)'; // Slide up the modal
    document.getElementById('view-cart-btn').style.display = 'none'; // Hide the View Cart button
}

// Function to close the cart modal
function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.transform = 'translateY(100%)'; // Slide down the modal
    setTimeout(() => {
        cartModal.style.display = 'none';
        document.getElementById('view-cart-btn').style.display = 'block'; // Show the View Cart button again
    }, 300); // Wait for the animation to complete before hiding the modal
}

// Initialize the app
window.onload = function() {
    filterCategory('normal'); // Load 'normal' category by default
};

// Event Listener for the View Cart Button to open the Cart Modal
document.getElementById('view-cart-btn').addEventListener('click', showCart);
