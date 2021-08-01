import { gql, useMutation } from "@apollo/client";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const UPLOAD_MUTATION = gql`
	mutation ($file: Upload!, $alt: String!) {
		uploadImage(alt: $alt, file: $file) {
			id
			url
		}
	}
`;

const PageBodyEditor = ({ value, setValue, className, disabled }) => {
	const [uploadPicture] = useMutation(UPLOAD_MUTATION);

	return (
		<div className={className}>
			<p>Email Body:</p>
			<Editor
				value={value}
				apiKey={process.env.NEXT_APP_TINYMCE_APIKEY || "bzg71o9rxjiw3vfmrlmdu07vif9lfs9j50q8h932ajzahz4b"}
				init={{
					height: 500,
					menubar: true,
					plugins: [
						"advlist autolink lists link image charmap print preview anchor",
						"searchreplace visualblocks code fullscreen",
						"insertdatetime media table paste code help wordcount"
					],
					toolbar: `undo redo | formatselect | bold italic forecolor backcolor | 
						alignleft aligncenter alignright alignjustify | 
						bullist numlist outdent indent | removeformat | image | help`,
					automatic_uploads: true,
					images_upload_handler: (file, success, failure) => {
						uploadPicture({
							variables: { file: file.blob(), alt: "Email Upload" }
						})
							.then(({ data }) => success(data?.uploadImage?.url))
							.catch(failure);
					},
					images_upload_url: false
				}}
				disabled={disabled}
				onEditorChange={newValue => setValue(newValue)}
			/>
		</div>
	);
};

export default PageBodyEditor;
