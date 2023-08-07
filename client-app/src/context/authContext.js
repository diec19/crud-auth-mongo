"use client"
import { createContext,useState,useContext, useEffect} from "react";
import { registerRequest,loginRequest } from "@/api/auth";
import {useNavigation} from 'next/navigation';

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

    const sigin = async(user)=>{
        try {
            const res = await loginRequest(user)
            console.log(res);
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



    return( 
    <UserContext.Provider value={{
        signup,
        sigin,
        user,
        isAuthenticated,
        errors,

    }}>
        {children}
    </UserContext.Provider>
    )
}