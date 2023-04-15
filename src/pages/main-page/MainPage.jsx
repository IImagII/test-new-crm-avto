import { useAuth } from '../../components/hooks/use-auth'
import { useData } from '../../components/hooks/use-data'
import { calcTotalPrice } from '../../utils/calcTotalCount'

import styles from './MainPage.module.scss'

const MainPage = () => {
  const {
    userDisplay: { displayName: isNameDisplay },
    userDisplay: { phoneNumber: isPhone },
    isEmail
  } = useAuth()

  const { data } = useData()

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
