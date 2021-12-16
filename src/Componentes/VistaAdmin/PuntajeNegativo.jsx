import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-regular-svg-icons'
export default function PuntajeNegativo(props) {

    function cargarPuntaje(cant){
        const puntaje=[]
        for(let i =0; i < cant; i++){
            puntaje.push(<FontAwesomeIcon icon={faStar}  color="yellow"></FontAwesomeIcon>)
        }
        return puntaje
    }
    return (
        <>
        {cargarPuntaje(props.calificacion)} 
        </>
    )
}
