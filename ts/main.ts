// @ts-ignore: Ignoring error for datepicker because of lack of intellisense
const picker = datepicker('#due-date');
picker.setMin(new Date());

class ToDoItem {
    title:string;
    description:string;
    dueDate:Date;
    isCompleted:boolean;
}

// setting up the onclick event for the button
window.onload = function() {
    let addItem:HTMLInputElement = <HTMLInputElement>document.getElementById("add-item");
    addItem.onclick = main;
}

/**
 * The main function that calls isValid(), GetToDoItem()
 * and displayToDoItem()
 */
function main() {
    if (isValid()) {
        let newItem:ToDoItem = getToDoItem();
        displayToDoItem(newItem);
    }
}

/**
 * Check if Form data is valid.
 * returns true if the data meets the requirements of the class,
 * returns false otherwise.
 */
function isValid():boolean {
    let isInputValid = true; // setting the sentinel value
    
    // getting all the data from the form
    let desiredTitle:HTMLInputElement = <HTMLInputElement>document.getElementById("title");
    let desiredDescription:HTMLInputElement = <HTMLInputElement>document.getElementById("description");
    let desiredDueDate:HTMLInputElement = <HTMLInputElement>document.getElementById("due-date");
    let desiredIsCompleted:HTMLInputElement = <HTMLInputElement>document.getElementById("completed");
    
    // checking if the title is null or empty
    if (desiredTitle.value == null || desiredTitle.value == "") {
        isInputValid = false;
        document.getElementById("title-error").innerHTML = "Please enter a valid title";
    }
    // checking if the description is null or empty
    if (desiredDescription.value == null || desiredTitle.value == "") {
        isInputValid = false;
        document.getElementById("description-error").innerHTML = "Please enter a valid description";
    }
    // checking if the due date is null, empty or invalid
    if (desiredDueDate.value == null || desiredTitle.value == "" || desiredDueDate.value < Date()) {
        isInputValid = false;
        document.getElementById("due-date").innerHTML = "Please enter a valid date";
    }
    // checking if the isCompleted button is broken
    if (desiredIsCompleted.checked == null) {
        isInputValid = false;
        document.getElementById("title-error").innerHTML = "Congrats! you broke the program!";
    }
    return isInputValid;
}

/**
 * Gets data from the Form and 
 * puts it into a ToDoItem object
 */
function getToDoItem():ToDoItem {
    let newItem = new ToDoItem();
    newItem.title = (<HTMLInputElement>document.getElementById("title")).value;
    newItem.description = (<HTMLInputElement>document.getElementById("description")).value;
    newItem.dueDate = new Date((<HTMLInputElement>document.getElementById("due-date")).value);
    newItem.isCompleted = (<HTMLInputElement>document.getElementById("completed")).checked;
    return newItem;
}

/**
 * Display the ToDoItem on the webpage
 */
function displayToDoItem(item:ToDoItem):void {
    // ex. <h3>Desired Title</h3>
    let titleElement = document.createElement("h3");
    titleElement.innerText = item.title;

    // ex. <p>lorem ipsum</p>
    let descriptionElement = document.createElement("p");
    descriptionElement.innerText = item.description;

    // ex. <p>9/9/99</p>
    let dueDateElement = document.createElement("p");
    dueDateElement.innerText = item.dueDate.toDateString();

    // ex. <div class="todo completed"></div> or <div class="todo"></div>
    let toDoItemDiv = document.createElement("div");
    toDoItemDiv.classList.add("todo");
    if (item.isCompleted) {
        toDoItemDiv.classList.add("completed");
    }

    /* ex.
        <div>
            <h3>Desired Title</h3>
            <p>lorem ipsum</p>
            <p>9/9/99</p>
        </div>
    */
    toDoItemDiv.appendChild(titleElement);
    toDoItemDiv.appendChild(descriptionElement);
    toDoItemDiv.appendChild(dueDateElement);

    if (item.isCompleted) {
        let itemDiv = document.getElementById("todoitems-complete");
        itemDiv.appendChild(toDoItemDiv);
    } else {
        let itemDiv = document.getElementById("todoitems-incomplete");
        itemDiv.appendChild(toDoItemDiv);
    }
}

// TODO: allow the user to set an item to completed
// TODO: Store ToDoItems in web storage