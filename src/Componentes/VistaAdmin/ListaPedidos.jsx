import React, { useEffect, useState } from 'react'
import {Table, Form,Button} from 'react-bootstrap'
import {actualizarDocumento, eliminarDocumento, guardarDocumento, obtenerDatos} from  '../../Firebase/DataBase'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ModalDetallePedido from './ModalDetallePedido'
import {faCheckCircle,faExclamationCircle,faTimesCircle} from '@fortawesome/free-solid-svg-icons'
export default function ListaPedidos() {
    const [pedidos,setPedidos]= useState(null)
    const [platos,setPlatos]= useState(null)
    const [usuarios,setUsuarios]= useState(null)
    const [estado,setEstado]=useState(null)
    const [pedidoActual,setPedidoActual]=useState(null)
    const [detallePedido,setDetallePedido]=useState(null)
    const [cargar,setCargar]=useState(false)
    const [actualizar,setActualizar]=useState(false)
    useEffect(()=>{
        obtenerPedidos()
        
    },[cargar])
    
    const obtenerPedidos =async()=>{
        let data= await obtenerDatos('pedido')
        setPedidos(data)
        data= await obtenerDatos('usuario')
        setUsuarios(data)
        data= await obtenerDatos('plato')
        setPlatos(data)
    }
    
    
    
    function buscarUser(idUsuario){
       
        for (let u = 0; u < usuarios.length; u++) {
            if (usuarios[u].id === idUsuario) {
              return usuarios[u]
            }
      }
    }

   
   async function enviar(){
    await  actualizarDocumento('pedido',pedidoActual,estado)
      setEstado(null)
    }
    function eliminar(){
      
      
        alert("eliminando")
        eliminarDocumento('pedido',pedidoActual)
        setCargar(!cargar)
        setPedidoActual(null)
    }

    
    const modificando=(event)=>{
      
       if(event.target.value === 'Seleccionar Estado'){
         setEstado(null)
       }else{
        setEstado(event.target.value)
       }
        
    }

    const mostrarValorPedido = (e)=>{
      setDetallePedido(e.target.value)
    }
    
    
    function crearTabla(){
        let usuario;
        
        function buscar(idUser){
            usuario=buscarUser(idUser)
            
        }

      return pedidos.map(p=>(
                <>
                
                {buscar(p.idUsuario)}
                <tr>
                    <td> <Form.Check name="group1" type='radio' onClick={()=>{setPedidoActual(p.id)}}/></td>
                    <td>{usuario.nombre} {usuario.apellido}</td>    
                    <td><button value={p.id} onClick={mostrarValorPedido}>Ver detalles</button></td>
                    <td>${p.precioTotal}</td>
                    <td>
                        <select onChange={modificando} disabled={pedidoActual === p.id? false : true} value={p.estado}>
                            {p.estado === null &&(
                               <option value={null}>Seleccionar Estado</option>
                            )}
                            <option value={false}>Preparando</option>
                            <option value={true}>Entregado</option>
                        </select>
                    </td>
                    <td>
                      <>
                      <Button variant="link" onClick={()=>{enviar()}} disabled={pedidoActual === p.id? false : true}>
                        <FontAwesomeIcon  icon={faCheckCircle} color="green" />
                      </Button>
                      <Button variant="link" onClick={()=>{eliminar(p.id)}} disabled={pedidoActual === p.id? false : true}>
                        <FontAwesomeIcon  icon={faTimesCircle} color="red" />
                      </Button>
                      </> 
                    </td>
                </tr>
                </>
            // Tabla para el user
            //{p.estado ?("Entregado"):("Preparando")}
       ) )

    }
    //obtener usuario mediante
    /*const obtenerPedidosId =async()=>{
        let data= await obtenerDatosId('usuario',id)
        setP(data)
    }*/

    
    return (
        <div className='mx-2'>
            {pedidos && usuarios && platos &&(
                <>
                
                <Table striped bordered hover size="sm" className="my-2">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Pedido</th>
                        <th>Precio</th>
                        <th>Estado</th>
                        <th>Enviar</th>
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
