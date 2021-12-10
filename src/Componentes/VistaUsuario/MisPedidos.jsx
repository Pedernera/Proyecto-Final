import React, { useEffect, useState } from 'react'
import {Table,Button} from 'react-bootstrap'
import {obtenerDocumentoId,eliminarDocumento} from  '../../Firebase/DataBase'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import ModalDetallePedido from '.././VistaAdmin/ModalDetallePedido'

export default function MisPedidos(props) {
    const [misPedidos,setMisPedidos]=useState(null)
    const [detallePedido,setDetallePedido]=useState(null)
    const [cargar, setCargar]=useState(false)
    useEffect(()=>{
        obtenerPlatos()
    },[cargar])

    const obtenerPlatos =async()=>{ 
        let data= await obtenerDocumentoId('pedido',props.user.id)
        setMisPedidos(data)
     }
    
     const mostrarValorPedido = (e)=>{
      setDetallePedido(e.target.value)
    }

    function eliminar(idPedido){
      eliminarDocumento('pedido',idPedido)
      setCargar(!cargar)
  }

function crearTabla(){
    let i=0
    function sumar(){
      return  i++
    }
      return misPedidos.map(p=>(
                
                <>
                <tr>
                    <td>{sumar()}</td>   
                    <td><Button variant="outline-secondary" value={p.id} size="sm" onClick={mostrarValorPedido}>Ver detalles</Button></td>
                    <td>${p.precioTotal}</td>
                    <td>{p.estado ? "Entregado" : "Pendiente"}</td>
                    <td>
                      <>
                      <Button variant="outline-danger" onClick={()=>{eliminar(p.id)}} size="sm" >
                        {p.estado ? 'Calificar' : "Cancelar"} <FontAwesomeIcon  icon={faTimesCircle} color="red" />
                      </Button>
                      </> 
                    </td>
                </tr>
                </>
            
       ))

    }
    return (
        <div className='m-3'>
           {misPedidos &&
            <Table striped bordered hover size="sm" >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Pedido</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Calificar / Cancelar</th>
                  </tr>
                </thead>
                <tbody>
                    {crearTabla()}
                </tbody>
            </Table>
           }
           {detallePedido &&(
              <ModalDetallePedido idPedido={detallePedido} setDetallePedido={setDetallePedido}></ModalDetallePedido>
            ) }
        </div>
    )
}
