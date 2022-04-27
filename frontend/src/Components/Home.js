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
      </Row>
    </Container>
  )
}

export default Home