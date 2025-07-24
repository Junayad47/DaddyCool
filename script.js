// Case-sensitive character mapping - Complete Enhanced Security Version
const keyMap = {
  // Lowercase letters - Complex Greek mathematical sequences
  'a': 'Φ7x9ε2', 'b': 'Ω3δ8μ1', 'c': 'Ψ5λ6π4', 'd': 'Ξ9σ3τ7', 'e': 'Θ2ρ1φ8',
  'f': 'Λ6ω4ν9', 'g': 'Π8χ2ψ5', 'h': 'Σ1ξ7θ3', 'i': 'Υ4β9ζ6', 'j': 'Φ7η2κ1',
  'k': 'Ω9γ5α8', 'l': 'Ψ3ι6ε4', 'm': 'Ξ8μ1ο7', 'n': 'Θ5π9υ2', 'o': 'Λ2ρ4σ6',
  'p': 'Π7τ8φ3', 'q': 'Σ1χ5ψ9', 'r': 'Υ6ω2ξ4', 's': 'Φ9α7β1', 't': 'Ω4γ3δ8',
  'u': 'Ψ8ε5ζ2', 'v': 'Ξ3η6θ7', 'w': 'Θ1ι4κ9', 'x': 'Λ7λ2μ5', 'y': 'Π6ν8ο3',
  'z': 'Σ2π1ρ4',
  
  // Uppercase letters - Double-encoded with Greek prefixes/suffixes
  'A': 'ΦΩ7x9ε2Ψ', 'B': 'ΞΘ3δ8μ1Λ', 'C': 'ΠΣ5λ6π4Υ', 'D': 'ΦΩ9σ3τ7Ψ', 'E': 'ΞΘ2ρ1φ8Λ',
  'F': 'ΠΣ6ω4ν9Υ', 'G': 'ΦΩ8χ2ψ5Ψ', 'H': 'ΞΘ1ξ7θ3Λ', 'I': 'ΠΣ4β9ζ6Υ', 'J': 'ΦΩ7η2κ1Ψ',
  'K': 'ΞΘ9γ5α8Λ', 'L': 'ΠΣ3ι6ε4Υ', 'M': 'ΦΩ8μ1ο7Ψ', 'N': 'ΞΘ5π9υ2Λ', 'O': 'ΠΣ2ρ4σ6Υ',
  'P': 'ΦΩ7τ8φ3Ψ', 'Q': 'ΞΘ1χ5ψ9Λ', 'R': 'ΠΣ6ω2ξ4Υ', 'S': 'ΦΩ9α7β1Ψ', 'T': 'ΞΘ4γ3δ8Λ',
  'U': 'ΠΣ8ε5ζ2Υ', 'V': 'ΦΩ3η6θ7Ψ', 'W': 'ΞΘ1ι4κ9Λ', 'X': 'ΠΣ7λ2μ5Υ', 'Y': 'ΦΩ6ν8ο3Ψ',
  'Z': 'ΞΘ2π1ρ4Λ',
  
  // Numbers - Ancient mathematical symbol combinations
  '0': '∅∞0∇∆', '1': '∫∮1∂∆', '2': '∑∏2∇∅', '3': '∀∃3∂∫', '4': '∈∉4∮∑',
  '5': '∪∩5∏∀', '6': '⊂⊃6∃∈', '7': '⊆⊇7∉∪', '8': '⊊⊋8∩⊂', '9': '⊓⊔9⊃⊆',
  
  // Special characters - Complex Unicode sequences  
  ' ': '◊◈◇◆◊', '.': '●○◐◑◒', ',': '▲△▼▽▲', '!': '★☆⭐✦★', '?': '♦♢♧♡♦',
  "'": '◄►▲▼◄', '"': '♠♣♥♦♠', ':': '※‡‰‱※', ';': '⚡⚠⚡⚠⚡', 
  '(': '〚〛〈〉〚', ')': '【】〖〗【', '[': '⟨⟩⟪⟫⟨', ']': '⦃⦄⦅⦆⦃', 
  '{': '⟦⟧⟨⟩⟦', '}': '⦗⦘⦙⦚⦗', '-': '═══╤═══', '_': '▁▂▃▄▁',
  '+': '⊕⊖⊗⊘⊕', '=': '≡≢≣≤≡', '\\': '⟍⟍⟍⟍⟍', '/': '⧸⧹⟋⟍⧸',
  '|': '║│┃┆║', '&': '⊼⊽⊾⊿⊼', '*': '⋆✱✲✳⋆', '^': '↑↗→↘↑',
  '%': '‰‱℅％‰', '$': '¤$€£¤', '#': '♯♮♭♯♮', '@': '⊙⊚⊛⊜⊙',
  '~': '∼∽∾≁∼', '`': '‛‚„‟‛', 
  
  // Whitespace and control characters
  '\n': '⏎⏎⏎⏎⏎', '\t': '⇥⇥⇥⇥⇥', '\r': '⏎⤶⏎⤶⏎'
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
