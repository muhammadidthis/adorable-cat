const canvas = document.querySelector("canvas");
const secondsCount = document.querySelector(".seconds");
const level = document.querySelector(".grade");
const context = canvas.getContext("2d");
const catDimensions = { width: 353 * 1.2, height: 325 * 1.2 };

const levels = {
  5: "Pilgrim",
  10: "Servant",
  15: "lil mew mew",
  35: "Ugly Eunuch",
  65: "Laundry Hoarder",
  105: "Lord of Leftovers",
  150: "Rotten onion smeller",
  250: "Instagram Doomscroller",
  450: "Subreddit Stalker",
  650: "Infinite Snack Muncher",
  1000: "Virtual AFK Champion",
  1500: "Darkmode Incarnate",
  2500: "Panting Gooner",
  3500: "Dark Mode Devotee",
  4500: "Get a life bruh", 
  10500: "Dark Circle Warrior",
  20500: "Supreme Time Waster",
};

const startTime = Date.now();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.translate(window.innerWidth / 2, window.innerHeight / 2);

const image = new Image();
image.src = "caticon3.jpg";

const loopingCats = 40; //
const offsetDistance = 120;
let currentOffset = 0;

const movementRange = 200;

const mouseOffset = {
  x: 0,
  y: 0,
};

const movementOffset = {
  x: 0,
  y: 0,
};

image.onload = () => {
  startLooping();
};

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.translate(window.innerWidth / 2, window.innerHeight / 2);
};

window.addEventListener("mousemove", onMouseMove);

function draw(offset, loopCount) {
  let currentPercentage = (loopingCats - loopCount) / loopingCats;
  context.drawImage(
    image,
    -catDimensions.width / 2 -
      offset / 2 +
      movementOffset.x * currentPercentage,
    -catDimensions.height / 2 -
      offset / 2 +
      movementOffset.y * currentPercentage,
    catDimensions.width + offset,
    catDimensions.height + offset
  );
}

function onMouseMove(e) {
  mouseOffset.x =
    ((e.clientX - window.innerWidth / 2) / window.innerWidth / 2) *
    movementRange;
  mouseOffset.y =
    ((e.clientY - window.innerHeight / 2) / window.innerHeight / 2) *
    movementRange;
}

function lerp(start, end, amount) {
  return start * (1 - amount) + end * amount;
}

function loopDraw() {
  movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.05);
  movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.05);

  for (let i = loopingCats; i >= 1; i--) {
    draw(i * offsetDistance + currentOffset, i);
  }

  draw(offsetDistance, 1);

  currentOffset++;
  if (currentOffset >= offsetDistance) {
    currentOffset = 0;
  }

  const newTime = Math.floor((Date.now() - startTime) / 1000);

  secondsCount.innerText = newTime;

  if (levels[newTime]) {
    level.innerText = levels[newTime];
  }

  requestAnimationFrame(loopDraw);
}

function startLooping() {
  requestAnimationFrame(loopDraw);
}




const catImages = [
  "cat.png",
  "caticon2.jpg", // Replace with your actual image paths
  "caticon3.jpg",
  "caticon4.jpg" , 
  "caticon5.jpg" ,
  "caticon6.jpg" ,
  "caticon7.jpg" ,
  "caticon8.jpg" ,
  "caticon9.jpg" ,
  "caticon10.jpg" ,
  "caticon11.jpeg"
];


let currentImageIndex = 0;
document.addEventListener("click", changeCatImage);

function changeCatImage() {
  // Cycle through the images array
  currentImageIndex = (currentImageIndex + 1) % catImages.length;
  image.src = catImages[currentImageIndex]; // Update the image source
}
