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
  buildProductPage(product);
}

// Fonction permettant de créer l'élément DOM
function buildProductPage(product) { 
  let itemImg = document.querySelector(".item__img");
  let productImg = document.createElement("img");
  let productTitle = document.querySelector("#title");
  let productPrice = document.querySelector("#price");
  let productDescription = document.querySelector("#description");
  let addToCart = document.querySelector("#addToCart");
  //créer l'image
  itemImg.appendChild(productImg);
  productImg.src = product.imageUrl;
  productImg.alt = product.altText;
  // Colors
  product.colors.forEach(color => {
    let option = document.createElement("option");
    option.setAttribute("value", color);
    option.innerText = color;
    document.querySelector("#colors").appendChild(option);
  });
  // On injecte l'information de l'API 
  productTitle.textContent = product.name;
  productPrice.textContent = product.price;
  productDescription.textContent = product.description;
  addToCart.onclick = addCart;
}



  
// Fonction qui récupère les éléments du panier au clic et qui les stock dans LocalStorage
function addCart() {
  
  let cartValues = {
      id: idProduct,
      quantity: document.querySelector("#quantity").value,
      color: document.querySelector("#colors").value
  };
  console.log(cartValues);

  // Vérifie que les éléments du panier possède une valeur correcte
  if (!cartValues.color) {
    alert("Selectionnez une couleur!");
    return;
  };
  if (Number(cartValues.quantity) <= 0) {
    alert("Selectionnez une quantité!");
    return;
  };
  
  // let cartInfoStorage = JSON.stringify(cartValues);
  // localStorage.setItem("cart",cartInfoStorage);
  // console.log(cartInfoStorage);
  // alert("Produit ajouté au panier!");


const cart = []
//modifier la quantité d'un élément du panier
if (cart !=== null) {
    // Vérification si un produit identique (même id et même couleur) est déjà présent dans le localStorage
    let existingProduct = cart.includes(idProduct [1] && colors [3]);
    
    // Si le produit commandé est identique (même id et même couleur), on incrémente la quantité
    if (existingProduct===true) {
        let totalNewQuantity = Number(cartValues.quantity) + Number(existngProduct.quantity);
        existingProduct.quantity = totalNewQuantity;

    // Si le produit commandé n'est pas identique, on l'ajoute au localStorage
    } else {
      cart.push(cartValues);
    }
  }
  console.log (cart);
}

// Fonction init qui implemente les informations sur la page web
init();