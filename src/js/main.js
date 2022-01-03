"use strict";

let products = [];

// get data from api
const getApiData = () => {
  fetch("//beta.adalab.es/ejercicios-extra/api/eshop/v2/cart.json") // go to info
    .then((response) => response.json()) // process info
    .then((data) => {
      products = data.cart.items; // extract only necessary info and save
      paintProducts(); // paint info
      //console.log(products);
    });
};

//paint products

const productsElement = document.querySelector(".js-products");

const getProductHtmlCode = (product) => {
  let htmlCode = "";
  htmlCode += `<article class=card>`;
  htmlCode += `<img src="${product.imageUrl}" class=card__img" alt="Producto: ${product.name}">`;
  htmlCode += `<h3 class="card__title">${product.name}</h3>`;
  htmlCode += `<p class="card__description">${product.price}</p>`;
  htmlCode += `<button class="js-add-product card__btn">Añadir a la cesta</button>`;
  htmlCode += `</article>`;
  return htmlCode;
};

const paintProducts = () => {
  let productsCode = "";
  for (const product of products) {
    productsCode += getProductHtmlCode(product);
  }
  productsElement.innerHTML = productsCode;
  listenAddProductsBtn(); // buena práctica el escuchar eventos dentro de una función para pintar
};

//listen products
const listenAddProductsBtn = () => {
  const productsBtns = document.querySelectorAll(".js-add-product");
  for (const productBtn of productsBtns) {
    productBtn.addEventListener("click", addProduct);
    //console.log(productBtn);
  }
};

const addProduct = () => {
  //console.log("han clickado en un producto");
};

// start app
getApiData();
