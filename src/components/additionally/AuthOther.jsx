import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { db } from '../../firebase.config'
import { ROUTES } from '../../utils/routes'
import { useAuth } from '../hooks/use-auth'
import { useValues } from '../hooks/use-values'

const AuthOther = () => {
  const [values, setValues] = useValues()

  const { isEmail, id } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await setDoc(doc(db, 'users', id), {
        email: isEmail,
        name: values.name,
        lastName: values.lastName,
        age: values.age,
        role: values.role,
        timeStamp: serverTimestamp()
      })

      navigate(ROUTES.HOME_BODY)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form className="border p-5 rounded-5" onSubmit={handleSubmit}>
        <div className="text-center text-muted mb-4 text-uppercase font-weight-bold">
          information about me
        </div>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Last name"
            value={values.lastName}
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            value={values.age}
            onChange={(e) => setValues({ ...values, age: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGender">
          <Form.Label>Role</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              name="role"
              label="driver"
              value="driver"
              checked={values.role === 'driver'}
              onChange={(e) => setValues({ ...values, role: e.target.value })}
            />
            <Form.Check
              inline
              type="radio"
              name="role"
              label="passenger"
              value="passenger"
              checked={values.role === 'passenger'}
              onChange={(e) => setValues({ ...values, role: e.target.value })}
            />
          </div>
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AuthOther
