// Returns a new array containing val, if it didn't before or with val removed otherwise
const arrayToggle = (val, arr) => {
	const newArray = [...arr];
	const valIndex = arr.indexOf(val);

	if (valIndex === -1) {
		newArray.push(val);
	} else {
		newArray.splice(valIndex, 1);
	}

	return newArray;
};

export default arrayToggle;
