var picker = datepicker('#due-date');
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("add-item");
    addItem.onclick = main;
};
function main() {
    if (isValid()) {
        var newItem = getToDoItem();
        displayToDoItem(newItem);
    }
}
function isValid() {
    var isInputValid = true;
    var desiredTitle = document.getElementById("title");
    var desiredDescription = document.getElementById("description");
    var desiredDueDate = document.getElementById("due-date");
    var desiredIsCompleted = document.getElementById("completed");
    if (desiredTitle.value == null || desiredTitle.value == "") {
        isInputValid = false;
        document.getElementById("title-error").innerHTML = "Please enter a valid title";
    }
    if (desiredDescription.value == null || desiredTitle.value == "") {
        isInputValid = false;
        document.getElementById("description-error").innerHTML = "Please enter a valid description";
    }
    if (desiredDueDate.value == null
        || desiredDueDate.value == ""
        || Date.parse(desiredDueDate.value) < Date.parse(Date())) {
        isInputValid = false;
        document.getElementById("due-date").innerHTML = "Please enter a valid date";
    }
    if (desiredIsCompleted.checked == null) {
        isInputValid = false;
        document.getElementById("title-error").innerHTML = "Congrats! you broke the program!";
    }
    return isInputValid;
}
function getToDoItem() {
    var newItem = new ToDoItem();
    newItem.title = document.getElementById("title").value;
    newItem.description = document.getElementById("description").value;
    newItem.dueDate = new Date(document.getElementById("due-date").value);
    newItem.isCompleted = document.getElementById("completed").checked;
    return newItem;
}
function displayToDoItem(item) {
    var titleElement = document.createElement("h3");
    titleElement.innerText = item.title;
    var descriptionElement = document.createElement("p");
    descriptionElement.innerText = item.description;
    var dueDateElement = document.createElement("p");
    dueDateElement.innerText = item.dueDate.toDateString();
    var toDoItemDiv = document.createElement("div");
    toDoItemDiv.onclick = markAsComplete;
    toDoItemDiv.classList.add("todo");
    if (item.isCompleted) {
        toDoItemDiv.classList.add("completed");
    }
    toDoItemDiv.appendChild(titleElement);
    toDoItemDiv.appendChild(descriptionElement);
    toDoItemDiv.appendChild(dueDateElement);
    if (item.isCompleted) {
        var itemDiv = document.getElementById("todoitems-complete");
        itemDiv.appendChild(toDoItemDiv);
    }
    else {
        var itemDiv = document.getElementById("todoitems-incomplete");
        itemDiv.appendChild(toDoItemDiv);
    }
}
function markAsComplete() {
    var itemDiv = this;
    itemDiv.classList.add("completed");
    var completedItems = document.getElementById("todoitems-complete");
    completedItems.appendChild(itemDiv);
}
