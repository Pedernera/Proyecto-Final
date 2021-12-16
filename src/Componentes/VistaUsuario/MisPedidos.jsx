import React, { useEffect, useState } from 'react'
import {Table,Button} from 'react-bootstrap'
import {obtenerDocumentoId,eliminarDocumento} from  '../../Firebase/DataBase'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import ModalDetallePedido from '.././VistaAdmin/ModalDetallePedido'
import PuntajePositivo from '.././VistaAdmin/PuntajePositivo'
import PuntajeNegativo from '.././VistaAdmin/PuntajeNegativo'
import ModalCalificacion from './ModalCalificacion'
export default function MisPedidos(props) {
    const [misPedidos,setMisPedidos]=useState(null)
    const [detallePedido,setDetallePedido]=useState(null)
    const [cargar, setCargar]=useState(false)
    const [puntuar, setPuntuar]=useState(false)
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
  function calificar(idPedido){
    setPuntuar(idPedido)
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
                      {p.estado?(
                        <>
                          {p.calificacion === 0?(
                            <Button variant="outline-success" onClick={()=>{calificar(p.id)}} size="sm" >
                              Calificar <FontAwesomeIcon  icon={faTimesCircle} color="green" />
                            </Button>
                          ):(
                            <>
                              <PuntajePositivo calificacion={p.calificacion}></PuntajePositivo>
                              <PuntajeNegativo calificacion={5 - p.calificacion}></PuntajeNegativo> 
                            </>
                          )}
                        </>
                      ):(
                        <Button variant="outline-danger" onClick={()=>{eliminar(p.id)}} size="sm" >
                         Cancelar <FontAwesomeIcon  icon={faTimesCircle} color="red" />
                        </Button>
                      )}
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
            {puntuar &&(
              <ModalCalificacion idPedido={puntuar} setPuntuar={calificar}></ModalCalificacion>
            )}
        </div>
    )
}
