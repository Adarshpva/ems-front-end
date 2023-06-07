import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Header() {
  return (
    <div>
        <Navbar bg="success" variant="black fw-bolder" >
        <Container>
          <Navbar.Brand className='fs-4' href="/">
          <i class="fa-solid fa-layer-group fa-spin fa-spin "></i> EMS Application
            
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header