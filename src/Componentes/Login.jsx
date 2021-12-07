import React,{useState} from 'react'
import {Stack,Container,Button} from 'react-bootstrap'
import Registro from './Registro'
import IniciarSesion from './IniciarSesion'
import {crearUserEmailCont,iniciarSesionEmailCont,guardarDocumentoId,iniciarSesionGoogle} from  '../Firebase/DataBase'

export default function Login(props) {
    const [registro,setRegistro]=useState(false)
    
    const iniciarGoogle= ()=>{
       iniciarSesionGoogle()
       
    }
    const guardarDatos= async(usuario) =>{
        if(registro){
            let id= usuario.email
            delete usuario.email
            let data = await crearUserEmailCont(id,usuario.contrasena)
            
            if(data){
               await guardarDocumentoId('usuario',id,usuario) 
            }else{
                alert('Email incorrecto')
            }  
        }else{
            
             await iniciarSesionEmailCont(usuario.email,usuario.contrasena)
             
        }
        
    }

    const reg={
        margin: '30px auto', 
    }

    const ini={
        margin: '75px auto', 
    }
    return (
        <Container style={registro ?(reg):(ini)}>
            <Stack gap={3} >
                {registro ?(
                    <Registro guardarDatos={guardarDatos}></Registro>
                ):(
                    <IniciarSesion guardarDatos={guardarDatos}></IniciarSesion>
                )}
                <Button variant="danger" type="submit" style={{width:"300px"}} size="sm" className={'m-auto'} onClick={iniciarGoogle}>
                    Acceder con google
                </Button>
                <Button variant="link" style={{width:"300px"}}onClick={()=>setRegistro(!registro)} size="sm" className={'m-auto'}>
                      {registro ? "Iniciar Sesion" : "Registrarse"}
                </Button>
            </Stack>
        </Container>
    )
}
