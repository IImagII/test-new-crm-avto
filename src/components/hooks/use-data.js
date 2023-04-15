import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '../../firebase.config'

import { useAuth } from './use-auth'

export const useData = () => {
  const { id } = useAuth()
  const [data, setData] = useState([])

  useEffect(() => {
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

    fetchData()
  }, [id])

  return { data, setData }
}
