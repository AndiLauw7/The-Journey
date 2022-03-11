import React, { Fragment, useContext, useEffect, useState } from "react";
import { Container, Stack, Card, Row, Button,ButtonGroup,Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom";
import NavbarUser from "../navbars/NavbarUser";
import { UserContext } from "../../context/userContext";
import { API } from "../../configAPI/api";
import { useNavigate } from "react-router-dom";
import Close from "../../assets/img/close.png"
import Edit from "../../assets/img/edit.png"

export const path = "http://localhost:8000/uploads/"

function Profile() {
	const [state, dispatch] = useContext(UserContext)
	const [avatar, setAvatar] = useState(null);
	const [user, setUser] = useState({})
	const [bookmark, setBookmark] = useState(false);
	console.log(user);

	const { id } =  useParams()
	

	const getProfile = async () => {

		const response = await API.get(`/profile/${id}`)
		console.log(response.data.data.dataProfile);
		setAvatar(response.data.data.dataProfile.image)
		setUser(response.data.data.dataProfile)

	}
	
	useEffect(() => {
		getProfile() 
	}, [])

	const navigate = useNavigate()
    const [edit, setEdit] = useState(false)
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
      fullname: "",
      email: "",
	  phone:"",
	  address:"",
      image: "",
    }); 



    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
      
          const config = {
            headers: {
              "Content-type": "multipart/form-data",
            },
          };
      
          const formData = new FormData();
          if (form.image) {
            formData.set("image", form?.image[0], form?.image[0]?.name);
          }
          formData.set("fullname", form.fullname);
          formData.set("email", form.email);
          formData.set("phone", form.phone);
          formData.set("address", form.address);
      
          const response = await API.patch(
            "/profile/" + user.id,
            formData,
            config
          );
          console.log(user.id);
      
          setEdit(false);
        } catch (error) {
          console.log(error);
        }
      };

      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.type === "file") {
          let url = URL.createObjectURL(e.target.files[0]);
          setPreview(url);
        }
      };

    

      
      const handleEdit = (id) => {
        setEdit(!edit)
        navigate("/Profile/" + user.id);
    };

	return (
		<>
			<NavbarUser />
			<Container fluid className="px-5">
				<h1 className="my-5">
					<dt>My Profile</dt>
				</h1>
				<Stack className="justify-content-center align-items-center">
				{edit ? <img src={Close} alt="" onClick={handleEdit} style={{width: "20px", marginLeft: "10px"}}/> : <img src={Edit} alt="" onClick={handleEdit} style={{width: "20px", marginLeft: "180px"}}/>}
				{edit ? (
                    // <form onSubmit={handleSubmit} className='mt-5'>
                    //   <img src={user.image} style={{width: "125px", height:"125px"}} alt="" className="ms-5"/>
                    //     <div className='mb-4'>
                    //         <input placeholder='Name' name='fullname' onChange={handleChange}/>
                    //     </div>
                    //     <div className='mb-4'>
                    //         <input placeholder='Email' name='email' onChange={handleChange} />
                    //     </div>
					// 	<div className='mb-4'>
                    //         <input placeholder='phone' name='phone' onChange={handleChange} />
                    //     </div>
					// 	<div className='mb-4'>
                    //         <input placeholder='address' name='address' onChange={handleChange} />
                    //     </div>
                    //     <div className='mb-4'>
                    //         <input type='file' name='image' onChange={handleChange} />
                    //     </div>
                    //     <div className='mb-4'>
                    //         <button>submit edit</button>
                    //     </div>
                    // </form>
					<Form onSubmit={handleSubmit} >
						<div  className="text-center mt-3 mb-2">
						<img src={user.image} style={{width: "150px", height:"150px" , borderRadius:"8px"}} alt=""/>
						</div>
					  <Form.Group className="mb-3" controlId="formBasicEmail">
					  
					    <Form.Control type="text" placeholder="Fullname" name='fullname' onChange={handleChange} />
					  </Form.Group>

					  <Form.Group className="mb-3" controlId="formBasicEmail">
					 
					    <Form.Control type="email" placeholder="Email" name='email' onChange={handleChange} />
					  </Form.Group>

					  <Form.Group className="mb-3" controlId="formBasicEmail">
				
					    <Form.Control type="text" placeholder="Phone" name='phone' onChange={handleChange} />
					  </Form.Group>

					  <Form.Group className="mb-3" controlId="formBasicEmail">

					    <Form.Control type="text" placeholder="Address" name='address' onChange={handleChange} />
					  </Form.Group>
					  <div className="mb-3">
					  <input className="form-control" type="file"  name='image' onChange={handleChange} />
					</div>
					  <Button variant="primary" type="submit">
					    Submit
					  </Button>
					</Form>
                ) : (
					<>

						<img
						// src={user.image}
						src={preview?(preview) : (user.image)}
						alt="avatar"
						className="rounded-circle border border-1 border-primary mb-3"
						style={{
							width: "150px",
							height: "150px",
							
						}}
					/>
					<h4>
						{/* <p>{user.id}</p> */}
						<dt>Fullname : {user.fullname}</dt>
					</h4>
					<p>Email : {user.email}</p>
					<p>Phone : {user.phone}</p>
					<p>Address : {user.address}</p>
					<ButtonGroup className="mb-2">
			{/* <Button onClick={handleEdit}>Edit Profile</Button> */}
			  </ButtonGroup>
					</>	
				)}
					
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
