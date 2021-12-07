import React, {useState,useEffect} from 'react'
import { Modal,Button,ListGroup } from 'react-bootstrap';
import {obtenerDatosId,obtenerDatos} from  '../../Firebase/DataBase'
export default function ModalDetallePedido(props) {
    const [smShow, setSmShow] = useState(true);
    const [pedido,setPedido]=useState(null)
    const [plato,setPlato]=useState(null)
    useEffect(()=>{
        obtenerPedidosId()
        
    },[props.idPedido])

    const obtenerPedidosId =async()=>{
        let data= await obtenerDatosId('pedido',props.idPedido)
        setPedido(data)
        data= await obtenerDatos('plato')
        setPlato(data)
    }
    const buscarPlato = (p)=>{
        for(let i=0;i<plato.length;i++){
            if(p == plato[i].id){
                return plato[i]
            }
        }
        
    }
    const cargar =()=>{
       let platoBuscado
       function buscar(id){
        platoBuscado=buscarPlato(id)
        
        }
      return pedido[0].listadoPlatos.map(p=>(
                <>
                {buscar(p)}
                
                <ListGroup.Item>{platoBuscado.nombre}</ListGroup.Item>
                </>
            
       ) )

    } 
    
    
    return (
      <>
        {pedido&&plato &&(
            
            <Modal
             size="sm"
             show={smShow}
             aria-labelledby="example-modal-sizes-title-sm"
           >
             <Modal.Header >
               <Modal.Title id="example-modal-sizes-title-sm">
               {pedido[0].idUsuario}
               </Modal.Title>
             
             </Modal.Header>
             <Modal.Body>
             <ListGroup variant="flush">
             {cargar()}
             
            </ListGroup>
             </Modal.Body>
             <Modal.Footer>
             <Button variant="primary" onClick={()=>{props.setDetallePedido(false)}}>Aceptar</Button>
           </Modal.Footer>
           </Modal>
           
        )}
        
      </>
    );
}
