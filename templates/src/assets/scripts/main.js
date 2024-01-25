import domready from 'domready';
import { init } from 'Models/utils/app';
import { dispatch } from 'Models/utils/event-bus';
import 'Bootstrap';

import Grid from 'Models/grid';
import Wave from 'Models/Wave';

domready(() => {
	dispatch('domready');
	init();

	const grid = new Grid();
	grid.init();

	const wave = new Wave();

	console.log(wave);
});
