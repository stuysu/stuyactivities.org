/**
 * Returns a new string with the first word (or all words) capitalized
 * @param {string} str string to capitalize
 * @param {boolean} allWords if all words should be capitalized
 */

export default function capitalizeString(str = "", allWords = false) {
	let newString = "";

	for (let x = 0; x < str?.length; x++) {
		const canBeCapitalized = allWords && str[x - 1] === " ";

		if (x === 0 || canBeCapitalized) {
			newString += str[x].toUpperCase();
		} else {
			newString += str[x];
		}
	}

	return newString;
}

capitalizeString("hello", true);
