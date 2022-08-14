// Permet de créer un template pour un produit contenu dans le Local Storage
const template = document.querySelector('#cartTemplate');
//const cart = localStorage.getItem('cart');
const cart = [{id: "107fb5b75607497b96722bda5b504926", quantity: 2, color: "White"},{id: "055743915a544fde83cfdfc904935ee7", quantity: 1, color: "Green"},{id: "055743915a544fde83cfdfc904935ee7", quantity: 1, color: "Orange"}];
    console.log(cart);

// Fonction qui importe les éléments de l'API
async function getProductsFromApi() {
    const http_response = await fetch("http://localhost:3000/api/products")
    return http_response.json()
  }
  
  // Fonction init qui permet d'utiliser la fonction displayProductCart pour tous les produits stockés dans l'API
  async function init() {
    const products = await getProductsFromApi();
    displayProductCart();
    totalProductsCart();
    deleteProduct ();
    modifyQttProduct ();
  }

  
// --------------------------------------------- AFFICHER LE PANIER ---------------------------------------------
function displayProductCart() {
    if (cart === null) {
        const newDivEmptyCart = document.createElement('p');
        newDivEmptyCart.textContent = 'Votre panier est vide';
        document.querySelector("#cart__items").appendChild(newDivEmptyCart);
    } else {
        cart.forEach(product => buildDisplayProductCart(product))
    }
};

function buildDisplayProductCart(product) {
// On choisit l'endroit où nous souhaitons voir le template affiché dans le code html
const items = document.querySelector("#cart__items");
//On clone le template
const productListElement = document.importNode(template.content, true);
// On va chercher chaque élément du templates 
const productImg = productListElement.querySelector('.cart__item__img__src');
const productDescH2 = productListElement.querySelector('.cart__item__content__description__h2');
const productDescColor = productListElement.querySelector('.cart__item__content__description__color');
const productDescPrice = productListElement.querySelector('.cart__item__content__description__price');
const productQuantity = productListElement.querySelector('.itemQuantity');
// On injecte l'information de l'API
productImg.src = product.imageUrl;
productDescH2.h2 = product.name;
productDescColor.textContent = product.color;
productDescPrice.textContent = product.price;
productQuantity. value = product.quantity;
// On affiche la card créée 
items.appendChild(productListElement);
};

function totalProductsCart(){
    var finalQuantity = 0;
    var finalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
        finalQuantity += Number(cart[i].quantity);
      };
    for (var i = 0; i < cart.length; i++) {
        finalPrice += Number(cart[i].price);
      };
    console.log(finalQuantity);
    console.log(finalPrice);
    const totalQuantity = document.querySelector('#totalQuantity');
    const totalPrice = document.querySelector('#totalPrice');
    totalQuantity.textContent = finalQuantity;
    totalPrice.textContent = finalPrice;
}
// --------------------------------------------- MODIFIER LA QUANTITE ---------------------------------------------
function modifyQttProduct (){
    var qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityCart = cart[k].quantity;
            
        })
    }

};


// --------------------------------------------- SUPPRIMER UN ELEMENT ---------------------------------------------
function deleteProduct (){
    const boutonSupprimer = document.querySelectorAll(".deleteItem");

    for (var j = 0; j < btn_supprimer.length; j++){
        boutonSupprimer[j].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            var idDelete = cart[j].id;
            var colorDelete = cart[j].color;

            // A modifier en fonction de produit : cartItemFound = cart.find( el => el.id !== idDelete || el.color !== colorDelete );
            localStorage.setItem('cart', cart); // update localstorage when everything is ok !
            console.log(cart);
            alert('Produit supprimé');
        })
    }
};

// --------------------------------------------- FORMULAIRE ---------------------------------------------


// Fonction init qui implemente les différents produit du cart sur la page web
init();