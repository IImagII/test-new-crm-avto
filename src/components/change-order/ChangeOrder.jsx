import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { AiOutlineClose } from 'react-icons/ai'
import { TbExchange } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

import { db } from '../../firebase.config'
import { useAuth } from '../hooks/use-auth'

const ChangeOrder = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
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

  const deleteClient = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id))
      setData(data.filter((elem) => elem.id !== id))
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center mb-5">CHANGE ORDERS</h2>

        <Table striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>from City</th>
              <th>to City</th>
              <th>Passengers</th>
              <th>Phone</th>
              <th></th>
              <th></th>
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
                <td>
                  <TbExchange
                    size={20}
                    color="blue"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`${elem.id}`)}
                  />
                </td>
                <td>
                  <AiOutlineClose
                    color="red"
                    style={{ cursor: 'pointer' }}
                    size={24}
                    onClick={() => deleteClient(elem.id)}
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    </div>
  )
}

export default ChangeOrder
