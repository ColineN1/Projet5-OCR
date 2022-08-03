// Permet de créer un template pour une "card" produit
const template = document.querySelector('#productTemplate');

// Fonction qui importe les éléments de l'API
async function getProductsFromApi() {
  const http_response = await fetch("http://localhost:3000/api/products")
  return http_response.json()
}

// Fonction init qui permet d'utiliser la fonction buildProductCardUI pour tous les produits stockés dans l'API
async function init() {
  const products = await getProductsFromApi();
  products.forEach(product => buildProductCardUI(product))
}

// Fonction permettant de créer l'élément DOM représentant une "card" produit et cloner le template pour le répeter autant de fois que nécessaire
function buildProductCardUI(product) {
    // On choisit l'endroit où nous souhaitons voir le template affiché dans le code html
    const items = document.querySelector("#items");
    //On clone le template
    const productListElement = document.importNode(template.content, true);
    // On va chercher chaque élément du templates 
    const productRef = productListElement.querySelector('.productRef');
    const productImgAlt = productListElement.querySelector('.productImg');
    const productImg = productListElement.querySelector('.productImg');
    const productName = productListElement.querySelector('.productName');
    const productDescription = productListElement.querySelector('.productDescription');
    // On injecte l'information de l'API
    productRef.href = "./product.html?id=" + product._id;
    productImgAlt.alt = product.altTxt;
    productImg.src = product.imageUrl;
    productName.textContent = product.name;
    productDescription.textContent = product.description;
    // On affiche la card créée 
    items.appendChild(productListElement);
}

// Fonction init qui implemente les différentes card sur la page web
init();