import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '../../firebase.config'

import { useAuth } from './use-auth'

const useUserInfo = () => {
  const [user, setUser] = useState({})
  const { id } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'users', id)
      const docSnap = await getDoc(docRef)
      setUser(docSnap.data())
    }

    fetchData()
  }, [id])

  return { user, setUser }
}

export default useUserInfo
