import React,{useState} from 'react'
import { Modal, Button,Form, Row, Col } from 'react-bootstrap';
import { guardarDocumentoPlato} from  '../../Firebase/DataBase'

export default function NewPlato() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);

    const [tituloPub,setTituloPub]=useState(null)
    const [precioPub,setPrecioPub]=useState(null)
    const [imgPub,setImgPub]=useState('')
    const [previewImgPub,setPreviewImgPub]=useState('')
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
      guardarDatos()
      
    };

    function guardarDatos(){
        let obj ={nombre:tituloPub,precio:precioPub,img:imgPub}
        guardarDocumentoPlato('plato',obj)
        alert('guardar')
         handleClose()            
    }

    const handleTituloPub=(event)=>{
        setTituloPub(event.target.value)
    }
   
    const handlePrecioPub=(event)=>{
        setPrecioPub(event.target.value)
    }

    const handleImgPub =(event)=>{
        setImgPub(event.target.files[0])
        setPreviewImgPub(URL.createObjectURL(event.target.files[0]))
    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
        Nueva Publicacion
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Nueva Publicacion</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}> 
                
                <Row className="mb-3 mx-2">
                <Form.Group as={Col}  controlId="validationCustom01">
                  <Form.Label >Titulo</Form.Label>
                  <Form.Control 
                        type="text" 
                        placeholder="Titulo"
                        onChange={handleTituloPub} 
                        required />
                </Form.Group>
                </Row>

              
                <Row className="mb-3 mx-2">
                    <Form.Group as={Col}  controlId="validationCustom01">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control 
                        type="number" 
                        placeholder="$"
                        onChange={handlePrecioPub} 
                        required />
                </Form.Group>   
                </Row>

                <Row className="mb-3 mx-2">
                    <Form.Group as={Col}>
                    <Form.Label>imagen</Form.Label>
                    <Form.Control type="file" onChange={handleImgPub}/>
                    </Form.Group>

                    <Form.Group className="d-flex mt-2 justify-content-center">
                    {previewImgPub && (
                    <img style={{height:'25vh'}}src={previewImgPub}/>
                    )}
                    </Form.Group>
                </Row>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                 <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
