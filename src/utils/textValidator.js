const textValidator = (text, requirements) => {
	if (requirements.minChars) {
		return text?.length > requirements.minChars;
	}

	if (requirements.minWords) {
		return text?.split(" ").filter(Boolean).length > requirements.minWords;
	}

	return true;
};

export default textValidator;
