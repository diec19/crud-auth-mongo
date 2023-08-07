
import { userAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from "react-router-dom"
import { useEffect } from 'react'

const page = () => {
  

  const {register,handleSubmit,formState:{errors}}=useForm()

  const {signin,errors:loginErrors,isAuthenticated } = userAuth()

  const navigate = useNavigate();

  const onSubmit =handleSubmit((data)=>{
    signin(data);
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
       <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">


    {
      loginErrors.map((error, i)=>(
        <div className="bg-red-500 p-2 text-white my-2 rounded-md" key={i}>
          {error}         
        </div>
      ))
    }
        <h1 className="text-2x1 font-bold">Login</h1>
       <form onSubmit={onSubmit}>

  
    <input type="email"{...register("email",{required:true})}
       className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
       placeholder='email'
    />
    {
      errors.email &&(
        <p className='text-red-500'>Email es requerido</p>
      )
    }
    <input type="password" {...register("password",{required:true})}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        placeholder='password'
    />
    {
      errors.password &&(
        <p className='text-red-500'>Password es requerido</p>
      )
    }
    <button type="submit"className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-40">
      Login
    </button>
  </form >

    <p className="flex gap-x-2 justify-between">
      No te has registrado aun? <Link to="/register"
      className="text-sky-500"
      >Registrarse</Link>
    </p>
  </div>
  </div>
  )
}

export default page