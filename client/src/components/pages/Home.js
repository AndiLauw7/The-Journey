import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../context/userContext";
import { API } from "../../configAPI/api";

import {
	Col,
	Row,
	Container,
	InputGroup,
	Form,
	Button,
	Stack,
	Card,
	FormControl
} from "react-bootstrap";
import NavbarUser from "../navbars/NavbarUser";
import HomeTitle from "./HomeTitle";
import ModalLogin from "../Modals/ModalLogin";
import NavTop from "../navbars/NavTop";




function Home() {

	const navigate = useNavigate()

	const [state, dispatch] = useContext(UserContext)
	const [bookmark, setBookmark] = useState(false)
	const [modalLogin, setModalLogin] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [detail,setDetail] = useState(false)


	const handleBookmark = () => {
		if(!state.isLogin){
			return setModalLogin(!modalLogin)
		} else {
			setBookmark(!bookmark)
		}
	}

	const [journeys, setJourneys] = useState([]);

	// Get product data from database
	const getProducts = async () => {
	  try {
		const response = await API.get("/journeys");
		// Store product data to useState variabel
		setJourneys(response.data.data);
	  } catch (error) {
		console.log(error);
	  }
	};
  
	useEffect(() => {
	  getProducts();
	}, []);

	

	
	
	return (
		<div>
			<Container fluid style={{ padding: 0 }}>
				{state.isLogin ? <NavbarUser /> : <HomeTitle />}
				
				<div className="mx-5 py-3">
					<Col>
						<h1>
							<dt>Journey</dt>
						</h1>
				
						<Form className="d-flex" >
     				   <FormControl
     				     type="search"
     				     placeholder="Search"
     				     className="me-2"
     				     aria-label="Search"
     				   />
     				   <Button variant="outline-primary active">Search</Button>
     				 </Form>
							
						{/* </Stack> */}
					</Col>
					<Row >
					{journeys?.map((item, index) => (
					<Col sm={12} md={6} lg={3}>
				
      				<Card className='mt-5' style={{ width: '18rem' }}>
        			<>
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
								src={item.image} style={{ height: '10rem' }}
							/>
					</> 		
					
        			<Card.Body>
        			<Card.Title><Card.Text 
                         className="post__description" 
                         dangerouslySetInnerHTML={{ __html: item.tittle}} />  </Card.Title>
        			<Card.Text>29 July 2020, {item.id}</Card.Text>
        			<Card.Text>
					<Card.Text 
                         className="post__description" 
                         dangerouslySetInnerHTML={{ __html: item.description}}  />  
					
        			</Card.Text>
        			</Card.Body>
					
        			</Card>
				
        			</Col>
						))}
					{/* <Col>
				
					<Stack direction="horizontal" gap={5}>
					{journeys?.map((item, index) => (
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
								src={"who-tengah-uji-3-dari-70-vaksin-virus-corona-pada-manusiathumbnail 1.png"}
							/>
							
							<Card.Body>
								<Link to="/detail-journey" style={{textDecoration : "none", color: "#000"}}>
								<dt style={{ fontSize: "16px" }}>
									{item.tittle}
								</dt>
								<p className="text-muted" style={{ fontSize: "12px" }}>
									29 July 2020, Cipto
								</p>
								<Card.Text style={{ fontSize: "12px" }}>
									{item.description}
								</Card.Text>
								</Link>
							</Card.Body>
						</Card>
						 ))}
					</Stack>
					
					</Col> */}
				   
					</Row>
				
				</div>
			
				{modalLogin ? <ModalLogin show={modalLogin} onHide={() => setModalLogin(!modalLogin)} /> : " "}
			</Container>
		</div>
	);
}

export default Home;
