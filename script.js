// Case-sensitive character mapping
const keyMap = {
  'a': '1', 'b': '2', 'c': '3', 'd': '4', 'e': '5',
  'f': '6', 'g': '7', 'h': '8', 'i': '9', 'j': '0',
  'k': '!', 'l': '@', 'm': '#', 'n': '$', 'o': '%',
  'p': '^', 'q': '&', 'r': '*', 's': '(', 't': ')',
  'u': '-', 'v': '=', 'w': '+', 'x': '{', 'y': '}',
  'z': '[', 'A': 'A1', 'B': 'B2', 'C': 'C3', 'D': 'D4',
  'E': 'E5', 'F': 'F6', 'G': 'G7', 'H': 'H8', 'I': 'I9',
  'J': 'J0', 'K': 'K!', 'L': 'L@', 'M': 'M#', 'N': 'N$',
  'O': 'O%', 'P': 'P^', 'Q': 'Q&', 'R': 'R*', 'S': 'S(',
  'T': 'T)', 'U': 'U-', 'V': 'V=', 'W': 'W+', 'X': 'X{',
  'Y': 'Y}', 'Z': 'Z[', ' ': ']', '.': '~', ',': '`',
  '!': '_', '?': ';', "'": ':', '"': '|', '\n': '\\n'
};

// Reverse the keyMap
const reverseKeyMap = {};
for (const [key, val] of Object.entries(keyMap)) {
  reverseKeyMap[val] = key;
}

// Love quotes
const loveQuotes = [
  "I like watching you. — Tiana",
  "I like watching you, playing pool, I mean. — Tiana",
  "Absolute Vodka !",
  "Bc Kush !",
  "You had me at the pool table. — Jay"
];

// Encode function
function encode() {
  const text = document.getElementById("inputText").value;
  let result = '';
  for (let char of text) {
    result += keyMap[char] ?? char;
  }
  document.getElementById("outputText").value = result;
}

// Decode function
function decode() {
  const text = document.getElementById("inputText").value;
  let result = '';
  let i = 0;
  while (i < text.length) {
    // Try to match 2-char values first for uppercase letters
    const twoChar = text.slice(i, i + 2);
    const oneChar = text[i];

    if (reverseKeyMap[twoChar]) {
      result += reverseKeyMap[twoChar];
      i += 2;
    } else if (reverseKeyMap[oneChar]) {
      result += reverseKeyMap[oneChar];
      i++;
    } else {
      result += oneChar;
      i++;
    }
  }
  document.getElementById("outputText").value = result;
}

// Clipboard functions
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
    alert("Failed to read clipboard. Please allow permissions.");
  });
}

// Clear inputs
function clearInput() {
  document.getElementById("inputText").value = "";
}

function clearOutput() {
  document.getElementById("outputText").value = "";
}

// Display random quote
function showRandomQuote() {
  const quoteBox = document.getElementById("quoteBox");
  const quote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
  quoteBox.textContent = quote;
}

// Unlock and show app
function unlock() {
  const key = document.getElementById("passKey").value.toLowerCase();
  const content = document.getElementById("appContent");
  const unlockSection = document.getElementById("unlockSection");
  const quoteBox = document.getElementById("quoteBox");

  if (key === "tiana" || key === "jay") {
    content.classList.remove("hidden");
    unlockSection.classList.add("hidden");
    quoteBox.classList.remove("hidden");
    showRandomQuote();
    setInterval(showRandomQuote, 60000); // rotate quote every 60 sec
    startHearts(); // start hearts after unlock
  } else {
    alert("Incorrect passkey, Seriously ?");
  }
}

// Floating hearts animation
function startHearts() {
  const container = document.body;

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerText = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }, 800);
}

// On page load, hide quote initially
window.onload = () => {
  document.getElementById("quoteBox").classList.add("hidden");
};
