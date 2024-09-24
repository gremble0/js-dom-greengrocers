const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "003-apple",
      name: "apple",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "004-apricot",
      name: "apricot",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "005-avocado",
      name: "avocado",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "006-bananas",
      name: "bananas",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      type: "vegetable",
      price: 0.35,
    },
    {
      id: "008-berry",
      name: "berry",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      type: "fruit",
      price: 0.35,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      type: "vegetable",
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

function createCheckbox(label, className, name, value) {
  const wrapperElement = document.createElement("div");

  const checkboxElement = document.createElement("input");
  checkboxElement.setAttribute("type", "checkbox");
  checkboxElement.setAttribute("id", className);
  checkboxElement.setAttribute("value", value);
  checkboxElement.setAttribute("name", name);
  wrapperElement.appendChild(checkboxElement);

  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", className);
  labelElement.innerHTML = label;
  wrapperElement.appendChild(labelElement);

  return wrapperElement;
}

function createItemElement(item) {
  const element = createItemDescriptionElement(item);
  element.appendChild(createButton("Add to cart", (_) => addToCart(item)));

  return element;
}

function createFilterElement() {
  const form = document.createElement("form");

  const vegetableCheckBox = createCheckbox(
    "vegetables",
    "filter-by-vegetables",
    "filterByVegetables",
    true,
  );
  form.appendChild(vegetableCheckBox);

  const fruitCheckbox = createCheckbox(
    "fruits",
    "filter-by-fruits",
    "filterByFruits",
    true,
  );
  form.appendChild(fruitCheckbox);

  const submitButton = createButton("filter by", null);
  submitButton.setAttribute("type", "submit");
  form.appendChild(submitButton);

  return form;
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

const pathParams = location.search.substring(1);
if (pathParams.length > 0) {
  if (pathParams.includes("filterByFruits"))
    state.items
      .filter((item) => item.type == "fruit")
      .forEach((item) => storeItemList.appendChild(createItemElement(item)));

  if (pathParams.includes("filterByVegetables"))
    state.items
      .filter((item) => item.type == "vegetable")
      .forEach((item) => storeItemList.appendChild(createItemElement(item)));
} else
  state.items.forEach((item) =>
    storeItemList.appendChild(createItemElement(item)),
  );

storeItemList.appendChild(createFilterElement());
