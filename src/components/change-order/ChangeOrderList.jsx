import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

import { db } from '../../firebase.config'
import { useAuth } from '../hooks/use-auth'
import { useValues } from '../hooks/use-values'

import styles from './ChangeOrderList.module.scss'

const ChangeOrderList = () => {
  const { id: myId } = useParams()
  const { id } = useAuth()
  const [data, setData] = useState({})
  const [values, setValues] = useValues()

  const navigate = useNavigate()

  const fetchData = async () => {
    const docRef = doc(db, id, myId)
    const docSnap = await getDoc(docRef)

    setData(docSnap.data())
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const fieldsToUpdate = {}

      if (
        values.cityFirst !== data.cityFirst &&
        values.cityFirst !== '' &&
        values.cityFirst !== undefined
      ) {
        fieldsToUpdate.cityFirst = values.cityFirst
      }

      if (
        values.citySecond !== data.citySecond &&
        values.citySecond !== '' &&
        values.citySecond !== undefined
      ) {
        fieldsToUpdate.citySecond = values.citySecond
      }

      if (
        values.countPerson !== data.countPerson &&
        values.countPerson !== '' &&
        values.countPerson !== undefined
      ) {
        fieldsToUpdate.countPerson = values.countPerson
      }

      if (
        values.phone !== data.phone &&
        values.phone !== '' &&
        values.phone !== undefined
      ) {
        fieldsToUpdate.phone = values.phone
      }
      console.log('🚀 ~ fieldsToUpdate:', fieldsToUpdate)
      await updateDoc(
        doc(db, id, myId),
        {
          ...fieldsToUpdate,
          timeStamp: serverTimestamp()
        },
        { merge: true }
      )
      navigate(-1)
    } catch (e) {
      console.error('Error updating document: ', e)
    }
  }

  if (data === undefined) {
    return (
      <>
        <div className="container">
          <div className="row">
            <h1 className="text-center">No information about orders</h1>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center">Change ORDER</h1>

        <div className={styles.position}>
          <div className={styles.root}>
            <form onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label>First City</label>
                </div>
                <div className={styles.col_75}>
                  <input
                    type="text"
                    name="first-city"
                    placeholder={data.cityFirst}
                    value={values.cityFirst}
                    onChange={(e) =>
                      setValues({ ...values, cityFirst: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label>Second city</label>
                </div>
                <div className={styles.col_75}>
                  <input
                    type="text"
                    name="second-city"
                    placeholder={data.citySecond}
                    value={values.citySecond}
                    onChange={(e) =>
                      setValues({ ...values, citySecond: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label>Count passenger</label>
                </div>
                <div className={styles.col_75}>
                  <input
                    type="number"
                    name="passenger"
                    placeholder={data.countPerson}
                    value={values.countPerson}
                    onChange={(e) =>
                      setValues({ ...values, countPerson: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label>phone</label>
                </div>
                <div className={styles.col_75}>
                  <input
                    type="text"
                    name="phone"
                    placeholder={data.phone}
                    value={values.phone}
                    onChange={(e) =>
                      setValues({ ...values, phone: e.target.value })
                    }
                  />
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

export default ChangeOrderList
