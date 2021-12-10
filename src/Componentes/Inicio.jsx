import React,{useState,useEffect} from 'react'
import {obtenerDatosId}from '../Firebase/DataBase'
import CompletarRegistro from './CompletarRegistro'

import BarraDeNavegacion from './BarraDeNavegacion'
import MisPedidos from './VistaUsuario/MisPedidos'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import ListaPedidos from './VistaAdmin/ListaPedidos'
import ListarPlatos from './VistaUsuario/ListarPlatos'
export default function Inicio(props) {
    const [userActual,setUserActual]=useState(null)
    const [cargarDatos,setCargarDatos]=useState(false)
    let pedido=[]
    useEffect(()=>{
        obtenerDatos()
        
    },[cargarDatos])

    const obtenerDatos=async ()=> {
        let data=  await obtenerDatosId('usuario',props.user)
        if(data){
            setUserActual(data[0])
        }else{
            setCargarDatos(true)
        }
    }
    
    const insertPlato=(value)=>{
        pedido.push(value)
    }
    
    return (
        <>
            <BrowserRouter>
                
                {userActual &&(
                 
                <>
                <BarraDeNavegacion user={userActual} pedido={pedido}></BarraDeNavegacion>
                <Switch>
                {userActual.rol === "admin" ?(
                    <>
                    <Route exact path="/" >
                    <ListaPedidos></ListaPedidos>
                    </Route>
                    </>
                ):(
                    <>
                    <Route exact path="/" >
                        <ListarPlatos insertPlato={insertPlato}></ListarPlatos>
                    </Route> 
                    <Route path="/mispedidos">
                        <MisPedidos user={userActual}></MisPedidos>
                    </Route>
                    </>
                )}
                </Switch>
                </>
                
                )}
                {cargarDatos &&(
                <CompletarRegistro id={props.user} setCargarDatos={setCargarDatos}></CompletarRegistro>
                )}
               
            </BrowserRouter>
        </>
    )
}