import * as THREE from 'three';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';
import gsap from 'gsap';

class Wave {
	body;
	canvas;

	perspective;
	scene;
	renderer;

	camera;
	fov;

	planeGeometry;
	planeMaterial;

	arr;

	raycaster;
	mouse;

	planeW;
	planeH;

	constructor () {
		this.arr = [];

		this.animate = this.animate.bind(this);
		this.restart = this.restart.bind(this);
		this.updateRaycaster = this.updateRaycaster.bind(this);

		this.canvas = document.getElementById('stage');
		this.body = document.getElementsByTagName('body')[0];

		/* Raycaster */
		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2(999, 999);

		/* Set up */
		this.perspective = 800;
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			alpha: true,
			antialias: true,
		});

		this.renderer.setSize(
			window.innerWidth / 1.5,
			window.innerHeight / 1.5,
		);
		this.renderer.setPixelRatio(window.devicePixelRatio);

		// Camera calculations to map the object size to the viewport size
		this.fov =
			(180 * (2 * Math.atan(window.innerHeight / 2 / this.perspective))) /
			Math.PI;
		this.camera = new THREE.PerspectiveCamera(
			this.fov,
			window.innerWidth / window.innerHeight,
			1,
			5000,
		);

		this.camera.position.set(0, 0, this.perspective);

		// Texture loader
		const loader = new THREE.TextureLoader();
		let texture;

		loader.load(
			'./assets/images/visual.jpg',
			(el) => {
				texture = el;
				this.planeMaterial.uniforms.u_image.value = el;
				this.planeMaterial.uniforms.imageRatio.value =
					el.image.width / el.image.height;
			},
			undefined,
			function () {
				console.error('An error happened.');
			},
		);

		// Plane calculations and properties
		this.planeW = Math.min(window.innerWidth * 0.8, 1200);
		this.planeH = this.planeW / 2;

		const imageRatio = 820 / 410;
		const planeRatio = this.planeW / this.planeH;

		this.planeGeometry = new THREE.PlaneGeometry(
			this.planeW,
			this.planeH,
			50,
			50,
		);
		this.planeMaterial = new THREE.ShaderMaterial({
			uniforms: {
				resolution: { value: new THREE.Vector2(1000, 500) },
				time: { value: performance.now() },
				mu: { value: [] },
				arr_length: { value: 0 },
				u_image: { type: 't', value: texture },
				imageRatio: { value: imageRatio },
				planeRatio: { value: planeRatio },
			},
			vertexShader,
			fragmentShader,
			side: THREE.DoubleSide,
			defines: {
				PR: window.devicePixelRatio.toFixed(1),
			},
		});

		// Adding the plane
		this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
		this.scene.add(this.plane);

		// Detect the click
		this.canvas.addEventListener('click', () => {
			this.restart();
		});

		// Update the mouse
		document.addEventListener('mousemove', (event) => {
			this.updateRaycaster(event);
		});

		// Resize event, make the plane size responsive
		window.addEventListener('resize', () => {
			this.camera.aspect =
				(window.innerWidth * 0.8) / (window.innerHeight * 0.8);
			this.camera.updateProjectionMatrix();

			this.renderer.setSize(window.innerWidth - 80, window.innerHeight);

			this.planeW = Math.min(window.innerWidth * 0.8, 1200);
			this.planeH = this.planeW / 2;

			this.plane.geometry.dispose();
			this.plane.geometry = new THREE.PlaneGeometry(
				this.planeW,
				this.planeH,
				50,
				50,
			);
		});

		this.animate();
	}

	/* Main animation loop */
	animate () {
		this.planeMaterial.uniforms.time.value = -performance.now() * 0.25;
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.animate);
	}

	/* Update cursor position to calculate when to set Pointer Cursor */
	updateRaycaster (event) {
		const rect = this.renderer.domElement.getBoundingClientRect();

		this.mouse.x =
			((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
		this.mouse.y =
			-((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

		this.raycaster.setFromCamera(this.mouse, this.camera);
		const intersects = this.raycaster.intersectObject(this.plane);

		if (intersects.length > 0) {
			this.body.style.cursor = 'pointer';
		} else {
			this.body.style.cursor = 'default';
		}

		return intersects;
	}

	/* Start the animation, each animation is a separate process */
	restart () {
		const val = {
			mu: -1000,
			i: this.arr.length,
			m: this.arr.length + 1,
		};
		gsap.to(val, 2, {
			mu: 6000,
			ease: 'power1.inOut',
			onStart: () => {
				this.arr.push(val.mu);
			},
			onUpdate: () => {
				if (val.m < this.arr.length) {
					val.m = this.arr.length;
				} else if (val.m !== this.arr.length) {
					val.m = this.arr.length;
					val.i--;
				}

				this.arr[val.i] = val.mu;
				this.planeMaterial.uniforms.mu.value = this.arr;
				this.planeMaterial.uniforms.arr_length.value = this.arr.length;
			},
			onComplete: () => {
				this.arr.shift();
				this.planeMaterial.uniforms.mu.value = this.arr;
				this.planeMaterial.uniforms.arr_length.value = this.arr.length;
			},
		});
	}
}

export default Wave;
