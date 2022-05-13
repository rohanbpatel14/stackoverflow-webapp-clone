import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
import Editor from "react-quill/lib/toolbar";
import ProfileMain from "./ProfileMain";
import "./css/Home.css";
import "./css/Profile.css";
import { useHistory } from "react-router-dom";

const ProfileEdit = (props) => {
  const history = useHistory();
  const [form, setForm] = useState({
    Name: props.userData.full_name,
    Location: "",
    Title: "",
    About: "",
    Picture: "",
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
    history.push("/profile", {
      state: form,
    });
    window.location.reload(false);
    // api call to push new user data
  };

  const handleCancel = () => {
    window.location.reload(false);
  };

  return (
    <Container style={{ paddingLeft: "3%", paddingRight: "2%" }}>
      <Col xs={12}>
        <Row xs={1}>
          <h4>Edit your Profile</h4>
        </Row>
        <Row>
          <hr />
          <h5>Public Information</h5>
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
                        <img
                          id="avatar_img"
                          src={`https://secure.gravatar.com/avatar/${props.userData.id}?s=164&d=identicon`}
                          alt=""
                        />
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
