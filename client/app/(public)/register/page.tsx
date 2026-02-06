"use client"
import { useSignupMutation } from '@/redux/apis/authApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const register = () => {
  const router = useRouter()
  const [signup] = useSignupMutation()

   const registerSchema = z.object({
          name: z.string().min(1),
          email: z.string().min(1),
          password: z.string().min(1),
        
      })
      type registerType = z.infer<typeof registerSchema>
  
      const { reset, register, handleSubmit, formState: { errors } } = useForm<registerType>({
          defaultValues: {
              name: "",
              email: "",
              password: "",
      
          },
          resolver: zodResolver(registerSchema)
      })
      const handleregister = async (data:registerType)=>{
        try {
            await signup(data).unwrap()
            toast.success("register success")
            reset()
            router.push("/")
        } catch (error) {
            console.log(error)
         toast.error("unable to register ")
        }   
      }

  return <>
  <form onSubmit={handleSubmit(handleregister)}>
<input type="text" {...register("name")}  />
<input type="text"{...register("email")}  />
<input type="password" {...register("password")}    />
<button type='submit' >register</button>
  </form>
   
    </>
  
}

export default register
