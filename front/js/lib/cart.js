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
function removeFromCart() {
    var boutonDelete = document.querySelectorAll(".deleteItem");
    for (var k = 0; k < boutonDelete.length; k++) {
        boutonDelete[k].addEventListener("click", (event) => {
            event.preventDefault();
            cart.splice(k, 1);
            localStorage.setItem('cart',JSON.stringify(cart));
            
            //localStorage.removeItem(cart[k]);
                alert('Produit supprimé');
            location.reload();
        })
    }
}



// --------------------------------------------- MODIFIER LA QUANTITE ---------------------------------------------
function updateCartItemQuantity() {
    var qttModif = document.querySelectorAll(".itemQuantity");
    for (var k = 0; k < qttModif.length; k++) {
        console.log(cart[k].quantity);
        console.log(qttModif[k]);
        qttModif[k].addEventListener("change", (event) => {
            event.preventDefault();
            //Selection de l'element à modifier en fonction de son id ET sa couleur
            var newQttModif = qttModif[k].valueAsNumber;
            cart[k].quantity = newQttModif;
            // MAJ localstorage
            cart.push(cart[k]);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Quantité modifiée');
            location.reload();
        })
    }
}



// ------------- Récuperer les infos nom/photo dans l'API pour les éléments du panier -------------------------
    // boucler sur le panier
    // par item panier, faire une requête pour récupérer l'information d'un produit
    // mettre à jour les informations avec celles manquantes (picture, price, etc...) puis le retourner
    // Fonction qui importe les éléments de l'API

async function getCartItems() { 
    var productsAPI;
    const http_response = await fetch("http://localhost:3000/api/products")
    productsAPI = await http_response.json()
    for (let indexCart of cart) {
        for (let indexAPI of productsAPI) {
            if (indexCart.id === indexAPI._id) {
                indexCart.name = indexAPI.name;
                indexCart.imageUrl = indexAPI.imageUrl;
                indexCart.price = indexAPI.price;
            }
        }
    }
}

export { addToCart, updateCartItemQuantity, removeFromCart, getCartItems , cart as "cart"}