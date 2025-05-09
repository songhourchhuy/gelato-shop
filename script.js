let cart = [];
const flavors = [
    { name: 'Vanilla', price: 1.90, category: 'normal', image: 'https://via.placeholder.com/150' },
    { name: 'Chocolate', price: 1.90, category: 'normal', image: 'https://via.placeholder.com/150' },
    { name: 'Pistachio', price: 2.10, category: 'special', image: 'https://via.placeholder.com/150' },
    { name: 'Mango', price: 2.10, category: 'special', image: 'https://via.placeholder.com/150' },
    { name: 'Ice Cream Pack (500g)', price: 15.90, category: 'takeaway', image: 'https://via.placeholder.com/150' },
    { name: 'Ice Cream Pack (750g)', price: 24.90, category: 'takeaway', image: 'https://via.placeholder.com/150' },
    { name: 'Ice Cream Pack (1000g)', price: 30.00, category: 'takeaway', image: 'https://via.placeholder.com/150' },
    { name: 'Chocolate Chips', price: 0.50, category: 'add-ons', image: 'https://via.placeholder.com/150' },
    { name: 'Fruit Toppings', price: 0.80, category: 'add-ons', image: 'https://via.placeholder.com/150' },
    { name: 'Waffle x10pcs', price: 0.80, category: 'add-ons', image: 'https://via.placeholder.com/150' },
    { name: 'Cone', price: 0.50, category: 'add-ons', image: 'https://via.placeholder.com/150' }
];

let selectedFlavors = [];

// Function to render the categories
function displayCategories(category = 'all') {
    const categories = ['normal', 'special', 'takeaway', 'add-ons'];

    // Hide all categories initially
    categories.forEach(c => {
        const categoryDiv = document.getElementById(`${c}-gelato`);
        categoryDiv.style.display = 'none'; // Hide all categories
    });
    
    // Show the selected category
    const categoryDiv = document.getElementById(`${category}-gelato`);
    categoryDiv.style.display = 'block'; // Only show the clicked category

    // Filter flavors based on the selected category
    const categoryItems = flavors.filter(flavor => flavor.category === category || category === 'all');
    
    // Clear the category section before rendering
    categoryDiv.innerHTML = `<h2>${capitalizeFirstLetter(category)} Gelato</h2>`;

    // Display the items in rows of 3
    categoryItems.forEach((flavor, index) => {
        const row = document.createElement('div');
        row.classList.add('row');
        categoryDiv.appendChild(row);

        const flavorDiv = document.createElement('div');
        flavorDiv.classList.add('item');
        flavorDiv.innerHTML = `
            <img src="${flavor.image}" alt="${flavor.name}">
            <h3>${flavor.name} - $${flavor.price}</h3>
            <button onclick="addToCart('${flavor.name}', ${flavor.price}, '${flavor.category}')">Add to Cart</button>
        `;
        row.appendChild(flavorDiv);
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addToCart(item, price, category) {
    // Handle special cart logic for Takeaway packs
    if (category === 'takeaway') {
        let maxFlavors = 0;
        if (item === 'Ice Cream Pack (500g)') maxFlavors = 3;
        if (item === 'Ice Cream Pack (750g)') maxFlavors = 4;
        if (item === 'Ice Cream Pack (1000g)') maxFlavors = 6;

        const selectedFlavorsForPack = prompt(`Select up to ${maxFlavors} flavors from Normal or Special Gelato categories.`);
        selectedFlavors.push(selectedFlavorsForPack);
    }

    cart.push({ item, price });
    updateCart();
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
    viewCart();
}

function viewCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear the current cart items

    cart.forEach((cartItem, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <span>${cartItem.item} - $${cartItem.price}</span>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    cartItemsContainer.innerHTML += `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;

    document.getElementById('cart-modal').style.display = 'block';
}

function clearCart() {
    cart = [];
    updateCart();
    viewCart();
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

// Filter flavors based on the search input
function filterFlavors() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredFlavors = flavors.filter(flavor => flavor.name.toLowerCase().includes(searchQuery));
    displayCategories(filteredFlavors);
}

function showCategory(category) {
    displayCategories(category);
}

// Initialize the app
window.onload = function() {
    displayCategories('all');
};
