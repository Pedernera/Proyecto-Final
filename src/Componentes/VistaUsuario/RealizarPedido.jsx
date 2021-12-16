import React,{useState,useEffect} from 'react'
import {Offcanvas,Button,ListGroup,Form} from "react-bootstrap"
import {guardarDocumento, obtenerDatos} from  '../../Firebase/DataBase'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons'
export default function RealizarPedido(props) {
    const [show, setShow] = useState(false);
    const [elim, setElim] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [platos,setPlatos]= useState(null)
    const [pago,setPago]=useState(null)
    const [tipoDePago,setTipoDePago]=useState(null)
    let precioTotal=0
    let noHayPedido=true
    useEffect(()=>{
        obtenerPlatos()
    },[])
   
    useEffect(()=>{
      cargarPlatos()
   },[elim])

    const obtenerPlatos =async()=>{
       let data= await obtenerDatos('plato')
        setPlatos(data)
        data= await obtenerDatos('pago')
        setPago(data)
    }
    
    function buscarPlato(idPlato){
      for (let p = 0; p < platos.length; p++) {
          if (platos[p].id === idPlato) {
            
            return p
          }
    }
  }

    const eliminar=(id)=>{
        let i = props.pedido.indexOf(id);
        i !== -1 && props.pedido.splice( i, 1 );
        setElim(!elim)
    }

    const elimTodo=()=>{
        props.pedido.splice( 0, props.pedido.length )
       setElim(!elim)
  }

    
    const agregar = async()=>{
     
       let obj ={listadoPlatos: props.pedido, 
                 idUsuario: props.user.id,
                 estado: null,
                 precioTotal: precioTotal,
                 calificacion:0,
                 idPago:tipoDePago}
                 
       await guardarDocumento('pedido',obj)
       elimTodo()
       setShow(false)
   }
    const cargarPago=()=>{
      const listPagos = pago.map(p=>{
        return (
          <>
            <Form.Check
              label={p.tipoDePago}
              name="group1"
              type="radio"
              onClick={()=>{setTipoDePago(p.id)}}
             />
          </>
      )
      })
      return listPagos

    }
    const cargarPlatos=()=>{
        let lista;

        if(props.pedido.length > 0){
           noHayPedido=false
           lista= props.pedido.map(p=>{
           let pos =buscarPlato(p)
           precioTotal += platos[pos].precio
                return (
                    <>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{platos[pos].nombre}</div>
                      $ {platos[pos].precio}
                    </div>
                    <Button onClick={()=>{eliminar(p)}} variant="link">
                    <FontAwesomeIcon  icon={faTimesCircle} className="fa-2x"  color="red" />
                    </Button>
                    </ListGroup.Item>
                    </>
                )
            })
        }
        return lista
            
    }
  return (
    <>
        
      <Button variant="link"onClick={handleShow} className="me-2">
      <FontAwesomeIcon icon={faShoppingCart} color="white" />
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement={'end'} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Realizar Pedido</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ListGroup as="ol" numbered>
                {platos && pago &&
                <>
                  {cargarPlatos()}
                  <ListGroup.Item>
                    <h6>Seleccionar Tipo de Pago</h6>
                    {cargarPago()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h6>Precio Total: $ {precioTotal}</h6>
                  </ListGroup.Item>
                    <Button  onClick={agregar} variant="danger" disabled={noHayPedido}>
                     Realizar Pedido
                    </Button>
                    
                  </>
                  }

            </ListGroup>
        </Offcanvas.Body> 
      </Offcanvas>
    </>
  );
}
