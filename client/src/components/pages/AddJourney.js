import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Container, Stack, Form, Button } from "react-bootstrap";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
// Import all Froala Editor plugins;
import "froala-editor/js/plugins.pkgd.min.js";

// Import a single Froala Editor plugin.
import "froala-editor/js/plugins/align.min.js";

// Import a language file.
import "froala-editor/js/languages/de.js";

// Import a third-party plugin.
// import 'froala-editor/js/third_party/image_tui.min.js';
// import 'froala-editor/js/third_party/embedly.min.js';
// import 'froala-editor/js/third_party/spell_checker.min.js';

// Include font-awesome css if required.
// install using "npm install font-awesome --save"
import "font-awesome/css/font-awesome.css";
import "froala-editor/js/third_party/font_awesome.min.js";

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';

import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

import NavbarUser from "../navbars/NavbarUser";
import { API } from "../../configAPI/api";
import { useNavigate } from "react-router-dom";

function AddJourney() {
	const navigate = useNavigate();
	const [state, dispatch] = useContext(UserContext);

	const [preview, setPreview] = useState(null);

	const [form, setForm] = useState({
		title: "",
		image: "",
	});

	const [model, setModel] = useState({
		content: "",
	});
	console.log(model.content);

	const handleModel = (model) => {
		setModel({
			...model,
			content: model,
		});
	};

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]:
				e.target.type === "file" ? e.target.files : e.target.value,
		});

		if (e.target.type === "file") {
			let url = URL.createObjectURL(e.target.files[0]);
			setPreview(url);
		}
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const config = {
				headers: {
					"Content-type": "multipart/form-data",
				},
			};

			const formData = new FormData();
			formData.set("idUser", state.user.id);
			formData.set("title", form.title);
			formData.set("image", form.image[0], form.image[0].name);
			formData.set("desc", model.content);

			const response = await API.post("/journey", formData, config);
			console.log(response);
			if (response.status === 200) {
				alert("Post Masuk Pa eKO");
				navigate("/list-items");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<NavbarUser />
			<Container fluid className="px-5">
				<h1 className="my-5">
					<dt>New Journey</dt>
				</h1>

				<Container>
					<Stack>
						<Form method="post">
							<Form.Label className="h5 fw-bold">Title</Form.Label>
							<Form.Control
								className=" p-2 mb-4 "
								type="text"
								name="title"
								onChange={handleChange}
								// id="inputTitle"
							/>
							<div className="mb-5 text-center">
								<img
									src={preview === null ? "" : preview}
									style={{
										Width: "800px",
										maxHeight: "300px",
										objectFit: "cover",
									}}
								/>
							</div>
							<Form.Label className="h5 fw-bold">Cover Image</Form.Label>
							<Form.Control
								className=" p-2 mb-4 "
								type="file"
								name="image"
								onChange={handleChange}
								// id="inputTitle"
							/>

							{/* <div id="isEditor"></div> */}

							<FroalaEditor
								tag="textarea"
								model={model.content}
								onModelChange={handleModel}
							/>

							<Button
								className="p-2  mt-3 px-5 float-end"
								variant="primary"
								onClick={handleSubmit}
							>
								Post
							</Button>
						</Form>
						<p>RENDER EDITOR</p>
						<FroalaEditorView model={model.content} />
					</Stack>
				</Container>
			</Container>
		</>
	);
}

export default AddJourney;
