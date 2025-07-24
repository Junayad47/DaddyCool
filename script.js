// Case-sensitive character mapping - 1:1 Character Ancient Languages System
const keyMap = {
  // Lowercase letters - Hebrew single characters
  'a': 'א', 'b': 'ב', 'c': 'ג', 'd': 'ד', 'e': 'ה',
  'f': 'ו', 'g': 'ז', 'h': 'ח', 'i': 'ט', 'j': 'י',
  'k': 'כ', 'l': 'ל', 'm': 'מ', 'n': 'נ', 'o': 'ס',
  'p': 'ע', 'q': 'פ', 'r': 'צ', 's': 'ק', 't': 'ר',
  'u': 'ש', 'v': 'ת', 'w': 'ך', 'x': 'ם', 'y': 'ן',
  'z': 'ף',
  
  // Uppercase letters - Arabic single characters  
  'A': 'ا', 'B': 'ب', 'C': 'ت', 'D': 'ث', 'E': 'ج',
  'F': 'ح', 'G': 'خ', 'H': 'د', 'I': 'ذ', 'J': 'ر',
  'K': 'ز', 'L': 'س', 'M': 'ش', 'N': 'ص', 'O': 'ض',
  'P': 'ط', 'Q': 'ظ', 'R': 'ع', 'S': 'غ', 'T': 'ف',
  'U': 'ق', 'V': 'ك', 'W': 'ل', 'X': 'م', 'Y': 'ن',
  'Z': 'ه',
  
  // Numbers - Egyptian Hieroglyphic-style single characters
  '0': '𓍢', '1': '𓏤', '2': '𓏥', '3': '𓏦', '4': '𓏧',
  '5': '𓏨', '6': '𓏩', '7': '𓏪', '8': '𓏫', '9': '𓏬',
  
  // Special characters - Cyrillic single characters
  ' ': 'й', '.': 'ц', ',': 'у', '!': 'к', '?': 'е',
  "'": 'н', '"': 'г', ':': 'ш', ';': 'щ', 
  '(': 'з', ')': 'х', '[': 'ъ', ']': 'э', 
  '{': 'ю', '}': 'я', '-': 'ё', '_': 'ж',
  '+': 'в', '=': 'а', '\\': 'п', '/': 'р',
  '|': 'о', '&': 'л', '*': 'д', '^': 'б',
  '%': 'и', '$': 'т', '#': 'ь', '@': 'м',
  '~': 'с', '`': 'ч', 
  
  // Whitespace and control characters
  '\n': 'ф', '\t': 'ы', '\r': 'ъ'
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
    const oneChar = text[i];
    if (reverseKeyMap[oneChar]) {
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

// ❤️ Your original heart style with slight enhancement
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = '❤️'; // Your exact original heart
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = Math.random() * 100 + 'vh';
  heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
  heart.style.position = 'fixed';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '1000';
  heart.style.fontSize = (Math.random() * 8 + 16) + 'px'; // Slight size variation
  heart.style.opacity = Math.random() * 0.3 + 0.7; // Subtle opacity variation
  
  document.querySelector('.heart-container') ? 
    document.querySelector('.heart-container').appendChild(heart) : 
    document.body.appendChild(heart);
  
  setTimeout(() => heart.remove(), 5000);
}

function startHearts() {
  setInterval(createHeart, 500); // Your original timing
}

// On page load, hide quote initially
window.onload = () => {
  document.getElementById("quoteBox").classList.add("hidden");
};
