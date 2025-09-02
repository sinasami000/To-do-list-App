// -------------------- Element Selectors -------------------- //
// Selecting elements from the DOM (HTML) so we can use them in JS
let mode = document.querySelector(".mode");                // Dark mode toggle button
let drpmainText = document.querySelector(".main-txt-drp"); // Dropdown text (for filters)
let ol = document.querySelector(".ol-element");            // The <ol> element that holds todo items
let addNote = document.querySelector(".new-note-input");   // Input field for new note
let newNotePopup = document.querySelector(".new");         // Button to show popup for adding note
let icon = document.querySelector(".icon");                // Dark mode icon (moon/sun)
let input = document.querySelector("input");               // General input (search input)
let search = document.querySelector(".searchform");        // Search form container
let container = document.querySelector(".popup-container");// Popup container (for adding note)
let cancelBtn = document.querySelector(".cancelbtn");      // Cancel button (closes popup)
let applyBtn = document.querySelector(".applybtn");        // Apply button (saves new note)
let allBtn = document.querySelector(".typebtn");           // "All" filter button
let btn1 = document.getElementById("drBtn1");              // Filter: All
let btn2 = document.getElementById("drBtn2");              // Filter: Checked
let btn3 = document.getElementById("drBtn3");              // Filter: Unchecked
let firstsearch = document.querySelector("#searchbox");    // Search input field

// -------------------- Tooltip (Popup) Setup -------------------- //
// Create a tooltip popup that shows shortcut info on hover
const popup = document.createElement("div");
popup.style.position = "absolute";
popup.style.padding = "6px 10px";
popup.style.background = "black";
popup.style.color = "white";
popup.style.borderRadius = "5px";
popup.style.fontSize = "12px";
popup.style.pointerEvents = "none"; // Prevent interaction
popup.style.display = "none";       // Hidden by default
document.body.appendChild(popup);

// -------------------- Save Todos to Local Storage -------------------- //
const saveTodos = () => {
  const todos = [];
  const listItems = ol.children;

  // Loop through each <li> in the todo list
  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];

    // Save text and whether it's checked
    todos.push({
      text: listItem.textContent.slice(0, -1), // Remove the "X" from text
      checked: listItem.classList.contains("checked")
    });
  }

  // Store todos in localStorage as JSON string
  localStorage.setItem("todos", JSON.stringify(todos));
};

// -------------------- Load Todos from Local Storage -------------------- //
const loadTodos = () => {
  const storedTodos = localStorage.getItem("todos");

  if (storedTodos) {
    const todos = JSON.parse(storedTodos);

    todos.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo.text;

      const span = document.createElement("span");
      span.innerHTML = "&#x2716;"; // "X" for delete button

      // If task was checked, re-apply the checked style
      if (todo.checked) {
        li.classList.add("checked");
      }

      li.append(span);
      ol.append(li);
    });
  }
};

// -------------------- Dark Mode Toggle -------------------- //
const darkMode = () => {
  document.body.classList.toggle("darkmode");

  // Change icon based on mode
  if (document.body.classList.contains("darkmode")) {
    icon.src = "assets/dark theme icon/sun.png";
  } else {
    icon.src = "assets/dark theme icon/moon.png";
  }
};

// -------------------- Add New Todo Element -------------------- //
const addElement = () => {
  let note_value = addNote.value;

  if (note_value.trim() === "") {
    alert("You can't leave this empty!");
  } else {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.innerHTML = "&#x2716;"; // Delete button

    li.textContent = note_value;
    ol.append(li);
    li.append(span);

    // Hide popup after adding
    container.classList.add("hidden");

    // Clear input
    addNote.value = "";

    // Save to localStorage
    saveTodos(); 
  }
};

// -------------------- Event Listeners -------------------- //

// Toggle dark mode
mode.addEventListener("click", darkMode);

// Input focus/blur adds/removes a style class
input.addEventListener("focus", () => {
  search.classList.add("toggleinput");
});
input.addEventListener("blur", () => {
  search.classList.remove("toggleinput");
});

// -------------------- Search Todo Items -------------------- //
firstsearch.addEventListener("input", () => {
  const listItems = ol.children;
  const searchTerm = firstsearch.value.toLowerCase();

  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    const itemText = listItem.textContent.toLowerCase();

    // Show or hide items depending on search match
    if (itemText.includes(searchTerm)) {
      listItem.style.display = "";
    } else {
      listItem.style.display = "none";
    }
  }
});

// Show popup when "New Note" button clicked
newNotePopup.addEventListener("click", () => {
  container.classList.remove("hidden");
  addNote.focus();
});

// Close popup when cancel clicked
cancelBtn.addEventListener("click", () => {
  container.classList.add("hidden");
});

// Add note when apply button clicked
applyBtn.addEventListener("click", addElement);

// Add note when pressing Enter key in input
addNote.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addElement();
  }
});

// Shortcut: Ctrl + Enter to open popup
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "Enter") {
    newNotePopup.click();
  }
});

// -------------------- Todo List Item Logic -------------------- //
// Toggle checked/unchecked or delete item
ol.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    e.target.classList.toggle("checked");
    saveTodos(); // Save change
  } else if (e.target.tagName.toLowerCase() === "span") {
    e.target.parentElement.remove();
    saveTodos(); // Save after deletion
  }
});

// -------------------- Tooltip for Shortcut -------------------- //
// Show tooltip when hovering "New Note" button
newNotePopup.addEventListener("mouseover", function () {
  popup.innerText = `Shortcut: press ctrl+enter`;
  popup.style.display = "block";
});

// Move tooltip with mouse
document.addEventListener("mousemove", function (event) {
  popup.style.left = event.pageX + 10 + "px";
  popup.style.top = event.pageY + 10 + "px";
});

// Hide tooltip when mouse leaves window
document.addEventListener("mouseout", function () {
  popup.style.display = "none";
});

// -------------------- Filter Buttons (All, Checked, Unchecked) -------------------- //
btn1.addEventListener("click", () => {
  drpmainText.textContent = btn1.textContent;
  const listItems = ol.children;
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].style.display = "";
  }
});

btn2.addEventListener("click", () => {
  drpmainText.textContent = btn2.textContent;
  const listItems = ol.children;
  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    if (listItem.classList.contains("checked")) {
      listItem.style.display = "";
    } else {
      listItem.style.display = "none";
    }
  }
});

btn3.addEventListener("click", () => {
  drpmainText.textContent = btn3.textContent;
  const listItems = ol.children;
  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    if (!listItem.classList.contains("checked")) {
      listItem.style.display = "";
    } else {
      listItem.style.display = "none";
    }
  }
});

// -------------------- Initial Setup -------------------- //
// Load saved todos when page loads
window.addEventListener("load", loadTodos);
