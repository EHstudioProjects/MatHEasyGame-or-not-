// --- Elementos del DOM ---
const loadingScreen = document.getElementById('loading-screen');
const menuScreen = document.getElementById('menu-screen');
const optionsScreen = document.getElementById('options-screen');
const gameContainer = document.getElementById('game-container');
const resultScreen = document.getElementById('result-screen');

const startGameBtn = document.getElementById('startGameBtn');
const optionsBtn = document.getElementById('optionsBtn');
const backToMenuBtn = document.getElementById('backToMenuBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

const mathProblemEl = document.getElementById('mathProblem');
const answerInput = document.getElementById('answerInput');
const livesEl = document.getElementById('lives');
const timerEl = document.getElementById('timer');
const resultTitleEl = document.getElementById('resultTitle');
const resultMessageEl = document.getElementById('resultMessage');

const volumeControl = document.getElementById('volume');
const languageControl = document.getElementById('language');
const muteMusicControl = document.getElementById('muteMusic');

// --- Sonidos y Música ---
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const audioBuffers = {};
let bgMusicSource = null;

const soundFiles = {
    bgMusic: 'audio/bg-music.mp3', // Reemplaza con tus archivos de audio
    correct: 'audio/correct.mp3',
    wrong: 'audio/wrong.mp3',
    win: 'audio/win.mp3',
    lose: 'audio/lose.mp3'
};

// Carga de todos los archivos de audio
async function loadAudio() {
    const promises = Object.keys(soundFiles).map(key => {
        return fetch(soundFiles[key])
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                audioBuffers[key] = audioBuffer;
            });
    });
    await Promise.all(promises);
    playMusic('bgMusic');
    switchScreen('menu-screen');
}

function playSound(bufferName, loop = false) {
    if (muteMusicControl.checked && bufferName === 'bgMusic') return;
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffers[bufferName];
    source.connect(audioContext.destination);
    source.loop = loop;
    source.start();
    return source;
}

function playMusic(bufferName) {
    if (bgMusicSource) {
        bgMusicSource.stop();
        bgMusicSource = null;
    }
    bgMusicSource = playSound(bufferName, true);
    volumeControl.addEventListener('input', () => {
        if (bgMusicSource) {
            bgMusicSource.gainNode.gain.value = volumeControl.value;
        }
    });
}

muteMusicControl.addEventListener('change', () => {
    if (muteMusicControl.checked) {
        if (bgMusicSource) {
            bgMusicSource.stop();
            bgMusicSource = null;
        }
    } else {
        playMusic('bgMusic');
    }
});

// --- Lógica del juego ---
let lives = 3;
let score = 0;
let level = 1;
const totalLevels = 7;
let gameInterval;
let timerInterval;
let timeLeft = 30;

function generateProblem() {
    const num1 = Math.floor(Math.random() * (level * 5 + 5)) + 1;
    const num2 = Math.floor(Math.random() * (level * 5 + 5)) + 1;
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * Math.min(level, operators.length))];
    
    let problem, answer;
    
    switch (operator) {
        case '+':
            problem = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            problem = `${num1 + num2} - ${num2}`; // Asegura que la respuesta sea positiva
            answer = num1;
            break;
        case '*':
            problem = `${num1} * ${num2}`;
            answer = num1 * num2;
            break;
        case '/':
            problem = `${num1 * num2} / ${num2}`; // Asegura una división exacta
            answer = num1;
            break;
    }
    
    mathProblemEl.textContent = problem;
    return answer;
}

let currentAnswer;
function startNewRound() {
    currentAnswer = generateProblem();
    answerInput.value = '';
    answerInput.focus();
}

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value, 10);
    if (userAnswer === currentAnswer) {
        score++;
        playSound('correct');
        // Aumenta la velocidad del juego cada 2 niveles
        if (score % 2 === 0) {
            clearInterval(gameInterval);
            gameInterval = setInterval(startNewRound, 2000 / (1 + score / 5)); // Aumenta dificultad
        }
        
        // Lógica de niveles
        if (score % Math.ceil(5 * level) === 0 && level < totalLevels) {
            level++;
            // Aumenta el tiempo del temporizador
            timeLeft += 15; 
            updateTimerDisplay();
            // Muestra una transición o mensaje de "Nivel completado"
        }

        startNewRound();
    } else {
        lives--;
        playSound('wrong');
        updateLivesDisplay();
        answerInput.value = ''; // Limpia el input para el siguiente intento
        if (lives <= 0) {
            endGame('lose');
        }
    }
}

function updateLivesDisplay() {
    livesEl.textContent = 'Vidas: ' + '❤️'.repeat(lives);
}

function updateTimerDisplay() {
    timerEl.textContent = `Tiempo: ${timeLeft}s`;
}

function endGame(status) {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    answerInput.removeEventListener('keydown', handleKeydown);
    
    switchScreen('result-screen');
    
    if (status === 'win') {
        resultTitleEl.textContent = '¡Felicidades, Ganaste! 🎉';
        resultMessageEl.textContent = `¡Has completado los ${totalLevels} niveles!`;
        playSound('win');
    } else {
        resultTitleEl.textContent = 'Juego Terminado 😥';
        resultMessageEl.textContent = `Tu puntaje fue de ${score}. ¡Sigue practicando!`;
        playSound('lose');
    }
    
    resetGame();
}

function resetGame() {
    lives = 3;
    score = 0;
    level = 1;
    timeLeft = 30;
    updateLivesDisplay();
    updateTimerDisplay();
}

// --- Eventos de UI ---
function handleKeydown(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
}

startGameBtn.addEventListener('click', () => {
    switchScreen('game-container');
    startNewGame();
});

optionsBtn.addEventListener('click', () => {
    switchScreen('options-screen');
});

backToMenuBtn.addEventListener('click', () => {
    switchScreen('menu-screen');
});

playAgainBtn.addEventListener('click', () => {
    switchScreen('menu-screen');
});

function startNewGame() {
    resetGame();
    startNewRound();
    answerInput.addEventListener('keydown', handleKeydown);
    
    gameInterval = setInterval(startNewRound, 2000);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            endGame('lose');
        }
    }, 1000);
}

function switchScreen(id) {
    const screens = [loadingScreen, menuScreen, optionsScreen, gameContainer, resultScreen];
    screens.forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
}

// --- Escena 3D con Three.js ---
let scene, camera, renderer;
const spheres = [];
const particles = [];
let problemMesh;

function initThree() {
    const threeCanvas = document.getElementById('game-three-canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    threeCanvas.appendChild(renderer.domElement);
    camera.position.z = 5;

    // Luces
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Esferas decorativas
    for (let i = 0; i < 10; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 0.5 + 0.1, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = (Math.random() - 0.5) * 10;
        sphere.position.y = (Math.random() - 0.5) * 10;
        sphere.position.z = -Math.random() * 20;
        spheres.push(sphere);
        scene.add(sphere);
    }
}

function animateThree() {
    requestAnimationFrame(animateThree);
    
    spheres.forEach(sphere => {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

// Iniciar
window.onload = () => {
    initThree();
    animateThree();
    loadAudio();
};

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});