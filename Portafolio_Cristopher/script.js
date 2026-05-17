// ==================================================
// 1. GESTIÓN DEL LOADER
// ==================================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.visibility = 'hidden';
    }, 500);
});

// ==================================================
// 2. NAVEGACIÓN Y MENÚ HAMBURGUESA
// ==================================================
const header = document.getElementById('header');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');

// Menú móvil
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Cambiar ícono de barras a X
    const icon = mobileMenu.querySelector('i');
    if(navLinks.classList.contains('active')){
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Cerrar menú al clickear un enlace
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.querySelector('i').classList.remove('fa-times');
        mobileMenu.querySelector('i').classList.add('fa-bars');
    });
});

// ==================================================
// 3. SCROLL EFFECTS: Sticky Header, Active Links y Botón Top
// ==================================================
const btnTop = document.getElementById('btn-top');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Header fijo con sombra y blur
    if(window.scrollY > 50) {
        header.classList.add('sticky');
        btnTop.classList.add('show');
    } else {
        header.classList.remove('sticky');
        btnTop.classList.remove('show');
    }

    // Resaltar sección activa en el menú
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if(item.getAttribute('href').includes(current)){
            item.classList.add('active');
        }
    });
});

// Funcionalidad Botón Volver Arriba
btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================================================
// 4. ANIMACIÓN DE ESCRITURA (Typing Effect)
// ==================================================
const typingText = document.querySelector('.typing-text');
const words = ["Estudiante de Ingeniería en Software.", "Desarrollador Web.", "Programador."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if(isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    if(isDeleting) typeSpeed /= 2; // Borra más rápido

    if(!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pausa al completar la palabra
        isDeleting = true;
    } else if(isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pausa antes de la nueva palabra
    }

    setTimeout(type, typeSpeed);
}
// Iniciar efecto
setTimeout(type, 1000);

// ==================================================
// 5. ANIMACIONES AL HACER SCROLL (Intersection Observer)
// ==================================================
const reveals = document.querySelectorAll('.reveal');
const progressBars = document.querySelectorAll('.progress-line span');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        
        // Animación de opacidad y traslación
        entry.target.classList.add('active');
        
        // Si el elemento es el contenedor de habilidades, animar barras
        if(entry.target.classList.contains('skills-container')){
            progressBars.forEach(bar => {
                bar.classList.add('animate');
            });
        }
        
        observer.unobserve(entry.target);
    });
}, revealOptions);

reveals.forEach(reveal => {
    revealObserver.observe(reveal);
});

// ==================================================
// 6. VALIDACIÓN BÁSICA DE FORMULARIO
// ==================================================
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Simulación de envío
    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    setTimeout(() => {
        alert("¡Mensaje enviado correctamente! Me pondré en contacto contigo pronto.");
        this.reset();
        btn.innerHTML = originalText;
    }, 1500);
});

// ==================================================
// 7. SISTEMA DE PARTÍCULAS SUAVES (Fondo Animado Custom)
// ==================================================
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');
let particlesArray;

// Ajustar tamaño del canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Clase Partícula
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Tamaño pequeño y elegante
        this.speedX = Math.random() * 1 - 0.5; // Movimiento lento
        this.speedY = Math.random() * 1 - 0.5;
        this.color = 'rgba(56, 189, 248, 0.2)'; // Azul profesional con mucha transparencia
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Rebotar en los bordes
        if(this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if(this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Inicializar y animar partículas
function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 15000; // Densidad responsive
    for(let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ==================================================
// 8. FOOTER AÑO ACTUAL
// ==================================================
document.getElementById('current-year').textContent = new Date().getFullYear();