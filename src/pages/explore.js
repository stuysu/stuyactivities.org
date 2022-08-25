import React, { useContext } from "react";
import { Typography, useMediaQuery, Divider } from "@mui/material";
import UserContext from "../comps/context/UserContext";
import SignInRequired from "../comps/ui/SignInRequired";
import { gql, useQuery } from "@apollo/client";
import Loading from "../comps/ui/Loading";
import PromotedClubCard from "../comps/pages/explore/PromotedClubCard";
import UpdateCard from "../comps/updates/UpdateCard";
import MeetingCard from "../comps/meetings/MeetingCard";
import Carousel from "react-multi-carousel";
import makeStyles from "@mui/styles/makeStyles";
import Masonry from "react-masonry-css";
import FlexCenter from "../comps/ui/FlexCenter";

const QUERY = gql`
	query ExploreQuery($updatesLimit: Int, $updatesOffset: Int) {
		updates: exploreUpdates(limit: $updatesLimit, offset: $updatesOffset) {
			id
			title
			content
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
			questions {
				question
				answer
				private
				submittingUser {
					name
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
			rooms {
				id
				name
			}
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
		borderColor: "transparency.borderDarker" //original is 0, 0, 0, 0.12
	},
	matchMasonryBottomMargin: {
		marginBottom: "calc(30px - 1rem)"
	}
});

const ExploreContent = () => {
	const isMobile = useMediaQuery("(max-width: 900px)");
	const classes = useStyles();
	const limit = 15;
	const [offset, setOffset] = React.useState(0);
	const [updates, setUpdates] = React.useState([]);
	const { data, loading } = useQuery(QUERY, {
		variables: {
			updatesLimit: limit,
			updatesOffset: offset
		}
	});

	React.useEffect(() => {
		if (offset <= updates.length) {
			const scrollHandler = () => {
				console.log("scrolling");
				const offsetTop = window.innerHeight + window.scrollY;
				const pageHeight = window.document.body.offsetHeight;
				if (pageHeight - offsetTop < 800 && !loading) {
					setOffset(offset => offset + 15);
				}
			};

			window.addEventListener("scroll", scrollHandler);
			return () => window.removeEventListener("scroll", scrollHandler);
		} else console.log("bubkes");
	}, [data, loading, offset, updates]);

	React.useEffect(() => {
		if (data?.updates) {
			setUpdates(viewedUpdates => {
				if (offset === 0) {
					return data.updates;
				} //might not need this bc offset doesn't reset on this page
				const combinedSize = viewedUpdates.length + data.updates.length;

				if (combinedSize >= offset && viewedUpdates.length <= offset) {
					return viewedUpdates.concat(data.updates);
				}

				return viewedUpdates;
			});
		}
	}, [data, setUpdates, offset]);

	if (loading && offset === 0) {
		return <Loading />;
	}

	const oneWeek = 7 * 24 * 60 * 60 * 1000;
	const dateFilters = [
		{ newest: 0, oldest: oneWeek, name: "" },
		{ newest: oneWeek, oldest: 2 * oneWeek, name: "One Week Ago" },
		{ newest: 2 * oneWeek, oldest: 3 * oneWeek, name: "Two Weeks Ago" },
		{ newest: 3 * oneWeek, oldest: 4 * oneWeek, name: "Three Weeks Ago" },
		{ newest: 4 * oneWeek, oldest: 8 * oneWeek, name: "One Month Ago" },
		{ newest: 8 * oneWeek, oldest: 52 * oneWeek, name: "Older Than One Month Ago" }
	].filter(filter => updates.some(update => new Date(update.createdAt) < new Date(Date.now() - filter.newest)));

	return (
		<div>
			{data !== undefined && data.promotedClubs.length !== 0 && (
				<div>
					<Typography variant={"h3"}>Featured Clubs</Typography>
					<div>
						{data.promotedClubs.map(promotedClub => (
							<PromotedClubCard {...promotedClub} />
						))}
					</div>
				</div>
			)}
			<Typography variant={"h3"}>Public Meetings</Typography>
			{data !== undefined && (
				<Carousel responsive={responsive}>
					{data.meetings.map(meeting => (
						<MeetingCard {...meeting} key={meeting.id} className={classes.meetingCard} />
					))}
				</Carousel>
			)}
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
						{updates
							.filter(
								update =>
									new Date(update.createdAt) > new Date(Date.now() - filter.oldest) &&
									new Date(update.createdAt) < new Date(Date.now() - filter.newest)
							)
							.map(update => (
								<UpdateCard key={update.id} {...update} refetchFunc={() => {}} />
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
