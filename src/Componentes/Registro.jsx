import React,{useState} from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'


export default function Login(props) {
    
    const [email,setEmail]=useState(null)
    const [contrasena,setContrasena]=useState(null)
    const [nombre,setNombre]=useState(null)
    const [apellido,setApellido]=useState(null)
    const [telefono,setTelefono]=useState(null)
    
    const handleEmail = (event) =>{
        setEmail(event.target.value)
    }
    const handleContrasena = (event) =>{
        setContrasena(event.target.value)
    }
    const handleNombre = (event) =>{
        setNombre(event.target.value)
    }
    const handleApellido = (event) =>{
        setApellido(event.target.value)
    }
    const handleTelefono = (event) =>{
        setTelefono(event.target.value)
    }
    const handleSubmit= async(e) =>{
        e.preventDefault()
        let usuario={
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            email: email,
            contrasena: contrasena,
            rol:'usuario'
        }
           
        props.guardarDatos(usuario)
    }

    return (
            <>
                <h4 className={'m-auto'}>Registrarse</h4>
                <Form onSubmit={handleSubmit} className={'m-auto'} >
                    <Row className="mb-3" >
                        <Form.Group as={Col} className="mb-1" >
                        <Form.Label>{<h6>Nombre</h6>}</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese Nombre" onChange={handleNombre}  size="sm" style={{width:"180px"}}/>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-1" >
                        <Form.Label>{<h6>Apellido</h6>}</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese Apellido" onChange={handleApellido}  size="sm" style={{width:"180px"}}/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-1" >
                          <Form.Label>{<h6>Email</h6>}</Form.Label>
                          <Form.Control type="email" placeholder="Ingese email" onChange={handleEmail}  size="sm" style={{width:"180px"}}/>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-1" >
                          <Form.Label>{<h6>Contraseña</h6>}</Form.Label>
                          <Form.Control type="password" placeholder="Contaseña" onChange={handleContrasena} size="sm" style={{width:"180px"}} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3" >
                        <Form.Group as={Col} className="mb-1" >
                        <Form.Label>{<h6>Telefono</h6>}</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese Telefono" onChange={handleTelefono}  size="sm" style={{width:"180px"}}/>
                        </Form.Group>
                    </Row>

                    <Button  variant="primary" type="submit" size="sm" style={{width:"300px"}} className='mx-5'>
                     Registrarse
                    </Button>
                </Form>
            </>
    )
}
