import React,{useState,useEffect} from 'react'
import {obtenerDatosId}from '../Firebase/DataBase'
import CompletarRegistro from './CompletarRegistro'

import ListaPedidos from './VistaAdmin/ListaPedidos'
import AdminView from './VistaAdmin/AdminView'
import UserView from './VistaUsuario/UserView'
import {BrowserRouter,Switch,Route} from 'react-router-dom';

export default function Inicio(props) {
    const [userActual,setUserActual]=useState(null)
    const [cargarDatos,setCargarDatos]=useState(false)
    
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

    
    return (
        <>
            {userActual &&(
                <>
                    {userActual.rol === "admin" ? <AdminView userActual={userActual}/> : <UserView userActual={userActual}/>}
                </>
            )}
            {cargarDatos &&(
                <CompletarRegistro id={props.user} setCargarDatos={setCargarDatos}></CompletarRegistro>
            )}
        </>
    )
}