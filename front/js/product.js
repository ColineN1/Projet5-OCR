//Je vais chercher l'id contenu dans l'URL de la page produit
const idProduct = new URL(window.location.href).searchParams.get("id");
const cart = localStorage.getItem('cart') || [];

// Fonction qui importe l'élément souhaité de l'API
async function getArticleFromApi() {
  const http_response = await fetch("http://localhost:3000/api/products/" + idProduct);
  return http_response.json();
}

// Fonction init qui permet d'utiliser la fonction buildProductPage pour le produit selectioné
async function init() {
  if (!idProduct) {
    alert("Oups, un problème est survenu. Contactez nous pour plus d'information.");
    return;
  }
  const product = await getArticleFromApi();
  const addToCartButton = document.querySelector("#addToCart");

  buildProductPage(product);
  addToCartButton.addEventListener('click', addProductToCart);
}

// Fonction permettant de créer l'élément DOM
function buildProductPage(product) {
  const itemImg = document.querySelector(".item__img");
  const productImg = document.createElement("img");
  const productTitle = document.querySelector("#title");
  const productPrice = document.querySelector("#price");
  const productDescription = document.querySelector("#description");

  //créer l'image
  itemImg.appendChild(productImg);
  productImg.src = product.imageUrl;
  productImg.alt = product.altText;
  // Colors
  product.colors.forEach(color => {
    const option = document.createElement("option");
    option.setAttribute("value", color);
    option.innerText = color;
    document.querySelector("#colors").appendChild(option);
  });
  // On injecte l'information de l'API 
  productTitle.textContent = product.name;
  productPrice.textContent = product.price;
  productDescription.textContent = product.description;
}

// Fonction qui récupère les éléments du panier au clic et qui les stock dans LocalStorage
function addProductToCart() {

  const cartItem = {
    id: idProduct,
    quantity: document.querySelector("#quantity").value,
    color: document.querySelector("#colors").value
  };

  addToCart(cartItem);
}

function addToCart(cartItem) {
  // Vérifie que les éléments du panier possède une valeur correcte
  if (!cartItem.color) {
    alert("Selectionnez une couleur!");
    return;
  };

  if (Number(cartItem.quantity) <= 0) {
    alert("Selectionnez une quantité!");
    return;
  };
console.log(cart);
console.log(cartItem);
  // const cartItemFound = cart.find(item => cartItem.id === item.id && cartItem.color === item.color )
  const cartItemFound = cart.find((cartItem) => {
    // Condtion de recherche pour indiquer si oui ou non c'est bien le produit recherché
    cartItem.id === cart.id && cartItem.color === cart.color;
    return cartItem.id === cart.id && cartItem.color === cart.color;
  })
  console.log(cartItemFound);
  // Si product found => alors juste mettre à jour la quantité du produit par la nouvelle quantité
  // Si product not found => alors ajouter le produit dans le tableau
  if (!cartItemFound) {
    cart[cartItemFound].quantity = cartItem.quantity
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem('cart', cart); // update localstorage when everything is ok !
  console.log(cart);
  alert('Produit bien ajouté, même quand ça marche pas !!!!! Alors heureuse ?');
}


// Fonction init qui implemente les informations sur la page web
init();