
import { createContext,useState,useContext, useEffect} from "react";
import { registerRequest,loginRequest,verityTokenRequest } from "../api/auth";
import Cookies from 'js-cookie'


export const UserContext = createContext();

export const userAuth=()=>{
    const context=useContext(UserContext);
    if(!context){
        throw new Error('userAuth must be using ')
    }
    return context
}


export const UserProvider =({children})=>{
    const [user, setUser]= useState(null)
    const [isAuthenticated, setIsAuthenticated]=useState(false)
    const [errors, setErrors]= useState([])
    const [loading, setLoading]= useState(true)

    const signup=async(user)=>{
        try {
        const res = await registerRequest(user);
        console.log(res.data);
        setUser(res.data)
        setIsAuthenticated(true)
        } catch (error) {
           
            setErrors(error.response.data);
            
        }
    }

    const signin = async(user)=>{
        try {
            const res = await loginRequest(user)
            console.log(res);
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            if(Array.isArray(error.response.data)){
              return setErrors(error.response.data)
            }
            setErrors([error.response.data.message]);
            
        }

    }


useEffect(() => {
  if(errors.length > 0){
   const timer= setTimeout(() => {
      setErrors([])  
    }, 5000);
    return ()=> clearTimeout(timer)
  }
}, [errors])


useEffect(()=>{
  async  function checkLogin(){
   const cookies = Cookies.get(); //obtener todos los valores de cookies
   console.log(cookies);

   if(!cookies.token){  //comprueba si no hay un token, si no hay queda todo en falso
    setIsAuthenticated(false); // si no coincide enviamos todo a falso
    setLoading(false)
    return setUser(null);
   }

   try {   //cuando si ahi un token 
     const res=await verityTokenRequest(cookies.token)//valida con el backend

     if(!res.data){ //si no coincide dejamos todo en estado falso
    setIsAuthenticated(false)
    setLoading(false);
    return;
    }

    // en este caso si coincide 
     setIsAuthenticated(true)
     setUser(res.data)
     setLoading(false);
   } catch (error) {
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
    
   }
   }

checkLogin()
},[])

    return( 
    <UserContext.Provider value={{
        signup,
        signin,
        user,
        isAuthenticated,
        errors,
        loading,

    }}>
        {children}
    </UserContext.Provider>
    )
}