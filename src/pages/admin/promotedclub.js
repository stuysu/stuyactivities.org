import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Typography, TextField, Button, Snackbar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Loading from "../../comps/ui/Loading";
import PromotedClubCard from "../../comps/pages/explore/PromotedClubCard";
import OrganizationPicker from "../../comps/ui/OrganizationPicker";

const QUERY = gql`
	query GetPromotedClubs {
		promotedClubs: promotedClubs {
			id
			blurb
			organization {
				id
				name
				url
				charter {
					id
					picture {
						url
						thumbnail(width: 80, height: 80)
					}
				}
			}
		}
	}
`;

const MUTATION = gql`
	mutation CreatePromotedClub($orgId: Int!, $blurb: String!) {
		createPromotedClub(orgId: $orgId, blurb: $blurb) {
			id
		}
	}
`;

const useStyles = makeStyles({
	newPromotion: {
		margin: "1rem 0 2rem"
	},
	deletePromotion: {
		margin: "1rem 0 0"
	},
	blurbDiv: {
		margin: "1rem 0"
	},
	mainDiv: {
		width: "1200px",
		maxWidth: "90%",
		margin: "auto"
	}
});

const ManagePromotedClubs = () => {
	const { data, loading, refetch } = useQuery(QUERY);
	const classes = useStyles();
	const [orgId, setOrgId] = React.useState(0);
	const [blurb, setBlurb] = React.useState("");
	const [success, setSuccess] = React.useState(false);
	const [addPromotedClub] = useMutation(MUTATION, {
		variables: { orgId, blurb },
		update(cache) {
			cache.reset().then(() => refetch());
		},
		onCompleted() {
			setOrgId(0);
			setBlurb("");
			setSuccess(true);
		}
	});
	if (loading) {
		return <Loading />;
	}
	return (
		<div className="mainDiv">
			<Typography variant={"h3"}>Add New Featured Club:</Typography>
			<div className={classes.newPromotion}>
				<OrganizationPicker setOrgId={setOrgId} />
				<div className={classes.blurbDiv}>
					<Typography variant={"h5"}>Blurb:</Typography>
					<TextField
						required={true}
						label="Promotion Blurb"
						variant="outlined"
						value={blurb}
						onChange={ev => setBlurb(ev.target.value)}
					/>
				</div>
				<Button variant="outlined" disabled={blurb === "" || orgId === 0} onClick={addPromotedClub}>
					Add Featured Club
				</Button>
			</div>
			<Typography variant={"h3"}>Delete Featured Club:</Typography>
			<div className={classes.deletePromotion}>
				{data === undefined || data.promotedClubs.length === 0 ? (
					<Typography>No featured clubs currently.</Typography>
				) : (
					data.promotedClubs.map(promotedClub => (
						<PromotedClubCard {...promotedClub} showDelete={true} refetch={refetch} />
					))
				)}
			</div>
			<Snackbar
				autoHideDuration={1000}
				open={success}
				onClose={() => setSuccess(false)}
				message={"Success!"}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			/>
		</div>
	);
};

export default ManagePromotedClubs;
