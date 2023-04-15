import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../components/hooks/use-auth'
import AuthLogin from '../../components/login/AuthLogin'
import { ROUTES } from '../../utils/routes'

const AuthPage = () => {
  const { isAuth } = useAuth()

  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {isAuth ? navigate(ROUTES.HOME_BODY) : <AuthLogin />}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
