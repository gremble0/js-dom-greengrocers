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

function addToCart(item) {
  console.log(item);
}

function createItemElement(item) {
  const element = document.createElement("div");

  const elementName = document.createElement("p");
  elementName.innerHTML = item.name;
  element.appendChild(elementName);

  const elementPrice = document.createElement("p");
  elementPrice.innerHTML = item.price;
  element.appendChild(elementPrice);

  const elementButton = document.createElement("button");
  elementButton.innerHTML = "Add to cart";
  element.appendChild(elementButton);

  elementButton.addEventListener("click", (_) => addToCart(item));

  return element;
}

const storeItemList = document.querySelector(".store--item-list");

state.items.forEach((item) => {
  storeItemList.appendChild(createItemElement(item));
});

