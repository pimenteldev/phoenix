import React from 'react'
import logo from '@/assets/logo.png'
import Button from '@/components/Button'
import style from './index.module.css'
import useLogin from './hooks/useLogin.hook'

function Login() {
  const {context, register, handleSubmit, errors, onSubmit, stateButton} = useLogin()

  return (
    <>
      {!context?.authState && (
        <div className={style.form_login_content}>
          <div className={style.form_login}>
            <figure className={style.login_img}>
              <img
                src={logo}
                alt="Logo"
                width="100%"
                height="100%"
              />
            </figure>

            <div className={style.title_div}>
              <h1 className={style.title}>Phoenix</h1>
              <h4 className={style.subtitle}>Sistema de Restaurante</h4>
            </div>

            <form
              className={style.form}
              id="formlogin"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label htmlFor="username">Usuario</label>
                <input
                  {...register('username', {
                    required: {
                      value: true,
                      message: 'El Usuario es obligatorio',
                    },
                  })}
                  type="text"
                  placeholder="Usuario"
                  className={style.form_input}
                />
                <>{errors.username && <div className="msg_err">{errors.username.message}</div>}</>
              </div>

              <div>
                <label htmlFor="password">Contraseña</label>
                <input
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'La Contraseña es obligatoria',
                    },
                  })}
                  type="password"
                  placeholder="Contraseña"
                  className={style.form_input}
                />
                <>{errors.password && <div className="msg_err">{errors.password.message}</div>}</>
              </div>

              <div>
                {stateButton ? (
                  <Button
                    btntype="PRIMARY"
                    type="submit"
                    content="Ingresar"
                  />
                ) : (
                  <Button
                    btntype="SECONDARY"
                    type="submit"
                    disabled
                    content="Conectando"
                  />
                )}
              </div>
            </form>
            <br />
            <span>
              &copy; Sistema de Restaurante <br /> Phoenix 2022–2025
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
