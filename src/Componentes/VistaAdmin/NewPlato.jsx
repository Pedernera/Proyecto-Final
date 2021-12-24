import React,{useState} from 'react'
import { Container,Stack, Button,Form } from 'react-bootstrap';
import { guardarDocumentoPlato} from  '../../Firebase/DataBase'

export default function NewPlato(props) {
   
    const [tituloPub,setTituloPub]=useState(null)
    const [precioPub,setPrecioPub]=useState(null)
    const [imgPub,setImgPub]=useState('')
    const [previewImgPub,setPreviewImgPub]=useState('')
    const handleSubmit = (event) => {
      event.preventDefault();
      guardarDatos()
      
    };

   async function guardarDatos(){
        let obj ={nombre:tituloPub,precio:precioPub,img:imgPub}
        await guardarDocumentoPlato('plato',obj)
        setTituloPub('')
        setPrecioPub(null)
        setImgPub(null)
        setPreviewImgPub(null)
        props.volver()     
    }

    const handleTituloPub=(event)=>{
        setTituloPub(event.target.value)
    }
   
    const handlePrecioPub=(event)=>{
        setPrecioPub(event.target.value)
    }

    const handleImgPub =(event)=>{
        setImgPub(event.target.files[0])
        setPreviewImgPub(URL.createObjectURL(event.target.files[0]))
    }

    return (
        <>
        <Container >
            <Stack gap={3} >
            <Form  onSubmit={handleSubmit} className={'m-auto'}> 
                
                <Form.Group style={{width:"300px"}}>
                  <Form.Label >Titulo</Form.Label>
                  <Form.Control 
                        type="text" 
                        placeholder="Titulo"
                        onChange={handleTituloPub}
                        value={tituloPub} 
                        required />
                </Form.Group>
                
                <Form.Group style={{width:"300px"}}>
                  <Form.Label>Precio</Form.Label>
                  <Form.Control 
                        type="number" 
                        placeholder="$"
                        onChange={handlePrecioPub} 
                        value={precioPub}
                        required />
                </Form.Group>   
            
                <Form.Group style={{width:"300px"}}>
                <Form.Label>imagen</Form.Label>
                <Form.Control type="file" onChange={handleImgPub} />
                </Form.Group>

                    <Form.Group className="d-flex mt-2 justify-content-center" style={{width:"300px"}}>
                    {previewImgPub && (
                    <img style={{height:'25vh'}}src={previewImgPub}/>
                    )}
                    </Form.Group>
                
                <Button variant="primary" type="submit" style={{width:"300px"}}>
                    Guardar
                </Button>
            
            </Form>     
            </Stack>
        </Container>   
        </>
    )
}
        
                
          