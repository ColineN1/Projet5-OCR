//Je vais chercher l'id contenu dans l'URL de la page produit
const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");
console.log(idProduct);



// Fonction qui importe les éléments de l'API
async function getArticleFromApi() {
    const http_response = await fetch("http://localhost:3000/api/products" + idProduct)
    return await http_response.json()
  }

// Fonction init qui permet d'utiliser la fonction 
async function init() {
    const products = await getArticleFromApi();
    products.forEach(product => buildProductPage(product))
  }

// Fonction permettant de créer l'élément DOM
function buildProductPage(product) {
    //créer l'image 
    const productImgimg = document.createElement(".item__img");
    img.setAttribute("src", product.imageUrl);
    img.setAttribute("alt", product.altTxt);
   //Récuperer les éléments à modifier de la page 
    const productTitle = document.querySelector("#title");
    const productPrice = document.querySelector("#price");
    const productDescription = document.querySelector("#description");
    // On injecte l'information de l'API
    productImgAlt.alt = product.altTxt;
    productImg.src = product.imageUrl;
    productTitle.textContent = product.name;
    productPrice.textContent = product.price;
    productDescription.textContent = product.description;
}

// Fonction init qui implemente les informations sur la page web
init();