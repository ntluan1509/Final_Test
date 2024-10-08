const images = [
    'image/bau.png',
    'image/cua.png',
    'image/tom.png',
    'image/ca.png',
    'image/nai.png',
    'image/ga.png'
];

let shuffleInterval;
let bets = 0;

function startShuffle() {
    disableButtons(true);
    const displayItems = document.querySelectorAll('.game-display div img');
    displayItems.forEach(shuffleImage);
    setTimeout(() => {
        displayResult();
        disableButtons(false);
    }, 1000);
}

function shuffleImage(img) {
    let iterations = 0;
    const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        img.src = images[randomIndex];
        iterations++;
        if (iterations >= 100) {
            clearInterval(interval);
            disableButtons(false);
        }
    }, 10); 
}

function displayResult() {
    const displayItems = document.querySelectorAll('.game-display div img');
    const results = [];
    displayItems.forEach(img => results.push(img.alt));
    console.log("Kết quả quay:", results);
    compareResults(results);
}

function compareResults(results) {
    const betsArray = [];
    const betImages = document.querySelectorAll('.game-display .image-items-container');
    betImages.forEach(item => {
        const img = item.querySelector('img');
        const betCount = parseInt(item.querySelector('p').textContent);
        if (betCount > 0) {
            for (let i = 0; i < betCount; i++) {
                betsArray.push(img.alt);
            }
        }
    });

    console.log("Lượt cược của bạn:", betsArray.map(bet => `${bet.name} (${bet.count})`).join(", "));

    let correctGuesses = [];
    let incorrectGuesses = [];

    betsArray.forEach(bet => {
        if (results.includes(bet.name)) {
            correctGuesses.push(`${bet.name} (${bet.count})`);
        } else {
            incorrectGuesses.push(`${bet.name} (${bet.count})`);
        }
    });

    if (correctGuesses.length > 0) {
        console.log(`Bạn đã đoán đúng với kết quả: ${correctGuesses.join(", ")}`);
    } else {
        console.log(`Bạn đã đoán sai với kết quả: ${incorrectGuesses.join(", ")}`);
    }
}


function placeBet(element) {
    const betCount = element.querySelector('p');
    const currentBet = parseInt(betCount.textContent);
    if (bets < 3) {
        betCount.textContent = currentBet + 1;
        bets++;
    }
}

function resetBets() {
    const betCounts = document.querySelectorAll('.game-display .image-items-container p');
    betCounts.forEach( p => p.textContent = '0');
    bets = 0;
}

function disableButtons(disable) {
    document.getElementById('start-button').disabled = disable;
    document.getElementById('reset-button').disabled = disable;
    const betImages = document.querySelectorAll('.game-display .image-items-container');
    betImages.forEach(img => img.style.pointerEvents = disable ? 'none' : 'auto');
}
