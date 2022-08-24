import { addToCart } from "./lib/cart.js";

//Je vais chercher l'id contenu dans l'URL de la page produit
const idProduct = new URL(window.location.href).searchParams.get("id");

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
  const productTitle = document.querySelector('title');
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

  if (addToCart(cartItem)) {
    alert('Produit bien ajouté au panier');
  } else {
    alert('Il y a eu un soucis lors de l\'ajout du produit au panier');
  }
}
// Fonction init qui implemente les informations sur la page web
init();