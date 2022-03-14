import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row, Stack, Card } from "react-bootstrap";
import NavTop from "../navbars/NavTop";
import NavbarUser from "../navbars/NavbarUser";
import { API } from "../../configAPI/api";
import { useParams } from "react-router-dom";

function DetailJourney() {
  const [isLogin, setIsLogin] = useState(false);
  const [datajourney, setDataJourney] = useState([]);
  const [profile, setUser] = useState([]);
  const { id } = useParams();
  console.log(id);
  const getJourney = async () => {
    try {
      const response = await API.get(`/journey/${id}`);

      setDataJourney(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJourney();
  }, []);
  // const getProfile = async () => {
  //   const response = await API.get(`/profile/${id}`);
  //   console.log(response.data.data.dataProfile);
  //   setUser(response.data.data.dataProfile);
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  return (
    <>
      {isLogin ? <NavbarUser /> : <NavTop />}

      <Container className="py-5">
        <Row className="align-items-center">
          <Col lg={6}>
            <h2 className="fw-bold">
              <Card.Text
                className="post__description"
                dangerouslySetInnerHTML={{ __html: datajourney.tittle }}
              />
            </h2>
            <h6 className="text-primary mb-5">17 October 2020</h6>
          </Col>
          <Col lg={6}>
            <h5 className="text-end">{datajourney.id}</h5>
          </Col>
        </Row>
        <Stack style={{ fontSize: "15px" }} gap={5}>
          <img src={datajourney.image} alt="image" />

          <p>
            <Card.Text
              className="post__description"
              dangerouslySetInnerHTML={{ __html: datajourney.description }}
            />
          </p>
          <p>
            <Card.Text
              className="post__description"
              dangerouslySetInnerHTML={{ __html: datajourney.description }}
            />
          </p>
        </Stack>
      </Container>
    </>
  );
}

export default DetailJourney;
