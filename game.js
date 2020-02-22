// Start button
const startGameButton = document.getElementById('start-game');

class Game {
    constructor(round = 1,nextCard = 0, cards) {
        this.round = round
        this.nextCard = nextCard
        this.computerPlayer = new Player()
        this.humanPlayer = new Human()
        this.cards = cards
        this.shuffleCards()
        // this.assignCards()
    }
    advanceRound() {
        this.round++;
    }
    advanceCard() {
        this.nextCard += 1;
    }
    shuffleCards(array = deck) {
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
    updateCurrentCards() {
        game.humanPlayer.currentCard += 2;
        game.computerPlayer.currentCard += 2;
        console.log(`player card: ${game.humanPlayer.currentCard}`);
        console.log(`computer card: ${game.computerPlayer.currentCard}`);
    }

    // assignCards () {
    //     this.humanPlayer.cards.push(randomCard)
    // }
}

class Player {
    constructor(points = 0, currentCard = 1) {
        this.points = points
        this.currentCard = currentCard
    }
    winRound() {
        this.points++;
    }
}

class Human extends Player {
    constructor(points = 0, currentCard = 0, name) {
        super(points, currentCard)
        this.name = name
    }
}

const game = new Game(1, 0, deck);

startGameButton.addEventListener('click', () => {
    if (document.getElementById('player-name').value === '') {
        // Alert if no name is entered
        alert('Please insert a name to begin');
    } else {
        // Read out player name
        game.humanPlayer.name = document.getElementById('player-name').value;
        // Hide Start screen and show the game screen
        document.querySelector('.start-container').classList.add('hidden');
        document.querySelector('.container').classList.remove('hidden');
        displayName(game.humanPlayer.name);
        renderCard('player');
    }
});

// Display player name in the game status bar
const displayName = name => {
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
    cardTitle.innerHTML = game.cards[game.nextCard].title;

    const bgContainer = card.querySelector('.top-container');
    bgContainer.style.backgroundImage = `url(./img/${game.cards[game.nextCard].img})`;

    const sweetnessValue = card.querySelector('.sweetness-value');
    sweetnessValue.innerHTML = game.cards[game.nextCard].sweetness;

    const nutritionValue = card.querySelector('.nutrition-value');
    nutritionValue.innerHTML = game.cards[game.nextCard].nutrition;

    const fryValue = card.querySelector('.fry-value');
    fryValue.innerHTML = game.cards[game.nextCard].fry;

    // +1 on the nextCard variable
    game.advanceCard();

    // Add event listeners on the properties. Once clicked, the computer's card is revealed the scores are compared.
    const choice = document.querySelector('.properties');
    choice.addEventListener('click', e => {
        console.log(e.target.className)
        flipComputerCard();
        if (e.target.className === 'prop-row-sweet') {
            document.querySelector(".prop-row-sweet").classList.add("selected");
            compareValues('sweetness');
        } else if (e.target.className === 'prop-row-nutrition') {
            compareValues('nutrition');
            document.querySelector(".prop-row-nutrition").classList.add("selected");
        } else if (e.target.className === 'prop-row-deepfry') {
            document.querySelector(".prop-row-deepfry").classList.add("selected");
            compareValues('fry');
        }
        updatePointsPanels();
    });
}

// Insert card on the computer side
function flipComputerCard() {
    const computerCard = document.querySelector('.computer-side');
    computerCard.querySelector('.card-back').remove();
    renderCard('computer');
}

// Update the points on the status panel
function updatePointsPanels() {
    playerPointsDisplay = document.querySelector('.player-points-display')
    playerPointsDisplay.innerText = `${game.humanPlayer.points}`;
    computerPointsDisplay = document.querySelector('.computer-points-display')
    computerPointsDisplay.innerText = `${game.computerPlayer.points}`;
}

// Check who scored higher on the given dimension
function compareValues(dimension) {
    if (game.cards[game.humanPlayer.currentCard][dimension] > game.cards[game.computerPlayer.currentCard][dimension]) {
        game.humanPlayer.points++;
        showResults('Lekker, you won this round.');
    } else if (game.cards[game.humanPlayer.currentCard][dimension] < game.cards[game.computerPlayer.currentCard][dimension]) {
        game.computerPlayer.points++;
        showResults('You lost this round.');
    } else {
        showResults('There is no winner this round.');
    }
}

// Display message depending on round count
function showResults(message) {
    var h = document.querySelector(`.game-screen`);
    if (game.round <= 4) {
        h.insertAdjacentHTML("afterbegin", `<div class="results">
        ${message}
        <button class='next-round'>Next round</button>
    </div>`)
        const nextRoundButton = document.querySelector('.next-round');
        nextRoundButton.addEventListener('click', () => {
            newRound();
        });
    } else if (game.round > 4 && game.humanPlayer.points > game.computerPlayer.points) {
        h.insertAdjacentHTML("afterbegin", `<div class="results-big">
        ${message}<br />
        <h1>${game.humanPlayer.name}, you won the game!</h1>
        <img src="./img/winner.gif" alt="">
        
        <br /><button class="restart">Restart the game</button>
    </div>`)
        const restartButton = document.querySelector('.restart');
        restartButton.addEventListener('click', () => {
            location.reload();
        });
    }
    else if (game.round > 4 && game.humanPlayer.points < game.computerPlayer.points) {
        h.insertAdjacentHTML("afterbegin", `<div class="results-big">
        ${message}<br />
        <h1>${game.humanPlayer.name}, you lost the game!</h1>
        <img src="./img/loser.gif" alt="">
        
        <br /><button class="restart">Restart the game</button>
    </div>`)
        const restartButton = document.querySelector('.restart');
        restartButton.addEventListener('click', () => {
            location.reload();
        });
    }
    else if (game.round > 4 && game.humanPlayer.points === game.computerPlayer.points) {
        h.insertAdjacentHTML("afterbegin", `<div class="results-big">
        ${message}<br />
        <h1>There is no overall winner.</h1>
        <img src="./img/giphy-obama.gif" alt="">
        
        <br /><button class="restart">Restart the game</button>
    </div>`)
        const restartButton = document.querySelector('.restart');
        restartButton.addEventListener('click', () => {
            location.reload();
        });
    }
};

// New round: Refresh game screen
function newRound() {
    game.updateCurrentCards();
    game.round++;
    var gameScreen = document.querySelector('.game-screen');
    gameScreen.innerHTML = `            <div class="player-side">
    <!-- This is where the card will be placed -->
</div>

<div class="computer-side">
    <div class="card-back"></div>
</div>`;
    renderCard('player');

    const roundDisplay = document.querySelector('.round-display');
    roundDisplay.innerHTML = `${game.round}`
};