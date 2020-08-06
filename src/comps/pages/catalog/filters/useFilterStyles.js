import { makeStyles } from "@material-ui/core/styles";

const useFilterStyles = makeStyles(theme => ({
	filterChild: {
		padding: theme.spacing(1),
		width: "100%"
	},
	accordionChild: {
		"padding-left": theme.spacing(1)
	}
}));

export default useFilterStyles;
