function random(seed) {
	const x = Math.sin(seed++) * 10000;
	return x - Math.floor(x);
}

// Credit where it's due: https://stackoverflow.com/questions/16801687/javascript-random-ordering-with-seed
export default function shuffleArray(array, seed) {
	let m = array.length,
		t,
		i;

	while (m) {
		i = Math.floor(random(seed) * m--);

		t = array[m];
		array[m] = array[i];
		array[i] = t;
		++seed;
	}

	return array;
}
