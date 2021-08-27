const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");
const productPanel = document.querySelector(".product-panel");

const productPanelCloseIcon = productPanel.querySelector(".x-sign");
const cart = document.querySelector(".cart");
const cart_purchaseButton = cart.querySelector(".purchase");
const totalItems = cart.querySelector(".total-items");
const totalPrice = cart.querySelector(".total-price");

const purchasePanel = document.querySelector(".purchase-panel");
const purchaseList = purchasePanel.querySelector(".list");
const total = purchasePanel.querySelector(".total") ;
const totalBill = total.querySelector("span");
const purchase_button = purchasePanel.querySelector(".purchase-button");
const x_icon = purchasePanel.querySelector(".x-sign");


const products = [
  {id:1 , poster: 'Pizza.png' , description: 'Cappellos Keto Certified pizzas' , fullDescription:'The frozen food innovation that uses only simple, real-food ingredients has reimagined pizza to create an option that fits within daily macros.' , price:19},

  {id:2 , poster: 'Cinnamon-Toast-Crunch.jpeg' , description: 'Cinnamon Toast Crunch and Golden Grahams Protein Bars' ,fullDescription: 'General Mills Convenience has introduced new protein bars featuring cereal flavors Cinnamon Toast Crunch and Golden Grahams.' , price: 9},


  {id:3 , poster: 'ChocDunkaroos.jpeg' , description: 'Chocolate Dunkaroos' ,fullDescription:'General Mills Convenience has announced that Dunkaroos, the beloved cookie and icing combo from the ‘90s, is now available in chocolate.' , price: 14},


  {id:4 , poster: 'Pumpkin-Spice.jpg' , description: 'Pumpkin Spice and Pumpkin Spice Peanut Butter bars' ,fullDescription:'Pumpkin Spice before Labor Day? RXBAR is here for it with early return of fan-favorite LTOs.' , price: 11},


  {id:5 , poster: 'garlic.jpeg' , description: 'Pillsbury Garlic Cheddar Biscuits for foodservice' ,fullDescription:'Just in time for National Biscuit Month (September 2021), General Mills Foodservice has introduced a new, garlic cheddar biscuit from Pillsbury.' , price: 8},


  {id:6 , poster: 'Cookies.png' , description: 'Chewy CHIPS AHOY! Fudge Filled Cookies' ,fullDescription:'CHIPS AHOY! teams up with HERSHEY\'S to release a new limited time only offering that brings two classic brands together.' , price: 4},


  {id:7 , poster: 'bread.png' , description: 'ROYO Bread Co. low-calorie artisan bread' ,fullDescription:'OYO will unveil a new low-calorie artisan bread offering (30 calories, 1g net carbs), with low-carb bagels and challah slated to launch in' , price: 9}
] ;

// creating product elements 

products.forEach(product => {
  const newProduct = document.createElement("div");
  newProduct.classList.add("item");
  const image = document.createElement("img");
  image .src = `./posters/${product['poster']}`;
  newProduct.appendChild(image) ;
 

  const newDescription = document.createElement("div");
  newDescription.classList.add("description");
  newDescription.textContent = product['description'];
  newProduct.appendChild(newDescription);

  const newFooter = document.createElement("div");
  newFooter.classList.add("item-footer");
  
  const newPrice = document.createElement("div");
  newPrice.classList.add("price");
  newPrice.textContent = product["price"] + '$';
  newFooter.appendChild(newPrice);

  const btns = document.createElement("div");
  btns.classList.add("add-remove-btns");

  const removeBtn = document.createElement("div");
  removeBtn.classList.add("remove-button");
  const removeImage = document.createElement("img");
  removeImage.src = './posters/minus.png' ;
  removeBtn.appendChild(removeImage);
  btns.appendChild(removeBtn) ;

  const quantity = document.createElement("div");
  quantity.classList.add("quantity");
  quantity.textContent = '0' ;
  btns.appendChild(quantity);


  const addBtn = document.createElement("div");
  addBtn.classList.add("add-button");
  const addImage = document.createElement("img");
  addImage.src = './posters/plus.png' ;
  addBtn.appendChild(addImage);
  btns.appendChild(addBtn) ;

  newFooter.appendChild(btns);
  newProduct.appendChild(newFooter);
  menu.appendChild(newProduct);
  addClickToItem(newProduct);
  addQuantifiers(newProduct);

})


function addClickToItem(item){
  
    let name = item.querySelector(".description");
    name.addEventListener('click' , function(e){

    let productIndex = products.indexOf(products.find(product => product.description == name.textContent));
   
  
    let img = document.createElement("img");
    img.classList.add("image-panel");
    img.src = item.querySelector("img").src ;
    let previousImage = productPanel.querySelector(".image-panel");
    productPanel.removeChild(previousImage);
    productPanel.appendChild(img);

    let desc = document.createElement("div");
    desc.classList.add("full-description");
    desc.textContent = products[productIndex]['fullDescription'];
    let previousfullDescription = productPanel.querySelector(".full-description");
    productPanel.removeChild(previousfullDescription);
    productPanel.appendChild(desc);

    let newPrice = document.createElement("div");
    newPrice.classList.add("price-panel");
    newPrice.textContent = products[productIndex]['price'] + '$';
    let previousPrice = productPanel.querySelector(".price-panel");
    productPanel.removeChild(previousPrice);
    productPanel.appendChild(newPrice);

 
   productPanel.style.display = 'flex' ;
   menu.style.opacity = '.5';


  })

}

productPanelCloseIcon.addEventListener("click" , (e) => {
  productPanel.style.display = 'none';
  menu.style.opacity = '1';
});


function addQuantifiers(item){
  let addBtn = item.querySelector(".add-button");
   
  addBtn.addEventListener("click" , (e) => {
    let quantity = addBtn.parentElement.querySelector(".quantity") ;
   
   let currentQuantity = quantity.textContent ;
   let newQuantity = parseInt(currentQuantity) + 1;
   quantity.textContent = newQuantity ;
   addToCart(item);
 
  })

  let removeBtn = item.querySelector(".remove-button");
   removeBtn.addEventListener("click" , (e) => {
    let quantity = removeBtn.parentElement.querySelector(".quantity") ;
   
   let currentQuantity = quantity.textContent ;
   if(parseInt(currentQuantity) > 0){
    let newQuantity = parseInt(currentQuantity) - 1;
    quantity.textContent = newQuantity ;
    removeFromCart(item);
   }
   else{
     return ;
   }
  
 
  })

}


let cart_items = [];
function addToCart(item){
  let name = item.querySelector(".description");
  let productIndex = products.indexOf(products.find(product => product.description == name.textContent));

  cart_items.push({...products[productIndex]});
  let numberOfItems = cart_items.length ;
  totalItems.textContent = 'items : ' + numberOfItems ;
  let total = cart_items.reduce((acc , curr) => acc + curr.price,0);
  totalPrice.textContent = total + '$';


}

function removeFromCart(item){
  let name = item.querySelector(".description");
  let productIndex = products.indexOf(products.find(product => product.description == name.textContent));
  cart_items.splice(cart_items.indexOf(products[productIndex]));
  let numberOfItems = cart_items.length ;
  totalItems.textContent = 'items : ' + numberOfItems ;
  let total = cart_items.reduce((acc , curr) => acc + curr.price ,0);
  totalPrice.textContent = total + '$';


}
 
 
function toPurchasePanel(){
  cart_items.forEach(item => {
    let name = item.description;
    let productIndex = products.indexOf(products.find(product => product.description == name));
    const newCartItem = document.createElement("li");
    newCartItem.textContent = name  ;
    let price = document.createElement("span");
  
   price.textContent = products[productIndex]['price'] + '$';
 
   newCartItem.appendChild(price);
 
   purchaseList.appendChild(newCartItem);
   let total = cart_items.reduce((acc , curr) => acc + curr.price,0);
   totalBill.textContent =  total + '$';

  })
}


cart_purchaseButton.addEventListener("click" , (e) => {
  toPurchasePanel();
  purchasePanel.style.display = 'flex';
  menu.style.opacity = '.5';
})

x_icon.addEventListener("click" , function(e){
  purchasePanel.style.display = 'none';
  menu.style.opacity = '1';
})


// adding functionalities to the purchase button 

purchase_button.addEventListener("click" , (e) => {
  purchasePanel.removeChild(purchasePanel.querySelector(".items-list"));
  purchasePanel.removeChild(total);
  purchasePanel.removeChild(purchase_button);
  const purchase_message = document.createElement("p");
  purchase_message.style.textAlign = "center" ;
  purchase_message.textContent = "You have purchesed the items successfully.";
 purchasePanel.appendChild(purchase_message);

 
})