import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

import { db } from '../../firebase.config'
import { useAuth } from '../hooks/use-auth'

import styles from './CreateOrder.module.scss'

const CreateOrder = () => {
  const { id } = useAuth()

  const [values, setValues] = useState({
    cityFirst: '',
    citySecond: '',
    countPerson: 0,
    phone: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, id), {
        cityFirst: values.cityFirst,
        citySecond: values.citySecond,
        countPerson: values.countPerson,
        phone: values.phone,
        timeStamp: serverTimestamp()
      })
      setValues({
        ...values,
        cityFirst: '',
        citySecond: '',
        countPerson: '',
        phone: ''
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center mb-5">Create order</h1>
          <div className="row row-cols-2 mb-5">
            <div className="col">
              <div className="input-group flex-nowrap justify-content-center">
                <span className="input-group-text" id="addon-wrapping">
                  from
                </span>
                <input
                  type="text"
                  className={`form-control ${styles.form}`}
                  placeholder="Enter City"
                  aria-label="Enter City"
                  aria-describedby="addon-wrapping"
                  value={values.cityFirst}
                  onChange={(e) =>
                    setValues({ ...values, cityFirst: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col">
              <div className="input-group flex-nowrap justify-content-center">
                <span className="input-group-text" id="addon-wrapping">
                  to
                </span>
                <input
                  type="text"
                  className={`form-control ${styles.form}`}
                  placeholder="Enter City"
                  aria-label="Enter City"
                  aria-describedby="addon-wrapping"
                  value={values.citySecond}
                  onChange={(e) =>
                    setValues({ ...values, citySecond: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className=" input-group flex-nowrap justify-content-center mb-5">
              <div className={styles.text}>Number of passengers</div>

              <span className="input-group-text" id="addon-wrapping">
                count
              </span>
              <input
                type="number"
                className={`form-control ${styles.form}`}
                placeholder="Enter passengers"
                aria-label="Enter passengers"
                aria-describedby="addon-wrapping"
                onChange={(e) =>
                  setValues({ ...values, countPerson: e.target.value })
                }
                value={values.countPerson}
              />
            </div>
            <div className=" input-group flex-nowrap justify-content-center ">
              <div className={styles.text}>Number of phone</div>

              <span className="input-group-text" id="addon-wrapping">
                phone
              </span>
              <input
                type="tel"
                className={`form-control ${styles.form}`}
                placeholder="Enter your phone number"
                aria-label="Enter your phone number"
                aria-describedby="addon-wrapping"
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
                value={values.phone}
              />
            </div>
          </div>
          <div className={styles.button}>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateOrder
