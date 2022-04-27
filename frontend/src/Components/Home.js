import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import {Container,Row,Col,Button} from 'react-bootstrap'
import "./css/Home.css"
function Home() {
  return (
    <Container className='Home'>
      <Row className='Home_Navbar'>
        <Navbar></Navbar>
      </Row>
      <Row className='Home_Sidebar'>
        <Col className='Home_Sidebar_Col' md={2}>
          <Sidebar></Sidebar>
        </Col>
        <Col className='Home_Questions_Col' md={8}>
          <Row  className='Home_Questions_Col_Tabs' md={2}>
            <Col md={6}>
              <div className='Home_Questions_Col_Tabs_Text'>Top Questions</div>
            </Col>
            <Col md={4}></Col>
            <Col md={2}>
              <Button className='Home_Questions_Col_Tabs_Button'>Ask Question</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Home