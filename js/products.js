var lightbox = document.getElementById("lightbox");
var nameProd = document.getElementById("nameProd");
var descript = document.getElementById("descript");
var price = document.getElementById("price");
var writer = document.getElementById("writer");
var page = document.getElementById("page");
var priceDiv = document.getElementById("price-div");
var nameError = document.getElementById("name-error");
var descriptError = document.getElementById("descript-error");
var priceError = document.getElementById("price-error");
var writerError = document.getElementById("writer-error");
var pageError = document.getElementById("page-error");
var tbody = document.getElementById("tbody");
var saver = document.getElementById("saver");
var username = "";
var userId = "";
var searching = false;
var globalProduct = JSON.parse(localStorage.getItem("products"));
var selectedItemId = 0;
console.log(globalProduct);

var currentUser = JSON.parse(localStorage.getItem("token"));
username = currentUser.username;
userId = currentUser.userId;
document.getElementById("user-text").innerHTML = "İstifadəçi : " + username;

loadProducts(globalProduct);

function saveProduct() {
  var id = 0;
  for (var i = 0; i < globalProduct.length; i++) {
    if (globalProduct[i].id > id) {
      id = globalProduct[i].id;
    }
  }
  id++;

  var userProduct = {
    id: id,
    name: nameProd.value,
    description: descript.value,
    price: price.value,
    writer: writer.value,
    page: page.value,
    userId: userId,
  };
  globalProduct.push(userProduct);
  localStorage.setItem("products", JSON.stringify(globalProduct));
  if (searching == false) {
    loadProducts(globalProduct);
  }
}

function editProduct() {
  for (var i = 0; i < globalProduct.length; i++) {
    if (globalProduct[i].id == selectedItemId) {
      var userId = globalProduct[i].userId;
      globalProduct[i] = {
        id: selectedItemId,
        name: nameProd.value,
        description: descript.value,
        price: price.value,
        writer: writer.value,
        page: page.value,
        userId: userId,
      };
      filter(globalProduct[i], selectedItemId);
      break;
    }
  }
  localStorage.setItem("products", JSON.stringify(globalProduct));
  loadProducts(globalProduct);
}

function loadProducts(products) {
  var productString = "";
  for (var i = 0; i < products.length; i++) {
    var p = products[i];
    if (p.userId == userId) {
      productString +=
        "<tr><td>" +
        p.id +
        "</td><td>" +
        p.name +
        "</td><td>" +
        p.description +
        "</td><td>" +
        p.price +
        " ₼</td><td>" +
        p.writer +
        "</td><td>" +
        p.page +
        "</td><td><button class='btn btn-danger' onclick='deleteProd(" +
        p.id +
        ")'>Sil</button> <button class='btn btn-warning' onclick='onEditProduct(" +
        p.id +
        ")'>Redaktə Et</button></td></tr>";
    }
  }
  tbody.innerHTML = productString;
}

function saverClicked() {
  if (nameProd.classList.item(0) == "form-content-error") {
    return;
  }
  if (descript.classList.item(0) == "form-content-error") {
    return;
  }
  if (priceDiv.classList.item(0) == "price-div-error") {
    return;
  }
  if (writer.classList.item(0) == "form-content-error") {
    return;
  }
  if (page.classList.item(0) == "form-content-error") {
    return;
  }

  if (saver.classList.item(0) == "send-button") {
    saveProduct();
  } else {
    editProduct();
  }
}

function deleteProd(id) {
  var allow = confirm("Eminsen silmeye?");

  if (allow) {
    for (var i = 0; i < globalProduct.length; i++) {
      if (globalProduct[i].id == id) {
        globalProduct.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("products", JSON.stringify(globalProduct));
    loadProducts(globalProduct);
  }
}
function onEditProduct(id) {
  selectedItemId = id;
  var p = [];
  for (var i = 0; i < globalProduct.length; i++) {
    if (globalProduct[i].id == id) {
      p = globalProduct[i];
      break;
    }
  }
  saver.classList.remove("send-button");
  saver.classList.add("edit-button");
  nameProd.value = p.name;
  price.value = p.price;
  descript.value = p.description;
  writer.value = p.writer;
  page.value = p.page;
  nameFocusOut();
  descriptFocusOut();
  priceFocusOut();
  writerFocusOut();
  pageFocusOut();
  lightbox.style.display = "block";
}

function onHomeButton() {
  window.location.href = "home.html";
}

function onNewProduct() {
  saver.classList.add("send-button");
  saver.classList.remove("edit-button");
  nameProd.value = "";
  price.value = "";
  descript.value = "";
  writer.value = "";
  page.value = "";
  nameFocusOut();
  descriptFocusOut();
  priceFocusOut();
  writerFocusOut();
  pageFocusOut();
  lightbox.style.display = "block";
}

function closeProduct() {
  lightbox.style.display = "none";
}

function nameFocusOut() {
  var x = nameProd.value;
  try {
    if (x == "") throw "Kitab adını boş qoymaq olmaz";
    if (x.length < 2) throw "Kitabın adı minimum 2 simvol olmalıdır.";
    if (x.length > 30) throw "Kitabın adı maksimum 30 simvol olmalıdır.";
    nameProd.classList.remove("form-content-error");
    nameProd.classList.add("form-content");
    nameError.innerHTML = "";
  } catch (err) {
    nameProd.classList.remove("form-content");
    nameProd.classList.add("form-content-error");
    nameError.innerHTML = err;
  }
}

function descriptFocusOut() {
  var x = descript.value;
  try {
    if (x.length > 300) throw "Kitabın təsviri maksimum 300 simvol olmalıdır.";
    descript.classList.remove("form-content-error");
    descript.classList.add("form-content");
    descriptError.innerHTML = "";
  } catch (err) {
    descript.classList.remove("form-content");
    descript.classList.add("form-content-error");
    descriptError.innerHTML = err;
  }
}

function priceFocusOut() {
  var x = price.value;
  try {
    if (x == "") throw "Kitab qiymətini boş qoymaq olmaz";
    if (x < 0) throw "Kitabın qiyməti minimum 0 AZN olmalıdır.";
    if (x > 1000) throw "Kitabın qiyməti maksimum 1000 AZN olmalıdır.";
    priceDiv.classList.remove("price-div-error");
    priceDiv.classList.add("price-div");
    priceError.innerHTML = "";
  } catch (err) {
    priceDiv.classList.remove("price-div");
    priceDiv.classList.add("price-div-error");
    priceError.innerHTML = err;
  }
}

function writerFocusOut() {
  var x = writer.value;
  try {
    if (x.length > 30) throw "Maksimum 30 simvol olmalıdır.";
    writer.classList.remove("form-content-error");
    writer.classList.add("form-content");
    writerError.innerHTML = "";
  } catch (err) {
    writer.classList.remove("form-content");
    writer.classList.add("form-content-error");
    writerError.innerHTML = err;
  }
}

function pageFocusOut() {
  var x = page.value;
  try {
    if (x < 0) throw "Minimum 0 olmalıdır.";
    if (x > 1000) throw "Maksimum 1000 olmalıdır.";
    page.classList.remove("form-content-error");
    page.classList.add("form-content");
    pageError.innerHTML = "";
  } catch (err) {
    page.classList.remove("form-content");
    page.classList.add("form-content-error");
    pageError.innerHTML = err;
  }
}

function onSearch(searchContent) {
  searching = true;
  var filteredProducts = [];
  if (searchContent == "") {
    loadProducts(globalProduct);
    searching = false;
    return;
  }
  for (var i = 0; i < globalProduct.length; i++) {
    var p = globalProduct[i];
    if (p.userId == userId) {
      var content =
        p.id +
        " " +
        p.name +
        " " +
        p.description +
        " " +
        p.price +
        " " +
        p.writer +
        " " +
        p.page;
      if (content.includes(searchContent)) {
        filteredProducts.push(p);
      }
    }
  }
  loadProducts(filteredProducts);
}

function filter(changedProduct, itemId) {
  var orderGlobal = [];
  var orderGlobalString = localStorage.getItem("orders");
  if (orderGlobalString == null) {
  } else {
    orderGlobal = JSON.parse(orderGlobalString);
    for (var a = 0; a < orderGlobal.length; a++) {
      var o = orderGlobal[a];
      id = a;
      for (var i = 0; i < o.basketProducts.length; i++) {
        var b = o.basketProducts[i];
        if (b.product.id == itemId) {
          orderGlobal[id].basketProducts[i].product = changedProduct;
        } else {
        }
      }
    }
    localStorage.setItem("orders", JSON.stringify(orderGlobal));
  }
}
