import app from "./Firebase"
import { collection,getDocs, getFirestore,doc,getDoc, setDoc,addDoc,deleteDoc,updateDoc,query, where} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,signInWithRedirect,GoogleAuthProvider} from 'firebase/auth'
import { getStorage, ref, uploadBytes,getDownloadURL} from "firebase/storage";
const storage = getStorage(app);
const auth= getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider();

     export const crearUserEmailCont = async(email,contrasena)=>{
       try {
        const user= await createUserWithEmailAndPassword(auth,email,contrasena)
        return user
       }catch(e){
        return false
      }
     }

     export const iniciarSesionEmailCont = async(email,contrasena)=>{
       try{
        await signInWithEmailAndPassword(auth,email,contrasena)
        
        return true

       }catch(e){
         return false
       }
     }
     export const iniciarSesionGoogle =async()=>{
      await signInWithRedirect(auth, googleProvider)
     }

     export const cerrarSesion = async()=>{
       await signOut(auth)
     }

     export const subirArchivo=async(archivo)=>{
      const archivoRef = ref(storage, `ImgPlatos/${archivo.name}`);
      await uploadBytes(archivoRef, archivo);
      const url= getDownloadURL(archivoRef)
      
      return url
     }
     export const guardarDocumentoPlato=async(coleccion, documento)=>{
     const urlImg = await subirArchivo(documento.img) 
     const obj={nombre:documento.nombre, precio:documento.precio,urlImg:urlImg}
     await addDoc(collection(db, coleccion), obj);
      
    }
    export const obtenerDatos = async(coleccion) =>{
      const datos=[]
      const data=  await getDocs(collection(db,coleccion))
      data.forEach((doc) => {
        let obj = doc.data()
        obj.id=doc.id
        datos.push(obj)
      });  
       return datos
       
    }
    

    export const obtenerDatosId = async(coleccion,id) =>{
      const datos=[]
        const ref=coleccion + "/"+id
       
        const docRef = doc(db,ref);
         const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let obj=docSnap.data()
          obj.id=docSnap.id
          datos.push(obj)
          return datos
        } else {
          
          return false
        }  
    }

    export const obtenerDocumentoId = async (coleccion,id)=>{
      let datos=[]
      const q = query(collection(db, coleccion), where('idUsuario', "==", id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let obj=doc.data()
          obj.id=doc.id
          datos.push(obj)
      });
      return datos
    }

    export const obtenerPedidoEstado = async (estado)=>{
      
      
     let datos=[]
     let q,a
     
        q=query(collection(db, 'pedido'), where('estado', '==', estado))
        const querySnapshot = await getDocs(q);
      
        querySnapshot.forEach((doc) => {
          let obj=doc.data()
            obj.id=doc.id
            datos.push(obj)
            
        });
        if(!estado){
          a=query(collection(db, 'pedido'), where('estado', '==', null))
          const querySnapshot1 = await getDocs(a);
      
        querySnapshot1.forEach((doc) => {
          let obj=doc.data()
            obj.id=doc.id
            datos.push(obj)
            
        });
        }
        return datos
      }
  
     
     
    
    export const guardarDocumento=async(coleccion, documento)=>{

      const docRef = await addDoc(collection(db, coleccion), documento);
      console.log("Document written with ID: ", docRef);
  
    }
    
    export const guardarDocumentoId=async(coleccion, id,documento)=>{

      const docRef = doc(db, coleccion, id)
      setDoc(docRef,documento)
    }

    export const eliminarDocumento=async(coleccion,documento)=>{
      await deleteDoc(doc(db, coleccion,documento));
    }

    export const actualizarDocumento=async(coleccion,documento,act)=>{
      const docRef = doc(db, coleccion, documento);
      
      await updateDoc(docRef, {
        estado: act
      });
    }

    export const actualizarCalificacion=async(coleccion,documento,act)=>{
      const docRef = doc(db, coleccion, documento);
      await updateDoc(docRef, {
        calificacion: act
      });
    }