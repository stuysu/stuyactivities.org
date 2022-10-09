import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Editor } from "@tinymce/tinymce-react";
import { ThemeContext } from "../context/ThemeProvider";

const UPLOAD_MUTATION = gql`
	mutation ($file: Upload!, $alt: String!) {
		uploadImage(alt: $alt, file: $file) {
			id
			url
		}
	}
`;

const EditorBase = ({
	value,
	setValue,
	uploadPicture,
	className,
	disabled,
	placeholder,
	initHeight = 350,
	showMenuBar = false,
	skin = undefined,
	content_css = undefined,
	content_style = undefined
}) => (
	<Editor
		value={value}
		apiKey={process.env.NEXT_APP_TINYMCE_APIKEY || "bzg71o9rxjiw3vfmrlmdu07vif9lfs9j50q8h932ajzahz4b"}
		init={{
			height: initHeight,
			menubar: showMenuBar,
			default_link_target: "_blank",
			plugins: [
				"advlist autolink lists link image charmap print preview anchor",
				"searchreplace visualblocks code fullscreen",
				"insertdatetime media table paste code help wordcount"
			],
			toolbar: `undo redo | formatselect | bold italic forecolor backcolor | 
			alignleft aligncenter alignright alignjustify | 
			bullist numlist outdent indent | link image media | removeformat | help`,

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
			},
			skin,
			content_css,
			content_style
			/*skin: theme.colorMode ? 'oxide-dark' : 'oxide',
			content_css: theme.colorMode ? 'tinymce-5-dark' : 'default',
			content_style: theme.colorMode ? 
				'.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { color: #888; }': 
				'',*/
		}}
		disabled={disabled}
		onEditorChange={newValue => setValue(newValue)}
	/>
);

const EditorDark = ({
	value,
	setValue,
	uploadPicture,
	className,
	disabled,
	placeholder,
	initHeight = 350,
	showMenuBar = false
}) => (
	// React won't re-render the Editor component if I only change the props for dark mode, so EditorDark serves as a dummy element
	<EditorBase
		value={value}
		setValue={setValue}
		className={className}
		disabled={disabled}
		placeholder={placeholder}
		uploadPicture={uploadPicture}
		initHeight={initHeight}
		showMenuBar={showMenuBar}
		skin="oxide-dark"
		content_css="tinymce-5-dark"
		content_style=".mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { color: #888; }"
	/>
);

const TinyEditor = ({ value, setValue, className, disabled, placeholder, initHeight, showMenuBar }) => {
	const [uploadPicture] = useMutation(UPLOAD_MUTATION);
	return (
		<div className={className}>
			<ThemeContext.Consumer>
				{theme =>
					theme.colorMode ? (
						<EditorDark
							value={value}
							setValue={setValue}
							className={className}
							disabled={disabled}
							placeholder={placeholder}
							uploadPicture={uploadPicture}
							initHeight={initHeight}
							showMenuBar={showMenuBar}
						/>
					) : (
						<EditorBase
							value={value}
							setValue={setValue}
							className={className}
							disabled={disabled}
							placeholder={placeholder}
							uploadPicture={uploadPicture}
							initHeight={initHeight}
							showMenuBar={showMenuBar}
						/>
					)
				}
			</ThemeContext.Consumer>
		</div>
	);
};

export default TinyEditor;
