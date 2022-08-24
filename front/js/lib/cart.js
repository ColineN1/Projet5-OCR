const cartLocalStorage = localStorage.getItem('cart');
const cartContent = cartLocalStorage ? JSON.parse(cartLocalStorage) : [];

let onCartUpdatedCallback

function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cartContent));
}

async function doCartUpdate() {
    if (typeof onCartUpdatedCallback !== 'function') return;
    const cart = await getCart();
    onCartUpdatedCallback(cart);
}

/**
 * Fonctions exportées
 */
function onCartUpdated(callback) {
    onCartUpdatedCallback = callback
}

// ------------- Récuperer les infos nom/photo dans l'API pour les éléments du panier -------------------------
// Fonction qui retourne l'état du panier
async function getCart() {
    const cartContentVerbose = [];

    for (const index in cartContent) {
        const cartItem = cartContent[index]
        const response = await fetch("http://localhost:3000/api/products/"+cartItem.id);
        const product = await response.json();
        const { name, price, imageUrl } = product
        cartContentVerbose.push({ ...cartItem, name, price, imageUrl })
    }

    return {
        items: cartContentVerbose,
        totalPrice: 0, // Utiliser la fonction Array.reduce :-)
        totalQuantity: 0 // Utiliser la fonction Array.reduce :-)
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    }
}

// --------------------------------------------- AJOUTER UN ELEMENT ---------------------------------------------
function addToCart(choosen_product) {
    // Vérifie que les éléments du panier possède une valeur correcte
    if (!choosen_product.color) {
        alert("Selectionnez une couleur!");
        return false;
    };

    if (Number(choosen_product.quantity) <= 0) {
        alert("Selectionnez une quantité!");
        return false;
    };

    const index = cartContent.findIndex((cartItem) => {
        // Condition de recherche pour indiquer si oui ou non c'est bien le produit recherché
        return cartItem.id === choosen_product.id && cartItem.color === choosen_product.color;
    })

    // Si product found => alors juste mettre à jour la quantité du produit par la nouvelle quantité
    // Si product not found => alors ajouter le produit dans le tableau
    index < 0 ? cartContent.push(choosen_product) : cartContent[index].quantity = choosen_product.quantity;

    updateLocalStorage(); // update localstorage when everything is ok !
    doCartUpdate();

    return true;
}

// --------------------------------------------- SUPPRIMER UN ELEMENT ---------------------------------------------
function removeFromCart(productDataId, productDataColor) {
    // Step 1. Trouver l'indice du produit dans cart à partir de product_id + color
    // Step 2. Si on l'a trouvé, le supprimer du tableau .splice()
    // Step 3. Mettre à jour le localstorage
    // Step 4. Retourner true ou false si cela a bien fonctionné

    const index = cartContent.findIndex((cartItem) => {
        // Condition de recherche pour indiquer si oui ou non c'est bien le produit recherché
        return cartItem.id === productDataId && cartItem.color === productDataColor;
    })
    console.log(index);
    if (index < 0 ) {
         console.log("pas d'élément à supprimer")} 
         else {cartContent.splice(index, 1); alert("Elément supprimé du panier")};
    console.log(cartContent);
    updateLocalStorage(); // update localstorage when everything is ok !
    doCartUpdate();
    return true;
    };

// --------------------------------------------- MODIFIER LA QUANTITE ---------------------------------------------
function updateCartItemQuantity(productDataId, productDataColor, productQuantityChange) {
    // Step 1. Trouver l'indice du produit dans cart à partir de product_id + color
    // Step 2. Si on l'a trouvé, mettre à jour la quantité
    // Step 3. Mettre à jour le localstorage
    // Step 4. Retourner true ou false si cela a bien fonctionné
    const index = cartContent.findIndex((cartItem) => {
        // Condition de recherche pour indiquer si oui ou non c'est bien le produit recherché
        return cartItem.id === productDataId && cartItem.color === productDataColor;
    })
    console.log(index);
    if (index < 0 ) {console.log("pas d'élément à modifier")} 
    else {cartContent[index].quantity = productQuantityChange; alert("Quantité modifiée")};
   console.log(cartContent);
    updateLocalStorage(); // update localstorage when everything is ok !
    doCartUpdate();
}

export { addToCart, updateCartItemQuantity, removeFromCart, getCart, onCartUpdated }