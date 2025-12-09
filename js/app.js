// ===== CONFIGURACIÓN INICIAL =====
const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ===== COPOS DE NIEVE CON CANVAS =====
class Snowflake {
	constructor() {
		this.reset();
	}

	reset() {
		this.x = Math.random() * canvas.width;
		this.y = -10;
		this.radius = Math.random() * 3 + 1;
		this.speed = Math.random() * 1 + 0.5;
		this.drift = Math.random() * 0.5 - 0.25;
		this.opacity = Math.random() * 0.6 + 0.4;
	}

	update() {
		this.y += this.speed;
		this.x += this.drift;

		if (this.y > canvas.height) {
			this.reset();
		}
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
		ctx.fill();
		ctx.shadowBlur = 5;
		ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
	}
}

const snowflakes = Array.from({ length: 100 }, () => new Snowflake());

function animateSnow() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	snowflakes.forEach((flake) => {
		flake.update();
		flake.draw();
	});
	requestAnimationFrame(animateSnow);
}

animateSnow();

// ===== ESTRELLAS DE FONDO =====
function createStars() {
	const container = document.getElementById("starsContainer");
	for (let i = 0; i < 50; i++) {
		const star = document.createElement("div");
		star.className = "star";
		star.style.left = `${Math.random() * 100}%`;
		star.style.top = `${Math.random() * 80}%`;
		star.style.animationDelay = `${Math.random() * 3}s`;
		container.appendChild(star);

		gsap.to(star, {
			opacity: Math.random() * 0.5 + 0.3,
			duration: 2 + Math.random() * 2,
			repeat: -1,
			yoyo: true,
			ease: "power1.inOut",
		});
	}
}

// ===== LUCES NAVIDEÑAS COLGANDO DEL CABLE =====
function createLights() {
	const container = document.getElementById("lightsContainer");
	const cablePath = document.getElementById("cablePath");
	const pathLength = cablePath.getTotalLength();
	const numLights = 12;
	const colors = ["light-red", "light-yellow", "light-green", "light-blue", "light-purple", "light-orange"];

	for (let i = 0; i < numLights; i++) {
		const progress = (i / (numLights - 1)) * pathLength;
		const point = cablePath.getPointAtLength(progress);

		const bulb = document.createElement("div");
		bulb.className = `light-bulb ${colors[i % colors.length]}`;

		// Calcular posición relativa al contenedor
		const containerWidth = container.parentElement.offsetWidth;
		const svgWidth = container.parentElement.querySelector(".light-cable").getBBox().width;
		const scale = (containerWidth * 0.9) / 400; // 90% del ancho del contenedor

		bulb.style.left = `${point.x * scale + containerWidth * 0.05}px`;
		bulb.style.top = `${point.y + 10}px`;

		container.appendChild(bulb);

		// Animación de parpadeo
		gsap.to(bulb, {
			opacity: 0.6,
			duration: 0.8 + Math.random() * 0.6,
			repeat: -1,
			yoyo: true,
			ease: "power1.inOut",
			delay: i * 0.15,
		});

		// Animación de balanceo suave
		gsap.to(bulb, {
			rotation: Math.random() * 6 - 3,
			duration: 2 + Math.random() * 1,
			repeat: -1,
			yoyo: true,
			ease: "sine.inOut",
			delay: i * 0.1,
		});
	}
}

// ===== BOSQUE NAVIDEÑO =====
function createForest() {
	const forest = document.getElementById("forest");
	const treeCount = Math.floor(window.innerWidth / 70);
	const colors = ["#ff0000", "#ffd700", "#00ff00", "#00ffff", "#ff69b4", "#ffffff"];

	for (let i = 0; i < treeCount; i++) {
		const tree = document.createElement("div");
		tree.className = "tree";

		const position = (i / treeCount) * 100 + (Math.random() * 10 - 5);
		tree.style.left = `${position}%`;

		const scale = 0.6 + Math.random() * 0.5;
		tree.style.transform = `scale(${scale})`;

		// Partes del árbol
		["top", "middle", "bottom"].forEach((part) => {
			const treePart = document.createElement("div");
			treePart.className = `tree-part tree-${part}`;
			tree.appendChild(treePart);
		});

		// Tronco
		const trunk = document.createElement("div");
		trunk.className = "tree-trunk";
		tree.appendChild(trunk);

		// Ornamentos
		const ornamentCount = 5 + Math.floor(Math.random() * 5);
		for (let j = 0; j < ornamentCount; j++) {
			const ornament = document.createElement("div");
			ornament.className = "ornament";
			ornament.style.left = `${40 + Math.random() * 20}%`;
			ornament.style.bottom = `${10 + Math.random() * 70}%`;
			ornament.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
			tree.appendChild(ornament);

			gsap.to(ornament, {
				boxShadow: `0 0 15px ${ornament.style.backgroundColor}`,
				duration: 1 + Math.random(),
				repeat: -1,
				yoyo: true,
				ease: "power1.inOut",
			});
		}

		forest.appendChild(tree);

		// Animación de entrada
		gsap.from(tree, {
			y: 50,
			opacity: 0,
			duration: 1,
			delay: i * 0.05,
			ease: "back.out(1.2)",
		});
	}
}

// ===== ANIMACIONES GSAP DEL TÍTULO (SIN FLOTACIÓN) =====
function animateTitle() {
	const words = document.querySelectorAll(".title-word");

	// Solo animación de entrada, sin flotación continua
	gsap.from(words, {
		y: -50,
		opacity: 0,
		duration: 1,
		stagger: 0.2,
		ease: "elastic.out(1, 0.5)",
	});

	// Efecto de brillo pulsante solo en el 2025
	gsap.to(".title-word-3", {
		filter: "drop-shadow(0 0 35px rgba(255, 215, 0, 0.9))",
		duration: 1.5,
		repeat: -1,
		yoyo: true,
		ease: "power1.inOut",
	});
}

// ===== ANIMACIÓN DE LA INFO =====
function animateInfo() {
	gsap.from(".info", {
		scale: 0.8,
		opacity: 0,
		duration: 1,
		delay: 0.8,
		ease: "back.out(1.7)",
	});

	gsap.from(".info p", {
		y: 20,
		opacity: 0,
		duration: 0.8,
		stagger: 0.2,
		delay: 1,
		ease: "power2.out",
	});
}

// ===== RESIZE =====
window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const forest = document.getElementById("forest");
	forest.innerHTML = "";
	createForest();

	const lightsContainer = document.getElementById("lightsContainer");
	lightsContainer.innerHTML = "";
	createLights();
});

// ===== INICIALIZACIÓN =====
window.addEventListener("DOMContentLoaded", () => {
	createStars();
	createLights();
	createForest();
	animateTitle();
	animateInfo();
});
