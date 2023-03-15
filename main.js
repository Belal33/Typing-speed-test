let inputArea = document.querySelector("input");
let wordsBox = document.querySelector(".words");
let counter = document.querySelector(".counter");
let wordsNum = 0; // counter of input words
let inputLettersNum = 0; // counter of input words
let timer = "10";
let negscore = 0;
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

inputArea.addEventListener("focus", createWordsBox, { once: true });
inputArea.addEventListener("keyup", removeWordIfMatch);
inputArea.addEventListener("keydown", setTestCounter, { once: true });

// createRandomBoxWords
function createWordsBox() {
  wordsBox.style.visibility = "visible";
  // WrapSpanWordsInwordsBox(words.sort(() => Math.random() - 0.5));
  WrapSpanWordsInwordsBox(words);
}
// creat 30 words wraped in span and display it in box
function WrapSpanWordsInwordsBox(words = words) {
  wordsBox.innerHTML = "";
  for (let word of words) {
    let wordsSpan = document.createElement("span");
    wordsSpan.innerHTML = word;
    wordsBox.appendChild(wordsSpan);
  }
}

// remove the last valid user input from the words box
function removeWordIfMatch() {
  let inputWordsArr = inputArea.value.split(" ");
  if (inputWordsArr.length > wordsNum) {
    let lastWord = inputWordsArr[inputWordsArr.length - 2];
    let firstwordbox = wordsBox.firstElementChild;
    if (lastWord.toLowerCase() == firstwordbox.innerHTML.toLowerCase()) {
      wordsNum = inputWordsArr.length - 1;
      inputLettersNum = inputArea.value.length;
      firstwordbox.remove();
    } else {
      negscore--;
    }
  } else {
    negscore--;
  }
}

// set game countdown and calculate the speed
function setTestCounter() {
  counter.innerHTML = timer;
  counter.style.fontSize = "80px";
  const countdwon = setInterval(() => {
    if (counter.innerHTML == "0") {
      endTestShowScore();
      clearInterval(countdwon);
      counter.addEventListener("click", again, { once: true });
    } else {
      counter.innerHTML--;
    }
  }, 1000);
}
function endTestShowScore() {
  let disabled = document.createAttribute("disabled");
  let score =
    (((inputLettersNum - wordsNum) * 10 +
      inputLettersNum +
      wordsNum +
      negscore) *
      10) /
    timer;
  inputArea.setAttributeNode(disabled);
  counter.style.fontSize = "20px";
  counter.innerHTML = `Your Speed per minute : ${wordsNum * 2} word
  <br/>Your Score : ${score} `;
}

function again() {
  inputArea.value = "";
  wordsNum = 0; // counter of input words
  inputLettersNum = 0;
  inputArea.removeAttribute("disabled");
  WrapSpanWordsInwordsBox(words.sort(() => Math.random() - 0.5));
  inputArea.focus();
  setTestCounter();
  inputArea.addEventListener("keyup", removeWordIfMatch);
}
