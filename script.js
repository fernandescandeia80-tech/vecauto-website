
document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header");
    const menu = document.getElementById("menuToggle");
    const nav = document.getElementById("navigation");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // ANO AUTOMÁTICO
    document.getElementById("year").textContent =
        new Date().getFullYear();

    // MENU MOBILE
    function closeMenu() {
        nav.classList.remove("open");
        menu.classList.remove("active");
        menu.setAttribute("aria-expanded", "false");
    }

    menu.addEventListener("click", () => {
        const opened = nav.classList.toggle("open");

        menu.classList.toggle("active", opened);
        menu.setAttribute("aria-expanded", String(opened));
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 680) closeMenu();
    });

    // HEADER DINÂMICO
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 30);
    }, { passive: true });

    // ENTRADA DOS ELEMENTOS
    const revealElements = document.querySelectorAll(".reveal");

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach(el => el.classList.add("visible"));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // PARALLAX SUAVE NA IMAGEM PRINCIPAL
    const heroImage = document.querySelector(".hero-image");

    if (heroImage && !reducedMotion) {
        let busy = false;

        window.addEventListener("scroll", () => {
            if (busy) return;

            busy = true;

            requestAnimationFrame(() => {
                if (window.scrollY < 650) {
                    heroImage.style.transform =
                        `scale(1.04) translateY(${window.scrollY * 0.1}px)`;
                }

                busy = false;
            });
        }, { passive: true });
    }

    // MENU INDICA A SECÇÃO ATUAL
    const links = document.querySelectorAll("nav a[href^='#']");
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    links.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                }
            });
        }, {
            rootMargin: "-35% 0px -55% 0px"
        });

        sections.forEach(section => sectionObserver.observe(section));
    }

    // IMAGENS: MOSTRAR ALTERNATIVA CASO O SERVIDOR NÃO CARREGUE
    document.querySelectorAll(".vehicle-photo img, .filda-image img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.display = "none";
            img.parentElement.classList.add("image-unavailable");
        });
    });

    console.log("VECAUTO Angola - Website iniciado.");
});
