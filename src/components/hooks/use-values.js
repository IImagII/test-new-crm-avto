import { useState } from 'react'

export const useValues = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    age: 0,
    role: ''
  })

  return [values, setValues]
}
