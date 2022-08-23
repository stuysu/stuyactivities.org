import React from "react";
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import Linkify from "linkifyjs/react";
import communityCircles from "./communityCircles.json";
import socialization from "./socialization";
import psalcm from "./psal+clubMeetings";

const CommunityBuildingNotification = ({ grade }) => {
	let cctable = Object.values(communityCircles).flat();
	// I wrote this right after I woke up so if it's dumb don't blame me lmao
	let soctable = Object.values(socialization)
		.map((e, i) =>
			e.map(el => {
				el.activity = el.activity + ["(Freshmen)", "(Sophmores)", "(Juniors+Seniors)"][i];
				return el;
			})
		)
		.flat();
	if (grade) {
		cctable = communityCircles[grade];
		//juniors and sophmores are grouped for socialization
		soctable = grade === 12 ? socialization[11] : socialization[grade];
	}
	return (
		<div>
			<div>
				<h4 style={{ "text-align": "center" }}>
					<strong>Community Building Day: Friday, March 26</strong>
				</h4>
				<pre style={{ "text-align": "center" }}>
					<span style={{ "font-weight": "400" }}>9:10 am - 12:00 pm</span>
				</pre>

				<p style={{ "text-align": "justify" }}>
					<span style={{ "font-weight": "400" }}>
						Happy Friday! Today is a half-day due to Parent-Teacher Conferences. There are no classes today,
						and no work can be assigned. The SU is hosting non-mandatory, student-led community-building
						activities throughout the day. We encourage you to join but also feel free to take this time to
						catch up on work (or sleep). Just make sure to check your email to log your attendance in the
						morning! If you have any questions or any concerns that arise during the day, don&rsquo;t
						hesitate to contact us at{" "}
					</span>
					<a href="mailto:executive@stuysu.org">
						<span style={{ "font-weight": "400" }}>executive@stuysu.org</span>
					</a>
					<span style={{ "font-weight": "400" }}>.</span>
				</p>
				<h5 style={{ "text-align": "center" }}>
					<strong>Community Circles: Remote Learning Reflections</strong>
				</h5>
				<pre style={{ "text-align": "center" }}>
					<span style={{ "font-weight": "400" }}>9:10 am &mdash; 10:10 am&nbsp;</span>
				</pre>
				<p>
					<em>
						<span style={{ "font-weight": "400" }}>
							Bond with students from your grade through fun icebreakers &amp; speak with them about the
							positives and negatives of your remote learning experience.
						</span>
					</em>
				</p>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Homerooms</TableCell>
								<TableCell>Facilitators</TableCell>
								<TableCell>Zoom Information</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{cctable.map(e => (
								<TableRow>
									<TableCell>{e.homerooms}</TableCell>
									<TableCell>{e.facilitators}</TableCell>
									<TableCell style={{ "white-space": "pre-line" }}>
										<Linkify>{e.zoom}</Linkify>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<h5 style={{ "text-align": "center" }}>
					<strong>Socialization Activities</strong>
				</h5>
				<pre style={{ "text-align": "center" }}>
					<span style={{ "font-weight": "400" }}>10:25 am &mdash; 11:15 am</span>
				</pre>
				<p>
					<em>
						<span style={{ "font-weight": "400" }}>
							Play an interactive game with peers from your grade! If one of the games is at max capacity,
							please join a different Zoom.
						</span>
					</em>
				</p>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Activity</TableCell>
								<TableCell>Facilitators</TableCell>
								<TableCell>Zoom Information</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{soctable.map(e => (
								<TableRow>
									<TableCell>{e.activity}</TableCell>
									<TableCell>{e.facilitators}</TableCell>
									<TableCell style={{ "white-space": "pre-line" }}>
										<Linkify>{e.zoom}</Linkify>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<h5 style={{ "text-align": "center" }}>
					<strong>PSAL Teams Interest Meetings &amp; Club Meetings</strong>
				</h5>
				<pre style={{ "text-align": "center" }}>
					<span style={{ "font-weight": "400" }}>11:30 am &mdash; 12:00pm</span>
				</pre>
				<p>
					<em>
						<span style={{ "font-weight": "400" }}>
							With PSAL sports opening up in April, our coaches are hosting interest meetings so you can
							learn about new teams to potentially join. In addition, we have a few awesome clubs listed
							that will be hosting activities for both members and non-members during this time.&nbsp;
						</span>
					</em>
				</p>
				<h6 style={{ "text-align": "center" }}>
					<strong>PSAL Information</strong>
				</h6>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Sport</TableCell>
								<TableCell>Coach</TableCell>
								<TableCell>Time</TableCell>
								<TableCell>Zoom Information</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{psalcm.psal.map(e => (
								<TableRow>
									<TableCell>{e.sport}</TableCell>
									<TableCell>
										<Linkify>{e.coach}</Linkify>
									</TableCell>
									<TableCell>{e.time}</TableCell>
									<TableCell style={{ "white-space": "pre-line" }}>
										<Linkify>{e.zoom}</Linkify>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<h6 style={{ "text-align": "center" }}>
					<strong>Club Meeting Information</strong>
				</h6>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Club Name</TableCell>
								<TableCell>Zoom Information</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{psalcm.clubs.map(e => (
								<TableRow>
									<TableCell>{e.name}</TableCell>
									<TableCell style={{ "white-space": "pre-line" }}>
										<Linkify>{e.zoom}</Linkify>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default CommunityBuildingNotification;
