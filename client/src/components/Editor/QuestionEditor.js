import { Editor } from "@tinymce/tinymce-react";
import React from "react";

const QuestionEditor = (props) => {
	return (
		<div>
			<Editor
				apiKey="13r0r9q6rug567olj00oucsijv821yet498j8h0fu8x4d0y3"
				initialValue=""
				init={{
					branding: false,
					height: 400,
					menubar: true,
					plugins:
						"print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
					toolbar:
						"formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
					image_advtab: true,
				}}
				onChange={(e) => {
					// console.log(e.target.getContent());
					props.onEdit(e.target.getContent());
				}}
			/>
		</div>
	);
};

export default QuestionEditor;
