class Grid {
	grid;
	btn;
	filters;
	sizes;

	data_arr;
	total_cells = 15;
	default_cells = 15;

	current_filter = 'all';

	btn__less = 'btn--less';
	btn__hidden = 'btn--hidden';

	constructor () {
		/* Set up */
		this.grid = document.getElementsByClassName('photos__grid')[0];
		this.grid.innerHTML = '';

		// If window is small, then use mobile style
		if (window.innerWidth <= 980) {
			this.grid.classList.add('photos__grid--3');
			this.grid.classList.remove('photos__grid--5');
		}

		// Set grid to default size upon window resize, 3 - mobile, 5 - desktop
		window.addEventListener('resize', () => {
			if (window.innerWidth <= 980) {
				this.grid.classList.add('photos__grid--3');
				this.grid.classList.remove(
					'photos__grid--2',
					'photos__grid--4',
					'photos__grid--5',
					'photos__grid--6',
				);

				this.sizes[0].classList.remove('data-size--active');
				this.sizes[1].classList.add('data-size--active');
			} else {
				this.grid.classList.remove(
					'photos__grid--2',
					'photos__grid--3',
					'photos__grid--4',
					'photos__grid--6',
				);
				this.grid.classList.add('photos__grid--5');

				this.sizes[2].classList.remove('data-size--active');
				this.sizes[3].classList.add('data-size--active');
				this.sizes[4].classList.remove('data-size--active');
			}
		});

		// Get the button, attack ev listener
		this.btn = document.getElementsByClassName('js-load-btn')[0];
		this.btn.addEventListener('click', (el) => {
			if (el.target.classList.contains(this.btn__less)) {
				this.showLess();
			} else {
				this.loadMore();
			}
		});

		// Filter set up
		this.filters = document.getElementsByClassName('data-filter');
		for (let i = 0; i < this.filters.length; i++) {
			this.filters[i].addEventListener('click', (el) => {
				this.filter(el.target.dataset.filter, el.target);
			});
		}

		// Size set up
		this.sizes = document.getElementsByClassName('data-size');
		for (let i = 0; i < this.sizes.length; i++) {
			this.sizes[i].addEventListener('click', (el) => {
				this.resize(el.target.dataset.size, el.target);
			});
		}
	}

	// Initialize the class, needed to use it separately because of async function
	async init () {
		await this.fetchCrewMembers(1, this.default_cells);
		this.renderGrid();
	}

	// Get the filter, get the API response based on the filter, adjust the grid
	async filter (value, target) {
		for (let i = 0; i < this.filters.length; i++) {
			this.filters[i].classList.remove('data-filter--active');
		}
		target.classList.add('data-filter--active');

		this.current_filter = value;

		await this.fetchCrewMembers(1, this.default_cells + 1);
		this.total_cells = this.default_cells;
		if (this.total_cells + 1 === this.data_arr.length) {
			// Means there are more elements available
			this.data_arr.pop();
			this.btn.innerHTML = 'Load more';
			this.btn.classList.remove(this.btn__less, this.btn__hidden);
		} else {
			this.btn.classList.remove(this.btn__less);
			this.btn.classList.add(this.btn__hidden);
		}

		this.total_cells = this.data_arr.length;

		this.renderGrid();
	}

	// Adjust the grid size, does not interact with API
	resize (value, target) {
		for (let i = 0; i < this.sizes.length; i++) {
			this.sizes[i].classList.remove('data-size--active');
		}
		target.classList.add('data-size--active');

		this.grid.classList.remove(
			'photos__grid--2',
			'photos__grid--3',
			'photos__grid--4',
			'photos__grid--5',
			'photos__grid--6',
		);

		this.grid.classList.add(`photos__grid--${value}`);
	}

	// Update button state, and grid state, interacts with API
	async showLess () {
		await this.fetchCrewMembers(1, this.default_cells, this.current_filter);
		this.btn.classList.remove(this.btn__less);
		this.btn.innerHTML = 'Load more';
		this.total_cells = this.data_arr.length;
		this.renderGrid();
	}

	// Get 6 elements, check if there are more available, adjust the grid
	async loadMore () {
		await this.fetchCrewMembers(1, this.total_cells + 6);

		if (this.total_cells + 6 === this.data_arr.length) {
			// If there are more elements that can be loaded
			this.data_arr.pop();
		} else if (this.total_cells + 6 > this.data_arr.length) {
			// If there are no more elements
			this.btn.innerHTML = 'Show less';
			this.btn.classList.add(this.btn__less);
		}

		this.total_cells = this.data_arr.length;

		this.renderGrid();
	}

	// API Request is handled here
	async fetchCrewMembers (page = 1, size = 15) {
		let queryParams = `?page=${page}&limit=${size}`;
		if (this.current_filter !== 'all') {
			queryParams = `?duty=${this.current_filter}&page=${page}&limit=${size}`;
		}

		const apiUrl = 'https://challenge-api.view.agentur-loop.com/api/';
		const url = `${apiUrl}${queryParams}`;

		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: 'Bearer 0123456789',
				},
			});

			if (!response.ok) {
				throw new Error(
					`API Request Error: ${response.status} - ${response.statusText}`,
				);
			}

			const crewMembers = await response.json();
			this.data_arr = crewMembers.data.data;
		} catch (error) {
			console.error(error.message);
		}
	}

	// Render the grid dynamically
	renderGrid () {
		const data = this.data_arr;

		this.grid.innerHTML = '';

		for (let i = 0; i < data.length; i++) {
			const cell = document.createElement('div');
			cell.classList.add('photos__cell');

			const text = document.createElement('div');
			text.classList.add('photos__cell__facts');

			const h5 = document.createElement('h5');
			h5.innerHTML = data[i].name;

			const p = document.createElement('p');
			p.innerHTML = data[i].duties;

			text.appendChild(h5);
			text.appendChild(p);

			const img = document.createElement('img');
			img.src = data[i].image;
			cell.appendChild(text);
			cell.appendChild(img);

			this.grid?.appendChild(cell);
		}
	}
}

export default Grid;
