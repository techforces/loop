import domready from 'domready';
import { init } from 'Models/utils/app';
import { dispatch } from 'Models/utils/event-bus';
import 'Bootstrap';

import Grid from 'Models/grid';

domready(() => {
	dispatch('domready');
	init();

	const grid = new Grid();

	console.log(grid);
});
