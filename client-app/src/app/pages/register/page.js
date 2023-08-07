"use client"
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { userAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {
  
  
  const router = useRouter();
  const {register,
     handleSubmit,
      formState:{errors}}=useForm()
  const {signup, isAuthenticated, errors:registerErrors}=userAuth();
 

  const onSubmit =  handleSubmit(async(values)=>{
      signup(values)
   })
    useEffect(() => {
    
    if (isAuthenticated) {
      router.push('/pages/task');
    }
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
    {
      registerErrors.map((error, i)=>(
        <div className="bg-red-500 p-2 text-white my-2 rounded-md" key={i}>
          {error}
        </div>
      ))
    }
   <h1 className="text-2x1 font-bold">Registrarse</h1>
  <form onSubmit={onSubmit}>

    <input type="text" {...register("username",{required:true})}
      className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
      placeholder='username'
    />
    {
      errors.username &&(
        <p className='text-red-500'>Username es requerido</p>
      )
    }
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
    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Registrarse
    </button>
  </form >
  <p className="flex gap-x-2 justify-between">
      Ya estas registrado? <Link href="/pages/login"
      className="text-sky-500"
      >Loguearse</Link>
    </p>
</div>
</div>
  )
}

export default page