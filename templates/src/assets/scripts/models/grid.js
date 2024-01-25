class Grid {
	rows;
	grid;

	default_rows = 3;
	default_size = 5;

	current_rows = 3;
	current_size = 5;

	filters;
	sizes;

	constructor () {
		this.rows = [];
		this.grid = document.getElementsByClassName('photos__grid')[0];
		this.grid.innerHTML = '';

		const btn = document.getElementsByClassName('js-load-btn')[0];
		btn.addEventListener('click', () => {
			console.log('click');
		});

		this.filters = document.getElementsByClassName('data-filter');

		for (let i = 0; i < this.filters.length; i++) {
			this.filters[i].addEventListener('click', (el) => {
				this.filter(el.target.dataset.filter, el.target);
			});
		}

		this.sizes = document.getElementsByClassName('data-size');

		for (let i = 0; i < this.sizes.length; i++) {
			this.sizes[i].addEventListener('click', (el) => {
				this.resize(el.target.dataset.size, el.target);
			});
		}
	}

	filter (value, target) {
		for (let i = 0; i < this.filters.length; i++) {
			this.filters[i].classList.remove('data-filter--active');
		}
		target.classList.add('data-filter--active');

		this.fetchCrewMembers(1, 15, value);
	}

	resize (value, target) {
		console.log(value);
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

		// this.fetchCrewMembers(1, 15, value);
	}

	addElements (data) {
		console.log(data);

		this.grid.innerHTML = '';

		for (let i = 0; i < data.length; i++) {
			// console.log(data[idx]);
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

	async fetchCrewMembers (page = 1, size = 15, filter = 'all') {
		let queryParams = `?page=${page}&limit=${size}`;
		if (filter !== 'all') {
			queryParams = `?duty=${filter}&page=${page}&limit=${size}`;
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
			this.addElements(crewMembers.data.data);
		} catch (error) {
			console.error(error.message);
		}
	}
}

export default Grid;
