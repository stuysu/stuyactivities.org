import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FlexCenter from "../ui/FlexCenter";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	formFieldContainer: {
		width: "400px",
		maxWidth: "90%",
		padding: "1rem"
	},
	inputField: {
		marginBottom: "1rem"
	},
	forgotPass: {
		cursor: "pointer",
		textDecoration: "underline"
	}
});

export default function CredentialsLogin({ type = "students", setPage }) {
	const classes = useStyles();
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<FlexCenter>
			<div className={classes.formFieldContainer}>
				<TextField
					variant={"outlined"}
					value={email}
					label={"Email Address"}
					onChange={ev => setEmail(ev.target.value)}
					fullWidth
					placeholder={
						type === "students"
							? "email@stuy.edu"
							: "email@schools.nyc.gov"
					}
					className={classes.inputField}
				/>

				<TextField
					label="Password"
					variant={"outlined"}
					type={showPassword ? "text" : "password"}
					onChange={ev => setPassword(ev.target.value)}
					fullWidth
					value={password}
					className={classes.inputField}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() =>
										setShowPassword(prev => !prev)
									}
									edge="end"
								>
									{showPassword ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)}
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
				<FlexCenter>
					<Button variant={"contained"} color={"primary"} fullWidth>
						Log In
					</Button>
				</FlexCenter>

				<br />

				<Typography
					paragraph
					className={classes.forgotPass}
					onClick={() => setPage("forgot")}
				>
					I forgot my password
				</Typography>
			</div>
		</FlexCenter>
	);
}
