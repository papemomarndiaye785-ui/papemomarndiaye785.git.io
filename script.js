/* =========================================================
   PORTFOLIO - PAPE MOMAR NDIAYE
   JavaScript
   ========================================================= */


/* ================= MENU MOBILE ================= */

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");
const siteHeader = document.querySelector("header");

const setMenuState = (isOpen) => {

    if (!menuBtn || !navLinks) return;

    navLinks.classList.toggle("active", isOpen);

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );

    menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );

    const menuIcon =
        menuBtn.querySelector("i");

    if (menuIcon) {

        menuIcon.classList.toggle(
            "fa-bars",
            !isOpen
        );

        menuIcon.classList.toggle(
            "fa-xmark",
            isOpen
        );

    }

};

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        const isOpen =
            !navLinks.classList.contains("active");

        setMenuState(isOpen);

    });


    document.addEventListener("click", (event) => {

        if (
            navLinks.classList.contains("active") &&
            siteHeader &&
            !siteHeader.contains(event.target)
        ) {

            setMenuState(false);

        }

    });


    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            navLinks.classList.contains("active")
        ) {

            setMenuState(false);
            menuBtn.focus();

        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            setMenuState(false);

        }

    });

}


/* ================= FERMER LE MENU ================= */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        setMenuState(false);

    });

});


/* ================= FORMULAIRE CONTACT ================= */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    const formStatus =
        document.getElementById("form-status");

    const submitButton =
        contactForm.querySelector('button[type="submit"]');

    const defaultButtonContent =
        submitButton.innerHTML;


    const showStatus = (message, type) => {

        formStatus.textContent = message;

        formStatus.className =
            "form-status";

        if (type) {

            formStatus.classList.add(type);

        }

    };


    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();


        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }


        const formData =
            new FormData(contactForm);


        /* Bloquer les robots */

        if (formData.get("_honey")) {

            return;

        }


        const payload =
            Object.fromEntries(formData.entries());


        if (
            window.location.protocol === "http:" ||
            window.location.protocol === "https:"
        ) {

            payload._url =
                window.location.href;

        }


        submitButton.disabled = true;

        submitButton.setAttribute(
            "aria-busy",
            "true"
        );

        submitButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> ' +
            'Envoi en cours...';

        showStatus(
            "Transmission de votre message...",
            "sending"
        );


        try {

            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },

                    body: JSON.stringify(payload)
                }
            );

            const result = await response.json();


            if (
                !response.ok ||
                result.success === "false" ||
                result.success === false
            ) {

                throw new Error(
                    result.message ||
                    "Échec de l'envoi"
                );

            }


            contactForm.reset();

            showStatus(
                "Message envoyé ! Je vous répondrai dès que possible.",
                "success"
            );


        } catch (error) {

            console.error(error);

            showStatus(
                "Le message n'a pas pu être envoyé. " +
                "Vérifiez votre connexion et réessayez.",
                "error"
            );


        } finally {

            submitButton.disabled = false;

            submitButton.removeAttribute(
                "aria-busy"
            );

            submitButton.innerHTML =
                defaultButtonContent;

        }

    });

}


/* ================= ANIMATION AU SCROLL ================= */

const elements = document.querySelectorAll(

    ".skill-card, " +
    ".project-card, " +
    ".timeline-item, " +
    ".about-container"

);


const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.15
    }

);


elements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});


/* ================= ANNÉE AUTOMATIQUE ================= */

const year =
    new Date().getFullYear();


const footerText =
    document.getElementById("footer-year");


if (footerText) {

    footerText.innerHTML =
        `© ${year} Pape Momar NDIAYE — Technicien Réseau & Systèmes`;

}


/* ================= EFFET SUR LA NAVIGATION ================= */

window.addEventListener("scroll", () => {

    const header =
        document.querySelector("header");


    if (!header) return;


    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 30px rgba(0, 0, 0, 0.25)";

    } else {

        header.style.boxShadow = "none";

    }

});
/* ================= DÉTAILS DES PROJETS ================= */

const projects = {

    zabbix : {

        title: "Supervision en temps réel avec Zabbix",

        category: "Supervision réseau",

        image: "images/zabbix.png",

        description:
            "Mise en place d'une solution de supervision permettant de surveiller les performances des serveurs et équipements réseau.",

        objective:
            "Centraliser la supervision de l'infrastructure informatique afin de détecter rapidement les problèmes réseau et systèmes.",

        technologies: [
            "Zabbix",
            "SNMP",
            "Linux",
            "Cisco",
            "FortiGate"
        ],

        realizations: [
            "Installation et configuration du serveur Zabbix",
            "Configuration de la supervision SNMP",
            "Ajout et supervision des équipements réseau",
            "Surveillance des serveurs Linux et Windows",
            "Création de tableaux de bord",
            "Configuration des alertes et notifications"
        ]

    }

};


/* ================= OUVRIR LE PROJET ================= */

function openProject(projectId) {

    const project = projects[projectId];

    if (!project) return;


    document.getElementById("modal-image").src =
        project.image;

    document.getElementById("modal-image").alt =
        project.title;


    document.getElementById("modal-category").textContent =
        project.category;


    document.getElementById("modal-title").textContent =
        project.title;


    document.getElementById("modal-description").textContent =
        project.description;


    document.getElementById("modal-objective").textContent =
        project.objective;


    /* Technologies */

    const tags =
        document.getElementById("modal-tags");

    tags.innerHTML = "";


    project.technologies.forEach(technology => {

        const tag = document.createElement("span");

        tag.textContent = technology;

        tags.appendChild(tag);

    });


    /* Réalisations */

    const realizations =
        document.getElementById("modal-realizations");

    realizations.innerHTML = "";


    project.realizations.forEach(realization => {

        const li = document.createElement("li");

        li.textContent = realization;

        realizations.appendChild(li);

    });


    /* Afficher la fenêtre */

    document
        .getElementById("project-modal")
        .classList.add("active");


    document.body.style.overflow = "hidden";

}


/* ================= FERMER LE PROJET ================= */

function closeProject() {

    document
        .getElementById("project-modal")
        .classList.remove("active");


    document.body.style.overflow = "";

}


/* ================= FERMER EN CLIQUANT À L'EXTÉRIEUR ================= */

const projectModal =
    document.getElementById("project-modal");


if (projectModal) {

    projectModal.addEventListener("click", (event) => {

        if (event.target === projectModal) {

            closeProject();

        }

    });

}


/* ================= FERMER AVEC ESC ================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeProject();

    }

});
