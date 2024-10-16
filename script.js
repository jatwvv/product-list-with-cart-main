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
    updateDisplay(btnContainerElement, index); // تمرير index للكارد
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

  // تحديث قيمة العداد في الـ data attribute
  let btnContainerElement = countElement.parentElement;
  btnContainerElement.setAttribute("data-count", currentCount);
}

function decrement(index) {
  let countElement = document.getElementById(`count-${index}`);
  let currentCount = parseInt(countElement.textContent);
  if (currentCount > 0) {
    currentCount--;
    countElement.textContent = currentCount;

    // تحديث قيمة العداد في الـ data attribute
    let btnContainerElement = countElement.parentElement;
    btnContainerElement.setAttribute("data-count", currentCount);
  }
}
