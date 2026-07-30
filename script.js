/* ======================================================
   DC Illinger Igel
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

        threshold: 0.25

    });

    document.querySelectorAll(".content").forEach(section => {

        observer.observe(section);

    });



    /* ==========================================
       Hero Logo Parallax
    ========================================== */

    const logo = document.querySelector(".logo");

    if (logo) {

        document.addEventListener("mousemove", (e) => {

            const x = (e.clientX / window.innerWidth - 0.5) * 18;
            const y = (e.clientY / window.innerHeight - 0.5) * 18;

            logo.style.transform =
                `translate(${x}px, ${y}px)`;

        });

    }



    /* ==========================================
       Scroll Indicator ausblenden
    ========================================== */

    const indicator = document.querySelector(".scroll-indicator");

    window.addEventListener("scroll", () => {

        if (!indicator) return;

        if (window.scrollY > 120) {

            indicator.style.opacity = "0";

        } else {

            indicator.style.opacity = "1";

        }

    });



    /* ==========================================
       Smooth Fade Hero
    ========================================== */

    const hero = document.querySelector(".hero");

    window.addEventListener("scroll", () => {

        const value = window.scrollY;

        if (!hero) return;

        hero.style.opacity = Math.max(0, 1 - value / 650);

    });



    /* ==========================================
       Panels leicht zoomen
    ========================================== */

    const panels = document.querySelectorAll(".panel");

    window.addEventListener("scroll", () => {

        const scroll = window.scrollY;

        panels.forEach(panel => {

            const rect = panel.getBoundingClientRect();

            const center = rect.top + rect.height / 2;

            const distance = Math.abs(window.innerHeight / 2 - center);

            const scale = 1 - Math.min(distance / 3500, 0.04);

            panel.style.transform = `scale(${scale})`;

        });

    });



    /* ==========================================
       Mouse Glow
    ========================================== */

    const glow = document.createElement("div");

    glow.className = "mouse-glow";

    document.body.appendChild(glow);

    document.addEventListener("mousemove", e => {

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });

});