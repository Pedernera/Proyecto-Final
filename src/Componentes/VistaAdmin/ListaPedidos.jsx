import React, { useEffect, useState } from 'react'
import {Table, Form,Button} from 'react-bootstrap'
import {actualizarDocumento, eliminarDocumento, obtenerDatos,obtenerPedidoEstado} from  '../../Firebase/DataBase'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ModalDetallePedido from './ModalDetallePedido'
import {faCheckCircle,faTimesCircle} from '@fortawesome/free-solid-svg-icons'
import PuntajePositivo from './PuntajePositivo'
import PuntajeNegativo from './PuntajeNegativo'
export default function ListaPedidos(props) {
    const [pedidos,setPedidos]= useState(null)
    const [platos,setPlatos]= useState(null)
    const [usuarios,setUsuarios]= useState(null)
    const [pago,setPago]=useState(null)
    const [estado,setEstado]=useState(null)
    const [pedidoActual,setPedidoActual]=useState(null)
    const [detallePedido,setDetallePedido]=useState(null)
    const [cargar,setCargar]=useState(false)
    
    useEffect(()=>{
        obtenerPedidos()
        
    },[cargar])
    
    const obtenerPedidos =async()=>{
        let data
        if(props.type==='todos'){
          data= await obtenerDatos('pedido')
          setPedidos(data)
        }
        if(props.type ==='pendientes'){
          data=await obtenerPedidoEstado(false)
          setPedidos(data)
        }
        if(props.type ==='entregados'){
          data=await obtenerPedidoEstado(true)
          setPedidos(data)
        }
        data= await obtenerDatos('usuario')
        setUsuarios(data)
        data= await obtenerDatos('plato')
        setPlatos(data)
        data= await obtenerDatos('pago')
        setPago(data)
    }
    
    
    
    function buscarUser(idUsuario){
       
        for (let u = 0; u < usuarios.length; u++) {
            if (usuarios[u].id === idUsuario) {
              return usuarios[u]
            }
      }
    }
    function buscarPago(idPago){
       
      for (let u = 0; u < pago.length; u++) {
          if (pago[u].id === idPago) {
            return pago[u]
          }
    }
  }

   
   async function enviar(){
    await  actualizarDocumento('pedido',pedidoActual,estado)
      setEstado(null)
      setCargar(!cargar)
    }
    
    function eliminar(){
        eliminarDocumento('pedido',pedidoActual)
        setCargar(!cargar)
        setPedidoActual(null)
    }

    
    const modificando=(event)=>{
      if(event.target.value === 'true'){
           setEstado(true)
      }else{
        setEstado(false)
      } 
    }

    const mostrarValorPedido = (e)=>{
      setDetallePedido(e.target.value)
    }
    
    
    function crearTabla(){
        let usuario;
        let pago;
        function buscar(idUser,idPago){
            usuario=buscarUser(idUser)
            pago=buscarPago(idPago)
        }

      return pedidos.map(p=>(
                <>
                
                {buscar(p.idUsuario,p.idPago)}
                
                  <tr>
                    <td> <Form.Check name="group1" type='radio' onClick={()=>{setPedidoActual(p.id)}}/></td>
                    <td>{usuario.nombre} {usuario.apellido}</td>    
                    <td><Button variant="outline-secondary" size="sm" value={p.id} onClick={mostrarValorPedido}>Ver detalles</Button></td>
                    <td>$ {p.precioTotal}</td>
                    <td>
                        {p.estado !== true ?(
                          <select onChange={modificando} disabled={pedidoActual === p.id? false : true}>
                          {p.estado === null &&(
                             <option value={null}>Seleccionar Estado</option>
                          )}
                          <option  value={false}>Preparando</option>
                          <option  value={true}>Entregado</option>
                          </select>
                        ):(
                          "Entregado"
                        )}
                    </td>
                    <td>
                       {p.estado !== true ?(
                          <>
                          <Button variant="link" onClick={()=>{enviar()}} disabled={pedidoActual === p.id? false : true}>
                            <FontAwesomeIcon  icon={faCheckCircle} color="green" />
                          </Button>
                          <Button variant="link" onClick={()=>{eliminar()}} disabled={pedidoActual === p.id? false : true}>
                            <FontAwesomeIcon  icon={faTimesCircle} color="red" />
                          </Button>
                          </> 
                       ):(
                         <>
                          <PuntajePositivo calificacion={p.calificacion}></PuntajePositivo>
                          <PuntajeNegativo calificacion={5 - p.calificacion}></PuntajeNegativo>
                         </>
                       )}
                    </td>
                    <td>{pago.tipoDePago}</td>
                </tr>
                </>
       ) )

    }
   

    
    return (
        <div>
            {pedidos && usuarios && platos && pago&&(
                <>
                <Table striped bordered hover size="sm">

                    <thead>
                    
                      <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Pedido</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        {props.type === 'todos'?(
                          <th>Enviar/Calificacion</th>
                        ):(
                          <th>{props.type === 'pendientes' ?"Enviar":"Calificacion"}</th>
                        )}
                        <th>Tipo de Pago</th>
                      </tr>
                    </thead>
                    <tbody>
                        {crearTabla()}
                    </tbody>
                </Table>
                
                </>
            )}
            {detallePedido &&(
              <ModalDetallePedido idPedido={detallePedido} setDetallePedido={setDetallePedido}></ModalDetallePedido>
            ) }
        </div>
    )
}
