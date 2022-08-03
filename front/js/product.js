//Je vais chercher l'id contenu dans l'URL de la page produit
const idProduct = new URL(window.location.href).searchParams.get("id");

// Fonction qui importe l'élément souhaité de l'API
async function getArticleFromApi() {
  const http_response = await fetch("http://localhost:3000/api/products/" + idProduct);
  return http_response.json();
}

// Fonction init qui permet d'utiliser la fonction buildProductPage pour le produit selectioné
async function init() {
  // if (!null) => true
  // if (!undefined) => true
  // if (!0) => true !!!
  if (!idProduct) {
    alert("Pas d'id produit");
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
  //créer l'image
  itemImg.appendChild(productImg);
  productImg.src = product.imageUrl;
  productImg.alt = product.altText;
  // On injecte l'information de l'API 
  productTitle.textContent = product.name;
  productPrice.textContent = product.price;
  productDescription.textContent = product.description;
}

// Fonction init qui implemente les informations sur la page web
init();

// coucou().then((a) => {
//   return fonctionAsynchroneA(a)
// }).then((b) => {
//   return fonctionAsynchroneB(b)
// }).then((c) => {
//   return fonctionAsynchroneC(c)
// }).catch(error => {
//   console.log(error)
// })

// try {
//   const resultatA = await coucou()
//   const resultatB = await fonctionAsynchroneA(resultatA)
//   const resultatC = await fonctionAsynchroneB(resultatB)
//   const resultatFinal = await fonctionAsynchroneC(resultatC) 
// } catch (error) {
//   console.log(error)
// }