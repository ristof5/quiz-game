document.addEventListener("DOMContentLoaded", function () {
  const botAvatar = document.getElementById("bot-avatar");
  const botBubble = document.getElementById("bot-bubble");

  const messages = [
    "Hai teman! Aku Bot Roblox siap menemanimu bermain kuis! 🎮",
    "Klik tombol START untuk memulai petualanganmu! 🚀",
    "Jawab semua pertanyaan dengan benar ya! Kamu pasti bisa! 💪",
    "Kamu punya 5 nyawa ❤️, jangan sampai habis ya!",
    "Jangan takut salah! Belajar itu seru 😄",
    "Ayo kita mulai! Klik tombol START! ✨",
  ];

  let messageIndex = 0;
  let hideTimeout;

  function showMessage(index) {
    botBubble.classList.remove("hidden");
    botBubble.textContent = messages[index];
  }

  function hideMessage() {
    botBubble.classList.add("hidden");
  }

  function resetAutoHide() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      hideMessage();
    }, 10000); // 10 detik
  }

  // Mulai dengan pesan pertama
  showMessage(messageIndex);
  resetAutoHide();

  function handleBotClick() {
    messageIndex = (messageIndex + 1) % messages.length;
    showMessage(messageIndex);
    resetAutoHide();
  }

  botAvatar.addEventListener("click", handleBotClick);
  botBubble.addEventListener("click", handleBotClick);
});
