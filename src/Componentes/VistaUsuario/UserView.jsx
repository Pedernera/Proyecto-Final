import React from 'react'
import BarraDeNavegacion from '../BarraDeNavegacion'
import ListarPlatos from './ListarPlatos'
export default function UserView(props) {
    let pedido=[]
    const insertPlato=(value)=>{
        pedido.push(value)
    }
    return (
        <>
            <BarraDeNavegacion user={props.userActual} pedido={pedido}></BarraDeNavegacion>
            <ListarPlatos insertPlato={insertPlato}></ListarPlatos>
        </>
    )
}
