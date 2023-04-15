import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

import { db } from '../../firebase.config'
import { useAuth } from '../hooks/use-auth'

const ShowOrder = () => {
  const [data, setData] = useState([])

  const { id } = useAuth()

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

  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center mb-5">SHOW ORDERS</h2>

        <Table striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>from City</th>
              <th>to City</th>
              <th>Passengers</th>
              <th>Phone</th>
            </tr>
          </thead>
          {data.map((elem) => (
            <tbody key={elem.id}>
              <tr>
                <td>{elem.id.slice(0, 5)}</td>
                <td>{elem.cityFirst}</td>
                <td>{elem.citySecond}</td>
                <td>{elem.countPerson}</td>
                <td>{elem.phone}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  )
}

export default ShowOrder
