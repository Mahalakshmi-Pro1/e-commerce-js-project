let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cartItems");

const totalDiv = document.getElementById("total");

function displayCart() {

  cartItemsDiv.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    const product = products.find(p => p.id === item.id);

    total += product.price * item.qty;

    const div = document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `

      <div>
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
      </div>

      <div class="qty-box">

        <button onclick="decreaseQty(${item.id})">-</button>

        <span>${item.qty}</span>

        <button onclick="increaseQty(${item.id})">+</button>

        <button onclick="removeItem(${item.id})">
          Remove
        </button>

      </div>
    `;

    cartItemsDiv.appendChild(div);
  });

  totalDiv.innerText = "Total: ₹" + total;
}

function increaseQty(id) {

  const item = cart.find(i => i.id === id);

  item.qty++;

  updateCart();
}

function decreaseQty(id) {

  const item = cart.find(i => i.id === id);

  if(item.qty > 1) {
    item.qty--;
  }

  updateCart();
}

function removeItem(id) {

  cart = cart.filter(item => item.id !== id);

  updateCart();
}

function updateCart() {

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}

displayCart();
