import React,{useState} from "react"
import {Navbar,NavDropdown,Nav,Container} from "react-bootstrap"
import {cerrarSesion}from '../Firebase/DataBase'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTradeFederation} from '@fortawesome/free-brands-svg-icons'
import {Link} from 'react-router-dom'
import RealizarPedido from '../Componentes/VistaUsuario/RealizarPedido'
const BarraDeNavegacion =(props)=>{  
    
    return(
      <>
       
       <Navbar variant="dark" bg="dark" expand="lg">
          <Container fluid>
              <Link to="/"className="nav-link">
                <Navbar.Brand >
                <FontAwesomeIcon icon={faTradeFederation} color="white" />
                {' '}
                FdPedidos
                </Navbar.Brand>
              </Link>
              <Navbar.Toggle  />
              <Navbar.Collapse className="justify-content-end">
                <Nav>
                {props.user.rol === "usuario" ?(
                  <Link to="/mispedidos" className="nav-link">Mis Pedidos</Link>
                ):(
                  <Link to="/menu" className="nav-link">Menu</Link>
                )}
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
              {props.user.rol === "usuario" &&(
                <RealizarPedido pedido={props.pedido} user={props.user}></RealizarPedido>
              )}
          </Container>
        </Navbar>
    </>
        )
}

export default BarraDeNavegacion 






