document.getElementById("rulesBtn").addEventListener("click", function () {
  document.getElementById("rulesPopup").classList.remove("hidden");
});

document.getElementById("closePopup").addEventListener("click", function () {
  document.getElementById("rulesPopup").classList.add("hidden");
});

document.getElementById("startBtn").addEventListener("click", function () {
  // TODO: Arahkan ke halaman kuis/level
  alert("Game dimulai! Arahkan ke level pertama.");
});


const questions = [
  {
    question: "Apa yang sebaiknya TIDAK kamu bagikan di internet?",
    options: ["Foto hewan peliharaan", "Nomor handphone", "Nama panggilan", "Warna favorit"],
    answer: 1
  },
  {
    question: "Apa itu kata sandi yang kuat?",
    options: ["123456", "password", "Kombinasi huruf, angka, simbol", "Nama kamu"],
    answer: 2
  }
];

let current = 0;

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(i) {
  if (i === questions[current].answer) {
    alert("Benar!");
  } else {
    alert("Coba lagi...");
  }
}

document.getElementById("next-btn").onclick = () => {
  current = (current + 1) % questions.length;
  showQuestion();
};



showQuestion();
