/* ======================================================
   DC Illinger Igel 26 e.V.
   script.js
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Active Navigation
    ========================================== */

    const currentPage = document.body.dataset.page;

    if (currentPage) {
        document
            .querySelectorAll(`[data-page="${currentPage}"]`)
            .forEach(link => link.classList.add("active"));
    }


    /* ==========================================
       Header / Mobile Menu
    ========================================== */

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileLinks = document.querySelectorAll(".mobile-navigation a");

    function closeMenu() {
        if (!header || !menuToggle) return;

        header.classList.remove("menu-open");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Menü öffnen");
    }

    if (menuToggle && header) {
        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

            header.classList.toggle("menu-open", !isOpen);
            document.body.classList.toggle("menu-open", !isOpen);

            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Menü öffnen" : "Menü schließen"
            );
        });

        mobileLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 1050) {
                closeMenu();
            }
        });
    }


    /* ==========================================
       Scroll Reveal
    ========================================== */

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.18
    });

    document.querySelectorAll(".content:not(.visible)").forEach(section => {
        observer.observe(section);
    });


    /* ==========================================
       Hero Logo Parallax
    ========================================== */

    const logo = document.querySelector(".logo");

    if (logo && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 14;
            const y = (e.clientY / window.innerHeight - 0.5) * 14;

            logo.style.transform = `translate(${x}px, ${y}px)`;
        });
    }


    /* ==========================================
       Mouse Glow
    ========================================== */

    if (window.matchMedia("(pointer: fine)").matches) {
        const glow = document.createElement("div");

        glow.className = "mouse-glow";
        document.body.appendChild(glow);

        document.addEventListener("mousemove", (e) => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    }


    /* ==========================================
       Scroll Effects
    ========================================== */

    const hero = document.querySelector(".hero");
    const indicator = document.querySelector(".scroll-indicator");
    const panels = document.querySelectorAll(".panel");

    let ticking = false;

    function updateScrollEffects() {
        const scrollY = window.scrollY;

        if (header) {
            header.classList.toggle("scrolled", scrollY > 24);
        }

        if (indicator) {
            indicator.style.opacity = scrollY > 120 ? "0" : "1";
        }

        if (hero) {
            hero.style.opacity = Math.max(0, 1 - scrollY / 700);
        }

        panels.forEach(panel => {
            const rect = panel.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const distance = Math.abs(window.innerHeight / 2 - center);

            const scale = 1 - Math.min(distance / 4000, 0.025);

            panel.style.transform = `scale(${scale})`;
        });

        ticking = false;
    }

    updateScrollEffects();

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }, {
        passive: true
    });
});
