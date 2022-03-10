import React, { useContext, useEffect, useState } from "react";
import { Container, Stack, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import NavbarUser from "../navbars/NavbarUser";
import avatarDummy from "../../assets/img/null.png";
import { UserContext } from "../../context/userContext";
import { API } from "../../configAPI/api";
export const path = "http://localhost:4000/uploads/"

function Profile() {
	const [state, dispatch] = useContext(UserContext)
	const [avatar, setAvatar] = useState(null);
	const [user, setUser] = useState({})
	const [bookmark, setBookmark] = useState(false);
	

	const { id } =  useParams()
	

	const getUser = async () => {

		const response = await API.get(`/user/${id}`)
		console.log(response.data.data.dataUser);
		setAvatar(response.data.data.dataUser.image)
		setUser(response.data.data.dataUser)

	}
	
	useEffect(() => {
		getUser() 
	}, [])

	return (
		<>
			<NavbarUser />
			<Container fluid className="px-5">
				<h1 className="my-5">
					<dt>My Profile</dt>
				</h1>
				<Stack className="justify-content-center align-items-center">
					<img
						src={avatar === null ? avatarDummy : path + avatar}
						alt="avatar"
						className="rounded-circle border border-3 border-primary mb-3"
						style={{
							width: "12rem",
							height: "12rem",
							objectFit: "cover",
						}}
					/>
					<h4>
						<dt>{user.fullname}</dt>
					</h4>
					<p>{user.email}</p>
				</Stack>
				<Stack direction="horizontal" className="my-5" gap={5}>
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
							className="btn shadow"
							onClick={() => setBookmark(!bookmark)}
						>
							{" "}
							{bookmark ? (
								<img src="../assets/bookmark.svg" alt="bokmark" />
							) : (
								<img src="../assets/bookmark-active.svg" alt="bokmark-active" />
							)}
						</div>

						<Card.Img
							variant="top"
							src="../who-tengah-uji-3-dari-70-vaksin-virus-corona-pada-manusiathumbnail 1.png"
						/>

						<Card.Body>
							<Link
								to="/detail-journey"
								style={{ textDecoration: "none", color: "#000" }}
							>
								<dt style={{ fontSize: "16px" }}>Bersemayam di tanah Dewata</dt>
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
                    
				</Stack>
			</Container>
		</>
	);
}

export default Profile;
