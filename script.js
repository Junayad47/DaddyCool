const keyMap = {
  'a': '1', 'b': '2', 'c': '3', 'd': '4', 'e': '5',
  'f': '6', 'g': '7', 'h': '8', 'i': '9', 'j': '0',
  'k': '!', 'l': '@', 'm': '#', 'n': '$', 'o': '%',
  'p': '^', 'q': '&', 'r': '*', 's': '(', 't': ')',
  'u': '-', 'v': '=', 'w': '+', 'x': '{', 'y': '}',
  'z': '[', ' ': ']'
};

const reverseKeyMap = Object.fromEntries(
  Object.entries(keyMap).map(([k, v]) => [v, k])
);

function encode() {
  const text = document.getElementById("inputText").value.toLowerCase();
  let result = '';
  for (let char of text) {
    result += keyMap[char] ?? char;
  }
  document.getElementById("outputText").value = result;
}

function decode() {
  const text = document.getElementById("inputText").value;
  let result = '';
  for (let char of text) {
    result += reverseKeyMap[char] ?? char;
  }
  document.getElementById("outputText").value = result;
}

function copyToClipboard() {
  const output = document.getElementById("outputText");
  output.select();
  output.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Copied to clipboard.");
}

function pasteFromClipboard() {
  navigator.clipboard.readText().then((text) => {
    document.getElementById("inputText").value = text;
  }).catch(() => {
    alert("Failed to read clipboard.");
  });
}

function clearInput() {
  document.getElementById("inputText").value = "";
}

function clearOutput() {
  document.getElementById("outputText").value = "";
}

const loveQuotes = [
  "I like watching you. — Tiana",
  "I like watching you, playing pool, I mean. — Tiana",
  "Absolute Vodka!",
  "BC Kush!",
  "You had me at the pool table. — Jay"
];

function showRandomQuote() {
  const quoteBox = document.getElementById("quoteBox");
  const quote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
  quoteBox.textContent = quote;
}

function unlock() {
  const key = document.getElementById("passKey").value.toLowerCase();
  const content = document.getElementById("appContent");
  const quoteBox = document.getElementById("quoteBox");
  if (key === "tiana" || key === "jay") {
    content.classList.remove("hidden");
    document.getElementById("unlockSection").classList.add("hidden");
    quoteBox.classList.remove("hidden");
    showRandomQuote();
    setInterval(showRandomQuote, 60000);
  } else {
    alert("Incorrect passkey, Seriously?");
  }
}

// Floating Hearts
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
  document.querySelector('.heart-container').appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 500);
