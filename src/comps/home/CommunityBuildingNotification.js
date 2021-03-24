import React from "react";
import { Card } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const CommunityBuildingNotification = () => {
	return (
		<div>
			<Typography variant={"h3"} color={"primary"}>
				Announcements:
			</Typography>
			<Card style={{ padding: "1rem" }}>
				<div>
					<h4 style={{ "text-align": "center" }}>
						<strong>Community Building Day: Friday, March 26</strong>
					</h4>
					<pre style={{ "text-align": "center" }}>
						<span style={{ "font-weight": "400" }}>9:10 am - 12:00 pm</span>
					</pre>

					<p style={{ "text-align": "justify" }}>
						<span style={{ "font-weight": "400" }}>
							Happy Friday! Today is a half-day due to Parent-Teacher Conferences. There are no classes
							today, and no work can be assigned. The SU is hosting non-mandatory, student-led
							community-building activities throughout the day. We encourage you to join but also feel
							free to take this time to catch up on work (or sleep). Just make sure to check your email to
							log your attendance in the morning! If you have any questions or any concerns that arise
							during the day, don&rsquo;t hesitate to contact us at{" "}
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
								Bond with students from your grade through fun icebreakers &amp; speak with them about
								the positives and negatives of your remote learning experience.
							</span>
						</em>
					</p>
					<p>
						<span style={{ "font-weight": "400" }}>Zoom Links: Coming soon!</span>
					</p>
					<h5 style={{ "text-align": "center" }}>
						<strong>Socialization Activities</strong>
					</h5>
					<pre style={{ "text-align": "center" }}>
						<span style={{ "font-weight": "400" }}>10:25 am &mdash; 11:15 am</span>
					</pre>
					<p>
						<em>
							<span style={{ "font-weight": "400" }}>
								Play an interactive game with peers from your grade! If one of the games is at max
								capacity, please join a different Zoom.
							</span>
						</em>
					</p>
					<p>
						<span style={{ "font-weight": "400" }}>Zoom Links: Coming soon!</span>
					</p>
					<h5 style={{ "text-align": "center" }}>
						<strong>PSAL Teams Interest Meetings &amp; Club Meetings</strong>
					</h5>
					<pre style={{ "text-align": "center" }}>
						<span style={{ "font-weight": "400" }}>11:30 am &mdash; 12:00pm</span>
					</pre>
					<p>
						<em>
							<span style={{ "font-weight": "400" }}>
								With PSAL sports opening up in April, our coaches are hosting interest meetings so you
								can learn about new teams to potentially join. In addition, we have a few awesome clubs
								listed that will be hosting activities for both members and non-members during this
								time.&nbsp;
							</span>
						</em>
					</p>
					<p>
						<span style={{ "font-weight": "400" }}>Zoom Links: Coming soon!</span>
					</p>
					<p>
						<span style={{ "font-weight": "400" }}>
							With PSAL sports opening up in April, you can attend team interest meetings hosted by
							coaches and participate in other club activities! With PSAL sports opening up in April, our
							coaches are hosting interest meetings so you can learn about new teams to potentially join.
							In addition, we have a few awesome clubs listed that will be hosting activities for both
							members and non-members during this time.{" "}
						</span>
					</p>
				</div>
			</Card>
		</div>
	);
};

export default CommunityBuildingNotification;
