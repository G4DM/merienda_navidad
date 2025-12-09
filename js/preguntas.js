// ===== CONFIGURACIÓN MÓVIL REUTILIZABLE =====
"use strict";

// Configuración por página (4 niveles)
const configuraciones = {
	entrantes: {
		respuestasCorrectas: {
			pregunta1: "respuesta2", // Ensalada de Protocolo
			pregunta2: "respuesta8", // Pincho de Organización de Eventos
			pregunta3: "respuesta11", // Pincho de Contabilidad
		},
		totalPreguntas: 3,
		titulo: "🎄 Entrantes 🎄",
		siguientePagina: "principales.html",
		nivel: 1,
		icono: "❄️",
		esFinal: false,
	},
	principales: {
		respuestasCorrectas: {
			pregunta1: "resp_prin2", // Lasaña de Gestión Avanzada de la Información
			pregunta2: "resp_prin5", // Estofado de Gestión Financiera
			pregunta3: "resp_prin11", // Linguini de Lenguaje de Marcas
		},
		totalPreguntas: 3,
		titulo: "🍽️ Platos Principales 🍽️",
		siguientePagina: "postres.html",
		nivel: 2,
		icono: "🍽️",
		esFinal: false,
	},
	postres: {
		respuestasCorrectas: {
			pregunta1: "resp_postre3", // Tarta Lingüística de Francés e Inglés
			pregunta2: "resp_postre8", // Flan de Itinerario Personal para la Empleabilidad
		},
		totalPreguntas: 2,
		titulo: "🍰 Postres 🍰",
		siguientePagina: "bebidas.html",
		nivel: 3,
		icono: "🍰",
		esFinal: false,
	},
	bebidas: {
		respuestasCorrectas: {
			pregunta1: "resp_bebida4", // Café de Digitalización Aplicada al Sistema Productivo
			pregunta2: "resp_bebida7", // Limonada de Sostenibilidad Aplicada al Sistema Productivo
			pregunta3: "resp_bebida10", // Malteada de Desarrollo de Aplicaciones Multiplataforma
			pregunta4: "resp_bebida13", // Té de Gestión de Recursos Humanos
		},
		totalPreguntas: 4,
		titulo: "🥤 Bebidas 🥤",
		siguientePagina: "fin.html",
		nivel: 4,
		icono: "🥤",
		esFinal: true,
	},
};

// Variables globales
let preguntasRespondidas = 0;
let totalPreguntas = 0;
let respuestasCorrectas = {};
let paginaActual = "";
let progressFill, progressText;
let config;

// ===== DETECTAR PÁGINA ACTUAL =====
function detectarPagina() {
	const path = window.location.pathname;
	const page = path.split("/").pop();

	if (page.includes("entrantes")) return "entrantes";
	if (page.includes("principales")) return "principales";
	if (page.includes("postres")) return "postres";
	if (page.includes("bebidas")) return "bebidas";

	// Por defecto
	return "entrantes";
}

// ===== INICIALIZACIÓN MÓVIL =====
document.addEventListener("DOMContentLoaded", function () {
	// Detectar página actual
	paginaActual = detectarPagina();
	config = configuraciones[paginaActual];

	if (!config) {
		console.error("Configuración no encontrada para página:", paginaActual);
		return;
	}

	// Configurar página
	respuestasCorrectas = config.respuestasCorrectas;
	totalPreguntas = config.totalPreguntas;

	// Configurar título si es necesario
	const titleElement = document.querySelector(".mobile-title");
	if (titleElement && config.titulo) {
		titleElement.textContent = config.titulo;
	}

	// Configurar subtítulo con número de preguntas
	const subtitleElement = document.querySelector(".mobile-subtitle");
	if (subtitleElement) {
		subtitleElement.textContent = `Responde las ${config.totalPreguntas} preguntas para ${
			config.esFinal ? "terminar" : "continuar"
		}`;
	}

	// Configurar footer
	actualizarFooter(config);

	// Elementos de progreso
	progressFill = document.getElementById("progressFill");
	progressText = document.getElementById("progressText");

	// Si es la página final, añadir clase especial
	if (config.esFinal) {
		document.body.classList.add("final-level");
	}

	// Inicializar elementos
	inicializarElementos();
	inicializarEventosTactiles();
	animarEntrada();

	// Actualizar progreso inicial
	actualizarProgreso();

	// Prevenir zoom con doble toque
	prevenirZoom();
});

// ===== ACTUALIZAR FOOTER =====
function actualizarFooter(config) {
	const nivelElement = document.querySelector(".footer-text:last-child");
	const iconElement = document.querySelector(".footer-icon:first-child");

	if (nivelElement) {
		nivelElement.textContent = `Nivel: ${config.nivel}/4`;
	}

	if (iconElement && config.icono) {
		iconElement.textContent = config.icono;
	}

	// Actualizar nombre de la categoría
	const categoriaElement = document.querySelector(".footer-text:first-child");
	if (categoriaElement) {
		const nombresCategorias = {
			entrantes: "Entrantes",
			principales: "Platos Principales",
			postres: "Postres",
			bebidas: "Bebidas",
		};
		categoriaElement.textContent = nombresCategorias[paginaActual] || "Categoría";
	}
}

// ===== INICIALIZAR ELEMENTOS =====
function inicializarElementos() {
	// Preparar imagen para animación
	const imagenId = `img_${paginaActual}`;
	const imagen = document.getElementById(imagenId);

	if (imagen) {
		imagen.style.opacity = "0";
		imagen.style.transform = "scale(0.9) translateY(20px)";
	}

	// Mostrar primera pregunta
	const primeraPregunta = document.getElementById("div_p1");
	if (primeraPregunta) {
		setTimeout(() => {
			primeraPregunta.style.display = "block";
			setTimeout(() => {
				primeraPregunta.classList.add("active");
			}, 50);
		}, 300);
	}

	// Ocultar otras preguntas
	for (let i = 2; i <= totalPreguntas; i++) {
		const pregunta = document.getElementById(`div_p${i}`);
		if (pregunta) {
			pregunta.style.display = "none";
		}
	}

	// Inicializar progreso de la barra
	if (progressFill) {
		progressFill.style.width = "0%";
	}
}

// ===== INICIALIZAR EVENTOS TÁCTILES =====
function inicializarEventosTactiles() {
	// Opciones táctiles mejoradas
	const opciones = document.querySelectorAll(".option-card");

	opciones.forEach((opcion) => {
		// Evento táctil
		opcion.addEventListener(
			"touchstart",
			function (e) {
				e.preventDefault();
				this.style.transform = "scale(0.98)";
			},
			{ passive: false }
		);

		opcion.addEventListener(
			"touchend",
			function (e) {
				e.preventDefault();
				this.style.transform = "";

				// Seleccionar opción
				const radio = this.querySelector('input[type="radio"]');
				if (radio) {
					seleccionarOpcion(radio.id);
				}
			},
			{ passive: false }
		);

		opcion.addEventListener(
			"touchmove",
			function (e) {
				e.preventDefault();
			},
			{ passive: false }
		);

		// También soporte para click
		opcion.addEventListener("click", function () {
			const radio = this.querySelector('input[type="radio"]');
			if (radio) {
				seleccionarOpcion(radio.id);
			}
		});
	});

	// Botones táctiles
	const botones = document.querySelectorAll(".mobile-btn");
	botones.forEach((boton) => {
		boton.addEventListener("touchstart", function () {
			this.style.transform = "scale(0.97)";
		});

		boton.addEventListener("touchend", function () {
			this.style.transform = "";
		});
	});
}

// ===== SELECCIONAR OPCIÓN =====
function seleccionarOpcion(opcionId) {
	// Encontrar el formulario padre
	const opcionElement = document.getElementById(opcionId);
	if (!opcionElement) return;

	const form = opcionElement.closest("form");
	if (!form) return;

	// Desmarcar todas las opciones del formulario
	const opciones = form.querySelectorAll(".option-card");
	opciones.forEach((opcion) => {
		opcion.classList.remove("selected");
		const radio = opcion.querySelector('input[type="radio"]');
		if (radio) {
			radio.checked = false;
		}
	});

	// Marcar la opción seleccionada
	const opcionSeleccionada = opcionElement.closest(".option-card");
	if (opcionSeleccionada) {
		opcionSeleccionada.classList.add("selected");
		opcionElement.checked = true;

		// Feedback táctil
		vibrar(30);
	}
}

// ===== VERIFICAR RESPUESTA =====
function verificarRespuesta(preguntaId) {
	const numPregunta = preguntaId.replace("pregunta", "");
	const form = document.getElementById(`form_${paginaActual}${numPregunta}`);

	if (!form) {
		console.error("Formulario no encontrado:", `form_${paginaActual}${numPregunta}`);
		return;
	}

	const respuestaSeleccionada = form.querySelector('input[type="radio"]:checked');

	if (!respuestaSeleccionada) {
		mostrarMensaje("Selecciona una opción primero", "incorrecto");
		vibrar(50);
		return;
	}

	const divActual = document.getElementById(`div_p${numPregunta}`);
	const esCorrecta = respuestaSeleccionada.value === respuestasCorrectas[preguntaId];

	if (esCorrecta) {
		// Respuesta correcta
		preguntasRespondidas++;

		// Feedback visual y táctil
		divActual.classList.add("correct-answer");
		mostrarMensaje("¡Correcto! 🎉", "correcto");
		vibrar([50, 30, 50]);

		// Actualizar progreso
		actualizarProgreso();

		// Transición a siguiente pregunta
		setTimeout(() => {
			divActual.classList.remove("correct-answer");

			gsap.to(divActual, {
				opacity: 0,
				y: -30,
				duration: 0.4,
				ease: "power2.in",
				onComplete: () => {
					divActual.style.display = "none";

					if (preguntasRespondidas < totalPreguntas) {
						// Mostrar siguiente pregunta
						const siguienteDiv = document.getElementById(`div_p${preguntasRespondidas + 1}`);
						siguienteDiv.style.display = "block";

						gsap.fromTo(
							siguienteDiv,
							{ opacity: 0, y: 30 },
							{ opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
						);
					} else {
						// Mostrar pantalla de éxito
						mostrarPantallaExito();
					}
				},
			});
		}, 800);
	} else {
		// Respuesta incorrecta
		divActual.classList.add("wrong-answer");
		mostrarMensaje("Incorrecto, intenta otra vez", "incorrecto");
		vibrar(200);

		setTimeout(() => {
			divActual.classList.remove("wrong-answer");
		}, 500);
	}
}

// ===== ACTUALIZAR PROGRESO =====
function actualizarProgreso() {
	if (!progressFill || !progressText) return;

	const porcentaje = (preguntasRespondidas / totalPreguntas) * 100;

	// Animación de la barra de progreso
	gsap.to(progressFill, {
		width: `${porcentaje}%`,
		duration: 0.5,
		ease: "power2.out",
	});

	// Actualizar texto
	progressText.textContent = `Pregunta ${Math.min(preguntasRespondidas + 1, totalPreguntas)} de ${totalPreguntas}`;
}

// ===== MOSTRAR PANTALLA DE ÉXITO =====
function mostrarPantallaExito() {
	const divContinuar = document.getElementById("div_continuar");
	if (!divContinuar) return;

	// Actualizar enlace si es necesario
	const config = configuraciones[paginaActual];
	const enlaceContinuar = divContinuar.querySelector("a");
	if (enlaceContinuar && config && config.siguientePagina) {
		enlaceContinuar.href = config.siguientePagina;

		// Actualizar texto del botón según la siguiente página
		const siguientePagina = config.siguientePagina.replace(".html", "");
		const textosBoton = {
			principales: "Ir a los Platos Principales",
			postres: "Ir a los Postres",
			bebidas: "Ir a las Bebidas",
			fin: "Ver Resultados Finales",
		};

		const btnText = enlaceContinuar.querySelector(".btn-text");
		if (btnText && textosBoton[siguientePagina]) {
			btnText.textContent = textosBoton[siguientePagina];
		}
	}

	// Animación de entrada
	divContinuar.style.display = "block";

	gsap.fromTo(
		divContinuar,
		{ opacity: 0, scale: 0.9 },
		{
			opacity: 1,
			scale: 1,
			duration: 0.6,
			ease: "back.out(1.7)",
			onComplete: () => {
				divContinuar.classList.add("active");

				// Efectos especiales según si es el nivel final
				if (config.esFinal) {
					lanzarFuegosArtificiales();
					vibrar([100, 50, 100, 50, 100]);
					mostrarMensajeFinal();
				} else {
					lanzarConfeti();
					vibrar([100, 50, 100]);
				}

				// Actualizar tip según la página
				const tipElement = divContinuar.querySelector(".mobile-tip");
				if (tipElement && config) {
					const tips = {
						entrantes: "🎯 Tip: Los platos principales te esperan",
						principales: "🎯 Tip: Los postres son la parte más dulce",
						postres: "🎉 Tip: ¡Ya casi terminas! Solo falta la última parte",
						bebidas: "🏆 Tip: ¡Felicidades! Has completado todo el menú",
					};
					if (tips[paginaActual]) {
						tipElement.textContent = tips[paginaActual];
					}
				}
			},
		}
	);

	// Scroll automático a la sección de éxito
	setTimeout(() => {
		divContinuar.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
	}, 600);
}

// ===== LANZAR CONFETI MÓVIL =====
function lanzarConfeti() {
	const colors = ["#ff6b6b", "#4cd964", "#ffd700", "#2196f3", "#9c27b0", "#ff9800"];
	const confettiCount = config.esFinal ? 50 : 25; // Más confeti para el final

	for (let i = 0; i < confettiCount; i++) {
		const confetti = document.createElement("div");
		confetti.className = config.esFinal ? "confetti-particle final-confetti" : "confetti-particle";
		confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
		confetti.style.left = `${Math.random() * 100}%`;
		confetti.style.animationDuration = `${1 + Math.random() * 2}s`;
		confetti.style.animationDelay = `${Math.random() * 0.5}s`;

		document.body.appendChild(confetti);

		// Limpiar después de la animación
		setTimeout(
			() => {
				if (confetti.parentNode) {
					confetti.parentNode.removeChild(confetti);
				}
			},
			config.esFinal ? 5000 : 3000
		);
	}
}

// ===== FUEGOS ARTIFICIALES ESPECIALES PARA EL FINAL =====
function lanzarFuegosArtificiales() {
	const colors = ["#ff6b6b", "#4cd964", "#ffd700", "#2196f3", "#9c27b0"];
	const fireworkCount = 8;

	for (let i = 0; i < fireworkCount; i++) {
		setTimeout(() => {
			const x = 20 + Math.random() * 60; // 20% a 80%
			const y = 20 + Math.random() * 60;

			// Crear fuegos artificiales
			for (let j = 0; j < 20; j++) {
				const particle = document.createElement("div");
				particle.className = "final-firework";
				particle.style.left = `${x}%`;
				particle.style.top = `${y}%`;
				particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
				particle.style.animationDelay = `${j * 0.05}s`;

				document.body.appendChild(particle);

				// Limpiar después
				setTimeout(() => {
					if (particle.parentNode) {
						particle.parentNode.removeChild(particle);
					}
				}, 2000);
			}
		}, i * 300); // Espaciar los fuegos artificiales
	}
}

// ===== MENSAJE FINAL ESPECIAL =====
function mostrarMensajeFinal() {
	setTimeout(() => {
		mostrarMensaje("¡MENÚ COMPLETADO! 🎊", "correcto");

		// Mostrar estadísticas finales
		setTimeout(() => {
			const finalStats = document.createElement("div");
			finalStats.className = "mensaje-feedback correcto";
			finalStats.innerHTML = `
                <div style="font-size: 1.5rem; margin-bottom: 10px;">📊 Estadísticas Finales</div>
                <div style="font-size: 1rem; margin: 5px 0;">✅ 4 Niveles Superados</div>
                <div style="font-size: 1rem; margin: 5px 0;">🎯 12 Preguntas Acertadas</div>
                <div style="font-size: 1rem; margin: 5px 0;">🏆 100% Completado</div>
            `;
			finalStats.style.animationDelay = "0.5s";
			document.body.appendChild(finalStats);

			// Eliminar después de mostrar
			setTimeout(() => {
				finalStats.remove();
			}, 2500);
		}, 1000);
	}, 500);
}

// ===== MOSTRAR MENSAJE =====
function mostrarMensaje(texto, tipo) {
	// Limpiar mensajes anteriores
	const mensajesPrevios = document.querySelectorAll(".mensaje-feedback");
	mensajesPrevios.forEach((msg) => msg.remove());

	// Crear nuevo mensaje
	const mensaje = document.createElement("div");
	mensaje.className = `mensaje-feedback ${tipo}`;
	mensaje.textContent = texto;
	document.body.appendChild(mensaje);
}

// ===== ANIMACIÓN DE ENTRADA =====
function animarEntrada() {
	// Animación de la imagen
	const imagenId = `img_${paginaActual}`;
	const imagen = document.getElementById(imagenId);

	if (imagen) {
		gsap.to(imagen, {
			opacity: 1,
			scale: 1,
			y: 0,
			duration: 0.8,
			delay: 0.2,
			ease: "back.out(1.7)",
		});
	}

	// Animación del header
	const header = document.querySelector(".mobile-header");
	if (header) {
		gsap.from(header, {
			y: -50,
			opacity: 0,
			duration: 0.6,
			ease: "power2.out",
		});
	}
}

// ===== VIBRACIÓN (API VIBRATE) =====
function vibrar(pattern) {
	if (navigator.vibrate) {
		navigator.vibrate(pattern);
	}
}

// ===== PREVENIR ZOOM =====
function prevenirZoom() {
	let lastTouchEnd = 0;

	document.addEventListener(
		"touchstart",
		function (event) {
			if (event.touches.length > 1) {
				event.preventDefault();
			}
		},
		{ passive: false }
	);

	document.addEventListener(
		"touchend",
		function (event) {
			const now = new Date().getTime();
			if (now - lastTouchEnd <= 300) {
				event.preventDefault();
			}
			lastTouchEnd = now;
		},
		false
	);

	// Prevenir zoom con doble toque
	document.addEventListener("gesturestart", function (e) {
		e.preventDefault();
	});
}

// ===== MANEJO DE ORIENTACIÓN =====
window.addEventListener("orientationchange", function () {
	setTimeout(function () {
		const preguntas = document.querySelectorAll(".question-card");
		preguntas.forEach((pregunta) => {
			if (window.innerHeight < window.innerWidth) {
				// Landscape
				pregunta.style.maxWidth = "500px";
			} else {
				// Portrait
				pregunta.style.maxWidth = "400px";
			}
		});
	}, 300);
});

// ===== PREVENIR DESPLAZAMIENTO INERTIAL EN IOS =====
document.addEventListener(
	"touchmove",
	function (e) {
		if (e.target.closest(".mobile-main")) {
			return;
		}
		e.preventDefault();
	},
	{ passive: false }
);
