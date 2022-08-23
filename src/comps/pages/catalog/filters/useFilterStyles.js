import makeStyles from "@mui/styles/makeStyles";

const useFilterStyles = makeStyles(theme => ({
	filterChild: {
		padding: theme.spacing(1),
		width: "100%"
	},
	accordionChild: {
		"padding-left": theme.spacing(1)
	},
	tagContainer: {
		padding: theme.spacing(1)
	},
	tag: {
		margin: "3px"
	}
}));

export default useFilterStyles;
