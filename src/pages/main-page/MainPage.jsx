import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { useAuth } from '../../components/hooks/use-auth'
import { db } from '../../firebase.config'
import { calcTotalPrice } from '../../utils/calcTotalCount'

import styles from './MainPage.module.scss'

const MainPage = () => {
  const {
    userDisplay: { displayName: isNameDisplay },
    userDisplay: { phoneNumber: isPhone },
    isEmail,
    id
  } = useAuth()

  const [data, setData] = useState([])
  console.log('🚀 ~ data:', data)

  const fetchData = async () => {
    let list = []
    try {
      const queryData = await getDocs(collection(db, id))
      queryData.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      setData(list)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">
              Welcome {isNameDisplay ? isNameDisplay : isEmail}
            </h1>
            <ul class={styles.menu}>
              <li>Information about you</li>
              <li>
                <span>Your phone:</span>
                <em>
                  {isPhone ? (
                    isPhone
                  ) : (
                    <div>
                      {data.map((elem) => (
                        <div>{elem.phone}</div>
                      ))}
                    </div>
                  )}
                </em>
              </li>
              <li>
                <span>Your orders</span>
                <em>{data.length}</em>
              </li>
              <li>
                <span>Your passenger</span>
                <em>{calcTotalPrice(data)}</em>
              </li>
              <li>
                <span>Your email</span>
                <em>{isEmail}</em>
              </li>
              <li>
                <span>"Морской"</span>
                <em>450</em>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPage
