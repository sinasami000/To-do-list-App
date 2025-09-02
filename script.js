// --- Element Selectors ---
let mode = document.querySelector(".mode");
let drpmainText = document.querySelector(".main-txt-drp");
let ol = document.querySelector(".ol-element");
let addNote = document.querySelector(".new-note-input");
let newNotePopup = document.querySelector(".new");
let icon = document.querySelector(".icon");
let input = document.querySelector("input");
let search = document.querySelector(".searchform");
let container = document.querySelector(".popup-container");
let cancelBtn = document.querySelector(".cancelbtn");
let applyBtn = document.querySelector(".applybtn");
let allBtn = document.querySelector(".typebtn");
let btn1 = document.getElementById("drBtn1");
let btn2 = document.getElementById("drBtn2");
let btn3 = document.getElementById("drBtn3");
let firstsearch = document.querySelector("#searchbox");

// --- Popup for Shortcut Hint ---
const popup = document.createElement("div");
popup.style.position = "absolute";
popup.style.padding = "6px 10px";
popup.style.background = "black";
popup.style.color = "white";
popup.style.borderRadius = "5px";
popup.style.fontSize = "12px";
popup.style.pointerEvents = "none";
popup.style.display = "none";
document.body.appendChild(popup);

// --- Local Storage Functions ---
const saveTodos = () => {
  const todos = [];
  const listItems = ol.children;
  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    todos.push({
      text: listItem.textContent.slice(0, -1),
      checked: listItem.classList.contains("checked")
    });
  }
  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = () => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    const todos = JSON.parse(storedTodos);
    todos.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo.text;
      
      const span = document.createElement("span");
      span.innerHTML = "&#x2716;";
      
      if (todo.checked) {
        li.classList.add("checked");
      }
      li.append(span);
      ol.append(li);
    });
  }
};

// --- General Functions ---
const darkMode = () => {
  document.body.classList.toggle("darkmode");
  if (document.body.classList.contains("darkmode")) {
    icon.src = "assets/dark theme icon/sun.png";
  } else {
    icon.src = "assets/dark theme icon/moon.png";
  }
};

const addElement = () => {
  let note_value = addNote.value;
  if (note_value.trim() === "") {
    alert("You can't leave this empty!");
  } else {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.innerHTML = "&#x2716;";
    li.textContent = note_value;
    ol.append(li);
    li.append(span);
    container.classList.add("hidden");
    addNote.value = "";
    saveTodos(); // Save the list after adding
  }
};

// --- Event Listeners ---
mode.addEventListener("click", darkMode);

// Search Box
input.addEventListener("focus", () => {
  search.classList.add("toggleinput");
});
input.addEventListener("blur", () => {
  search.classList.remove("toggleinput");
});
firstsearch.addEventListener("input", () => {
  const listItems = ol.children;
  const searchTerm = firstsearch.value.toLowerCase();
  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    const itemText = listItem.textContent.toLowerCase();
    if (itemText.includes(searchTerm)) {
      listItem.style.display = "";
    } else {
      listItem.style.display = "none";
    }
  }
});

// New Note Popup
newNotePopup.addEventListener("click", () => {
  container.classList.remove("hidden");
  addNote.focus();
});
cancelBtn.addEventListener("click", () => {
  container.classList.add("hidden");
});
applyBtn.addEventListener("click", addElement);
addNote.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addElement();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "Enter") {
    newNotePopup.click();
  }
});

// List Item Logic (Toggle and Remove)
ol.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    e.target.classList.toggle("checked");
    saveTodos(); // Save the list after toggling
  } else if (e.target.tagName.toLowerCase() === "span") {
    e.target.parentElement.remove();
    saveTodos(); // Save the list after removing
  }
});

// Popup for Shortcut (Hover)
newNotePopup.addEventListener("mouseover", function () {
  popup.innerText = `Shortcut: press ctrl+enter`;
  popup.style.display = "block";
});
document.addEventListener("mousemove", function (event) {
  popup.style.left = event.pageX + 10 + "px";
  popup.style.top = event.pageY + 10 + "px";
});
document.addEventListener("mouseout", function () {
  popup.style.display = "none";
});

// Filtering Buttons (All, Unchecked, Checked)
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
      listItem.style.display = "none";
    } else {
      listItem.style.display = "";
    }
  }
});
btn3.addEventListener("click", () => {
  drpmainText.textContent = btn3.textContent;
  const listItems = ol.children;
  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    if (!listItem.classList.contains("checked")) {
      listItem.style.display = "none";
    } else {
      listItem.style.display = "";
    }
  }
});

// --- Initial Setup ---
// Load data when the page first loads
window.addEventListener("load", loadTodos);