import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'


export default function Login(props) {
    const [email,setEmail]=useState(null)
    const [contrasena,setContrasena]=useState(null)

    const handleEmail = (event) =>{
        setEmail(event.target.value)
    }
    const handleContrasena = (event) =>{
        setContrasena(event.target.value)
    }
    
    const handleSubmit= async(e) =>{
        e.preventDefault()
        let usuario={
          email: email,
          contrasena: contrasena
        }
           
        props.guardarDatos(usuario)
    }

    return (
            <>
                <h4 className={'m-auto'}>Iniciar Sesion</h4>
                <Form onSubmit={handleSubmit} className={'m-auto'}>
                    <Form.Group className="mb-3" style={{width:"300px"}}>
                      <Form.Label >{<h6>Email</h6>} </Form.Label>
                      <Form.Control type="email" placeholder="Ingese email" onChange={handleEmail}  size="sm"/>
                    </Form.Group>

                    <Form.Group className="mb-3" style={{width:"300px"}}>
                      <Form.Label>{<h6>Contraseña</h6>}</Form.Label>
                      <Form.Control type="password" placeholder="Contaseña" onChange={handleContrasena} size="sm"/>
                    </Form.Group>
                   
                    <Button variant="primary" type="submit" size="sm" style={{width:"300px"}}>
                      Iniciar Sesion
                    </Button>
                </Form>
            </>
    )
}
