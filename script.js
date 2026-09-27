const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((el) => observer.observe(el));

const registerBtn = document.getElementById("registerBtn");
const registerNote = document.getElementById("registerNote");
registerBtn.addEventListener("click", () => {
  registerBtn.addEventListener("click", () => {
  registerNote.textContent = "Registration opens soon — the official event form will appear here.";
});
  registerNote.style.color = "#ed1c24";
  registerBtn.animate([
    { transform: "scale(1)" },
    { transform: "scale(.96)" },
    { transform: "scale(1)" }
  ], { duration: 220, easing: "ease-out" });
});

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".navbar nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("mobile-open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll('.navbar nav a, .nav-cta, .hero-actions a').forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("mobile-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  });
});

const navbar = document.querySelector(".navbar");
const progress = document.querySelector(".scroll-progress");
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll('.navbar nav a')];

function onScroll(){
  const scrollTop = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (scrollTop / max) * 100 : 0}%`;
  navbar.classList.toggle("scrolled", scrollTop > 30);

  let current = "home";
  sections.forEach(section => {
    if (scrollTop >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
}
window.addEventListener("scroll", onScroll, {passive:true});
onScroll();

// Subtle hero parallax — disabled for reduced-motion users.
const heroCopy = document.querySelector(".hero-copy");
const heroPanel = document.querySelector(".hero-panel");
if (heroCopy && heroPanel && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("scroll", () => {
    if (window.scrollY < window.innerHeight) {
      const y = window.scrollY * 0.08;
      heroCopy.style.transform = `translateY(${y}px)`;
      heroPanel.style.transform = `translateY(${y * -0.45}px)`;
    }
  }, {passive:true});
}

// Desktop cursor accent.
const cursor = document.querySelector(".cursor-dot");
if (cursor && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
  window.addEventListener("mousemove", e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    cursor.style.opacity = "1";
  });
  document.querySelectorAll("a, button, .hero-card, .mini-card").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
}
