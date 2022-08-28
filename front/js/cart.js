import { removeFromCart, updateCartItemQuantity, getCart, onCartUpdated } from "./lib/cart.js";

// Permet de créer un template pour un produit contenu dans le Local Storage
const template = document.querySelector('#cartTemplate');
let cart;

// Fonction init qui permet d'utiliser la fonction displayProductCart pour tous les produits stockés dans l'API
async function init() {
    cart = await getCart();
    displayProductCart();
    totalProductsCart();
    checkForm();
    onCartUpdated(cart => {
        console.log('ON CART UPDATED', cart);
        cart = cart
        // TODO : Update totaux
        totalProductsCart();
    });
};

// --------------------------------------------- AFFICHER LE PANIER ---------------------------------------------
async function displayProductCart() {
    if (cart.items.length === 0) {
        const newDivEmptyCart = document.createElement('p');
        newDivEmptyCart.textContent = 'Votre panier est vide';
        document.querySelector("#cart__items").appendChild(newDivEmptyCart);
    } else {
        cart.items.forEach(product => buildDisplayProductCart(product));
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
    const productDataInfos = productListElement.querySelector('.cart__item');
    const deleteItem = productListElement.querySelector('.deleteItem');
    
    // On injecte l'information de l'API
    productImg.src = product.imageUrl;
    productDescH2.textContent = product.name;
    productDescColor.textContent = product.color;
    productDescPrice.textContent = product.price + "€";
    productQuantity.value = product.quantity;
    productDataInfos.setAttribute("data-id", product.id);
    productDataInfos.setAttribute("data-color", product.color);
    // On affiche la card créée 
    items.appendChild(productListElement);


    // Changer la quantité du produit: Bind sur l'input change de la quantité
    productQuantity.addEventListener("change", function handleClick(event) {
        let productQuantityChange = event.target.value;
        let productDataId = event.target.closest('.cart__item').getAttribute('data-id');
        let productDataColor = event.target.closest('.cart__item').getAttribute('data-color');
        updateCartItemQuantity(productDataId, productDataColor, productQuantityChange);
    });


    // Supprimer du panier : Bind sur le click du lien supprimer
    deleteItem.addEventListener("click", function handleClick(event) {
        console.log(event.target.closest('.cart__item'));
        let productDataId = event.target.closest('.cart__item').getAttribute('data-id');
        let productDataColor = event.target.closest('.cart__item').getAttribute('data-color');
        let elementToRemove = event.target.closest('.cart__item');
        console.log(elementToRemove);
        elementToRemove.remove();  
        removeFromCart(productDataId, productDataColor);
    });
        
    
}

async function totalProductsCart() {
    const totalQuantity = document.querySelector('#totalQuantity');
    const totalPrice = document.querySelector('#totalPrice');
    totalQuantity.textContent = "" ;
    totalPrice.textContent = "" ;
}


// --------------------------------------------- FORMULAIRE ---------------------------------------------
//Aller chercher les emplacements du formulaire//
const firstNameFormLocation = document.querySelector('#firstName');
const lastNameFormLocation = document.querySelector('#lastName');
const addressFormLocation = document.querySelector('#address');
const cityFormLocation = document.querySelector('#city');
const emailFormLocation = document.querySelector('#email');
const orderButton = document.querySelector('#order');

//RegEx pour valider contenu du formulaire//
function namesCheck(names) {
    return /^[aa-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]*$/.test(names);
}
function addressCheck(address) {
    return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-0-9 ]*$/.test(address);
}
function emailCheck(email) {
    return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email);
}

function checkForm() {
    //Vérifier le contenu de l'élément firstName
    firstNameFormLocation.addEventListener("change", () => {
        const errorFirstName = document.querySelector('#firstNameErrorMsg');
        if (!namesCheck(firstNameFormLocation.value)) {
            errorFirstName.textContent = "Veuillez entrer un prénom valide (lettres en minuscule ou majuscule uniquement)";
        } else {
            errorFirstName.textContent = "";
        }}
    )
    //Vérifier le contenu de l'élément lastName//
    lastNameFormLocation.addEventListener("change", () => {
        const errorLastName = document.querySelector('#lastNameErrorMsg');
        if (!namesCheck(lastNameFormLocation.value)) {
            errorLastName.textContent = "Veuillez entrer un nom valide (lettres en minuscule ou majuscule uniquement)";
        } else {
            errorLastName.textContent = "";
        }
    })
    //Vérifier le contenu de l'élément address//
    addressFormLocation.addEventListener("change", () => {
        const errorAddress = document.querySelector('#addressErrorMsg');
        if (!addressCheck(addressFormLocation.value)) {
            errorAddress.textContent = "Veuillez entrer une addresse postale valide";
        } else {
            errorAddress.textContent = "";
        }
    })
    //Vérifier le contenu de l'élément city//
    cityFormLocation.addEventListener("change", () => {
        const errorCity = document.querySelector('#cityErrorMsg');
        if (!namesCheck(cityFormLocation.value)) {
            errorCity.textContent = "Veuillez entrer un nom de ville valide";
        } else {
            errorCity.textContent = "";
        }
    })
    //Vérifier le contenu de l'élément email//
    emailFormLocation.addEventListener("change", () => {
        const errorEmail = document.querySelector('#emailErrorMsg');
        if (!emailCheck(emailFormLocation.value)) {
            errorEmail.textContent = "Veuillez entrer une adresse email valide";
        } else {
            errorEmail.textContent = "";
        }
    })
    //Vérification du formulaire au click sur le bouton submit//
    orderButton.addEventListener('click', function (event) {
        event.preventDefault();
        //Vérifier les inputs//
            if (cart === null ) {
            alert("Votre panier est vide. Veuillez remplir votre panier si vous souhaitez passer commande.");
         } else if ( (namesCheck(firstNameFormLocation.value) && namesCheck(lastNameFormLocation.value) && addressCheck(addressFormLocation.value) && namesCheck(cityFormLocation.value), emailCheck(emailFormLocation.value)) === false ) {
            alert("Attention, il semblerait que tous les champs n'aient pas été correctement remplis.");
         } else {
           inputOrder();
           console.log("commande ok");
         }
    });
}

//Récupération et envoie des information de la commande
async function inputOrder() {
    //Récupération des coordonnées du formulaire client
    let inputName = document.querySelector('#firstName');
    let inputLastName = document.querySelector('#lastName');
    let inputAdress = document.querySelector('#address');
    let inputCity = document.querySelector('#city');
    let inputMail = document.querySelector('#email');

    //Construction du recapitulatif commande
    const order = {
        contact : {
            firstName: inputName.value,
            lastName: inputLastName.value,
            address: inputAdress.value,
            city: inputCity.value,
            email: inputMail.value,
        },
        products: cart,
    } ;
    console.log(order);

    //
    const response= await fetch("http://localhost:3000/api/products/order",{
                            method: "POST",
                            headers: {
                            Accept: "application.json",
                            'Content-Type': "application/json"
                            },
                            body: JSON.stringify(order),
                        })
}


// Fonction init qui implemente les différents produit du cart sur la page web
init();