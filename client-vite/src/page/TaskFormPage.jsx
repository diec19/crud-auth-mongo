import {useForm} from "react-hook-form"
import React from 'react'

const TaskFormPage = () => {
  const {register, handleSubmit}= useForm()

const onSubmit= handleSubmit((data)={

})

  return (
    <div>
      
      <form action="onSubmit">
         <input
            type="type"
            placeholder="title"
            {...register("title")}
            autoFocus
            />

         <textarea
           rows="3"
           placeholder="Description"
           {...register("description")}
           ></textarea> 

         <button>
          Guardar
         </button>

      </form>
    </div>
  )
}

export default TaskFormPage