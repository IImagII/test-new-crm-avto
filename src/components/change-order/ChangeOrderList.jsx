import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { db } from '../../firebase.config'
import { useAuth } from '../hooks/use-auth'

const ChangeOrderList = () => {
  const { id: myId } = useParams()
  const { id } = useAuth()
  const [data, setData] = useState([])
  console.log('🚀 ~ data:', data)

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, id, myId)
      const docSnap = await getDoc(docRef)

      setData(docSnap.data())
    }

    fetchData()
  }, [myId, id])

  return <div>ChangeOrderList</div>
}

export default ChangeOrderList
