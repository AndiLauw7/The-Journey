import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/userContext";

import {
	Col,
	Container,
	InputGroup,
	Form,
	Button,
	Stack,
	Card,
} from "react-bootstrap";
import NavbarUser from "../navbars/NavbarUser";
import HomeTitle from "./HomeTitle";
import ModalLogin from "../Modals/ModalLogin";




function Home() {

	const navigate = useNavigate()

	const [state, dispatch] = useContext(UserContext)
	const [bookmark, setBookmark] = useState(false)
	const [modalLogin, setModalLogin] = useState(false);

	


	const handleBookmark = () => {
		if(!state.isLogin){
			return setModalLogin(!modalLogin)
		} else {
			setBookmark(!bookmark)
		}
	}

	

	
	
	return (
		<div>
			<Container fluid style={{ padding: 0 }}>
				{state.isLogin ? <NavbarUser /> : <HomeTitle />}

				<div className="mx-5 py-3">
					<Col>
						<h1>
							<dt>Journey</dt>
						</h1>
						{/* <Stack direction="horizontal" className="py-4 px-5">	 */}
							<InputGroup  className="p-5  " >
							<Form.Control type="search" placeholder="Find Journey" aria-describedby="search" />
							<Button variant="primary" className="px-5" id="search">
								Search
							</Button>

							</InputGroup>
							
						{/* </Stack> */}
					</Col>
					<Col>
						<Stack direction="horizontal" gap={5}>
							<Card style={{ width: "18rem" }} className="shadow" >
								
								<div
									style={{
										width: "30px",
										height: "30px",
										position: "absolute",
										backgroundColor: "#fff",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										borderRadius: "50px",
										top: "10px",
										right: "10px",
										cursor: "pointer",
									}}
									className="btn"
									onClick={handleBookmark}
								>	{bookmark ? (
									<img src="assets/bookmark.svg" alt="bokmark" />
								) : (
									<img src="assets/bookmark-active.svg" alt="bokmark-active" />
								)}
									
								</div>
								
								<Card.Img
									variant="top"
									src="who-tengah-uji-3-dari-70-vaksin-virus-corona-pada-manusiathumbnail 1.png"
								/>
								
								<Card.Body>
									<Link to="/detail-journey" style={{textDecoration : "none", color: "#000"}}>
									<dt style={{ fontSize: "16px" }}>
										Bersemayam di tanah Dewata
									</dt>
									<p className="text-muted" style={{ fontSize: "12px" }}>
										29 July 2020, Cipto
									</p>
									<Card.Text style={{ fontSize: "12px" }}>
										Liburan di tahun baru 2020 keberangkatan saya menuju Pulau
										Dewata Bali. Sampai lah saya malam itu di Bali Airport
										menujukan waktu jam 02.00, dan melanjutkan pejalanan yang
										menyenangkan..
									</Card.Text>
									</Link>
								</Card.Body>
								
								
								
								
							</Card>
							<Card style={{ width: "18rem" }} className="shadow">
								<div
									style={{
										width: "30px",
										height: "30px",
										position: "absolute",
										backgroundColor: "#fff",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										borderRadius: "50px",
										top: "10px",
										right: "10px",
										cursor: "pointer",
									}}
								>
									<img src="assets/bookmark.svg" alt="bokmark" />
								</div>
								<Card.Img
									variant="top"
									src="who-tengah-uji-3-dari-70-vaksin-virus-corona-pada-manusiathumbnail 1.png"
								/>
								<Card.Body>
									<dt style={{ fontSize: "16px" }}>
										Bersemayam di tanah Dewata
									</dt>
									<p className="text-muted" style={{ fontSize: "12px" }}>
										29 July 2020, Cipto
									</p>
									<Card.Text style={{ fontSize: "12px" }}>
										Liburan di tahun baru 2020 keberangkatan saya menuju Pulau
										Dewata Bali. Sampai lah saya malam itu di Bali Airport
										menujukan waktu jam 02.00, dan melanjutkan pejalanan yang
										menyenangkan..
									</Card.Text>
								</Card.Body>
							</Card>
						</Stack>
					</Col>
				</div>
				{modalLogin ? <ModalLogin show={modalLogin} onHide={() => setModalLogin(!modalLogin)} /> : " "}
			</Container>
		</div>
	);
}

export default Home;
