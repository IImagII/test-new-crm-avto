import { signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { FcPhone } from 'react-icons/fc'
import 'react-phone-number-input/style.css'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../firebase.config'
import { setUser } from '../../store/slice/userSlice'
import { ROUTES } from '../../utils/routes'
import PhoneSingUp from '../PhoneSignUp/PhoneSingUp'
import useProvider from '../hooks/use-provider'
import { useValues } from '../hooks/use-values'

const AuthLogin = () => {
  const [values, setValues] = useValues()
  const [error, setError] = useState(false)
  const [showPhone, setShowPhone] = useState(true)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { handleAuthGoogle, handleAuthFacebook } = useProvider()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(false)
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid
          })
        )
        navigate(ROUTES.HOME_BODY)
      })
      .catch(() => {
        setValues({ ...values, email: '', password: '' })
        setError(true)
      })
  }

  function handleClick(event) {
    if (event.target.tagName !== 'FORM') {
      setError(false)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleClick)
    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  }, [])

  const handleAuthPhone = () => {
    setShowPhone((prevShowPhone) => !prevShowPhone)
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        {showPhone ? (
          <Form className="border p-5 rounded-5" onSubmit={handleSubmit}>
            <div className="text-center text-muted mb-4 text-uppercase font-weight-bold">
              Authorization
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
              <Form.Text className="text-muted">
                Enter your email address
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              <Form.Text className="text-muted">Enter your password</Form.Text>
            </Form.Group>
            <div className="text-muted mb-3">
              <Link
                to={ROUTES.REGISTER}
                className="nav-link m-2 text-center text-decoration-underline"
              >
                Don't have an accound? Sign up
              </Link>
            </div>
            <div className="d-grid gap-2 ">
              <Button variant="primary" type="submit">
                Sing in
              </Button>
            </div>
            <div className="d-grid mt-4">
              <a
                href="#"
                className="provider_button"
                onClick={handleAuthGoogle}
              >
                <FcGoogle className="provider_button_icon" />
                Sign in with Google
              </a>
            </div>
            <div className="d-grid mt-2">
              <a
                href="#"
                className="provider_button"
                onClick={handleAuthFacebook}
              >
                <FaFacebook className="provider_button_icon" />
                Sign in with Facebook
              </a>
            </div>
            <div className="d-grid mt-2">
              <a href="#" className="provider_button" onClick={handleAuthPhone}>
                <FcPhone className="provider_button_icon" />
                Sign in with Phone
              </a>
            </div>{' '}
            {error && (
              <Alert variant="danger" className="mt-2">
                Invalid user!
              </Alert>
            )}
          </Form>
        ) : (
          <div>
            <PhoneSingUp setShowPhone={setShowPhone} />
          </div>
        )}
      </div>
    </>
  )
}

export default AuthLogin
