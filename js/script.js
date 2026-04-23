/**
 * ARQUIVO: script.js
 * OBJETIVO: Lógicas do HACKAMARH 2026 (Partículas, Menu, Scroll, Cronômetro)
 * METODOLOGIA: Funções encapsuladas e variáveis descritivas (Clean Code).
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. INICIALIZAÇÃO DA BIBLIOTECA AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true, // Anima apenas na primeira descida
      offset: 50,
    });
  }

  // 2. CONFIGURAÇÃO DAS PARTÍCULAS DE FUNDO (ESTILO IA / REDE NEURAL)
  // Exige carregamento via CDN no HTML: tsParticles
  if (typeof tsParticles !== "undefined") {
    tsParticles.load("tsparticles", {
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#00ff88" }, // Verde Neon
        links: {
          enable: true,
          color: "#00ff88",
          distance: 150,
          opacity: 0.2,
          width: 1,
        },
        move: { enable: true, speed: 1, direction: "none", outModes: "out" },
        size: { value: 2, random: true },
        opacity: { value: 0.5, random: true },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" }, // Efeito magnético ao passar o mouse
        },
        modes: { grab: { distance: 200, links: { opacity: 0.5 } } },
      },
      detectRetina: true,
      background: { color: "#0b0f0c" }, // Fundo Base Dark Mode
    });
  }

  // 3. LÓGICA DO MENU MOBILE & HEADER SCROLL
  const initNavigation = () => {
    const btnMobile = document.getElementById("btn-mobile");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav__link");
    const header = document.getElementById("header");

    // Alterar o fundo do header ao rolar a página
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.style.background = "rgba(5, 8, 6, 0.95)"; // Mais opaco
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.8)";
      } else {
        header.style.background = "rgba(11, 15, 12, 0.85)";
        header.style.boxShadow = "none";
      }
    });

    if (!btnMobile || !navMenu) return;

    // Toggle Menu
    btnMobile.addEventListener("click", () => {
      navMenu.classList.toggle("nav--ativo");
      const isAberto = navMenu.classList.contains("nav--ativo");
      btnMobile.setAttribute("aria-expanded", isAberto);
      // Altera ícone (Barras/X)
      btnMobile.innerHTML = isAberto
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    // Fechar ao clicar num link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("nav--ativo");
        btnMobile.setAttribute("aria-expanded", "false");
        btnMobile.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  };

  // 4. CONTAGEM REGRESSIVA (Cronômetro)
  const initCountdown = () => {
    // Data Start Oficial baseada no Edital HACKAMARH 2026: 29 de Maio de 2026, 19:00 hrs
    const targetDate = new Date("May 29, 2026 19:00:00").getTime();

    const elDays = document.getElementById("days");
    const elHours = document.getElementById("hours");
    const elMinutes = document.getElementById("minutes");
    const elSeconds = document.getElementById("seconds");
    const elContainer = document.getElementById("countdown");

    if (!elDays) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        elContainer.innerHTML =
          '<h3 class="text-neon" style="font-size: 2.4rem;">A Maratona Começou!</h3>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      elDays.innerText = String(days).padStart(2, "0");
      elHours.innerText = String(hours).padStart(2, "0");
      elMinutes.innerText = String(minutes).padStart(2, "0");
      elSeconds.innerText = String(seconds).padStart(2, "0");
    }, 1000);
  };

  // Executando as funções locais
  initNavigation();
  initCountdown();
});
