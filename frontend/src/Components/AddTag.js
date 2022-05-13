import React,{useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { API } from "../../src/backend";

function AddTag() {
    const [tagName, setTagName] = useState([]);
    const [tagDescription, setTagDescription] = useState([]);

    const SaveTag = async() => {
            return await fetch(`${API}/tags`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({tagname: tagName, description:tagDescription})
                })
                .then(response => {
                    return response.json();
                })
                .catch(err => console.log(err));
    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Tag Name</Form.Label>
                    <Form.Control onChange={(e)=>setTagName(e.target.value)} type="text" placeholder="python" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Tag Description</Form.Label>
                    <Form.Control onChange={(e)=>setTagDescription(e.target.value)} as="textarea" rows={3} />
                </Form.Group>
                <Button onClick={SaveTag}>Add Tag</Button>
            </Form>
        </div>
    )
}

export default AddTag