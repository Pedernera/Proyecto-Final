import React, {useState } from 'react'
import { Modal,Button,ButtonGroup } from 'react-bootstrap';
import {actualizarCalificacion} from  '../../Firebase/DataBase'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-regular-svg-icons'
export default function ModalCalificacion(props) {
    const [show, setShow] = useState(true);
    const [calificacion,setCalificacion]=useState(0)
    function puntaje(puntos){
        setCalificacion(puntos)
    }

    const guardarPuntaje=async()=>{
     await actualizarCalificacion('pedido',props.idPedido,calificacion)
     props.setPuntuar(false)
      
    }
    const cargar =()=>{
        const botones=[]
            for(let i=1;i<=5;i++){
                botones.push(<Button className='mx-1'variant={calificacion < i?"outline-warning":"warning"} onClick={()=>{puntaje(i)}}><FontAwesomeIcon icon={faStar}  color={calificacion < i?"yellow":"white"} ></FontAwesomeIcon></Button>)
            }
            return botones
        
        } 
    return (
        <>
           <Modal
             size="sm"
             show={show}
             onHide={() => props.setPuntuar(false)}
             aria-labelledby="example-modal-sizes-title-sm"
            >
            
            <Modal.Header closeButton>
            <Modal.Title>Calificar Pedido</Modal.Title>
            </Modal.Header>
            <Modal.Body className='mx-auto'>
            
            <ButtonGroup size='sm'>
            {cargar()}
            </ButtonGroup>
            </Modal.Body>
            <Modal.Footer >
             <Button  variant="outline-danger" size='sm' onClick={()=>{props.setPuntuar(false)}}>Cancelar</Button>
             <Button  variant="outline-success" size='sm' onClick={guardarPuntaje}>Calificar</Button>
           </Modal.Footer>
            </Modal> 
        </>
    )
}
