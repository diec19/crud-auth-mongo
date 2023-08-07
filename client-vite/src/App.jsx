import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserProvider } from "./context/AuthContext"

import LoginPage from "../src/page/LoginPage"
import RegisterPage from "../src/page/RegisterPage"
import TasksPage from "./page/TasksPage"
import TaskFormPage from "./page/TaskFormPage"
import ProfilePage from "./page/ProfilePage"
import HomePage from "./page/HomePage"

import ProtectedRoute from "./ProtectedRoute"


const App = () => {
  return (
   
   <UserProvider>
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>

       <Route element={<ProtectedRoute/>}>
       <Route path='/tasks' element={<TasksPage/>}/>
        <Route path='/add-task' element={<TaskFormPage/>}/>
        <Route path='/tasks/:id' element={<TaskFormPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
 
       </Route>
      </Routes>
   </BrowserRouter>
   </UserProvider>
  )
}

export default App