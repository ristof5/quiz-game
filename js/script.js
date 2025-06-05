let questions = [];
let currentQuestion = 0;
let lives = 5;
let currentLevel = "mudah";
let selectedCategory = localStorage.getItem("selectedCategory");

const levels = ["mudah", "menengah", "sulit"];

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const heartsEl = document.getElementById('hearts');

const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const winSound = document.getElementById('win-sound');

const levelUpModal = document.getElementById('levelUpModal');
const levelUpTitle = document.getElementById('levelUpTitle');
const levelUpMessage = document.getElementById('levelUpMessage');
const nextLevelBtn = document.getElementById('nextLevelBtn');


const gameOverModal = document.getElementById("game-over-modal");
const restartGameBtn = document.getElementById("restart-game");

nextLevelBtn.onclick = () => {
    levelUpModal.style.display = "none";
    currentQuestion = 0;
    loadQuestion();
};

async function loadQuestionsFromJSON() {
    try {
        const response = await fetch('../public/data/questions.json');
        const data = await response.json();

        questions = data.filter(q => q.kategori === selectedCategory && q.tingkat === currentLevel);

        if (questions.length === 0) {
            questionEl.textContent = "Soal tidak tersedia.";
            return;
        }

        updateHearts();
    } catch (error) {
        console.error("Gagal memuat file JSON:", error);
        questionEl.textContent = "Gagal memuat soal.";
    }
}

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        const nextIndex = levels.indexOf(currentLevel) + 1;
        if (nextIndex < levels.length) {
            currentLevel = levels[nextIndex];
            lives = Math.min(lives + 1, 5); // Tambah 1 nyawa saat naik level
            showLevelUpModal(currentLevel);
            loadQuestionsFromJSON();
        } else {
            // Semua level sudah selesai: anggap quiz sukses total
            sessionStorage.setItem('quizFinished', 'true'); // 🔐 Tambahkan ini
            winSound.play();
            window.location.href = "badge.html";
        }
        return;
    }

    updateProgress();

    const q = questions[currentQuestion];
    questionEl.textContent = q.pertanyaan;
    optionsEl.innerHTML = '';

    q.opsi.forEach((opt) => {
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
      showGameOverModal();
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

//progress bar
function updateProgress() {
    const fill = document.getElementById('progress-fill');
    const percent = (currentQuestion / questions.length) * 100;
    fill.style.width = percent + '%';
}
// game over modal
function showGameOverModal() {
  const gameOverModal = document.getElementById("game-over-modal");
  gameOverModal.classList.add("show"); // tampilkan modal
}
document.getElementById("restart-game").addEventListener("click", function () {
  window.location.href = "index.html"; // ganti jika ingin arahkan ke halaman berbeda
});


// Game quit
function quitGame() {
  document.getElementById("exit-modal").classList.add("show");
}

document.getElementById("confirm-exit").addEventListener("click", function() {
  window.location.href = "index.html"; // arahkan ke halaman utama, atau ubah sesuai kebutuhan
});

document.getElementById("cancel-exit").addEventListener("click", function() {
  document.getElementById("exit-modal").classList.remove("show");
});


function showLevelUpModal(level) {
    levelUpTitle.textContent = "Selamat!";
    levelUpMessage.textContent = `Kamu telah menyelesaikan level dan naik ke level "${level.toUpperCase()}".`;
    levelUpModal.style.display = "block";
}

// Mulai game
(async () => {
    await loadQuestionsFromJSON();
    loadQuestion();
})();
