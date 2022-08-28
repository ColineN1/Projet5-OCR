const id = new URL(window.location.href).searchParams.get("id");

document.querySelector("#orderId").textContent = id;

//localStorage.removeItem("cart");