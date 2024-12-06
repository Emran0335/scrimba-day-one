// get references to  DOM elements

const itemInput = document.getElementById("item-input");
const addItemButton = document.getElementById("add-item-button");
const shoppoingList = document.getElementById("shopping-list");

const listArr = [];

const originalItemsMap = new Map();

function checkDuplicate() {
  const itemText = itemInput.value.trim();
  const normalText = normalizedText(itemText);

  if (!itemText) return; // do nothing
  if (listArr.includes(normalText)) {
    alert("Duplicate item! This item is already on the list.");
  } else {
    listArr.push(normalText);
    originalItemsMap.set(normalText, itemText);
    renderList();
  }
  itemInput.value = ""; // clear the input field
}

// function to normalize texxt(trim spaces handle case-insensitive)
function normalizedText(text) {
  return text.replace(/\s+/g, " ").toLowerCase();
}

// function to render the list(ul)
function renderList() {
  shoppoingList.innerHTML = ""; // clear the list
  listArr.forEach((normalizedText) => {
    const listItem = document.createElement("li");
    const listItemButtonsContainer = document.createElement("div");
    listItem.textContent = originalItemsMap.get(normalizedText);

    // add "Edit" and "Delete" buttons
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editItem(normalizedText));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteItem(normalizedText));

    listItemButtonsContainer.appendChild(editButton);
    listItemButtonsContainer.appendChild(deleteButton);

    shoppoingList.appendChild(listItem);

    shoppoingList.appendChild(listItemButtonsContainer);
  });
}

// function to edit an item
function editItem(normalText) {
  const originalText = originalItemsMap.get(normalText);
  const newText = prompt("Edit item: ", originalText)?.trim();
  if (newText) {
    const newNormalText = normalizedText(newText);

    if (newNormalText === normalText || !listArr.includes(newNormalText)) {
      const index = listArr.indexOf(normalText);
      listArr[index] = newNormalText;
      originalItemsMap.delete(normalText);
      originalItemsMap.set(newNormalText, newText);
      renderList();
    } else {
      alert("Duplicate item! Cannot edit to an existing item");
    }
  }
}

function deleteItem(normalText) {
  const index = listArr.indexOf(normalText);
    if (index !== -1) {
        listArr.splice(index, 1);
        originalItemsMap.delete(normalText);
        renderList();
    }
}

addItemButton.addEventListener("click", checkDuplicate);

itemInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkDuplicate();
  }
});
