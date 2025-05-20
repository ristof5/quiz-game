const questions = [
    {
        q: "Apa itu data pribadi?",
        options: ["Nomor sepatu", "Alamat rumah", "Warna kesukaan", "Hewan peliharaan"],
        answer: 1
    },
    {
        q: "Apa yang harus dilakukan jika mendapat pesan mencurigakan?",
        options: ["Klik saja", "Laporkan dan abaikan", "Sebarkan", "Diamkan"],
        answer: 1
    },
    {
        q: "Apa itu password yang kuat?",
        options: ["123456", "Nama sendiri", "Kombinasi huruf & angka", "Tanggal lahir"],
        answer: 2
    },
    // Tambahkan hingga 10 soal
];

let currentQuestion = 0;
let lives = 5;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const heartsEl = document.getElementById('hearts');

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        window.location.href = "badge.html"; // menang
        return;
    }

    const q = questions[currentQuestion];
    questionEl.textContent = q.q;
    optionsEl.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const correct = questions[currentQuestion].answer;

    if (selected === correct) {
        currentQuestion++;
        loadQuestion();
    } else {
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
        heart.src = 'assets/images/heart.png';
        heart.alt = 'Heart';
        heartsEl.appendChild(heart);
    }
}

loadQuestion();
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const winSound = document.getElementById('win-sound');

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        winSound.play();
        window.location.href = "badge.html";
        return;
    }

    // Update progress bar
    updateProgress();

    const q = questions[currentQuestion];
    questionEl.textContent = q.q;
    optionsEl.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(index);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const correct = questions[currentQuestion].answer;

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

function updateProgress() {
    const fill = document.getElementById('progress-fill');
    const percent = ((currentQuestion) / questions.length) * 100;
    fill.style.width = percent + '%';
}

function quitGame() {
    const confirmQuit = confirm("Yakin ingin keluar dari permainan?");
    if (confirmQuit) {
        window.location.href = "index.html";
    }
}
