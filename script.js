const keyMap = {
  'a': '1', 'b': '2', 'c': '3', 'd': '4', 'e': '5',
  'f': '6', 'g': '7', 'h': '8', 'i': '9', 'j': '0',
  'k': '!', 'l': '@', 'm': '#', 'n': '$', 'o': '%',
  'p': '^', 'q': '&', 'r': '*', 's': '(', 't': ')',
  'u': '-', 'v': '=', 'w': '+', 'x': '{', 'y': '}',
  'z': '[', ' ': ']'
};

const reverseKeyMap = Object.fromEntries(Object.entries(keyMap).map(([k, v]) => [v, k]));

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

async function copyToClipboard() {
  const output = document.getElementById("outputText").value;
  try {
    await navigator.clipboard.writeText(output);
    alert("Copied to clipboard.");
  } catch {
    const outputElem = document.getElementById("outputText");
    outputElem.select();
    document.execCommand("copy");
    alert("Copied to clipboard (fallback).");
  }
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
  const randomIndex = Math.floor(Math.random() * loveQuotes.length);
  quoteBox.textContent = loveQuotes[randomIndex];
}

function unlock() {
  const key = document.getElementById("passKey").value.toLowerCase();
  const appContent = document.getElementById("appContent");
  const unlockSection = document.getElementById("unlockSection");
  const quoteBox = document.getElementById("quoteBox");

  if (key === "tiana" || key === "jay") {
    // fade out unlock section & quote
    unlockSection.style.opacity = '0';
    quoteBox.style.opacity = '0';

    setTimeout(() => {
      unlockSection.classList.add("hidden");
      quoteBox.classList.add("hidden");

      // Show app content with fade-in
      appContent.classList.remove("hidden");
      setTimeout(() => {
        appContent.classList.add("visible");
        document.getElementById("inputText").focus();
      }, 50);
    }, 400);

    document.getElementById("passKey").value = "";
  } else {
    alert("Incorrect passkey, Seriously?");
  }
}

window.onload = () => {
  showRandomQuote();
  setInterval(showRandomQuote, 60000);
};

function clearInput() {
  document.getElementById("inputText").value = "";
}

function clearOutput()
