import Context from '@/contexts/context'
import {useContext, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {v4 as newToken} from 'uuid'
import login from '../services/login.service'

function useLogin() {
  const context = useContext(Context)
  const [stateButton, setStateButton] = useState(true)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm()

  useEffect(() => {
    if (context.authState) {
      navigate('/inicio')
    }
  }, [])

  const onSubmit = async (data) => {
    toast.loading('Conectando')
    setStateButton(false)
    await login(data)
      .then((json) => {
        setTimeout(() => {
          if (json.length === 1) {
            toast.dismiss()
            context.handleUserLogin({user: json, token: newToken()})
            toast.success(`Bienvenido ${json[0].user_name}`)
            navigate('/inicio')
            setStateButton(true)
          } else {
            toast.error('Usuario o Contraseña Inválidos')
            setStateButton(true)
          }
        }, 1000)
      })
      .catch((err) => {
        toast.dismiss()
        toast.error('Error al tratar de conectar con el Servidor')
        console.log(err)
      })
  }
  return {context, register, handleSubmit, errors, onSubmit, stateButton}
}

export default useLogin
