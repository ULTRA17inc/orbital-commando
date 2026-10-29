// Orbital Commando // ULTRA17 — site behaviour.

// The itch.io download page. Left blank, the download buttons read "Coming soon".
const LINKS = {
  itch: "https://kruza117.itch.io/orbital-commando-demo/purchase",
};

document.documentElement.classList.remove("no-js");
document.getElementById("year").textContent = new Date().getFullYear();

// itch.io buttons
document.querySelectorAll("[data-itch]").forEach((a) => {
  if (LINKS.itch) {
    a.href = LINKS.itch;
    a.target = "_blank";
    a.rel = "noopener";
  } else if (a.classList.contains("btn")) {
    a.textContent = "Coming soon to itch.io";
    a.setAttribute("aria-disabled", "true");
    a.removeAttribute("href");
  }
});

// Nav: solid once scrolled, burger menu on small screens.
const nav = document.getElementById("nav");
const toggle = nav.querySelector(".nav-toggle");
const onScroll = () => nav.classList.toggle("solid", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Reveal on scroll.
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }),
  { rootMargin: "0px 0px -8% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Hero loop: respect reduced motion.
const hero = document.querySelector(".hero-video");
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  hero.removeAttribute("autoplay");
  hero.pause();
}

// Vehicle rail arrows.
const rail = document.getElementById("rail");
document.querySelectorAll("[data-scroll]").forEach((b) =>
  b.addEventListener("click", () => {
    const card = rail.querySelector(".vehicle");
    rail.scrollBy({ left: Number(b.dataset.scroll) * (card.offsetWidth + 20), behavior: "smooth" });
  })
);

// Lightbox for the gallery and the trailer.
const box = document.getElementById("lightbox");
const stage = box.querySelector(".lightbox-stage");
const shots = [...document.querySelectorAll(".shot")];
let index = -1;

function showShot(i) {
  index = (i + shots.length) % shots.length;
  const s = shots[index];
  stage.innerHTML = "";
  const img = new Image();
  img.src = s.dataset.full;
  img.alt = s.querySelector("img").alt;
  stage.append(img);
}

function open(single) {
  box.classList.toggle("single", single);
  if (!box.open) box.showModal();
}

function close() {
  stage.innerHTML = "";
  index = -1;
  box.close();
}

shots.forEach((s, i) => s.addEventListener("click", () => { showShot(i); open(false); }));

document.querySelectorAll("[data-trailer]").forEach((b) =>
  b.addEventListener("click", () => {
    stage.innerHTML = "";
    const v = document.createElement("video");
    v.src = "assets/trailer-720.mp4";
    v.poster = "assets/trailer-poster.jpg";
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    stage.append(v);
    index = -1;
    open(true);
  })
);

box.querySelector(".lightbox-close").addEventListener("click", close);
box.querySelector(".prev").addEventListener("click", () => showShot(index - 1));
box.querySelector(".next").addEventListener("click", () => showShot(index + 1));
box.addEventListener("click", (e) => { if (e.target === box || e.target === stage) close(); });
box.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
document.addEventListener("keydown", (e) => {
  if (!box.open || index < 0) return;
  if (e.key === "ArrowLeft") showShot(index - 1);
  if (e.key === "ArrowRight") showShot(index + 1);
});
