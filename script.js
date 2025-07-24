// 1:1 Character mapping using Greek letters and basic symbols (device compatible)
const keyMap = {
  // Lowercase letters - Greek letters
  'a': 'α', 'b': 'β', 'c': 'γ', 'd': 'δ', 'e': 'ε',
  'f': 'ζ', 'g': 'η', 'h': 'θ', 'i': 'ι', 'j': 'κ',
  'k': 'λ', 'l': 'μ', 'm': 'ν', 'n': 'ξ', 'o': 'ο',
  'p': 'π', 'q': 'ρ', 'r': 'σ', 's': 'τ', 't': 'υ',
  'u': 'φ', 'v': 'χ', 'w': 'ψ', 'x': 'ω', 'y': 'ϊ', 'z': 'ϋ',
  
  // Uppercase letters - Greek uppercase
  'A': 'Α', 'B': 'Β', 'C': 'Γ', 'D': 'Δ', 'E': 'Ε',
  'F': 'Ζ', 'G': 'Η', 'H': 'Θ', 'I': 'Ι', 'J': 'Κ',
  'K': 'Λ', 'L': 'Μ', 'M': 'Ν', 'N': 'Ξ', 'O': 'Ο',
  'P': 'Π', 'Q': 'Ρ', 'R': 'Σ', 'S': 'Τ', 'T': 'Υ',
  'U': 'Φ', 'V': 'Χ', 'W': 'Ψ', 'X': 'Ω', 'Y': 'Ϊ', 'Z': 'Ϋ',
  
  // Numbers - Basic math symbols (backward compatible)
  '0': '⊕', '1': '⊖', '2': '⊗', '3': '⊘', '4': '⊙',
  '5': '⊚', '6': '⊛', '7': '⊜', '8': '⊝', '9': '⊞',
  
  // Special characters - Basic symbols (compatible)
  ' ': '◊', '.': '●', ',': '▲', '!': '★', '?': '♦',
  "'": '◄', '"': '♠', ':': '※', ';': '⚡', 
  '(': '〚', ')': '【', '[': '⟨', ']': '⦃', 
  '{': '⟦', '}': '⦗', '-': '═', '_': '▁',
  '+': '⊕', '=': '≡', '\\': '⟍', '/': '⧸',
  '|': '║', '&': '⊼', '*': '⋆', '^': '↑',
  '%': '‰', '$': '¤', '#': '♯', '@': '⊙',
  '~': '∼', '`': '‛', 
  
  // Whitespace and control characters
  '\n': '⏎', '\t': '⇥', '\r': '⤶'
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

// Enhanced romantic heart system with slower, more vibrant floating
function createHeart() {
  const romanticHearts = [
    '❤️', '💕', '💖', '💗', '💘', '💙', '💚', '💛', '💜', '🧡',
    '💝', '💟', '💌', '🌹', '🌺', '🌸', '🌷', '💐', '✨', '💫',
    '⭐', '🌟', '💎', '🦋', '🎀', '💍', '👑', '🔮'
  ];
  
  const heart = document.createElement('div');
  heart.className = 'romantic-heart';
  heart.textContent = romanticHearts[Math.floor(Math.random() * romanticHearts.length)];
  
  // Random starting position
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = '110vh';
  
  // Varied sizes for depth (20-40px)
  const size = Math.random() * 20 + 20;
  heart.style.fontSize = size + 'px';
  
  // Much slower, more romantic floating (10-18 seconds)
  const duration = Math.random() * 8 + 10;
  heart.style.animationDuration = duration + 's';
  
  // Random horizontal drift for natural movement
  const drift = (Math.random() - 0.5) * 150;
  
  // Enhanced styling for romance and compatibility
  heart.style.position = 'fixed';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '1000';
  heart.style.opacity = '0.9';
  heart.style.textShadow = '0 0 8px rgba(255, 182, 193, 0.7)';
  
  // Custom keyframe animation for romantic floating
  heart.style.animation = `romanticFloat ${duration}s ease-out forwards`;
  heart.style.setProperty('--drift', drift + 'px');
  
  document.body.appendChild(heart);
  
  // Remove after animation completes
  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove();
    }
  }, duration * 1000 + 1000);
}

function startHearts() {
  // Create hearts every 1.2-2 seconds for romantic elegance
  setInterval(createHeart, 1200 + Math.random() * 800);
}

// Add enhanced CSS animations for romantic hearts
function addRomanticAnimations() {
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
    
    @keyframes romanticFloat {
      0% { 
        transform: translateY(0) translateX(0) rotate(0deg) scale(0.7); 
        opacity: 0.8; 
      }
      5% {
        opacity: 1;
        transform: translateY(-5vh) translateX(calc(var(--drift) * 0.05)) rotate(10deg) scale(1);
      }
      25% {
        transform: translateY(-25vh) translateX(calc(var(--drift) * 0.25)) rotate(90deg) scale(1.1);
        opacity: 1;
      }
      50% {
        transform: translateY(-50vh) translateX(calc(var(--drift) * 0.5)) rotate(180deg) scale(1.2);
        opacity: 1;
      }
      75% {
        transform: translateY(-75vh) translateX(calc(var(--drift) * 0.75)) rotate(270deg) scale(1.1);
        opacity: 0.9;
      }
      95% {
        transform: translateY(-95vh) translateX(calc(var(--drift) * 0.95)) rotate(350deg) scale(0.8);
        opacity: 0.5;
      }
      100% { 
        transform: translateY(-110vh) translateX(var(--drift)) rotate(360deg) scale(0.5); 
        opacity: 0; 
      }
    }
    
    .romantic-heart {
      will-change: transform, opacity;
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
  addRomanticAnimations();
  
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
