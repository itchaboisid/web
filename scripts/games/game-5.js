const gameSection = document.getElementById("game-section");
const wordDisplay = document.getElementById("word");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const passButton = document.getElementById("pass-button");
const wordCountDisplay = document.getElementById("word-count");
const invalid = document.getElementById("invalid-guess-input");
const words = ["tornado", "typhoon", "earthquake", "floods", "tsunami", "volcano", "fire","emergency","warning","landslide","tsunami","evacuate","disaster","risk","supplies","prevention","calamity","resilience","awareness","forecast","knowledge","safety","rescue","medicine","recovery"];
let invalidTimeout;
let currentWordIndex = 0;
let wordCount = 0;

function skipCurrentWord() {
    currentWordIndex++;
    if (currentWordIndex === words.length) {
        showGameOverScreen(true, gameFive);
        resetGameFive();
    } else {
        displayScrambledWord();
        guessInput.value = "";
        modifyCoins(-10);
    }
}

function scrambleWord(word) {
    let array = word.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

function resetGameFive() {
    currentWordIndex = 0;
    wordCount = 0;
    words.sort(() => Math.random() - 0.5);
    shuffledWords = words.slice();
    displayScrambledWord();
    wordCountDisplay.textContent = wordCount;
    guessInput.focus();
}

function displayScrambledWord() {
    wordDisplay.textContent = scrambleWord(words[currentWordIndex]);
}

function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    const currentWord = words[currentWordIndex];
    if (guess === currentWord) {
        wordCount++;
        wordCountDisplay.textContent = wordCount;
        currentWordIndex++;
        if (currentWordIndex === words.length) {
            showGameOverScreen(true, gameFive);
        } else {
            displayScrambledWord();
            guessInput.value = "";
            correctScore++;
            modifyCoins(20);
        }
    } else {
        clearTimeout(invalidTimeout);
        invalidGuessInput();
    }
    guessInput.focus();
}

window.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

function skipWord() {
    skipCurrentWord();
    displayScrambledWord();
    guessInput.value = "";
    incorrectScore++;
    guessInput.focus();
}

function invalidGuessInput() {
    invalid.style.display = "block";
    invalid.textContent = "Incorrect, please try again.";

    invalidTimeout = setTimeout(() => {
        invalid.textContent = "";
        invalid.style.display = "none";
    }, 3000);
}

guessButton.addEventListener("click", checkGuess);
passButton.addEventListener("click", skipWord);