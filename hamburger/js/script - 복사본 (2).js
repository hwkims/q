const orderTicketData = [
  {
    name: 'Cheeseburger',
    ingredients: generateRandomIngredients(),
  },
  {
    name: 'Cheeseburger',
    ingredients: generateRandomIngredients(),
  },
  {
    name: 'Cheeseburger',
    ingredients: generateRandomIngredients(),
  },
  {
    name: 'Hamburger',
    ingredients: generateRandomIngredients(),
  },
  {
    name: 'Hamburger',
    ingredients: generateRandomIngredients(),
  },
  {
    name: 'Hamburger',
    ingredients: generateRandomIngredients(),
  },
  {
    name: 'Veggie Burger',
    ingredients: generateRandomIngredients(),
  },
  {
    name: 'Veggie Burger',
    ingredients: generateRandomIngredients(),
  },
  {
    name: 'Veggie Burger',
    ingredients: generateRandomIngredients(),
  },
  {
    name: 'Veggie Burger',
    ingredients: generateRandomIngredients(),
  },
];
function generateRandomIngredients() {
  const ingredientOptions = ['Meat', 'Cheese', 'Lettuce', 'Tomato'];
  const numIngredients = Math.floor(Math.random() * 5) + 2; // 2 to 6 ingredients
  const ingredients = [];

  for (let i = 0; i < numIngredients; i++) {
    const ingredient = ingredientOptions[Math.floor(Math.random() * ingredientOptions.length)];
    ingredients.push(ingredient);
  }

  // Add upBread and downBread to the beginning and end
  ingredients.unshift('downBread');
  ingredients.push('upBread');

  return ingredients;
}

const ingredients = [
    {
      name: 'upBread',
      imageColor: './images/upBread.png',
      image2: './images/upBread2.png',
    },

    {
      name: 'Cheese',
      imageColor: './images/cheese.png',
      image2: './images/cheese2.png',
    },    
    {
      name: 'Meat',
      imageColor: './images/patty.png',
      image2: './images/patty2.png',
    },
    {
      name: 'downBread',
      imageColor: './images/downBread.png',
      image2: './images/downBread2.png',
    },
    {
      name: 'Lettuce',
      imageColor: './images/lettuce.png',
      image2: './images/lettuce2.png',
    },
    {
      name: 'Tomato',
      imageColor: './images/tomato.png',
      image2: './images/tomato2.png',
    },
]

const startPopup = document.getElementById('start-popup');
const startPopupContentParagraph = startPopup.children[0];
const startButton = document.getElementById('start-button');
const score = document.getElementById('score');
const orderTicketsDiv = document.getElementById('order-tickets');
const ingredientImageDivs = document.getElementsByClassName('ingredient-image-container');

startButton.addEventListener('click', hideStartPopup);
startButton.addEventListener('click', startGame);


function showStartPopup() {
  startPopup.style.display = 'flex';
}

function hideStartPopup() {
  startPopup.style.display = 'none';
}

function shuffle(array) {

  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 != currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function randomlyPlaceIngredientImages() {
  for (i = 0; i < ingredientImageDivs.length; i++) {
    let imageDiv = document.createElement('div');
    imageDiv.name = ingredients[i].name;
    imageDiv.style.backgroundImage = 'url(' + ingredients[i].imageColor + ')';
    imageDiv.className = 'ingredient';
    ingredientImageDivs[i].appendChild(imageDiv);
    ingredientImageDivs[i].addEventListener('click', crossOffItem);
    ingredientImageDivs[i].addEventListener('click', switchOrderTicket);
  }
}

function createRandomOrderTicket() {
  let shuffledOrderTickets = shuffle(orderTicketData.slice());
  let randomTicket = shuffledOrderTickets.pop();

  let orderTicket = document.createElement('div');
  orderTicket.className = 'order-ticket';

  let ingredientsUL = document.createElement('ul');
  ingredientsUL.className = 'recipe-items';
  orderTicket.appendChild(ingredientsUL);

  // Reverse the order of the ingredients when displaying them
  for (let i = randomTicket.ingredients.length - 1; i >= 0; i--) {
    let ingredientLI = document.createElement('li');
    ingredientLI.textContent = randomTicket.ingredients[i];
    ingredientsUL.appendChild(ingredientLI);
  }
  orderTicketsDiv.appendChild(orderTicket);
}

let currentIngredientIndex = 0;
function crossOffItem(event) {
  let clickedIngredient = event.target;
  let activeOrderTicket = document.getElementById('active-ticket');
  let orderIngredientsList = activeOrderTicket.children[0].children;

  // Update the currentIngredientIndex to start from the bottom
  let lastIndex = orderIngredientsList.length - 1;
  if (orderIngredientsList[lastIndex - currentIngredientIndex].textContent === clickedIngredient.name) {
    let ingredientImage = ingredients.find(ingredient => ingredient.name === clickedIngredient.name);
    orderIngredientsList[lastIndex - currentIngredientIndex].style.backgroundImage = `url(${ingredientImage.image2})`;
    orderIngredientsList[lastIndex - currentIngredientIndex].style.backgroundSize = 'contain';
    orderIngredientsList[lastIndex - currentIngredientIndex].style.backgroundRepeat = 'no-repeat';
    currentIngredientIndex++;
  }
}


function isListComplete() {
  let activeOrderTicket = document.getElementById('active-ticket');
  let activeListItems = Array.from(activeOrderTicket.children[0].children);

  function isItemCrossedOut(listItem) {
    return listItem.style.backgroundImage !== '';
  }

  if (activeListItems.every(isItemCrossedOut)) {
    console.log('List is complete!');
    return true;
  }
  console.log('List is not complete yet...');
  return false;
}


function distributeTicketSpacing() {
    let orderTickets = document.querySelectorAll('.order-ticket');
    // Move position of all tickets

    orderTickets.forEach((ticket1,i1) => {
      ticket1.style.left = i1 * 210 + 'px';
    });
}

function switchOrderTicket() {
  if (isListComplete()) {
    console.log('Switching to new order ticket...');
    createRandomOrderTicket();
    orderTicketsDiv.children[0].remove();
    orderTicketsDiv.children[0].setAttribute('id', 'active-ticket');
    distributeTicketSpacing();
    score.children[0].textContent = parseInt(score.children[0].textContent) + currentIngredientIndex;
    currentIngredientIndex = 0;
  }
}

function tallyScore() {
  let scoreText = document.createElement('p');
  scoreText.textContent = `${score.children[0].textContent}`;
  startPopupContentParagraph.insertBefore(scoreText, startButton);
}


function runClock(duration) {
  let timeRemaining = duration;
  let clockElement = document.getElementById('clock');
  let timerId = setInterval(countdown, 10);


  function countdown() {
    if (timeRemaining == 0) {
      clockElement.textContent = `00:00`;
      clearTimeout(timerId);
      tallyScore();
      showStartPopup();
      for (let i = 0; i < ingredientImageDivs.length; i++) {
        ingredientImageDivs[i].removeEventListener('click', crossOffItem);
        ingredientImageDivs[i].removeEventListener('click', switchOrderTicket);
      };
      startButton.addEventListener('click', startGame);

    } else {
      let minutes = Math.floor(timeRemaining / 100);
      let seconds = timeRemaining % 100;
      clockElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      timeRemaining--;
    }
  }
}

function resetGame() {
  let ingredientDivs = document.getElementsByClassName('ingredient');

  // Remove all order tickets left over from previous game
  for (i = 0; i < orderTicketsDiv.children.length; i++) {
    orderTicketsDiv.children[i].remove();
  }
  // Remove score left over from previous game
  if (score.children[0]) {
    score.children[0].remove();
  }

  // Remove ingredients left over from previous game
  if (ingredientDivs) {
    for (i = ingredientDivs.length -1 ; i >= 0; i--) {
      ingredientDivs[i].remove();
    }
  }

  // Remove score from start popup modal
  if (startPopupContentParagraph.children.length > 1) {
    startPopupContentParagraph.children[0].remove();
  }
}

function startGame() {

  resetGame();

  let activeOrderTicket;
  let ingredientDivs = document.getElementsByClassName('ingredient');
  let startingScore = document.createElement('div');

  startingScore.textContent = 0;
  score.appendChild(startingScore);

  runClock(60*100);
  randomlyPlaceIngredientImages();

  // Make three new order tickets
  createRandomOrderTicket();
  createRandomOrderTicket();
  createRandomOrderTicket();

  distributeTicketSpacing();

  // Make the first ticket active
  orderTicketsDiv.children[0].setAttribute('id', 'active-ticket');
  activeOrderTicket = document.getElementById('active-ticket');
}

// Start start popup on page load
showStartPopup();
