/* ======================================================
   DC Illinger Igel 26 e.V.
   script.js
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

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

    document.querySelectorAll(".content").forEach(section => {
        observer.observe(section);
    });


    /* ==========================================
       Hero Logo Parallax
    ========================================== */

    const logo = document.querySelector(".logo");

    if (logo && window.matchMedia("(pointer: fine)").matches) {

        document.addEventListener("mousemove", (e) => {

            const x =
                (e.clientX / window.innerWidth - 0.5) * 14;

            const y =
                (e.clientY / window.innerHeight - 0.5) * 14;

            logo.style.transform =
                `translate(${x}px, ${y}px)`;

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

    const hero =
        document.querySelector(".hero");

    const indicator =
        document.querySelector(".scroll-indicator");

    const panels =
        document.querySelectorAll(".panel");

    let ticking = false;

    function updateScrollEffects() {

        const scrollY = window.scrollY;

        /* Scroll Indicator */

        if (indicator) {

            indicator.style.opacity =
                scrollY > 120 ? "0" : "1";

        }


        /* Hero Fade */

        if (hero) {

            hero.style.opacity =
                Math.max(0, 1 - scrollY / 700);

        }


        /* Subtle Panel Zoom */

        panels.forEach(panel => {

            const rect =
                panel.getBoundingClientRect();

            const center =
                rect.top + rect.height / 2;

            const distance =
                Math.abs(
                    window.innerHeight / 2 - center
                );

            const scale =
                1 - Math.min(
                    distance / 4000,
                    0.025
                );

            panel.style.transform =
                `scale(${scale})`;

        });

        ticking = false;
    }


    window.addEventListener("scroll", () => {

        if (!ticking) {

            requestAnimationFrame(
                updateScrollEffects
            );

            ticking = true;
        }

    }, {
        passive: true
    });

});
