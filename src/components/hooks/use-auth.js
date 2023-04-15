import { useSelector } from 'react-redux'

export function useAuth() {
  const { userDisplay, email, id } = useSelector((state) => state.user)

  return {
    isAuth: !!email,
    isEmail: email,
    userDisplay,
    id
  }
}
