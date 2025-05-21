const keyMap = {
  'q':'a','w':'b','e':'c','r':'d','t':'e','y':'f','u':'g','i':'h','o':'i','p':'j',
  'a':'k','s':'l','d':'m','f':'n','g':'o','h':'p','j':'q','k':'r','l':'s',';':'t',
  'z':'u','x':'v','c':'w','v':'x','b':'y','n':'z','m':' ', ' ':'m',
  '1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','0':'0',
  '-':'-','=':'='
};

const reverseKeyMap = Object.fromEntries(Object.entries(keyMap).map(([k, v]) => [v, k]));

function encode() {
  const text = document.getElementById("inputText").value.toLowerCase();
  let result = '';
  for (let char of text) {
    result += reverseKeyMap[char] ?? char;
  }
  document.getElementById("outputText").value = result;
}

function decode() {
  const text = document.getElementById("inputText").value.toLowerCase();
  let result = '';
  for (let char of text) {
    result += keyMap[char] ?? char;
  }
  document.getElementById("outputText").value = result;
}

// The rest of your code (loveQuotes, displayQuote, photoUpload) remains the same
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
