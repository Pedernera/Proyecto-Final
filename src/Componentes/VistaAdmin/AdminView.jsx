import React from 'react'
import BarraDeNavegacion from '../BarraDeNavegacion'
import ListaPedidos from './ListaPedidos'
export default function AdminView(props) {
    let pedido=[]
    const insertPlato=(value)=>{
        pedido.push(value)
    }
    return (
        <>
            <BarraDeNavegacion user={props.userActual} pedido={pedido}></BarraDeNavegacion>
            <ListaPedidos ></ListaPedidos>
        </>
    )
}
