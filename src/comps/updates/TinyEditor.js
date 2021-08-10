import { gql, useMutation } from "@apollo/client";
import { Editor } from "@tinymce/tinymce-react";

const UPLOAD_MUTATION = gql`
	mutation ($file: Upload!, $alt: String!) {
		uploadImage(alt: $alt, file: $file) {
			id
			url
		}
	}
`;

const TinyEditor = ({ value, setValue, className, disabled, placeholder }) => {
	const [uploadPicture] = useMutation(UPLOAD_MUTATION);

	return (
		<div className={className}>
			<Editor
				value={value}
				apiKey={process.env.NEXT_APP_TINYMCE_APIKEY || "bzg71o9rxjiw3vfmrlmdu07vif9lfs9j50q8h932ajzahz4b"}
				init={{
					height: 350,
					menubar: false,
					default_link_target: "_blank",
					plugins: [
						"advlist autolink lists link image charmap print preview anchor",
						"searchreplace visualblocks code fullscreen",
						"insertdatetime media table paste code help wordcount"
					],
					toolbar: `formatselect | bold italic forecolor backcolor | 
					alignleft aligncenter alignright alignjustify | 
					bullist numlist outdent indent | link image media | removeformat`,

					automatic_uploads: true,
					browser_spellcheck: true,
					images_upload_handler: (file, success, failure) => {
						uploadPicture({
							variables: {
								file: file.blob(),
								alt: "Upload for platform field"
							}
						})
							.then(({ data }) => success(data?.uploadImage?.url))
							.catch(failure);
					},
					images_upload_url: false,
					media_alt_source: false,
					media_poster: false,
					resize_img_proportional: true,
					media_dimensions: false,
					placeholder,
					media_url_resolver: (data, resolve, reject) => {
						const url = new window.URL(data.url);
						const allowedHosts = /^(?:\w|\d|\.)*(?:youtube\.com|vimeo\.com|youtu\.be)$/;
						const hostIsAllowed = !!url.hostname.match(allowedHosts);
						if (hostIsAllowed) {
							resolve("");
						} else {
							alert("You're only allowed to embed videos from YouTube or Vimeo");
							reject(new Error("You're only allowed to embed videos from youtube or vimeo"));
						}
					}
				}}
				disabled={disabled}
				onEditorChange={newValue => setValue(newValue)}
			/>
		</div>
	);
};

export default TinyEditor;
