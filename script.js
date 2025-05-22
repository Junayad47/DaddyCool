// Mapping for lowercase letters
const lowerKeyMap = {
  'a': '1', 'b': '2', 'c': '3', 'd': '4', 'e': '5',
  'f': '6', 'g': '7', 'h': '8', 'i': '9', 'j': '0',
  'k': '!', 'l': '@', 'm': '#', 'n': '$', 'o': '%',
  'p': '^', 'q': '&', 'r': '*', 's': '(', 't': ')',
  'u': '-', 'v': '=', 'w': '+', 'x': '{', 'y': '}',
  'z': '['
};

// Reverse map
const lowerReverseMap = Object.fromEntries(
  Object.entries(lowerKeyMap).map(([k, v]) => [v, k])
);

// Preserve capitalization logic
function encode() {
  const text = document.getElementById("inputText").value;
  let result = '';

  for (let char of text) {
    const lowerChar = char.toLowerCase();
    const encoded = lowerKeyMap[lowerChar];

    if (encoded) {
      result += char === lowerChar ? encoded : encoded.toUpperCase();
    } else if (char === ' ') {
      result += ']'; // Special case for space
    } else {
      result += char;
    }
  }

  document.getElementById("outputText").value = result;
}

function decode() {
  const text = document.getElementById("inputText").value;
  let result = '';

  for (let char of text) {
    const lowerChar = char.toLowerCase();
    const decoded = lowerReverseMap[lowerChar];

    if (decoded) {
      result += char === lowerChar ? decoded : decoded.toUpperCase();
    } else if (char === ']') {
      result += ' '; // Handle space
    } else {
      result += char;
    }
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

const loveQuotes = [
  "I like watching you. — Tiana",
  "I like watching you, playing pool, I mean. — Tiana",
  "Absolute Vodka !",
  "Bc Kush !",
  "You had me at the pool table. — Jay"
];

function showRandomQuote() {
  const quoteBox = document.getElementById("quoteBox");
  if (!document.getElementById("appContent").classList.contains("hidden")) {
    const randomIndex = Math.floor(Math.random() * loveQuotes.length);
    quoteBox.textContent = loveQuotes[randomIndex];
  }
}

// Show a quote initially and then rotate every 60 seconds (after unlock only)
setInterval(showRandomQuote, 60000);

function unlock() {
  const key = document.getElementById("passKey").value.toLowerCase();
  const content = document.getElementById("appContent");
  if (key === "tiana" || key === "jay") {
    content.classList.remove("hidden");
    document.getElementById("unlockSection").classList.add("hidden");
    showRandomQuote(); // show first quote immediately
  } else {
    alert("Incorrect passkey, Seriously ?");
  }
}

function clearInput() {
  document.getElementById("inputText").value = "";
}

function clearOutput() {
  document.getElementById("outputText").value = "";
}

function pasteFromClipboard() {
  navigator.clipboard.readText().then((text) => {
    document.getElementById("inputText").value = text;
  }).catch((err) => {
    alert("Failed to read clipboard. Please allow permissions.");
  });
}
