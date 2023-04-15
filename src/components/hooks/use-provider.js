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
        dispatch(
          setUser({
            email: user.email,
            id: user.uid
          })
        )
        console.log(user.id)
      })

      .then(() => navigate(ROUTES.ABOUT))
      .catch((err) => {
        alert(err.message)
      })
  }

  const handleAuthFacebook = () => {
    signInWithPopup(auth, providerFacebook)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid
          })
        )
      })
      .then(() => navigate(ROUTES.ABOUT))
      .catch((err) => {
        alert(err.message)
      })
  }

  return { handleAuthGoogle, handleAuthFacebook }
}

export default useProvider
