import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from 'firebase/firestore'
import React from 'react'
import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { AiOutlineClose } from 'react-icons/ai'

import { db } from '../../firebase.config'

import styles from './ClientManagement.module.scss'

const ClientManagement = () => {
  const options = ['driver', 'passenger', 'supervisor']

  const [data, setData] = useState([])

  const fetchData = async () => {
    let list = []
    try {
      const queryData = await getDocs(collection(db, 'users'))
      queryData.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      setData(list)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleRoleChange = (id, e) => {
    const newData = data.map((elem) => {
      if (elem.id === id) {
        return { ...elem, selectedRole: e.target.value }
      } else {
        return elem
      }
    })
    setData(newData)
  }

  const updateRole = async (id, role) => {
    try {
      const userRef = doc(db, 'users', id)
      await updateDoc(userRef, { role: role })

      setData((prevData) => {
        const updatedData = prevData.map((elem) => {
          if (elem.id === id) {
            return { ...elem, role }
          }
          return elem
        })
        return updatedData
      })
    } catch (e) {
      console.log(e)
    }
  }

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
        <h2 className="text-center mb-5">CLIENT MANAGEMENT</h2>

        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Last name</th>
              <th>Age</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          {data.map((elem) => (
            <tbody>
              <tr>
                <td>{elem.id.slice(0, 5)}</td>
                <td>{elem.name}</td>
                <td>{elem.lastName}</td>
                <td>{elem.age}</td>
                <td>
                  <div>{elem.role}:</div>
                  <select
                    value={elem.role}
                    onChange={(e) => handleRoleChange(elem.id, e)}
                    className={styles.small_select}
                  >
                    <option value={elem.role}></option>
                    {options.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => updateRole(elem.id, elem.selectedRole)}
                    className="btn btn-primary"
                  >
                    Update Role
                  </button>
                </td>
                <td>
                  <AiOutlineClose
                    className={styles.icon}
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

export default ClientManagement
