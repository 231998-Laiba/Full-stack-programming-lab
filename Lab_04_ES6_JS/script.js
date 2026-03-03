const addBtn = document.getElementById("addBtn");
const itemInput = document.getElementById("itemInput");
const itemList = document.getElementById("itemList");

addBtn.addEventListener("click", function () {
    const itemText = itemInput.value.trim();

    if (itemText === "") {
        alert("Please enter an item!");
        return;
    }

    // Create list item
    const li = document.createElement("li");
    li.textContent = itemText;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Delete functionality
    deleteBtn.addEventListener("click", function () {
        itemList.removeChild(li);
    });

    // Append delete button to li
    li.appendChild(deleteBtn);

    // Append li to ul
    itemList.appendChild(li);

    // Clear input field
    itemInput.value = "";
});