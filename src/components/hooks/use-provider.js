import { signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { auth, provider, providerFacebook } from '../../firebase.config'
import { setUser } from '../../store/slice/userSlice'
import { ROUTES } from '../../utils/routes'

const useProvider = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAuthGoogle = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        console.log(user)
        dispatch(
          setUser({
            email: user.email,
            id: user.uid
          })
        )
        navigate(ROUTES.HOME_BODY)
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  const handleAuthFacebook = () => {
    signInWithPopup(auth, providerFacebook)
      .then(({ user }) => {
        console.log(user)
        dispatch(
          setUser({
            email: user.email,
            id: user.uid
          })
        )
        navigate(ROUTES.HOME_BODY)
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  return { handleAuthGoogle, handleAuthFacebook }
}

export default useProvider
