import { signInWithEmailAndPassword } from 'firebase/auth'
import { Alert, Button, Form } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../firebase.config'
import { setUser } from '../../store/slice/userSlice'
import { ROUTES } from '../../utils/routes'
import { useValues } from '../hooks/use-values'

const AuthLogin = () => {
  const [values, setValues] = useValues()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken
          })
        )
        navigate(ROUTES.HOME_BODY)
      })
      .catch(() => {
        setValues({ ...values, email: '', password: '' })
        ReactDOM.render(
          <Alert variant="danger">Invalid user!</Alert>,
          document.getElementById('alert')
        )
      })
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
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
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <Form.Text className="text-muted">Enter your email address</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <Form.Text className="text-muted">Enter your password</Form.Text>
        </Form.Group>

        <div className="text-muted mb-3">
          <Link
            to={ROUTES.REGISTER}
            className="nav-link m-2 text-center text-decoration-underline"
          >
            create account
          </Link>
        </div>
        <div className="d-grid gap-2 ">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      <div id="alert"></div>
    </div>
  )
}

export default AuthLogin