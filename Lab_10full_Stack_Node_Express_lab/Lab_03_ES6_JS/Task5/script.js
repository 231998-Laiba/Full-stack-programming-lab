// Create Map (Key = Product ID, Value = Product Object)
const products = new Map();

// Add minimum 5 products
products.set(101, { name: "Laptop", price: 85000 });
products.set(102, { name: "Smartphone", price: 45000 });
products.set(103, { name: "Headphones", price: 5000 });
products.set(104, { name: "Keyboard", price: 3000 });
products.set(105, { name: "Mouse", price: 1500 });

// Display all products
const displayProducts = () => {
    const list = document.getElementById("productList");
    const total = document.getElementById("totalProducts");

    list.innerHTML = "";

    for (let [id, product] of products) {
        list.innerHTML += `
            <div class="product-card">
                <strong>ID:</strong> ${id} <br>
                <strong>Name:</strong> ${product.name} <br>
                <strong>Price:</strong> Rs. ${product.price}
            </div>
        `;
    }

    total.innerHTML = `Total Products: ${products.size}`;
};

// Search by ID
const searchProduct = () => {
    const id = parseInt(document.getElementById("searchId").value);

    if (products.has(id)) {
        const product = products.get(id);
        alert(`Product Found!\nName: ${product.name}\nPrice: Rs. ${product.price}`);
    } else {
        alert("Product not found!");
    }
};

// Delete product
const deleteProduct = () => {
    const id = parseInt(document.getElementById("searchId").value);

    if (products.has(id)) {
        products.delete(id);
        alert("Product deleted successfully!");
        displayProducts();
    } else {
        alert("Product not found!");
    }
};

// Initial display
displayProducts();