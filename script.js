// Case-sensitive character mapping - Compact but Secure Version
const keyMap = {
  // Lowercase letters - 2-character sequences using obscure Unicode
  'a': 'Φx', 'b': 'Ωδ', 'c': 'Ψλ', 'd': 'Ξσ', 'e': 'Θρ',
  'f': 'Λω', 'g': 'Πχ', 'h': 'Σξ', 'i': 'Υβ', 'j': 'Φη',
  'k': 'Ωγ', 'l': 'Ψι', 'm': 'Ξμ', 'n': 'Θπ', 'o': 'Λρ',
  'p': 'Πτ', 'q': 'Σχ', 'r': 'Υω', 's': 'Φα', 't': 'Ωγ',
  'u': 'Ψε', 'v': 'Ξη', 'w': 'Θι', 'x': 'Λλ', 'y': 'Πν',
  'z': 'Σπ',
  
  // Uppercase letters - 3-character sequences for distinction
  'A': 'ΦΩx', 'B': 'ΞΘδ', 'C': 'ΠΣλ', 'D': 'ΦΩσ', 'E': 'ΞΘρ',
  'F': 'ΠΣω', 'G': 'ΦΩχ', 'H': 'ΞΘξ', 'I': 'ΠΣβ', 'J': 'ΦΩη',
  'K': 'ΞΘγ', 'L': 'ΠΣι', 'M': 'ΦΩμ', 'N': 'ΞΘπ', 'O': 'ΠΣρ',
  'P': 'ΦΩτ', 'Q': 'ΞΘχ', 'R': 'ΠΣω', 'S': 'ΦΩα', 'T': 'ΞΘγ',
  'U': 'ΠΣε', 'V': 'ΦΩη', 'W': 'ΞΘι', 'X': 'ΠΣλ', 'Y': 'ΦΩν',
  'Z': 'ΞΘπ',
  
  // Numbers - 2-character mathematical symbols
  '0': '∅∞', '1': '∫∮', '2': '∑∏', '3': '∀∃', '4': '∈∉',
  '5': '∪∩', '6': '⊂⊃', '7': '⊆⊇', '8': '⊊⊋', '9': '⊓⊔',
  
  // Special characters - 2-character sequences
  ' ': '◊◈', '.': '●○', ',': '▲△', '!': '★☆', '?': '♦♢',
  "'": '◄►', '"': '♠♣', ':': '※‡', ';': '⚡⚠', 
  '(': '〚〛', ')': '【】', '[': '⟨⟩', ']': '⦃⦄', 
  '{': '⟦⟧', '}': '⦗⦘', '-': '══', '_': '▁▂',
  '+': '⊕⊖', '=': '≡≢', '\\': '⟍⟍', '/': '⧸⧹',
  '|': '║│', '&': '⊼⊽', '*': '⋆✱', '^': '↑↗',
  '%': '‰‱', '

// Reverse the keyMap for decoding
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

// Enhanced encode function with error handling
function encode() {
  const text = document.getElementById("inputText").value;
  let result = '';
  
  try {
    for (let char of text) {
      if (keyMap.hasOwnProperty(char)) {
        result += keyMap[char];
      } else {
        // Preserve unmapped characters
        result += char;
        console.warn(`Character '${char}' not found in keyMap, preserving as-is`);
      }
    }
    document.getElementById("outputText").value = result;
  } catch (error) {
    console.error('Encoding error:', error);
    alert('Error during encoding. Please try again.');
  }
}

// Enhanced decode function with proper sequence matching
function decode() {
  const text = document.getElementById("inputText").value;
  let result = '';
  let i = 0;
  
  try {
    // Sort reverse keys by length (longest first) for proper matching
    const sortedKeys = Object.keys(reverseKeyMap).sort((a, b) => b.length - a.length);
    
    while (i < text.length) {
      let matched = false;
      
      // Try to match encoded sequences starting with longest
      for (const encodedSequence of sortedKeys) {
        if (text.substring(i, i + encodedSequence.length) === encodedSequence) {
          result += reverseKeyMap[encodedSequence];
          i += encodedSequence.length;
          matched = true;
          break;
        }
      }
      
      // If no match found, preserve the character
      if (!matched) {
        result += text[i];
        i++;
      }
    }
    
    document.getElementById("outputText").value = result;
  } catch (error) {
    console.error('Decoding error:', error);
    alert('Error during decoding. Please check your input.');
  }
}

// Enhanced clipboard functions with better error handling
function copyToClipboard() {
  const output = document.getElementById("outputText");
  
  try {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(output.value).then(() => {
        showToast("Copied to clipboard! 📋");
      }).catch(() => {
        // Fallback to old method
        fallbackCopyToClipboard(output);
      });
    } else {
      // Fallback for older browsers
      fallbackCopyToClipboard(output);
    }
  } catch (error) {
    console.error('Copy error:', error);
    alert("Failed to copy to clipboard.");
  }
}

function fallbackCopyToClipboard(output) {
  output.select();
  output.setSelectionRange(0, 99999);
  const successful = document.execCommand("copy");
  if (successful) {
    showToast("Copied to clipboard! 📋");
  } else {
    alert("Failed to copy to clipboard.");
  }
}

function pasteFromClipboard() {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.readText().then((text) => {
      document.getElementById("inputText").value = text;
      showToast("Pasted from clipboard! 📥");
    }).catch(() => {
      alert("Failed to read clipboard. Please allow permissions or paste manually.");
    });
  } else {
    alert("Clipboard access not available. Please paste manually using Ctrl+V.");
  }
}

// Toast notification system
function showToast(message) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 20px;
    border-radius: 25px;
    font-size: 14px;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Clear functions with confirmation for large text
function clearInput() {
  const inputText = document.getElementById("inputText").value;
  if (inputText.length > 100) {
    if (confirm("You have a lot of text. Are you sure you want to clear it?")) {
      document.getElementById("inputText").value = "";
      showToast("Input cleared! 🗑️");
    }
  } else {
    document.getElementById("inputText").value = "";
    showToast("Input cleared! 🗑️");
  }
}

function clearOutput() {
  const outputText = document.getElementById("outputText").value;
  if (outputText.length > 100) {
    if (confirm("You have a lot of encoded text. Are you sure you want to clear it?")) {
      document.getElementById("outputText").value = "";
      showToast("Output cleared! 🗑️");
    }
  } else {
    document.getElementById("outputText").value = "";
    showToast("Output cleared! 🗑️");
  }
}

// Enhanced quote system with fade animations
function showRandomQuote() {
  const quoteBox = document.getElementById("quoteBox");
  const quote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
  
  // Fade out, change text, fade in
  quoteBox.style.opacity = '0';
  setTimeout(() => {
    quoteBox.textContent = quote;
    quoteBox.style.opacity = '1';
  }, 300);
}

// Enhanced unlock function with smoother transitions
function unlock() {
  const key = document.getElementById("passKey").value.toLowerCase();
  const content = document.getElementById("appContent");
  const unlockSection = document.getElementById("unlockSection");
  const quoteBox = document.getElementById("quoteBox");
  
  if (key === "tiana" || key === "jay") {
    // Smooth transition
    unlockSection.style.opacity = '0';
    setTimeout(() => {
      content.classList.remove("hidden");
      unlockSection.classList.add("hidden");
      quoteBox.classList.remove("hidden");
      content.style.opacity = '0';
      content.style.opacity = '1';
      
      showRandomQuote();
      setInterval(showRandomQuote, 60000); // rotate quote every 60 sec
      startHearts(); // start hearts after unlock
      
      showToast(`Welcome back, ${key.charAt(0).toUpperCase() + key.slice(1)}! 💕`);
    }, 300);
  } else {
    // Enhanced error feedback
    const passKeyInput = document.getElementById("passKey");
    passKeyInput.style.borderColor = '#ff4757';
    passKeyInput.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
      passKeyInput.style.borderColor = '';
      passKeyInput.style.animation = '';
    }, 500);
    
    alert("Incorrect passkey, Seriously ? 🤔");
  }
}

// ❤️ Your original heart style but enhanced
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = '❤️'; // Keep your original heart emoji
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = Math.random() * 100 + 'vh';
  heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
  heart.style.position = 'fixed';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '1000';
  heart.style.fontSize = (Math.random() * 10 + 15) + 'px'; // Slight size variation
  heart.style.opacity = Math.random() * 0.5 + 0.5; // Opacity variation
  
  document.querySelector('.heart-container') ? 
    document.querySelector('.heart-container').appendChild(heart) : 
    document.body.appendChild(heart);
  
  setTimeout(() => heart.remove(), 5000);
}

function startHearts() {
  setInterval(createHeart, 500); // Keep your original timing
}

// Add CSS animations dynamically
function addAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    @keyframes floatUp {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(-20vh) rotate(180deg); opacity: 0; } 
    }
    
    .toast {
      transition: all 0.3s ease;
    }
    
    #quoteBox {
      transition: opacity 0.3s ease;
    }
    
    #appContent {
      transition: opacity 0.3s ease;
    }
    
    #unlockSection {
      transition: opacity 0.3s ease;
    }
  `;
  document.head.appendChild(style);
}

// Enhanced initialization
window.onload = () => {
  document.getElementById("quoteBox").classList.add("hidden");
  addAnimations();
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case 'Enter':
          e.preventDefault();
          encode();
          break;
        case 'r':
          e.preventDefault();
          decode();
          break;
      }
    }
  });
  
  console.log('🔐 Enhanced Encoder/Decoder loaded! Ctrl+Enter to encode, Ctrl+R to decode');
};: '¤€', '#': '♯♮', '@': '⊙⊚',
  '~': '∼∽', '`': '‛‚', 
  
  // Whitespace and control characters
  '\n': '⏎⤶', '\t': '⇥⇤', '\r': '⏎↵'
};

// Reverse the keyMap for decoding
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

// Enhanced encode function with error handling
function encode() {
  const text = document.getElementById("inputText").value;
  let result = '';
  
  try {
    for (let char of text) {
      if (keyMap.hasOwnProperty(char)) {
        result += keyMap[char];
      } else {
        // Preserve unmapped characters
        result += char;
        console.warn(`Character '${char}' not found in keyMap, preserving as-is`);
      }
    }
    document.getElementById("outputText").value = result;
  } catch (error) {
    console.error('Encoding error:', error);
    alert('Error during encoding. Please try again.');
  }
}

// Enhanced decode function with proper sequence matching
function decode() {
  const text = document.getElementById("inputText").value;
  let result = '';
  let i = 0;
  
  try {
    // Sort reverse keys by length (longest first) for proper matching
    const sortedKeys = Object.keys(reverseKeyMap).sort((a, b) => b.length - a.length);
    
    while (i < text.length) {
      let matched = false;
      
      // Try to match encoded sequences starting with longest
      for (const encodedSequence of sortedKeys) {
        if (text.substring(i, i + encodedSequence.length) === encodedSequence) {
          result += reverseKeyMap[encodedSequence];
          i += encodedSequence.length;
          matched = true;
          break;
        }
      }
      
      // If no match found, preserve the character
      if (!matched) {
        result += text[i];
        i++;
      }
    }
    
    document.getElementById("outputText").value = result;
  } catch (error) {
    console.error('Decoding error:', error);
    alert('Error during decoding. Please check your input.');
  }
}

// Enhanced clipboard functions with better error handling
function copyToClipboard() {
  const output = document.getElementById("outputText");
  
  try {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(output.value).then(() => {
        showToast("Copied to clipboard! 📋");
      }).catch(() => {
        // Fallback to old method
        fallbackCopyToClipboard(output);
      });
    } else {
      // Fallback for older browsers
      fallbackCopyToClipboard(output);
    }
  } catch (error) {
    console.error('Copy error:', error);
    alert("Failed to copy to clipboard.");
  }
}

function fallbackCopyToClipboard(output) {
  output.select();
  output.setSelectionRange(0, 99999);
  const successful = document.execCommand("copy");
  if (successful) {
    showToast("Copied to clipboard! 📋");
  } else {
    alert("Failed to copy to clipboard.");
  }
}

function pasteFromClipboard() {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.readText().then((text) => {
      document.getElementById("inputText").value = text;
      showToast("Pasted from clipboard! 📥");
    }).catch(() => {
      alert("Failed to read clipboard. Please allow permissions or paste manually.");
    });
  } else {
    alert("Clipboard access not available. Please paste manually using Ctrl+V.");
  }
}

// Toast notification system
function showToast(message) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 20px;
    border-radius: 25px;
    font-size: 14px;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Clear functions with confirmation for large text
function clearInput() {
  const inputText = document.getElementById("inputText").value;
  if (inputText.length > 100) {
    if (confirm("You have a lot of text. Are you sure you want to clear it?")) {
      document.getElementById("inputText").value = "";
      showToast("Input cleared! 🗑️");
    }
  } else {
    document.getElementById("inputText").value = "";
    showToast("Input cleared! 🗑️");
  }
}

function clearOutput() {
  const outputText = document.getElementById("outputText").value;
  if (outputText.length > 100) {
    if (confirm("You have a lot of encoded text. Are you sure you want to clear it?")) {
      document.getElementById("outputText").value = "";
      showToast("Output cleared! 🗑️");
    }
  } else {
    document.getElementById("outputText").value = "";
    showToast("Output cleared! 🗑️");
  }
}

// Enhanced quote system with fade animations
function showRandomQuote() {
  const quoteBox = document.getElementById("quoteBox");
  const quote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
  
  // Fade out, change text, fade in
  quoteBox.style.opacity = '0';
  setTimeout(() => {
    quoteBox.textContent = quote;
    quoteBox.style.opacity = '1';
  }, 300);
}

// Enhanced unlock function with smoother transitions
function unlock() {
  const key = document.getElementById("passKey").value.toLowerCase();
  const content = document.getElementById("appContent");
  const unlockSection = document.getElementById("unlockSection");
  const quoteBox = document.getElementById("quoteBox");
  
  if (key === "tiana" || key === "jay") {
    // Smooth transition
    unlockSection.style.opacity = '0';
    setTimeout(() => {
      content.classList.remove("hidden");
      unlockSection.classList.add("hidden");
      quoteBox.classList.remove("hidden");
      content.style.opacity = '0';
      content.style.opacity = '1';
      
      showRandomQuote();
      setInterval(showRandomQuote, 60000); // rotate quote every 60 sec
      startHearts(); // start hearts after unlock
      
      showToast(`Welcome back, ${key.charAt(0).toUpperCase() + key.slice(1)}! 💕`);
    }, 300);
  } else {
    // Enhanced error feedback
    const passKeyInput = document.getElementById("passKey");
    passKeyInput.style.borderColor = '#ff4757';
    passKeyInput.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
      passKeyInput.style.borderColor = '';
      passKeyInput.style.animation = '';
    }, 500);
    
    alert("Incorrect passkey, Seriously ? 🤔");
  }
}

// Enhanced heart system with variety
function createHeart() {
  const hearts = ['❤️', '💕', '💖', '💗', '💘', '💙', '💚', '💛', '💜', '🧡'];
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = '100vh';
  heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
  heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
  heart.style.position = 'fixed';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '1000';
  heart.style.animation = `floatUp ${heart.style.animationDuration} linear forwards`;
  
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

function startHearts() {
  setInterval(createHeart, 800);
}

// Add CSS animations dynamically
function addAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    
    @keyframes floatUp {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    .toast {
      transition: all 0.3s ease;
    }
    
    #quoteBox {
      transition: opacity 0.3s ease;
    }
    
    #appContent {
      transition: opacity 0.3s ease;
    }
    
    #unlockSection {
      transition: opacity 0.3s ease;
    }
  `;
  document.head.appendChild(style);
}

// Enhanced initialization
window.onload = () => {
  document.getElementById("quoteBox").classList.add("hidden");
  addAnimations();
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case 'Enter':
          e.preventDefault();
          encode();
          break;
        case 'r':
          e.preventDefault();
          decode();
          break;
      }
    }
  });
  
  console.log('🔐 Enhanced Encoder/Decoder loaded! Ctrl+Enter to encode, Ctrl+R to decode');
};
