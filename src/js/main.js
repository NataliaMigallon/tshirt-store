"use strict";

let products = [];
let cart = [];

// get data from api
const getApiData = () => {
  fetch("./api/data.json") // go to info
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
  htmlCode += `<button class="js-add-product card__btn" data-id="${product.id}">Añadir a la cesta</button>`;
  htmlCode += `</article>`;
  return htmlCode;
};

const paintProducts = () => {
  let productsCode = "";
  for (const product of products) {
    productsCode += getProductHtmlCode(product);
  }
  productsElement.innerHTML = productsCode;
  listenAddProductsBtn(); // good practice to listen events inside a function to paint
};

//listen products
const listenAddProductsBtn = () => {
  const productsBtns = document.querySelectorAll(".js-add-product");
  for (const productBtn of productsBtns) {
    productBtn.addEventListener("click", addProduct);
    //console.log(productBtn);
  }
};

const addProduct = (ev) => {
  console.log(products, ev.target.dataset.id);
  const clickedID = ev.target.dataset.id;

  let foundProduct;
  for (const product of products) {
    if (product.id === clickedID) {
      foundProduct = product; // save the product inside foundProduct
    }
  }
  //console.log("Bingo", foundProduct);

  cart.push({
    id: foundProduct.id,
    name: foundProduct.name,
    price: foundProduct.price,
    quantity: 1,
  });
  console.log("Cesta", cart);
};

// start app
getApiData();
