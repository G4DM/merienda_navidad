// ===== INICIALIZACIÓN DE LA PÁGINA FINAL =====
"use strict";

document.addEventListener("DOMContentLoaded", function () {
	// Inicializar efectos visuales
	inicializarCanvas();
	inicializarAnimaciones();
	crearFuegosArtificiales();

	// Animar elementos al cargar
	animarEntrada();

	// Lanzar confeti inicial
	setTimeout(() => {
		lanzarConfetiInicial();
	}, 500);

	// Inicializar popups
	inicializarPopups();

	// Mostrar notificación de bienvenida
	setTimeout(() => {
		mostrarNotificacion("¡Bienvenido al banquete completado! 🎉");
	}, 1000);
});

// ===== DATOS DEL MENÚ =====
const menuData = {
	entrantes: {
		title: "Entrantes",
		icon: "🎄",
		items: [
			{
				name: "Ensalada de Protocolo con Etiqueta al Punto",
				description:
					"Perfectamente alineada, a distancia entre hojas medida con regla. Incluye saludo oficial, orden de precedencias y cero alimentos reales.",
			},
			{
				name: "Pincho de Organización de Eventos Empresariales",
				description:
					"Planificado, calendarizado, enviado por email, aprobado por tres departamentos… y cancelado a última hora como todo buen evento.",
			},
			{
				name: "Pincho de Contabilidad",
				description:
					"Crujiente mezcla de asientos, balances y ese sabor clásico a '¿Por qué no me cuadra un céntimo?'",
			},
		],
	},
	principales: {
		title: "Platos Principales",
		icon: "🍽️",
		items: [
			{
				name: "Lasaña de Gestión Avanzada de la Información",
				description:
					"Capas infinitas de documentos, PDFs que nadie revisa y una salsa secreta llamada '¿Pero dónde guardé este archivo?'",
			},
			{
				name: "Estofado de Gestión Financiera",
				description:
					"Cocción lenta de presupuestos, gastos y previsiones, servido con aroma a 'este Excel pide clemencia'.",
			},
			{
				name: "Linguini de Lenguaje de Marcas",
				description:
					"Tiras de etiquetas perfectamente ordenadas, con un aliño suave de HTML que se rompe por un cierre mal puesto.",
			},
		],
	},
	postres: {
		title: "Postres",
		icon: "🍰",
		items: [
			{
				name: "Tarta Lingüística de Francés e Inglés",
				description:
					"Dulce mezcla internacional con vocabulario suave, expresiones deliciosas y un toque de pronunciación 'aprobadita'.",
			},
			{
				name: "Flan de Itinerario Personal para la Empleabilidad",
				description:
					"Suave, motivador y lleno de futuro… pero servido con la típica pregunta: '¿Y tú qué quieres hacer con tu vida?'",
			},
		],
	},
	bebidas: {
		title: "Bebidas",
		icon: "🥤",
		items: [
			{
				name: "Café de Digitalización Aplicada al Sistema Productivo",
				description:
					"Intenso, moderno y servido en una taza con QR que nadie consigue escanear. Ideal para despertarte… si el WiFi colabora.",
			},
			{
				name: "Limonada de Sostenibilidad Aplicada al Sistema Productivo",
				description:
					"Fresca, con huella de carbono cero y sabor eco-friendly. Perfecta para beber despacio y reciclar con responsabilidad.",
			},
			{
				name: "Malteada de Desarrollo de Aplicaciones Multiplataforma",
				description:
					"Batido adaptable a cualquier vaso, copa o recipiente. Cambia de sabor según el sistema operativo donde la bebas.",
			},
			{
				name: "Té de Gestión de Recursos Humanos",
				description:
					"Suave, cálido y perfectamente infundido. Viene con una galleta en forma de 'evaluación del desempeño'.",
			},
		],
	},
};

// ===== INICIALIZACIÓN DE POPUPS =====
function inicializarPopups() {
	const galleryItems = document.querySelectorAll(".gallery-item");
	const popupOverlay = document.getElementById("popupOverlay");
	const popupClose = document.getElementById("popupClose");
	const popupCloseBtn = document.getElementById("popupCloseBtn");
	const popupTitle = document.getElementById("popupTitle");
	const popupIcon = document.getElementById("popupIcon");
	const popupMenuContent = document.getElementById("popupMenuContent");

	// Agregar evento de clic a cada elemento de la galería
	galleryItems.forEach((item) => {
		item.addEventListener("click", () => {
			const category = item.getAttribute("data-category");
			if (menuData[category]) {
				mostrarPopup(category);
			}
		});

		// Agregar efecto de clic táctil
		item.addEventListener("touchstart", () => {
			item.style.transform = "scale(0.95)";
		});

		item.addEventListener("touchend", () => {
			item.style.transform = "";
		});
	});

	// Función para mostrar el popup
	function mostrarPopup(category) {
		const data = menuData[category];

		// Actualizar contenido del popup
		popupTitle.textContent = data.title;
		popupIcon.textContent = data.icon;

		// Generar HTML para los elementos del menú
		let html = "";
		data.items.forEach((item, index) => {
			html += `
                <div class="menu-item-popup">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            `;
		});

		popupMenuContent.innerHTML = html;

		// Mostrar popup con animación
		popupOverlay.classList.add("active");
		document.body.style.overflow = "hidden";

		// Vibrar en dispositivos móviles
		vibrar(30);
	}

	// Función para cerrar el popup
	function cerrarPopup() {
		popupOverlay.classList.remove("active");
		document.body.style.overflow = "";

		// Animación de salida
		gsap.to(".popup-container", {
			y: 50,
			opacity: 0,
			duration: 0.3,
			ease: "power2.in",
			onComplete: () => {
				gsap.set(".popup-container", { clearProps: "all" });
			},
		});
	}

	// Eventos para cerrar el popup
	popupClose.addEventListener("click", cerrarPopup);
	popupCloseBtn.addEventListener("click", cerrarPopup);

	// Cerrar al hacer clic fuera del popup
	popupOverlay.addEventListener("click", (e) => {
		if (e.target === popupOverlay) {
			cerrarPopup();
		}
	});

	// Cerrar con tecla Escape
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && popupOverlay.classList.contains("active")) {
			cerrarPopup();
		}
	});
}

// ===== CANVAS PARA EFECTOS VISUALES =====
function inicializarCanvas() {
	const canvas = document.getElementById("celebrationCanvas");
	const ctx = canvas.getContext("2d");

	// Ajustar tamaño del canvas
	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	resizeCanvas();
	window.addEventListener("resize", resizeCanvas);

	// Partículas de celebración
	const particles = [];
	const particleCount = 80;

	class Particle {
		constructor() {
			this.reset();
		}

		reset() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.size = Math.random() * 3 + 1;
			this.speedX = Math.random() * 1.5 - 0.75;
			this.speedY = Math.random() * 1.5 - 0.75;
			this.color = `hsl(${Math.random() * 60 + 30}, 100%, 70%)`; // Tonos dorados/verdes
			this.alpha = Math.random() * 0.4 + 0.2;
		}

		update() {
			this.x += this.speedX;
			this.y += this.speedY;

			// Rebotar en los bordes
			if (this.x > canvas.width) this.speedX = -Math.abs(this.speedX);
			if (this.x < 0) this.speedX = Math.abs(this.speedX);
			if (this.y > canvas.height) this.speedY = -Math.abs(this.speedY);
			if (this.y < 0) this.speedY = Math.abs(this.speedY);
		}

		draw() {
			ctx.save();
			ctx.globalAlpha = this.alpha;
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
	}

	// Crear partículas
	for (let i = 0; i < particleCount; i++) {
		particles.push(new Particle());
	}

	// Animación del canvas
	function animateParticles() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Fondo sutil
		ctx.fillStyle = "rgba(10, 31, 21, 0.03)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Actualizar y dibujar partículas
		particles.forEach((particle) => {
			particle.update();
			particle.draw();
		});

		requestAnimationFrame(animateParticles);
	}

	animateParticles();
}

// ===== ANIMACIONES GSAP =====
function inicializarAnimaciones() {
	// Animar el trofeo
	gsap.to(".trophy", {
		rotation: 360,
		duration: 20,
		repeat: -1,
		ease: "none",
	});

	// Animar imágenes de la galería
	gsap.from(".gallery-item", {
		scale: 0.8,
		opacity: 0,
		duration: 1,
		stagger: 0.15,
		delay: 0.5,
		ease: "elastic.out(1, 0.5)",
	});

	// Efecto de brillo en el título
	gsap.to(".highlight", {
		backgroundPosition: "200% center",
		duration: 3,
		repeat: -1,
		ease: "linear",
	});

	// Animar el badge del equipo
	gsap.from(".team-badge", {
		scale: 0,
		rotation: -180,
		duration: 1,
		delay: 1,
		ease: "back.out(1.7)",
	});
}

// ===== ANIMACIÓN DE ENTRADA =====
function animarEntrada() {
	// Animación del encabezado
	gsap.from(".final-header", {
		y: -100,
		opacity: 0,
		duration: 1.2,
		ease: "power4.out",
	});

	// Animación del contenido
	gsap.from(".celebration-card", {
		scale: 0.8,
		opacity: 0,
		duration: 1,
		delay: 0.3,
		ease: "back.out(1.7)",
	});

	// Animación del mensaje final
	gsap.from(".message-card", {
		y: 100,
		opacity: 0,
		duration: 1,
		delay: 0.8,
		ease: "power3.out",
	});
}

// ===== FUEGOS ARTIFICIALES =====
function crearFuegosArtificiales() {
	const colors = ["#ffd700", "#4cd964", "#ff6b6b", "#2196f3"];

	// Crear fuegos artificiales periódicamente
	setInterval(() => {
		if (Math.random() < 0.25) {
			// 25% de probabilidad
			lanzarFuegoArtificial();
		}
	}, 2500);

	function lanzarFuegoArtificial() {
		const x = Math.random() * 80 + 10; // 10% a 90%
		const y = Math.random() * 80 + 10;
		const color = colors[Math.floor(Math.random() * colors.length)];
		const particleCount = 20;

		for (let i = 0; i < particleCount; i++) {
			crearParticulaFuegoArtificial(x, y, color);
		}
	}

	function crearParticulaFuegoArtificial(xPercent, yPercent, color) {
		const particle = document.createElement("div");
		particle.className = "firework";
		particle.style.cssText = `
            --x: ${Math.random() * 100 - 50}px;
            --y: ${Math.random() * 100 - 50}px;
            background: ${color};
            left: ${xPercent}%;
            top: ${yPercent}%;
        `;

		document.querySelector(".confetti-burst").appendChild(particle);

		// Eliminar después de la animación
		setTimeout(() => {
			if (particle.parentNode) {
				particle.parentNode.removeChild(particle);
			}
		}, 1500);
	}
}

// ===== CONFETI INICIAL =====
function lanzarConfetiInicial() {
	const colors = ["#ffd700", "#4cd964", "#ff6b6b", "#2196f3"];
	const confettiCount = 30;

	for (let i = 0; i < confettiCount; i++) {
		setTimeout(() => {
			const confetti = document.createElement("div");
			confetti.className = "firework";
			confetti.style.cssText = `
                --x: ${Math.random() * 200 - 100}px;
                --y: ${Math.random() * 200 - 100}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;

			document.querySelector(".confetti-burst").appendChild(confetti);

			setTimeout(() => {
				if (confetti.parentNode) {
					confetti.parentNode.removeChild(confetti);
				}
			}, 1500);
		}, i * 50);
	}
}

// ===== FUNCIONALIDAD DE BOTONES =====
function reiniciarJuego() {
	// Vibrar antes de redirigir
	vibrar(100);

	// Efecto visual de reinicio
	gsap.to(".final-container", {
		opacity: 0,
		scale: 0.9,
		duration: 0.8,
		onComplete: () => {
			window.location.href = "index.html";
		},
	});
}

// ===== MANEJO DE ORIENTACIÓN =====
window.addEventListener("orientationchange", () => {
	// Re-inicializar canvas
	const canvas = document.getElementById("celebrationCanvas");
	if (canvas) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
});

// ===== VIBRACIÓN PARA MÓVILES =====
function vibrar(pattern) {
	if (navigator.vibrate) {
		navigator.vibrate(pattern);
	}
}

// Vibrar al hacer clic en los botones
document.querySelectorAll(".final-btn").forEach((btn) => {
	btn.addEventListener("click", () => {
		vibrar(50);
	});
});

// ===== NOTIFICACIÓN SIMPLE =====
function mostrarNotificacion(mensaje) {
	// Crear notificación
	const notificacion = document.createElement("div");
	notificacion.className = "notification";
	notificacion.textContent = mensaje;
	notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4cd964, #28a745);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;

	document.body.appendChild(notificacion);

	// Animación de entrada
	setTimeout(() => {
		notificacion.style.transform = "translateX(0)";
	}, 10);

	// Animación de salida
	setTimeout(() => {
		notificacion.style.transform = "translateX(150%)";
		setTimeout(() => {
			if (notificacion.parentNode) {
				notificacion.parentNode.removeChild(notificacion);
			}
		}, 300);
	}, 3000);
}

// ===== ESTRUCTURA ESTILOS PARA ITEMS DEL POPUP =====
const style = document.createElement("style");
style.textContent = `
    .menu-item-popup {
        margin-bottom: 25px;
        padding-bottom: 25px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .menu-item-popup:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }

    .menu-item-popup h3 {
        color: #ffd700;
        font-size: 1.3rem;
        margin-bottom: 10px;
        font-weight: 700;
    }

    .menu-item-popup p {
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
        margin: 0;
        font-size: 1rem;
    }
`;

document.head.appendChild(style);
