let questions = [];
let currentQuestion = 0;
let lives = 5;
let currentLevel = "mudah"; // start dari mudah
let selectedCategory = localStorage.getItem("selectedCategory");

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const heartsEl = document.getElementById('hearts');

const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const winSound = document.getElementById('win-sound');


// Fungsi untuk memuat soal dari JSON
async function loadQuestionsFromJSON() {
    try {
        const response = await fetch('../public/data/questions.json');
        const data = await response.json();
        // Optional: filter berdasarkan kategori atau tingkat
        questions = data.filter(q => q.kategori === "privasi" && q.tingkat === "mudah");

        if (questions.length === 0) {
            questionEl.textContent = "Soal tidak tersedia.";
            return;
        }

        updateHearts();
        loadQuestion(); // Panggil pertama kali setelah soal dimuat
    } catch (error) {
        console.error("Gagal memuat file JSON:", error);
        questionEl.textContent = "Gagal memuat soal.";
    }
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        winSound.play();
        window.location.href = "badge.html";
        return;
    }

    updateProgress();

    const q = questions[currentQuestion];
    questionEl.textContent = q.pertanyaan;
    optionsEl.innerHTML = '';

    q.opsi.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(opt, q.jawaban);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        correctSound.play();
        currentQuestion++;
        loadQuestion();
    } else {
        wrongSound.play();
        lives--;
        updateHearts();
        if (lives <= 0) {
            alert("Game Over! Kamu kehabisan nyawa.");
            window.location.href = "index.html";
        }
    }
}

function updateHearts() {
    heartsEl.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement('img');
        heart.src = '../assets/images/heart.png';
        heart.alt = 'Heart';
        heartsEl.appendChild(heart);
    }
}

function updateProgress() {
    const fill = document.getElementById('progress-fill');
    const percent = (currentQuestion / questions.length) * 100;
    fill.style.width = percent + '%';
}

function quitGame() {
    const confirmQuit = confirm("Yakin ingin keluar dari permainan?");
    if (confirmQuit) {
        window.location.href = "index.html";
    }
}

// Mulai dari sini
loadQuestionsFromJSON();
