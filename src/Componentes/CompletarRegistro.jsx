import React,{useState} from 'react'
import { Button,Modal,Form } from 'react-bootstrap';
import {guardarDocumentoId} from  '../Firebase/DataBase'
export default function CompletarRegistro(props) {
    const [smShow, setSmShow] = useState(true);
    const [nombre,setNombre]=useState(null)
    const [apellido,setApellido]=useState(null)
    const [telefono,setTelefono]=useState(null)

    const handleNombre = (event) =>{
        setNombre(event.target.value)
    }
    const handleApellido = (event) =>{
        setApellido(event.target.value)
    }
    const handleTelefono = (event) =>{
        setTelefono(event.target.value)
    }

    const guardarDatos=async()=>{
        if(nombre && apellido && telefono){
            const usuario={
                nombre: nombre,
                apellido:apellido,
                telefono:telefono
            }
            await guardarDocumentoId('usuario',props.id,usuario)
            props.setCargarDatos(false)
            setSmShow(false)
            
        }
    }

  return (
    <>
      <Modal size="sm" show={smShow}>
        <Modal.Header >
          <Modal.Title >
            Completar Registro
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group  className="mb-1" >
            <Form.Label>{<h6>Nombre</h6>}</Form.Label>
            <Form.Control type="text" placeholder="Ingrese Nombre" onChange={handleNombre}  size="sm" />
            </Form.Group>
            
            <Form.Group  className="mb-1" >
            <Form.Label>{<h6>Apellido</h6>}</Form.Label>
            <Form.Control type="text" placeholder="Ingrese Apellido" onChange={handleApellido}  size="sm" />
            </Form.Group>

            <Form.Group className="mb-1" >
            <Form.Label>{<h6>Telefono</h6>}</Form.Label>
            <Form.Control type="text" placeholder="Ingrese Telefono" onChange={handleTelefono}  size="sm" />
            </Form.Group>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={guardarDatos}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
      
    </>
    )
}
