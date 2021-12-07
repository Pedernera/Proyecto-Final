import React, { useEffect, useState } from 'react'
import {ListGroup,Button} from "react-bootstrap"
import { obtenerDatos} from  '../../Firebase/DataBase'
import TarjetaPlato from './TarjetaPlato'
export default function ListarPlatos(props) {
    const [platos,setPlatos]= useState(null)
    const [actualizar, setActualizar]= useState(false)
    useEffect(()=>{
        obtenerPlatos()
    },[actualizar])
    
    const agregarPlato=(e)=>{
        props.insertPlato(e.target.value)
    }

    const obtenerPlatos =async()=>{
       let data= await obtenerDatos('plato')
        setPlatos(data)
    }
    function getCards(){
     
        const cards = platos.map( (p)=>{
          
          return(
            <TarjetaPlato  
                  precio={p.precio} 
                  urlImg={p.urlImg}
                  id={p.id}
                  nombre={p.nombre}
                  agregar={agregarPlato}
              />
          )
          
        })
        return cards;
      }
    return (
        <>
           {platos &&(
               <>
               <Button onClick={()=>{setActualizar(!actualizar)}}>Actualizar</Button>
               <ListGroup>
               {getCards()}
                </ListGroup> 
                </>
           )}
        </>
    )
}
