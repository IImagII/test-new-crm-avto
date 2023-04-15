import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import { db } from '../../firebase.config'
import { useAuth } from '../hooks/use-auth'
import { useValues } from '../hooks/use-values'

import styles from './Profile.module.scss'

const Profile = () => {
  const [data, setData] = useState({})

  const [values, setValues] = useValues()

  const { id } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'users', id)
      const docSnap = await getDoc(docRef)

      setData(docSnap.data())
    }

    fetchData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const fieldsToUpdate = {}
      if (values.name !== data.name) {
        fieldsToUpdate.name = values.name
      }
      if (values.lastName !== data.lastName) {
        fieldsToUpdate.lastName = values.lastName
      }
      if (values.age !== data.age) {
        fieldsToUpdate.age = values.age
      }
      if (values.gender !== data.gender) {
        fieldsToUpdate.gender = values.gender
      }
      await updateDoc(
        doc(db, 'users', id),
        {
          ...fieldsToUpdate,
          timeStamp: serverTimestamp()
        },
        { merge: true }
      )
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  if (data === undefined) {
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
                    placeholder={data.name}
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
                    placeholder={data.lastName}
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
                    name="last-name"
                    placeholder={data.age}
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
                  {data.role}
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
