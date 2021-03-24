const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
];

const gameContainer = document.getElementById('game');

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement('div');

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener('click', handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstColor = false;
let secondColor = false;
let revealedColors = 0;

// TODO: Implement this function!
function handleCardClick(e) {
  //adds CSS style to the DIV clicked
  let currentColor = e.target;
  currentColor.style.backgroundColor = currentColor.classList[0]; //classList indexes are the colors

  //if first picked color or second picked color is true,
  //add class name of revealed
  if (!firstColor || !secondColor) {
    currentColor.classList.add('revealed');
    firstColor = firstColor || currentColor;
    secondColor = currentColor === firstColor ? false : currentColor;
  }

  if (firstColor && secondColor) {
    color1 = firstColor.className;
    color2 = secondColor.className;

    //Event is removed if both colors are the same. Color stays on the screen
    if (color1 === color2) {
      revealedColors += 2;
      firstColor.removeEventListener('click', handleCardClick);
      secondColor.removeEventListener('click', handleCardClick);
      firstColor = false;
      secondColor = false;
    } else {
      setTimeout(function () {
        firstColor.style.backgroundColor = '';
        secondColor.style.backgroundColor = '';
        firstColor.classList.remove('revealed');
        secondColor.classList.remove('revealed');
        firstColor = false;
        secondColor = false;
      }, 1000);
    }
  }
  if (revealedColors === COLORS.length) alert('GAME OVER');
}

// when the DOM loads
createDivsForColors(shuffledColors);
