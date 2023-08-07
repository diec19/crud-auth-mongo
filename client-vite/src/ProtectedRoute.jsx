import { Navigate, Outlet } from "react-router-dom"
import { userAuth } from "./context/AuthContext"

const ProtectedRoute = () => {

    const {loading, isAuthenticated}= userAuth()
    console.log(loading,isAuthenticated);

    if (loading)return <h1>Loading....</h1>  //si esta cargando que muestre cargando
    if(!loading && !isAuthenticated) return <Navigate to='/login' replace/>
    //si no esta cargando
    //y no esta autenticado mandale al login
  return <Outlet />
    
  
}

export default ProtectedRoute