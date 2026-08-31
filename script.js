/* ======================================================
   DC Illinger Igel 26 e.V.
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const currentPage = document.body.dataset.page;

    if (currentPage) {
        document
            .querySelectorAll(`[data-page="${currentPage}"]`)
            .forEach(link => link.classList.add("active"));
    }

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");

    function closeMenu() {
        if (!header || !menuToggle) return;

        header.classList.remove("menu-open");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Menü öffnen");
    }

    if (header && menuToggle) {
        menuToggle.addEventListener("click", () => {
            const open = menuToggle.getAttribute("aria-expanded") === "true";

            header.classList.toggle("menu-open", !open);
            document.body.classList.toggle("menu-open", !open);

            menuToggle.setAttribute("aria-expanded", String(!open));
            menuToggle.setAttribute(
                "aria-label",
                open ? "Menü öffnen" : "Menü schließen"
            );
        });

        document
            .querySelectorAll(".mobile-navigation a")
            .forEach(link => link.addEventListener("click", closeMenu));

        window.addEventListener("resize", () => {
            if (window.innerWidth > 1050) closeMenu();
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });

    document
        .querySelectorAll(".content:not(.visible)")
        .forEach(item => observer.observe(item));

    const logo = document.querySelector(".logo");

    if (logo && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", e => {
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            logo.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    let ticking = false;

    function update() {
        const y = window.scrollY;

        if (header) {
            header.classList.toggle("scrolled", y > 24);
        }

        const indicator = document.querySelector(".scroll-indicator");
        if (indicator) {
            indicator.style.opacity = y > 120 ? "0" : "1";
        }

        ticking = false;
    }

    update();

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
});
