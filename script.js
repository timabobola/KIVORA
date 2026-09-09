// =========================
// KIVORA SHOPPING CART
// =========================

let cart = [];


// =========================
// ADD TO CART
// =========================

function addToCart(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    openCart();
}


// =========================
// UPDATE CART
// =========================

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    cart.forEach((product, index) => {

        totalItems += product.quantity;

        totalPrice += product.price * product.quantity;


        const item = document.createElement("div");

        item.classList.add("cart-item");

        item.innerHTML = `

            <div class="cart-item-info">

                <h3>${product.name}</h3>

                <p>D${product.price} each</p>

            </div>


            <div class="quantity-controls">

                <button onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <span>
                    ${product.quantity}
                </span>

                <button onclick="changeQuantity(${index}, 1)">
                    +
                </button>

            </div>


            <strong>
                D${product.price * product.quantity}
            </strong>


            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>

        `;

        cartItems.appendChild(item);

    });


    cartCount.textContent = totalItems;

    cartTotal.textContent = "D" + totalPrice;

}


// =========================
// CHANGE QUANTITY
// =========================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}


// =========================
// REMOVE PRODUCT
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// =========================
// OPEN / CLOSE CART
// =========================

function toggleCart() {

    const cartPanel =
        document.getElementById("cart-panel");

    const overlay =
        document.getElementById("cart-overlay");


    cartPanel.classList.toggle("active");

    overlay.classList.toggle("active");

}


// =========================
// OPEN CART
// =========================

function openCart() {

    const cartPanel =
        document.getElementById("cart-panel");

    const overlay =
        document.getElementById("cart-overlay");


    cartPanel.classList.add("active");

    overlay.classList.add("active");

}
// =========================
// SEARCH PRODUCTS
// =========================

function searchProducts() {

    const searchValue =
        document.getElementById("search-input")
        .value
        .toLowerCase();

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productName =
            product.querySelector("h3")
            .textContent
            .toLowerCase();

        const productCategory =
            product.dataset.category
            .toLowerCase();


        if (
            productName.includes(searchValue) ||
            productCategory.includes(searchValue)
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// =========================
// FILTER PRODUCTS
// =========================

function filterProducts() {

    const selectedCategory =
        document.getElementById("category-filter").value;

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productCategory =
            product.dataset.category;


        if (
            selectedCategory === "all" ||
            productCategory === selectedCategory
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}

// =========================
// OPEN CHECKOUT
// =========================

function openCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty. Add a product first.");

        return;
    }

    const total = cart.reduce(
        (sum, product) =>
            sum + product.price * product.quantity,
        0
    );

    document.getElementById("checkout-total").textContent =
        "D" + total;

    document
        .getElementById("checkout-overlay")
        .classList.add("active");
}


// =========================
// CLOSE CHECKOUT
// =========================

function closeCheckout() {

    document
        .getElementById("checkout-overlay")
        .classList.remove("active");
}


// =========================
// PLACE ORDER
// =========================

function placeOrder(event) {

    event.preventDefault();

    const name =
        document.getElementById("customer-name").value;

    alert(
        "Thank you, " +
        name +
        "! Your KIVORA order has been placed."
    );

    cart = [];

    updateCart();

    closeCheckout();

    document.getElementById("checkout-form").reset();
}