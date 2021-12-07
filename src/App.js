import React,{ useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from './Componentes/Inicio';
import Login from './Componentes/Login';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './Firebase/Firebase'
const auth=getAuth(app)

function App() {
  const [user,setUser]= useState(null)
 
      onAuthStateChanged(auth, (usuarioFirebase) => {
        if (usuarioFirebase) {
          //código en caso de que haya sesión inciiada
          setUser(usuarioFirebase.email);
        } else {
          //código en caso de que no haya sesión iniciada
          setUser(null);
        }
      });
  

  return (
    <div>
      {user ? <Inicio user={user} />: <Login />}
    </div>
  );
}

export default App;
