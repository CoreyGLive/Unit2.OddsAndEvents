// === State ===
let numberBank = [];
let oddNumbers = [];
let evenNumbers = [];

/**
 * Adds a number to the bank
 * @param {number} num - The number to add
 */
function addNumber(num) {
  numberBank.push(num);
  render();
}

/**
 * Sorts one number from the bank into odd or even categories
 */
function sortOneNumber() {
  if (numberBank.length === 0) return;
  const num = numberBank.shift();
  (Math.abs(num) % 2 === 0 ? evenNumbers : oddNumbers).push(num);
  render();
}

/**
 * Sorts all numbers from the bank into odd or even categories
 */
function sortAllNumbers() {
  numberBank.forEach(num => (Math.abs(num) % 2 === 0 ? evenNumbers : oddNumbers).push(num));
  numberBank = [];
  render();
}

// === Components ===

/** Form for number input */
function NumberForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Enter a number:
      <input name="number" type="number" />
    </label>
    <button>Add Number</button>
  `;
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData($form);
    const num = parseInt(data.get("number"));
    if (!isNaN(num)) addNumber(num);
  });
  return $form;
}

/** Displays a list of numbers */
function NumberList(title, numbers) {
  const $div = document.createElement("div");
  $div.innerHTML = `<h3>${title}</h3><p>${numbers.join(", ") || "Empty"}</p>`;
  return $div;
}

/** Sorting buttons */
function SortButtons() {
  const $div = document.createElement("div");
  $div.innerHTML = `
    <button id="sort-one">Sort 1</button>
    <button id="sort-all">Sort All</button>
  `;
  $div.querySelector("#sort-one").addEventListener("click", sortOneNumber);
  $div.querySelector("#sort-all").addEventListener("click", sortAllNumbers);
  return $div;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Odd/Even Sorter</h1>
  `;
  $app.append(NumberForm(), SortButtons(), NumberList("Number Bank", numberBank));
  $app.append(NumberList("Odd Numbers", oddNumbers), NumberList("Even Numbers", evenNumbers));
}

// Initial render
document.addEventListener("DOMContentLoaded", render);
