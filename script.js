document.addEventListener("DOMContentLoaded", async () => {
  const productGrid = document.getElementById("product-grid");

  try {
    const response = await fetch("products.json");
    const products = await response.json();

    products.forEach((product) => {
      const cartProduct = cart.find((item) => item.id === product.id);
      const quantityInCart = cartProduct ? cartProduct.quantity : 0;

      const productCard = `
          <div class="bg-white p-4 rounded-lg shadow-md" card-id="${
            product.id
          }">
            <img src="${product.image}" alt="${
        product.name
      }" class="h-48 w-full object-cover rounded-t-lg mb-4">
            <h2 class="text-lg font-bold">${product.name}</h2>
            <p class="text-gray-600">${product.category}</p>
            <p class="text-blue-600 font-semibold mt-2">$${product.price.toFixed(
              2
            )}</p>
            <p class="text-sm text-gray-500 mt-1">${product.description}</p>
          <div class="mt-2 flex flex-col">
            ${
              quantityInCart > 0
                ? `<span class="quantity-text text-sm text-gray-600">In Cart: ${quantityInCart}</span>`
                : `<span class="quantity-text text-sm text-gray-600">In Cart: 0</span>`
            }
            <button class="add-to-cart bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    data-id="${product.id}"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    onclick="addToCartHandler(this)">
                    Add to Cart
            </button>
          </div>
          </div>
        `;
      productGrid.innerHTML += productCard;
    });

    productGrid.addEventListener("click", (event) => {
      if (event.target.classList.contains("add-to-cart")) {
        const button = event.target;
        const productId = button.dataset.id;
        const productName = button.dataset.name;
        const productPrice = parseFloat(button.dataset.price);
        addToCart({ id: productId, name: productName, price: productPrice });
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    productGrid.innerHTML = `<p class="text-red-500">Failed to load products. Please try again later.</p>`;
  }
});
