import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CharterFormContext } from "./Charter";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AppContext from "../../context/AppContext";
import { Close, HighlightOff } from "@material-ui/icons";

const useStyles = makeStyles({
	smallerText: {
		scale: 0.8
	},
	removeIcon: {
		cursor: "pointer"
	}
});

const QUERY = gql`
	query Users($keyword: String!) {
		users(keyword: $keyword, limit: 10) {
			id
			name
			email
			grade
			picture
			isFaculty
		}
	}
`;

const AddLeaders = () => {
	const classes = useStyles();
	const [keyword, setKeyword] = React.useState("");
	const { data, loading } = useQuery(QUERY, { variables: { keyword } });
	const context = React.useContext(AppContext);

	const form = React.useContext(CharterFormContext);

	console.log(context);
	const options =
		data?.users?.filter(
			user =>
				user.id !== context.userId &&
				!form?.leaders?.some(leader => leader.id === user.id)
		) || [];

	return (
		<div>
			<Typography>
				If your club has any leaders or faculty advisors, add them here
			</Typography>
			<br />
			<Autocomplete
				options={options}
				value={null}
				getOptionLabel={a => ""}
				renderOption={option => (
					<>
						<span>
							<span>{option?.name}</span>
							<br />
							<span className={classes.smallerText}>
								{option?.email}
								<br />
								{option?.isFaculty
									? "Faculty"
									: `Grade ${option?.grade}`}
							</span>
						</span>
					</>
				)}
				onChange={(ev, user) => {
					if (user) {
						let existingLeaders = form?.leaders || [];

						const newLeaders = [...existingLeaders];

						newLeaders.push({
							...user,
							role: user.isFaculty ? "Faculty Advisor" : "Leader"
						});

						form.set({ leaders: newLeaders });
						setKeyword("");
					}
				}}
				// Don't filter on the client
				loading={loading}
				filterOptions={a => a}
				renderInput={params => (
					<TextField
						{...params}
						label="Find User"
						variant="outlined"
						value={keyword}
						onChange={ev => setKeyword(ev.target.value)}
					/>
				)}
			/>
			<br />

			<List dense className={classes.root}>
				{form?.leaders?.map((user, index) => {
					const changeRole = ev => {
						const leaders = form.leaders.map((leader, i) => {
							if (i === index) {
								leader.role = ev.target.value;
							}
							return leader;
						});
						form.set({ leaders });
					};

					const removeLeader = () => {
						const leaders = form.leaders.filter(
							(leader, i) => i !== index
						);
						form.set({ leaders });
					};

					return (
						<ListItem key={user.id} button>
							<ListItemAvatar>
								<Avatar src={user.picture} />
							</ListItemAvatar>
							<Grid container>
								<Grid item xl={8} lg={8} md={6} sm={6} xs={12}>
									<Typography>{user.name}</Typography>
									<Typography
										color={"textSecondary"}
										variant={"subtitle2"}
									>
										{user.email}
									</Typography>
								</Grid>
								<Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
									<TextField
										fullWidth
										label={"Role"}
										value={user.role}
										onChange={changeRole}
									/>
								</Grid>
							</Grid>
							<ListItemSecondaryAction>
								<Close
									className={classes.removeIcon}
									onClick={removeLeader}
								/>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
		</div>
	);
};

export default AddLeaders;
