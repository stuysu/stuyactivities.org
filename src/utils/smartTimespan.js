import moment from "moment-timezone";

const smartTimespan = (start, end) => {
	if (start.getDate() === end.getDate()) {
		return `${moment(start).format("dddd, MMMM Do YYYY, h:mm a")} to ${moment(end).format("h:mm a")}`;
	}

	if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
		return `${moment(start).format("MMMM Do h:mm a")} to ${moment(end).format(`Do h:mm a, YYYY`)}`;
	}

	return `${moment(start).format("dddd, MMMM Do YYYY, h:mm a")} to ${moment(end).format(
		"dddd, MMMM Do YYYY, h:mm a"
	)}`;
};

export default smartTimespan;
