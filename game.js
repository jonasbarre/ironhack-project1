// class Player {
//     constructor(points) {
//         this.points = points
//     }
//     attack() {
//         return this.strength
//     }
//     receiveDamage(damage) {
//         this.health = this.health - damage
//     }
//   }






// Start button
const startGameButton = document.getElementById('start-game');

// First, let's shuffle the cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

cardStack = shuffle(cards);

// Utilities
currentCard = 0;
playerCard = 0;
computerCard = 1;
playerPoints = 0;
computerPoints = 0;
currentRound = 1;

function advanceCard() {
    currentCard += 1;
    console.log(`currentcard: ${currentCard}`);
}

function updateCurrentCards() {
    playerCard += 2;
    computerCard += 2;
    console.log(`player card: ${playerCard}`);
    console.log(`computer card: ${computerCard}`);
}



startGameButton.addEventListener('click', () => {
    if (document.getElementById('player-name').value === '') {
        // Alert if no name is entered
        alert('Please insert a name to begin');
    } else {
        // Read out player name
        let playerName = document.getElementById('player-name').value;
        // Hide Start screen and show the game screen
        document.querySelector('.start-container').classList.add('hidden');
        document.querySelector('.container').classList.remove('hidden');
        displayName(playerName);
        renderCard('player');
    }
});

// Display player name in the game status bar
function displayName(name) {
    const playerNameDisplay = document.querySelector('.player-name-display');
    playerNameDisplay.innerText = name;
}

// Inserts a card on either player or computer side
function renderCard(player) {
    var h = document.querySelector(`.${player}-side`);
    h.insertAdjacentHTML("beforeend", `
    <div class="card-front">
    <div class="top-container">
    <div class="card-title"></div>
</div>

    <div class="properties">
        <div class="prop-row-sweet">
            <div class="swt">
                <div class="prop-label">Sweetness</div>
                <div class="sweetness-value"></div>
            </div>
        </div>

        <div class="prop-row-nutrition">
            <div class="ntr">
                <div class="prop-label">Nutrition</div>
                <div class="nutrition-value"></div>
            </div>
        </div>

        <div class="prop-row-deepfry">
            <div class="fr">
                <div class="prop-label">Deep-fry level</div>
                <div class="fry-value"></div>
            </div>
        </div>
    </div>
    </div>`);

    const card = document.querySelector(`.${player}-side .card-front`);

    const cardTitle = card.querySelector('.card-title');
    cardTitle.innerHTML = cardStack[currentCard].title;

    const bgContainer = card.querySelector('.top-container');
    bgContainer.style.backgroundImage = `url(./img/${cardStack[currentCard].img})`;

    const sweetnessValue = card.querySelector('.sweetness-value');
    sweetnessValue.innerHTML = cardStack[currentCard].sweetness;

    const nutritionValue = card.querySelector('.nutrition-value');
    nutritionValue.innerHTML = cardStack[currentCard].nutrition;

    const fryValue = card.querySelector('.fry-value');
    fryValue.innerHTML = cardStack[currentCard].fry;

    // +1 on the currentCard variable
    advanceCard();

    // Add event listeners on each property. Once clicked, the computer's card is revealed the scores are compared.
    const choice1 = document.querySelector('.prop-row-sweet');
    choice1.addEventListener('click', () => {
        showComputerCard();
        compareSweetness();
        updatePointsPanels();
    })

    const choice2 = document.querySelector('.prop-row-nutrition');
    choice2.addEventListener('click', () => {
        showComputerCard();
        compareNutrition();
        updatePointsPanels();
    })

    const choice3 = document.querySelector('.prop-row-deepfry');
    choice3.addEventListener('click', () => {
        showComputerCard();
        compareDeepfry();
        updatePointsPanels();
    })
}

// Insert card on the computer side
function showComputerCard() {
    const computerCard = document.querySelector('.computer-side');
    computerCard.querySelector('.card-back').remove();
    renderCard('computer');
}

// Update the points on the status panel
function updatePointsPanels() {
    playerPointsDisplay = document.querySelector('.player-points-display')
    playerPointsDisplay.innerText = `${playerPoints}`;
    computerPointsDisplay = document.querySelector('.computer-points-display')
    computerPointsDisplay.innerText = `${computerPoints}`;
}

// Check who scored higher on sweetness
function compareSweetness() {
    if (cardStack[playerCard].sweetness > cardStack[computerCard].sweetness) {
        showResults('Lekker, you won!');
        playerPoints++;
    } else if (cardStack[playerCard].sweetness < cardStack[computerCard].sweetness) {
        showResults('You lost.');
        computerPoints++;
    } else {
        showResults('You have met your equal!');
    }
}

// Check who scored higher on nutrition
function compareNutrition() {
    if (cardStack[playerCard].nutrition > cardStack[computerCard].nutrition) {
        showResults('Lekker, you won!');
        playerPoints++;
    } else if (cardStack[playerCard].nutrition < cardStack[computerCard].nutrition) {
        showResults('You lost.');
        computerPoints++;
    } else {
        showResults('You have met your equal!');
    }
}

// Check who scored higher on deepfry
function compareDeepfry() {
    if (cardStack[playerCard].fry > cardStack[computerCard].fry) {
        showResults('Lekker, you won!');
        playerPoints++;
    } else if (cardStack[playerCard].fry < cardStack[computerCard].fry) {
        showResults('You lost.');
        computerPoints++;
    } else {
        showResults('You have met your equal!');
    }
}

// Display message depending on round count
function showResults(message) {
    var h = document.querySelector(`.game-screen`);
    if (currentRound <= 4) {
        h.insertAdjacentHTML("afterbegin", `<div class="results">
        ${message}
        <button class='next-round'>Next round</button>
    </div>`)
        const nextRoundButton = document.querySelector('.next-round');
        nextRoundButton.addEventListener('click', () => {
            newRound();
        });
    } else {
        h.insertAdjacentHTML("afterbegin", `<div class="results">
        The game is over! 
    </div>`)
    }
};

// New round: Refresh game screen
function newRound() {
    updateCurrentCards();
    currentRound++;
    var gameScreen = document.querySelector('.game-screen');
    gameScreen.innerHTML = `            <div class="player-side">
    <!-- This is where the card will be placed -->
</div>

<div class="computer-side">
    <div class="card-back"></div>
</div>`;
    renderCard('player');

    const roundDisplay = document.querySelector('.round-display');
    roundDisplay.innerHTML = `${currentRound}`
};