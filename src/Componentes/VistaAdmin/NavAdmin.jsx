import React,{useState} from 'react'
import ListaPedidos from './ListaPedidos'
import {Tabs,Tab} from "react-bootstrap"

export default function NavAdmin() {
    const [key, setKey] = useState('pendientes');

    return (
        <div className='mx-2'>
        
            <Tabs
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >

            <Tab eventKey="todos" title="Todos">
            <ListaPedidos type='todos'></ListaPedidos>
            </Tab>

            <Tab eventKey="pendientes" title="Pendientes">
            <ListaPedidos type='pendientes'></ListaPedidos>
            </Tab>

            <Tab eventKey='entregados' title= 'Entregados'>
            <ListaPedidos type='entregados'></ListaPedidos>
            </Tab>
            </Tabs>
           
        </div>
    )
}
