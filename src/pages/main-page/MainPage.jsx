import { useAuth } from '../../components/hooks/use-auth'
import { useData } from '../../components/hooks/use-data'
import useUserInfo from '../../components/hooks/use-userInfo'
import { calcTotalPrice } from '../../utils/calcTotalCount'

import styles from './MainPage.module.scss'

const MainPage = () => {
  const { isEmail } = useAuth()

  const { user } = useUserInfo()
  const { data } = useData()

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Welcome {user.name} </h1>
            <ul class={styles.menu}>
              <li>Information about you</li>
              <li>
                <span>Name for order</span>
                <em>{user.name}</em>
              </li>
              <li>
                <span>Lastname for order</span>
                <em>{user.lastName}</em>
              </li>
              <li>
                <span>Age</span>
                <em>{user.age}</em>
              </li>
              <li>
                <span>Your phone:</span>
                <em>
                  {
                    <div>
                      {data.map((elem, i) => (
                        <div key={i}>{elem.phone}</div>
                      ))}
                    </div>
                  }
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
                <span>Your Role</span>
                <em>{user.role}</em>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainPage
