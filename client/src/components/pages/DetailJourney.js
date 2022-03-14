import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row, Stack, Card } from "react-bootstrap";
import NavTop from "../navbars/NavTop";
import NavbarUser from "../navbars/NavbarUser";
import { API } from "../../configAPI/api";
import { useParams } from "react-router-dom";

function DetailJourney() {
  const [isLogin, setIsLogin] = useState(false);

  const [datajourney, setDataJourney] = useState([]);
  const { id } = useParams();
  console.log(id);
  const getJourney = async () => {
    try {
      const response = await API.get(`/journey/${id}`);

      setDataJourney(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJourney();
  }, []);

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
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32. The standard chunk of
            Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
            Malorum" by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham.
          </p>
        </Stack>
      </Container>
    </>
  );
}

export default DetailJourney;
