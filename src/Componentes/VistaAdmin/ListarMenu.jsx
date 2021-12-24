import React,{useEffect,useState } from 'react'
import {Table,Form} from "react-bootstrap"
import { obtenerDatos, actualizarPlato} from  '../../Firebase/DataBase'
import ModalPlato from './ModalPlato'
export default function ListarMenu(props) {
    const [platos,setPlatos]= useState(null)
    const [pedidoActual,setPedidoActual]=useState(null)
    useEffect(()=>{
        obtenerPlatos()
    },[props.actualizar])

    const obtenerPlatos =async()=>{ 
        let data= await obtenerDatos('plato')
         setPlatos(data)
     }

    const handleChange=async(plato)=>{
      await  actualizarPlato(plato,"disponible",!plato.disponible)
      props.setActualizar(!props.actualizar)
    }
     function crearTabla(){
      let lista=[]
      for(let i=0;i<platos.length;i++){
        let p = <>
        <tr>
          <td>{i}</td>    
          <td><ModalPlato plato={platos[i]}></ModalPlato></td>
          <td>
            <Form.Check
              inline
              label="SI"
              checked={platos[i].disponible}
              onChange={()=>{handleChange(platos[i])}}
              type="radio"
            />
            <Form.Check
              inline
              label="NO"
              checked={!platos[i].disponible}
              onChange={()=>{handleChange(platos[i])}}
              type="radio"
            />
          </td>
       </tr>
      </>
      lista.push(p)
      }
      return lista
    }
    
    return (
        <div>
          {platos &&(
              <Table striped bordered hover size="sm">
              <thead >
                <tr >
                  <th width="3%">#</th>
                  <th >Detalle</th>
                  <th >Disponible</th>
                </tr>
              </thead>
              <tbody>
                  {crearTabla()}
              </tbody>
              </Table>
          )}
        </div>
    )
}
