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

    const loveQuotes = [
      "You are my today and all of my tomorrows. — Leo Christopher",
      "I love you not only for what you are, but for what I am when I am with you. — Roy Croft",
      "In all the world, there is no heart for me like yours. — Maya Angelou",
      "You’re nothing short of my everything. — Ralph Block",
      "You had me at hello. — Jerry Maguire"
    ];

    function displayQuote() {
      const quoteBox = document.getElementById("quoteBox");
      const quote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
      quoteBox.innerText = quote;
    }

    window.onload = () => displayQuote();

    const photoUpload = document.getElementById("photoUpload");
    const photoCanvas = document.getElementById("photoCanvas");
    const ctx = photoCanvas.getContext("2d");

    photoUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          ctx.clearRect(0, 0, photoCanvas.width, photoCanvas.height);
          ctx.drawImage(img, 0, 0, photoCanvas.width, photoCanvas.height);
        }
        img.src = event.target.result;
      }
      reader.readAsDataURL(file);
    });
