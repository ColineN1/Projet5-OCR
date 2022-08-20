const cartLocalStorage = localStorage.getItem('cart');
const cart = cartLocalStorage ? JSON.parse(cartLocalStorage) : [];

// --------------------------------------------- AJOUTER UN ELEMENT ---------------------------------------------
function addToCart(choosen_product) {
// Vérifie que les éléments du panier possède une valeur correcte
if (!choosen_product.color) {
    alert("Selectionnez une couleur!");
    return;
  };

  if (Number(choosen_product.quantity) <= 0) {
    alert("Selectionnez une quantité!");
    return;
  };

  const index = cart.findIndex((cartItem) => {
    // Condition de recherche pour indiquer si oui ou non c'est bien le produit recherché
    return cartItem.id === choosen_product.id && cartItem.color === choosen_product.color;
  })

  // Si product found => alors juste mettre à jour la quantité du produit par la nouvelle quantité
  // Si product not found => alors ajouter le produit dans le tableau
  index < 0 ? cart.push(choosen_product) : cart[index].quantity = choosen_product.quantity;
  
  localStorage.setItem('cart', JSON.stringify(cart)); // update localstorage when everything is ok !
  alert('Produit bien ajouté au panier');
}

// --------------------------------------------- SUPPRIMER UN ELEMENT ---------------------------------------------
const boutonSupprimer = document.querySelectorAll(".deleteItem");

function removeFromCart(id, color)  {

};
    


// --------------------------------------------- MODIFIER LA QUANTITE ---------------------------------------------
function updateCartItemQuantity(id, quantity){
    var qttModif = document.querySelectorAll(".itemQuantity");

    for (var k = 0; k < qttModif.length; k++) {
        qttModif[k].addEventListener("change", (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            var quantityCart = cart[k].quantity;

            // Quantité à modifier = en fonction de cartItemFound (product.js)

            localStorage.setItem('cart', cart); // MAJ localstorage
            console.log(cart);
            alert('Quantité modifiée');
        })
    }

};

// ------------- Récuperer les infos nom/photo dans l'API pour les éléments du panier -------------------------
    // boucler sur le panier
    // par item panier, faire une requête pour récupérer l'information d'un produit
    // mettre à jour les informations avec celles manquantes (picture, price, etc...) puis le retourner
    // Fonction qui importe les éléments de l'API

async function getCartItems() { 
    var productsAPI;
    const http_response = await fetch("http://localhost:3000/api/products")
    productsAPI = await http_response.json()
    console.log(productsAPI);
    for (let indexCart of cart) {
        for (let indexAPI of productsAPI) {
            if (indexCart.id === indexAPI._id) {
                indexCart.name = indexAPI.name;
                indexCart.imageUrl = indexAPI.imageUrl;
                indexCart.price = indexAPI.price;
            }
        }
    }
    console.log(cart);
}

export { addToCart, updateCartItemQuantity, removeFromCart, getCartItems , cart as "cart"}