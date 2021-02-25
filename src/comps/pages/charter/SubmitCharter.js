import React from "react";
import Button from "@material-ui/core/Button";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { CharterFormContext } from "../../../pages/charter";
import { Redirect } from "react-router-dom";
import { cache } from "../../context/ApolloProvider";

const MUTATION = gql`
	mutation CreateOrg(
		$name: String!
		$url: String!
		$tags: [Int!]!
		$leaders: [LeaderParams!]!
		$mission: String!
		$purpose: String!
		$benefit: String!
		$appointmentProcedures: String!
		$uniqueness: String!
		$meetingSchedule: String!
		$meetingDays: [String!]
		$commitmentLevel: String!
		$keywords: [String!]
		$extra: String
		$picture: Upload
	) {
		createOrganization(
			name: $name
			url: $url
			tags: $tags
			leaders: $leaders
			charter: {
				mission: $mission
				purpose: $purpose
				benefit: $benefit
				appointmentProcedures: $appointmentProcedures
				uniqueness: $uniqueness
				meetingSchedule: $meetingSchedule
				meetingDays: $meetingDays
				commitmentLevel: $commitmentLevel
				keywords: $keywords
				extra: $extra
				picture: $picture
			}
		) {
			url
		}
	}
`;

const SubmitCharter = () => {
	const form = React.useContext(CharterFormContext);

	const [submit, { data, loading, error }] = useMutation(MUTATION, {
		variables: {
			name: form.name,
			url: form.url,
			tags: form.tags.map(tag => tag.id),
			leaders:
				form.leaders?.map(leader => ({
					userId: leader.id,
					role: leader.role
				})) || [],
			mission: form.mission,
			purpose: form.purpose,
			benefit: form.benefit,
			appointmentProcedures: form.appointmentProcedures,
			uniqueness: form.uniqueness,
			meetingSchedule: form.meetingSchedule,
			meetingDays: form.meetingDays,
			commitmentLevel: form.commitmentLevel,
			keywords: form.keywords.filter(Boolean),
			extra: form.extra,
			picture: form.picture
		}
	});

	const updateError = React.useCallback(() => {
		if (error) {
			form.set({ serverError: error });
		}
	}, [error, form]);

	React.useEffect(updateError, [error, updateError]);

	if (data?.createOrganization) {
		return <Redirect to={`/${data?.createOrganization?.url}`} />;
	}

	const onSubmit = () => {
		cache
			.reset()
			.then(() => submit())
			.then(() => {
				window.sessionStorage.clear();
			})
			.catch(console.log);
	};

	return (
		<>
			<Button color={"secondary"} variant={"contained"} onClick={onSubmit} disabled={loading}>
				Submit
			</Button>
		</>
	);
};

export default SubmitCharter;
