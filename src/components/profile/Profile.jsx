import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { db } from '../../firebase.config'
import { ROUTES } from '../../utils/routes'
import { useAuth } from '../hooks/use-auth'
import useUserInfo from '../hooks/use-userInfo'
import { useValues } from '../hooks/use-values'

import styles from './Profile.module.scss'

const Profile = () => {
  const { user, setUser } = useUserInfo()

  const [values, setValues] = useValues()

  const { id } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const fieldsToUpdate = {}

      if (values.name !== user.name && values.name !== '') {
        fieldsToUpdate.name = values.name
      }
      if (values.lastName !== user.lastName && values.lastName !== '') {
        fieldsToUpdate.lastName = values.lastName
      }
      if (values.age !== user.age && values.age !== '') {
        fieldsToUpdate.age = values.age
      }
      if (values.role !== user.role && values.role !== '') {
        fieldsToUpdate.role = values.role
      }

      await updateDoc(
        doc(db, 'users', id),
        {
          ...fieldsToUpdate,
          timeStamp: serverTimestamp()
        },
        { merge: true }
      )
      navigate(ROUTES.HOME_BODY)
    } catch (e) {
      console.error('Error updating document: ', e)
    }
  }

  if (user === undefined) {
    return (
      <>
        <div className="container">
          <div className="row">
            <h1 className="text-center">
              You have not entered information about yourself
            </h1>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center">PROFILE</h1>

        <div className={styles.position}>
          <div className={styles.root}>
            <form onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label>First Name</label>
                </div>
                <div className={styles.col_75}>
                  <input
                    type="text"
                    name="first-name"
                    placeholder={user.name}
                    value={values.name}
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label>Last Name</label>
                </div>
                <div className={styles.col_75}>
                  <input
                    type="text"
                    name="last-name"
                    placeholder={user.lastName}
                    value={values.lastName}
                    onChange={(e) =>
                      setValues({ ...values, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label>Age</label>
                </div>
                <div className={styles.col_75}>
                  <input
                    type="text"
                    name="age"
                    placeholder={user.age}
                    value={values.age}
                    onChange={(e) =>
                      setValues({ ...values, age: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label>Role</label>
                </div>
                <div className={styles.col_75}>
                  {user.role}
                  <select
                    name="role"
                    value={values.role}
                    onChange={(e) =>
                      setValues({ ...values, role: e.target.value })
                    }
                  >
                    <option value="driver">Driver</option>
                    <option value="passenger">Passenger</option>
                  </select>
                </div>
              </div>

              <div className={styles.row}>
                <Button
                  variant="primary"
                  type="submit"
                  className={`mt-5 ${styles.submit}`}
                >
                  Change profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
