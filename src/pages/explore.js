import React, { useContext } from "react";
import { Typography, useMediaQuery } from "@material-ui/core";
import UserContext from "../comps/context/UserContext";
import SignInRequired from "../comps/ui/SignInRequired";
import { gql, useQuery } from "@apollo/client";
import Loading from "../comps/ui/Loading";
import UpdateCard from "../comps/updates/UpdateCard";
import MeetingCard from "../comps/meetings/MeetingCard";
import Carousel from "react-multi-carousel";
import { makeStyles } from "@material-ui/core/styles";
import Masonry from "react-masonry-css";
import FlexCenter from "../comps/ui/FlexCenter";

const QUERY = gql`
	query {
		updates: exploreUpdates {
			id
			title
			content
			links {
				id
				title
				description
				url
				siteName
				image
			}
			pictures {
				id
				description
				width
				height
				defaultUrl
				publicId
			}
			createdAt
			organization {
				id
				name
				url
				charter {
					id
					picture
				}
			}
		}

		meetings: exploreMeetings {
			id
			title
			description
			start
			end
			organization {
				id
				name
				url
				charter {
					id
					picture
				}
			}
		}
	}
`;

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 4,
		slidesToSlide: 3
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
		slidesToSlide: 2
	},
	tablet: {
		breakpoint: { max: 1024, min: 600 },
		items: 2,
		slidesToSlide: 1
	},
	mobile: {
		breakpoint: { max: 600, min: 0 },
		items: 1,
		slidesToSlide: 1
	}
};

const useStyles = makeStyles({
	meetingCard: {
		height: 450,
		overflow: "auto",
		overflowWrap: "anywhere",
		margin: "0 0.5rem"
	}
});

const ExploreContent = () => {
	const isMobile = useMediaQuery("(max-width: 900px)");
	const classes = useStyles();
	const { data, loading } = useQuery(QUERY);

	if (loading) {
		return <Loading />;
	}

	if (!data) {
		return null;
	}

	return (
		<div>
			<Typography variant={"h3"}>Public Meetings</Typography>
			<Carousel responsive={responsive}>
				{data.meetings.map(meeting => (
					<MeetingCard {...meeting} key={meeting.id} className={classes.meetingCard} />
				))}
			</Carousel>
			<Typography variant={"h3"}>Club Updates:</Typography>
			<Masonry
				breakpointCols={isMobile ? 1 : 2}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{data.updates.map(update => (
					<UpdateCard {...update} />
				))}
			</Masonry>
		</div>
	);
};

const Explore = () => {
	const user = useContext(UserContext);

	if (!user.signedIn) {
		return <SignInRequired />;
	}

	return (
		<FlexCenter>
			<div style={{ width: "1200px", maxWidth: "calc(100vw - 2rem)", padding: "1rem" }}>
				<Typography variant={"h2"} align={"center"}>
					Explore
				</Typography>
				<ExploreContent />
			</div>
		</FlexCenter>
	);
};

export default Explore;
