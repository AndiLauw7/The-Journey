import React, { useContext, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { API } from "../../configAPI/api";
function CardPost(props) {
  const [bookmark, setBookmark] = useState(props.bookmark);
  const [state, dispatch] = useContext(UserContext);
  const [replace, setReplace] = useState(false);
  const handleClickBookmark = async (id) => {
    setBookmark(!bookmark);
    props.handleBookmark(id);
  };
  // const handleUndoBookmark = async (x) => {
  //   await API.delete(`/bookmark/${x.id}`);
  //   setReplace(false);

  //   console.log(x);
  // };

  // const handleSave = async (x) => {
  //   const res = await API.post("/bookmark", { idJourney: x });
  //   console.log(res);
  // };
  return (
    <Stack direction="horizontal" gap={5}>
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
          className="btn"
          onClick={() => handleClickBookmark(props.item.id)}
        >
          {" "}
          {bookmark ? (
            <img src="assets/bookmark.svg" alt="bokmark" />
          ) : (
            <img src="assets/bookmark-active.svg" alt="bokmark-active" />
          )}
        </div>

        <Card.Img variant="top" src={props.item.image} />

        <Card.Body>
          <Link
            to={{
              pathname: `detail-journey/${props.item.id}`,
            }}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <dt style={{ fontSize: "16px" }}>{props.item.tittle}</dt>
            <p className="text-muted" style={{ fontSize: "12px" }}>
              29 July 2020, Cipto
            </p>
            <Card.Text style={{ fontSize: "12px" }}>
              <Card.Text
                className="post__description"
                dangerouslySetInnerHTML={{ __html: props.item.description }}
              />
            </Card.Text>
          </Link>
        </Card.Body>
      </Card>
    </Stack>
  );
}
export default CardPost;
