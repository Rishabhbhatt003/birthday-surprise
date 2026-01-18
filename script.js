document.addEventListener("DOMContentLoaded", () => {
  console.log("JS LOADED");

  /* =========================
     AOS INIT
  ========================= */
  AOS.init({
    duration: 900,
    easing: "ease-out-cubic",
    once: true,
  });

  /* =========================
     ELEMENT REFERENCES
  ========================= */
  const lockScreen = document.getElementById("lockScreen");
  const mainContent = document.getElementById("mainContent");
  const cinematic = document.getElementById("cinematic");

  const countdownEl = document.getElementById("countdown");
  const lockTitle = document.getElementById("lockTitle");
  const lockText = document.getElementById("lockText");

  const cine1 = document.getElementById("cine1");
  const cine2 = document.getElementById("cine2");
  const cine3 = document.getElementById("cine3");

  const btn = document.getElementById("btn");
  const output = document.getElementById("output");
  const music = document.getElementById("bgMusic");
  const carousel = document.querySelector(".carousel");

  const envelope = document.getElementById("envelope");

  const enBtn = document.getElementById("enBtn");
  const viBtn = document.getElementById("viBtn");

  const title = document.getElementById("title");
  const text = document.getElementById("text");
  const letterTitle = document.getElementById("letterTitle");
  const letterBody = document.getElementById("letterBody");
  const signature = document.getElementById("signature");

  /* =========================
     LANGUAGE DATA
  ========================= */
  const LANG = {
    en: {
      heroTitle: "Happy Birthday 🤍",
      heroText: "You are the most beautiful part of my life.",

      cinematic: [
        "For someone special…",
        "Across the distance…",
        "With patience, effort, and love 🤍",
      ],

      lockTitle: "🎁 A Surprise Is Waiting",
      lockText: "This gift will open on 17 January",
      countdownSuffix: "left 💝",

      letterTitle: "For you, my love 🤍",
      letterBody: `I just want you to know how incredibly beautiful you are — not just in the way you look, but in the way you think, speak, understand, and care. You are pretty in a way that feels gentle, adorable in a way that makes me smile without trying, and cute in the smallest things you do without even realizing it. Your understanding nature, your talent, and the way you handle things so calmly amaze me more every day. Talking to you has become one of the best parts of my day, and I’m honestly so thankful that life somehow brought us together.

I love you — not in a rushed or careless way, but in a quiet, growing way that feels real and meaningful. I know we are far apart right now, and I know time stands between us, but I promise you this: give me two years, and I will come to you. I’m working toward that day with all my heart. Until then, I just ask you to wait for me, believe in me, and keep this small light between us alive.

Meeting you made me genuinely happy, and I’ll always be grateful for that — no matter what the future holds.`,
      signature: "— always yours 🤍",
    },

    vi: {
      heroTitle: "Chúc mừng sinh nhật 🤍",
      heroText: "Em là điều đẹp đẽ nhất trong cuộc đời anh.",

      cinematic: [
        "Dành cho một người rất đặc biệt…",
        "Dù cách xa nhau…",
        "Bằng sự kiên nhẫn, nỗ lực và yêu thương 🤍",
      ],

      lockTitle: "🎁 Một món quà đang chờ đợi",
      lockText: "Món quà này sẽ mở vào ngày 17 tháng 1",
      countdownSuffix: "còn lại 💝",

      letterTitle: "Dành cho em, người anh thương 🤍",
      letterBody: `Anh chỉ muốn em biết rằng em xinh đẹp theo một cách rất đặc biệt — không chỉ ở vẻ ngoài, mà còn ở cách em suy nghĩ, nói chuyện, thấu hiểu và quan tâm đến người khác. Em dịu dàng, đáng yêu theo cách khiến anh mỉm cười mà không cần cố gắng, và dễ thương trong cả những điều nhỏ bé mà có khi chính em cũng không nhận ra. Sự thấu hiểu, tài năng và cách em bình tĩnh đối mặt với mọi thứ khiến anh ngưỡng mộ em nhiều hơn mỗi ngày. Nói chuyện với em đã trở thành một trong những khoảnh khắc đẹp nhất trong ngày của anh, và anh thật sự biết ơn vì cuộc sống đã cho anh gặp em.

Anh yêu em — không phải một cách vội vàng hay hời hợt, mà là một tình cảm lặng lẽ, lớn dần theo thời gian, rất thật và rất sâu. Anh biết hiện tại chúng ta ở rất xa nhau, và anh biết thời gian vẫn còn ở phía trước, nhưng anh hứa với em điều này: hãy cho anh hai năm, anh nhất định sẽ đến bên em. Anh đang cố gắng từng ngày vì khoảnh khắc đó. Cho đến lúc ấy, anh chỉ mong em chờ anh, tin anh, và cùng anh giữ gìn ánh sáng nhỏ bé giữa chúng ta.

Gặp được em đã khiến anh thật sự hạnh phúc, và anh sẽ luôn trân trọng điều đó — dù tương lai có ra sao đi nữa.`,
      signature: "— mãi là của em 🤍",
    },
  };

  /* =========================
     LANGUAGE SWITCH
  ========================= */
  function setLanguage(lang) {
    const L = LANG[lang];

    title.innerText = L.heroTitle;
    text.innerText = L.heroText;

    cine1.innerText = L.cinematic[0];
    cine2.innerText = L.cinematic[1];
    cine3.innerText = L.cinematic[2];

    lockTitle.innerText = L.lockTitle;
    lockText.innerText = L.lockText;

    letterTitle.innerText = L.letterTitle;
    letterBody.innerText = L.letterBody;
    signature.innerText = L.signature;

    currentLang = lang;
  }

  let currentLang = "en";
  enBtn.addEventListener("click", () => setLanguage("en"));
  viBtn.addEventListener("click", () => setLanguage("vi"));

  /* =========================
     LOCK UNTIL 17 JAN 2026
  ========================= */
  const unlockDate = new Date("2025-12-25T00:00:00").getTime();

  function checkUnlock() {
    const now = new Date().getTime();
    const diff = unlockDate - now;

    if (diff <= 0) {
      // 1) Hide lock screen
      lockScreen.style.display = "none";

      // 2) Show cinematic
      cinematic.style.display = "flex";
      cinematic.style.opacity = "1";

      /* ✅ AUTOPLAY MUSIC */
      music.play().catch(() => {});
      cinematic.addEventListener(
        "click",
        () => {
          music.muted = false;
          music.play();
        },
        { once: true }
      );

      // 3) Start fading IN the main content EARLIER
      setTimeout(() => {
        mainContent.style.opacity = "1";
      }, 7000); // earlier fade-in

      // 4) Fade cinematic OUT
      setTimeout(() => {
        cinematic.style.opacity = "0";
      }, 8500);

      // 5) Remove cinematic AFTER fade
      setTimeout(() => {
        cinematic.style.display = "none";
      }, 10200);

      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    const suffix = LANG[currentLang].countdownSuffix;
    countdownEl.innerText = `${days} days ${hours} hours ${minutes} minutes ${suffix}`;
  }

  checkUnlock();
  setInterval(checkUnlock, 60000);

  /* =========================
     MUSIC + CAROUSEL SYNC
  ========================= */
  btn.addEventListener("click", () => {
    music.play();
    output.innerText = "Music is playing 🎵💖";
  });

  if (carousel) {
    music.addEventListener("play", () => {
      carousel.style.animationDuration = "16s";
    });

    music.addEventListener("pause", () => {
      carousel.style.animationDuration = "28s";
    });
  }

  document.addEventListener(
    "click",
    () => {
      music.muted = false;
      music.play();
    },
    { once: true }
  );

  /* =========================
     LETTER OPEN
  ========================= */
  envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");
  });
});
