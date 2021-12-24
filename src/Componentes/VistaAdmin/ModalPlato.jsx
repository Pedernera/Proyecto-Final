import React,{useState} from 'react'
import { Modal, Button,Form,Col,Row } from 'react-bootstrap';
export default function ModalPlato(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button variant="outline-info" size="sm" onClick={handleShow}>
          Ver Detalles
        </Button>
        <Modal show={show} onHide={handleClose} size="sm">
            <Modal.Header closeButton>
            <Modal.Title>Detalle del Plato</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="3">
                     Nombre:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control plaintext readOnly defaultValue={props.plato.nombre} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="3">
                     Precio:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control plaintext readOnly defaultValue={"$" + props.plato.precio} />
                    </Col>
                </Form.Group>
                <Form.Group className="d-flex mt-2 justify-content-center">
                    <img style={{height:'25vh'}}src={props.plato.urlImg}/>
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}