let cart = [];
const flavors = [
    { name: 'Vanilla', price: 1.90, category: 'normal', image: 'https://via.placeholder.com/150', icon:  'https://github.com/songhourchhuy/gelato-shop/blob/main/Menu%20image/Vanilla.png' }, 
    { name: 'Chocolate', price: 1.90, category: 'normal', image: 'https://via.placeholder.com/150', icon:  'https://github.com/songhourchhuy/gelato-shop/blob/main/Menu%20image/Chocolate.png' },  },
    { name: 'Pistachio', price: 2.10, category: 'special', image: 'https://via.placeholder.com/150', icon:  'https://github.com/songhourchhuy/gelato-shop/blob/main/Menu%20image/Pistachio.png' },  },
    { name: 'Mango', price: 2.10, category: 'special', image: 'https://via.placeholder.com/150', icon:  'https://github.com/songhourchhuy/gelato-shop/blob/main/Menu%20image/Mango.png' },  },
    { name: 'Ice Cream Pack', price: 5.00, category: 'takeaway', image: 'https://via.placeholder.com/150', icon:  'https://github.com/songhourchhuy/gelato-shop/blob/main/Menu%20image/Chocolate.png' },  },
    { name: 'Chocolate Chips', price: 0.50, category: 'add-ons', image: 'https://via.placeholder.com/150', icon:  'https://github.com/songhourchhuy/gelato-shop/blob/main/Menu%20image/Chocolate.png' },  },
    { name: 'Fruit Toppings', price: 0.80, category: 'add-ons', image: 'https://via.placeholder.com/150', icon:  'https://github.com/songhourchhuy/gelato-shop/blob/main/Menu%20image/Chocolate.png' },  }
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

// Filter flavors based on the search input
function filterFlavors() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredFlavors = flavors.filter(flavor => flavor.name.toLowerCase().includes(searchQuery));
    
    // Clear all category sections before re-rendering
    document.querySelectorAll('.category').forEach(categoryDiv => categoryDiv.innerHTML = '');
    
    // Re-render categories with filtered results
    filteredFlavors.forEach(flavor => {
        const categoryDiv = document.getElementById(`${flavor.category}-gelato`);
        const flavorDiv = document.createElement('div');
        flavorDiv.classList.add('item');
        flavorDiv.innerHTML = `
            <img src="${flavor.image}" alt="${flavor.name}">
            <h3>${flavor.name} - $${flavor.price}</h3>
            <button onclick="addToCart('${flavor.name}', ${flavor.price})">Add to Cart</button>
        `;
        categoryDiv.appendChild(flavorDiv);
    });
}

function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
}

function updateCart() {
    // Update cart count
    document.getElementById('cart-count').innerText = cart.length;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Initialize the app
window.onload = displayCategories;
