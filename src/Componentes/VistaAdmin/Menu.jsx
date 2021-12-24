import React,{useState} from 'react'
import ListarMenu from './ListarMenu'
import NewPlato from './NewPlato'
import {Tabs,Tab} from "react-bootstrap"
export default function Menu() {
  const [key, setKey] = useState('menu');
  const [actualizar,setActualizar]=useState(false)
  function volver(){
    setKey('menu')
    setActualizar(!actualizar)
  }
  return (
      <div className='mx-2'>
      
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >

          <Tab eventKey="menu" title="Editar Menu">
          <ListarMenu actualizar={actualizar} setActualizar={setActualizar}></ListarMenu>
          </Tab>
          <Tab eventKey="nuevo" title="Agregar Plato">
          <NewPlato volver={volver}></NewPlato>
          </Tab>
          </Tabs>
         
      </div>
  )
    
}
