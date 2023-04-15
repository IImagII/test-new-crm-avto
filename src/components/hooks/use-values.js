import { useState } from 'react'

export const useValues = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    age: '',
    role: ''
  })

  return [values, setValues]
}
