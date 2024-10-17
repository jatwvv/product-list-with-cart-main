let productList = document.getElementById("productList");
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element, index) => {
      productList.insertAdjacentHTML(
        "beforeend",
        `<div class="card">
            <img src="${element.image.desktop}" alt="waffle" />
            <p>${element.category}</p>
            <h5>${element.name}</h5>
            <div class="price">$${element.price}</div>
            <div class="btnContainer" data-counter="false" data-count="0" onclick="update(this, ${index})">
              <button class="addBtn" type="button">
                <img
                  class="cartimg"
                  src="./assets/images/icon-add-to-cart.svg"
                  alt="..."
                />Add to Cart
              </button>
            </div>
          </div>`
      );
    });
  });

function update(btnContainerElement, index) {
  let isCounter = btnContainerElement.getAttribute("data-counter") === "true";

  if (!isCounter) {
    btnContainerElement.setAttribute("data-counter", "true");
    updateDisplay(btnContainerElement, index);
  }
}

function updateDisplay(btnContainerElement, index) {
  let count = btnContainerElement.getAttribute("data-count");
  btnContainerElement.innerHTML = `
        <button class="plusminusbtn" onclick="decrement(${index})"><img class="plusminus" src="./assets/images/icon-decrement-quantity.svg" alt="minus" /></button>
        <span id="count-${index}">${count}</span>  <!-- تعيين id مميز لكل كارد -->
        <button class="plusminusbtn" onclick="increment(${index})"><img class="plusminus" src="./assets/images/icon-increment-quantity.svg" alt="plus" /></button>
    `;
  btnContainerElement.style.backgroundColor = "hsl(14, 86%, 42%)";
  btnContainerElement.style.color = "#fff";
}

function increment(index) {
  let countElement = document.getElementById(`count-${index}`);
  let currentCount = parseInt(countElement.textContent);
  currentCount++;
  countElement.textContent = currentCount;
  let btnContainerElement = countElement.parentElement;
  btnContainerElement.setAttribute("data-count", currentCount);
}

function decrement(index) {
  let countElement = document.getElementById(`count-${index}`);
  let currentCount = parseInt(countElement.textContent);
  if (currentCount > 0) {
    currentCount--;
    countElement.textContent = currentCount;
    let btnContainerElement = countElement.parentElement;
    btnContainerElement.setAttribute("data-count", currentCount);
    
    // Check if count is zero and revert to original state if true
    if (currentCount === 0) {
      revertToOriginalState(btnContainerElement, index);
    }
    
    // Update cart or perform any other necessary actions
    updateCart(index, currentCount);
  }
}

function revertToOriginalState(btnContainerElement, index) {
  btnContainerElement.setAttribute("data-counter", "false");
  btnContainerElement.innerHTML = `
    <button class="addBtn" type="button">
      <img
        class="cartimg"
        src="./assets/images/icon-add-to-cart.svg"
        alt="..."
      />Add to Cart
    </button>
  `;
  btnContainerElement.style.backgroundColor = ""; // Reset to default
  btnContainerElement.style.color = ""; // Reset to default
}

function updateCart(index, count) {
  // Implement cart update logic here
  console.log(`Updated cart: Item ${index}, Count: ${count}`);
}
