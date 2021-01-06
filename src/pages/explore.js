import React, { useContext } from "react";
import { Typography, useMediaQuery, Divider } from "@material-ui/core";
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
					picture {
						thumbnail(width: 80, height: 80)
						url
					}
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
					picture {
						url
						thumbnail(width: 80, height: 80)
					}
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
		height: 250,
		overflow: "auto",
		overflowWrap: "anywhere",
		margin: "0 0.5rem"
	},
	darkerDivider: {
		backgroundColor: "rgba(0, 0, 0, 0.24)" //original is 0, 0, 0, 0.12
	},
	matchMasonryBottomMargin: {
		marginBottom: "calc(30px - 1rem)"
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

	const oneWeek = 7 * 24 * 60 * 60 * 1000;
	const dateFilters = [
		{ newest: 0, oldest: oneWeek, name: "" },
		{ newest: oneWeek, oldest: 2 * oneWeek, name: "One Week Ago" },
		{ newest: 2 * oneWeek, oldest: 3 * oneWeek, name: "Two Weeks Ago" },
		{ newest: 3 * oneWeek, oldest: 4 * oneWeek, name: "Three Weeks Ago" },
		{ newest: 4 * oneWeek, oldest: 8 * oneWeek, name: "One Month Ago" },
		{ newest: 8 * oneWeek, oldest: 52 * oneWeek, name: "Older Than One Month Ago" }
	];

	return (
		<div>
			<Typography variant={"h3"}>Public Meetings</Typography>
			<Carousel responsive={responsive}>
				{data.meetings.map(meeting => (
					<MeetingCard {...meeting} key={meeting.id} className={classes.meetingCard} />
				))}
			</Carousel>
			<Typography variant={"h3"}>Club Posts:</Typography>
			{dateFilters.map(filter => (
				<>
					{filter.name && (
						<>
							<Divider className={classes.darkerDivider} />
							<Typography className={classes.matchMasonryBottomMargin}>{filter.name}</Typography>
						</>
					)}
					<Masonry
						breakpointCols={isMobile ? 1 : 2}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column"
					>
						{data.updates
							.filter(
								update =>
									new Date(update.createdAt) > new Date(Date.now() - filter.oldest) &&
									new Date(update.createdAt) < new Date(Date.now() - filter.newest)
							)
							.map(update => (
								<UpdateCard key={update.id} {...update} />
							))}
					</Masonry>
				</>
			))}
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
