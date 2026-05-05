// Store cart items
let cart = [];

// Rest Operator
function addToCart(...items) {
    cart.push(...items);
}

function addProducts() {

    // Add products
    addToCart("Laptop", "Mouse", "Keyboard", "Headphones");

    // Spread Operator (clone cart)
    let clonedCart = [...cart];

    // Destructuring
    let [firstProduct, ...remainingProducts] = clonedCart;

    // DOM Manipulation
    document.getElementById("totalItems").innerHTML =
        "Total Items: " + clonedCart.length;

    document.getElementById("firstItem").innerHTML =
        "First Product: " + firstProduct;

    document.getElementById("updatedCart").innerHTML =
        "Other Products: " + remainingProducts.join(", ");
}