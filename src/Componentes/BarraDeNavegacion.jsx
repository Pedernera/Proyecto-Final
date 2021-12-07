import React,{useState} from "react"
import {Navbar,NavDropdown,Nav,Container} from "react-bootstrap"
import {cerrarSesion}from '../Firebase/DataBase'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTradeFederation} from '@fortawesome/free-brands-svg-icons'

import RealizarPedido from '../Componentes/VistaUsuario/RealizarPedido'
const BarraDeNavegacion =(props)=>{  
  
    return(
      <>
       <Navbar variant="dark" bg="dark" expand="lg">
          <Container fluid>
              <Navbar.Brand href="#home">
              <FontAwesomeIcon icon={faTradeFederation} color="white" />
              {' '}
              FdPedidos
              </Navbar.Brand>
              
              <Navbar.Toggle  />
            
              
           
              <Navbar.Collapse className="justify-content-end">
              
              <Nav>
                  <Nav.Link className="mx-2" href="#pricing">Mis Pedidos</Nav.Link>
                  <NavDropdown
                      title={props.user.nombre + " " + props.user.apellido}
                      menuVariant="dark"
                      align="end"
                      className="mx-2"
                    >
                    <NavDropdown.Item href="#action/3.1">Modificar Datos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={cerrarSesion}>Cerrar Sesion</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              <RealizarPedido pedido={props.pedido} user={props.user}></RealizarPedido>
          </Container>
        </Navbar>
    </>
        )
}

export default BarraDeNavegacion 






