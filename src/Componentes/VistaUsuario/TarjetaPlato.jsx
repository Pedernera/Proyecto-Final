import React from "react"
import { ListGroup,Card,Button} from "react-bootstrap"
const TarjetaPlato =(props)=>{
   

    return(
        <>
        
          <ListGroup  >
          <ListGroup horizontal={'sm'} className=' my-1 justify-content-center' >
            <ListGroup.Item  className='p-0 'align="center" >
            <Card style={{ width: '13.5rem', height:'9.5rem'}}>
          <Card.Img variant="top" src={props.urlImg} />
         
          </Card>  
            </ListGroup.Item>
            <ListGroup.Item className='p-0 '>
            <Card style={{width: '26.5rem', height:'9.5rem'}} >
              <Card.Body className='m-0'>
                <Card.Title>{props.nombre}</Card.Title>
                <Card.Text>
                  Precio: $ {props.precio}
                </Card.Text>
                <Button variant="primary" value={props.id} onClick={props.agregar}>Agregar Al Pedido</Button>
              </Card.Body>
            </Card>
            </ListGroup.Item> 
          </ListGroup>  
          </ListGroup>        
      </>
    )
}

export default TarjetaPlato



          
          
          
