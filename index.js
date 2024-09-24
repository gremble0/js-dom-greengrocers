const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
    },
  ],
  cart: [],
};

function createItemDescriptionElement(item) {
  const element = document.createElement("div");

  const elementName = document.createElement("p");
  elementName.innerHTML = item.name;
  element.appendChild(elementName);

  const elementPrice = document.createElement("p");
  elementPrice.innerHTML = item.price;
  element.appendChild(elementPrice);

  return element;
}

function createCartElement(item) {
  const element = createItemDescriptionElement(item);

  return element;
}

function createButton(label, onClick) {
  const button = document.createElement("button");
  button.innerHTML = label;
  button.addEventListener("click", onClick);
  return button;
}

function createItemElement(item) {
  const element = createItemDescriptionElement(item);
  element.appendChild(createButton("Add to cart", (_) => addToCart(item)));

  return element;
}

function addToTotal(price) {
  const totalElement = document.querySelector(".total-number");
  const totalPrice = parseFloat(totalElement.innerHTML.slice(1));
  console.log(totalPrice);
  totalElement.innerHTML = "£" + (totalPrice + price);
}

function removeFromCart(item) {
  const elementCount = document.querySelector(
    ".cart--item-" + item.name + "-count",
  );
  const itemCount = parseInt(elementCount.innerHTML.slice(1));
  if (itemCount === 1)
    document.querySelector(".cart--item-" + item.name).remove();
  else elementCount.innerHTML = "x" + (itemCount - 1);

  addToTotal(-item.price);
}

function addNewItemToCart(item) {
  const element = createCartElement(item);
  element.setAttribute("class", "cart--item-" + item.name);

  const elementCount = document.createElement("p");
  elementCount.setAttribute("class", "cart--item-" + item.name + "-count");
  elementCount.innerHTML = "x1";
  element.appendChild(elementCount);

  element.appendChild(
    createButton("Remove from cart", (_) => removeFromCart(item)),
  );

  document.querySelector(".cart--item-list").appendChild(element);
}

function addToCart(item) {
  const existing = document.querySelector(".cart--item-" + item.name);
  if (existing === null) addNewItemToCart(item);
  else {
    const elementCount = document.querySelector(
      ".cart--item-" + item.name + "-count",
    );
    elementCount.innerHTML =
      "x" + (parseInt(elementCount.innerHTML.slice(1)) + 1);
  }

  addToTotal(item.price);
}

const storeItemList = document.querySelector(".store--item-list");

state.items.forEach((item) => {
  storeItemList.appendChild(createItemElement(item));
});
