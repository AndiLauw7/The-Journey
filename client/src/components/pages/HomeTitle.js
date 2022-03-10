import React from "react";
import NavTop from "../navbars/NavTop";
import {
	Col,
	Container,
} from "react-bootstrap";
import hero from "../../assets/img/Phuket1.png";

function HomeTitle() {
	return (
		<div
			className="title-landing align-items-center text-white w-100 "
			style={{
				height: "400px",
				backgroundImage: `url(${hero})`,
				backgroundPosition: "center",
				objectFit: "cover",
			}}
		>
			<NavTop />
			<Container>
				<div className="h1 mb-3 mt-5 fw-bold " style={{ fontSize: "50px" }}>
					<p>The Journey </p>
					<p>you ever dreamed of.</p>
				</div>
				<Col lg={6}>
					<p style={{ fontSize: "20px" }}>
						We made a tool so you can easily keep & share your travel memories.
						But there is a lot more
					</p>
				</Col>
			</Container>
		</div>
	);
}

export default HomeTitle;
