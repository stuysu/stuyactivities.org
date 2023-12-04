import { gql, useQuery } from "@apollo/client";
import { Box } from "@mui/material";

const classes = {
	mainDiv: {
		width: "1200px",
		maxWidth: "90%",
		margin: "auto"
	}
};

const QUERY = gql`
	query Organizations {
		organizations {
			id
			name
			url
			active
			charter {
				id
				picture {
					card: url(height: 180, width: 180, crop: thumb, gravity: center, radius: 100)
					thumbnail(height: 80, width: 80)
				}
				mission
				commitmentLevel
			}
			tags {
				id
				name
			}
		}
	}
`;

const ManageContent = () => {
	const { data, loading } = useQuery(QUERY);

	console.log(data)

	return (
		<Box sx={classes.mainDiv}>

		</Box>
	)
}

export default ManageContent