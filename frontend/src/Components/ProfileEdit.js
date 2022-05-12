import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
import Editor from "react-quill/lib/toolbar";
import "./css/Home.css";

const ProfileEdit = (props) => {
  const history = useHistory();
  const [form, setForm] = useState({
    Name: props.userData.Name,
    Location: props.userData.Location,
    Title: "",
    About: props.userData.About,
    Picture: props.userData.Picture,
  });

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block", "image"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  Editor.modules = {
    syntax: false,
    toolbar: {
      container: toolbarOptions,
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const handleQuill = (e) => {
    setForm({
      ...form,
      About: e,
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // api call to push new user data
  };

  const handleCancel = () => {
    history.push("/profile");
  };

  return (
    <Container>
      <Col style={{ width: "70%", paddingLeft: "20px" }}>
        <Row>
          <h4>Edit your Profile</h4>
          <hr />
        </Row>
        <Row>
          <Card>
            <Card.Body>
              <div>
                <Form style={{ width: "90%" }}>
                  <div style={{ width: "50%" }}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Label>
                        <strong>Profile image</strong>
                      </Form.Label>
                      <div>
                        <img id="avatar_img" src={form.Picture} alt="" />
                      </div>
                      <br />
                      <Form.Control
                        type="file"
                        accept="image/*"
                        name="Picture"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Label>
                        <strong>Display name</strong>
                      </Form.Label>
                      <Form.Control
                        value={form.Name}
                        type="text"
                        placeholder=" "
                        name="Name"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Label>
                        <strong>Location</strong>
                      </Form.Label>
                      <Form.Control
                        value={form.Location}
                        type="text"
                        placeholder=""
                        name="Location"
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                      <Form.Label>
                        <strong>Title</strong>
                      </Form.Label>
                      <Form.Control
                        value={form.Title}
                        type="text"
                        placeholder=""
                        name="Title"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>
                      <strong>About me</strong>
                    </Form.Label>
                    <ReactQuill
                      value={form.About}
                      onChange={(e) => handleQuill(e)}
                      modules={Editor.modules}
                      className="react-quill"
                      theme="snow"
                    />
                  </Form.Group>
                  <Button
                    style={{ fontSize: "0.9rem" }}
                    className="Home_Questions_Col_Tabs_Button"
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <strong>Save Profile</strong>
                  </Button>
                  <Button variant="light" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Row>
      </Col>
    </Container>
  );
};

export default ProfileEdit;
