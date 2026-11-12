let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}

// DISPLAY CART ITEMS
function displayCart() {

    let cartItems = document.getElementById("cartItems");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;
    let originalPrice = 0;

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        originalPrice += (item.price + 500) * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-box">

            <h3>${item.name}</h3>

            <p>Price : Rs.${item.price}</p>

            <div class="qty-box">

                <button onclick="decreaseQty(${index})">-</button>

                <span>${item.quantity}</span>

                <button onclick="increaseQty(${index})">+</button>

            </div>

            <p>Total : Rs.${itemTotal}</p>

            <button class="remove-btn" onclick="removeItem(${index})">
                Remove
            </button>

        </div>
        `;
    });

    // PRICE DETAILS
    let discount = originalPrice - total;

    document.getElementById("price").innerText = "₹" + originalPrice;

    document.getElementById("discount").innerText = "- ₹" + discount;

    document.getElementById("total").innerText = "₹" + total;

    document.getElementById("save").innerText =
        "🎉 You'll save ₹" + discount + " on this order!";
}

// INCREASE QUANTITY
function increaseQty(index) {

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

// DECREASE QUANTITY
function decreaseQty(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    else {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

// REMOVE ITEM
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

displayCart();

