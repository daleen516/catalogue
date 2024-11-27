const cart = JSON.parse(localStorage.getItem("cart")) || [];

// function addToCartHandler(button) {
//   const productId = button.dataset.id;
//   const productName = button.dataset.name;
//   const productPrice = parseFloat(button.dataset.price);
//   addToCart({ id: productId, name: productName, price: productPrice });
// }

function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartCount();
  updateProductCardQuantity(product.id);
  saveCart();
}

function updateCartCount() {
  const uniqueProductCount = new Set(cart.map((item) => item.id)).size;
  document.getElementById("cart-count").textContent = uniqueProductCount;
  saveCart();
}

function renderCart() {
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");

  if (cartList && cartTotal) {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.quantity * item.price;
      total += itemTotal;

      cartList.innerHTML += `
        <div class="flex justify-between items-center border-b pb-2">
          <span>${item.name} (x${item.quantity})</span>
          <span>$${itemTotal.toFixed(2)}</span>
        </div>
      `;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", renderCart);

function updateProductCardQuantity(productId) {
  const productCard = document.querySelector(`[card-id="${productId}"]`);
  console.log("productCard", productCard);

  if (productCard) {
    const quantityText = productCard.querySelector(".quantity-text");

    if (quantityText) {
      const cartProduct = cart.find((item) => item.id === productId);
      const quantityInCart = cartProduct ? cartProduct.quantity : 0;

      quantityText.textContent = `In Cart: ${quantityInCart}`;

      if (quantityInCart > 0) {
        const addToCartButton = productCard.querySelector(".add-to-cart");
      }
    } else {
      console.error("Quantity text element not found in the product card.");
    }
  } else {
    console.error("Product card not found for product ID:", productId);
  }
}
