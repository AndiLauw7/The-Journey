import React, { useEffect, useState } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import NavbarUser from "../navbars/NavbarUser";
import { API } from "../../configAPI/api";
import { Card } from "react-bootstrap";

export default function ListItem() {
  const [journeys, setJourneys] = useState([]);
  console.log(journeys);
  const getjourneys = async () => {
    try {
      const response = await API.get("/journeys");
      // Store product data to useState variabel
      setJourneys(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getjourneys();
  }, []);

  return (
    <>
      <NavbarUser />

      <Container className="py-5">
        {journeys.map((item, index) => (
          <div key={index}>
            <Row className="align-items-center">
              <Col lg={6}>
                <h2 className="fw-bold">
                  <Card.Text
                    className="post__description"
                    dangerouslySetInnerHTML={{ __html: item.tittle }}
                  />
                </h2>
                <h6 className="text-primary mb-5">17 October 2020</h6>
              </Col>
              <Col lg={6}>
                <h5 className="text-end">{item.id}</h5>
              </Col>
            </Row>
            <Stack style={{ fontSize: "15px" }} gap={5}>
              <img src={item.image} alt="image" />

              <p>
                <Card.Text
                  className="post__description"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </p>
              <p>
                {/* <Card.Text
                  className="post__description"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                /> */}
              </p>
            </Stack>
          </div>
        ))}
      </Container>
    </>
  );
}
