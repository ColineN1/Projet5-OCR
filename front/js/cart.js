
  
    init() {
      this.getCartFromLocalStorage();
      if (this.cart.length === 0) this.draw();
  
      fetch(url + "/products")
        .then(res => res.json())
        .then(originalProducts => {
          this.originalProducts = originalProducts;
          this.createProductListForCart();
          this.draw();
        });
    }
  
    draw() {
      let productList = document.getElementById("cart__items");
      productList.innerHTML = "";
  
      if (this.cart.length === 0) {
        productList.appendChild(createElementFromHTML("<p>Votre panier est vide!</p>"));
        document.getElementById("totalQuantity").innerText = 0;
        document.getElementById("totalPrice").innerText = 0;
        return;
      }
  
      this.cart.forEach(product => {
        let productElement = this.createProduct(product);
  
        productElement.addEventListener("click", e => {
          if (e.target.className === "deleteItem") {
            this.removeProduct(product);
            productElement.remove();
          } else if (e.target.className === "itemQuantity") {
            if (Number(e.target.value) <= 0) {
              e.target.value = 1;
            }
            this.setProductQuantity({ id: product.id, color: product.color, quantity: e.target.value });
          }
        });
  
        productList.appendChild(productElement);
      });
  
      document.getElementById("totalQuantity").innerText = this.getTotalQuantity();
      document.getElementById("totalPrice").innerText = this.getTotalPrice();
    }
    
    getTotalQuantity() {
    let totalQuantity = 0;

    this.cart.forEach(product => {
      totalQuantity += Number(product.quantity);
    });

    return totalQuantity;
  }

getTotalPrice() {
    let totalPrice = 0;

    this.cart.forEach(product => {
      totalPrice += Number(product.price) * Number(product.quantity);
    });

    return totalPrice;
  }

createProductListForCart() {
    if (!this.cart) return;

    this.cart.forEach((product, index) => {
      let originalProduct = this.originalProducts.filter(originalProduct => originalProduct._id === product.id)[0];
      this.cart[index] = {
        ...product,
        imageUrl: originalProduct.imageUrl,
        altTxt: originalProduct.altTxt,
        name: originalProduct.name,
        price: originalProduct.price
      };
    });

    this.cart = this.cart.sort((a, b) => (a.name.localeCompare(b.name) >= 0 ? 1 : -1));
  }