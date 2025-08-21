const setup = () => {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startGame);
    document.getElementById('playField').addEventListener('click', clickPlayField);
};

let gameOver = false;
let countActiveGames = 0;

const startGame = () => {
    gameOver = false;
    count = 0;
    if (countActiveGames === 0) {
        countActiveGames = 1;
        imageElement.src = "images/" + getRandomImageId() + ".png";
        imageElement.addEventListener('click', clickObject);
        imageElement.style.display = "block";
        countBox.style.display = "block";
        setInterval(changeImagePosition, global.MOVE_DELAY);
    }
};

let imageElement = document.getElementById('target');
let countBox = document.getElementById('countBox');

let global = {
    IMAGE_COUNT: 5,
    IMAGE_SIZE: 48,
    IMAGE_PATH_PREFIX: "images/",
    IMAGE_PATH_SUFFIX: ".png",
    MOVE_DELAY: 3000,
    score: 0,
    timeoutId: 0
};

const getRandomPosition = () => {
    const playField = document.getElementById('playField');
    const playFieldRect = playField.getBoundingClientRect();
    const maxX = playFieldRect.width - global.IMAGE_SIZE;
    const maxY = playFieldRect.height - global.IMAGE_SIZE;
    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);
    return { x: newX, y: newY };
};

const getRandomImageId = () => {
    const randomNumber = Math.floor(Math.random() * 5);
    return randomNumber.toString();
};

let count = 0;
const updateCountBox = () => {
    countBox.innerText = "Score: " + count.toString();
};

const clickObject = (event) => {
    if (!gameOver) {
        event.stopPropagation();
        const newPosition = getRandomPosition();
        imageElement.style.left = newPosition.x + 'px';
        imageElement.style.top = newPosition.y + 'px';

        if (imageElement.src.endsWith("images/0.png")) {
            alert('GAME OVER\nBEHAALDE SCORE: ' + count);
            gameOver = true;
            imageElement.style.display = "none";
            countBox.style.display = "none";
            count = 0;
            countActiveGames = 0;
        } else {
            count++;
            imageElement.src = "images/" + getRandomImageId() + ".png";
        }
        updateCountBox();
    }
};

const clickPlayField = (event) => {
    if (!gameOver) {
        event.stopPropagation();
        if (imageElement.src.endsWith("images/0.png")) {
            changeImagePosition();
            count++;
            imageElement.src = "images/" + getRandomImageId() + ".png";
            updateCountBox();
        }
    }
};

const changeImagePosition = () => {
    if (!gameOver) {
        const newPosition = getRandomPosition();
        imageElement.style.left = newPosition.x + 'px';
        imageElement.style.top = newPosition.y + 'px';
    }
};

window.addEventListener("load", setup);