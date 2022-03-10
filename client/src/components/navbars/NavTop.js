import React, { useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import logo from "../../assets/img/logo.png";
import ModalRegis from "../Modals/ModalRegis";
import ModalLogin from "../Modals/ModalLogin";

function NavTop() {
	const [modalRegis, setModalRegis] = useState(false);
	const [modalLogin, setModalLogin] = useState(false);

	return (
		<Navbar className="">
			<Container>
				<Navbar.Brand href="#home">
					<img
						src={logo}
						alt="logo"
						width="140"
						height="46"
						className=" position-absolute1"
					/>
				</Navbar.Brand>

				<div>
					<Button
						variant="outline-light"
						className="px-5 mx-3"
						onClick={() => setModalLogin(!modalLogin)}
					>
						Login
					</Button>
					<Button
						variant="primary"
						className="px-5"
						onClick={() => setModalRegis(!modalRegis)}
					>
						Register
					</Button>
				</div>
			</Container>
			{modalRegis ? (
				<ModalRegis
					show={modalRegis}
					onHide={() => setModalRegis(!modalRegis)}
				/>
			) : (
				""
			)}
			{modalLogin ? (
				<ModalLogin
					show={modalLogin}
					onHide={() => setModalLogin(!modalLogin)}
				/>
			) : (
				""
			)}
		</Navbar>
	);
}

export default NavTop;
