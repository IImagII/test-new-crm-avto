import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../firebase.config'
import { setUser } from '../../store/slice/userSlice'
import { ROUTES } from '../../utils/routes'

import styles from './PhoneSingUp.module.scss'

const PhoneSingUp = ({ setShowPhone }) => {
  const [number, setNumber] = useState('')
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const [isCode, setIsCode] = useState(false)
  const [confirm, setConfirm] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      auth
    )
    recaptchaVerifier.render()
    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (number === '' || number === undefined)
      return setError('Please enter a your Phone number!')
    try {
      const response = await setUpRecaptcha(number)
      console.log('🚀 ~ response:', response)
      setConfirm(response)
      setIsCode(true)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleSubmitVerification = async (e) => {
    e.preventDefault()
    console.log(code)
    if (code === '' || code === null) return
    try {
      setError('')
      await confirm.confirm(code).then(({ user }) => {
        dispatch(
          setUser({
            email: user.phoneNumber,
            id: user.uid
          })
        )
      })
      navigate(ROUTES.ABOUT)
    } catch (err) {
      setError(e.message)
    }
  }

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Phone Auth</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form
          onSubmit={handleSubmit}
          style={{ display: !isCode ? 'block' : 'none' }}
        >
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <PhoneInput
              defaultCountry="UA"
              value={number}
              onChange={setNumber}
              placeholder="Enter Phone Number"
            />
            <div id="recaptcha-container" />
          </Form.Group>
          <div className={styles.button_phone}>
            <Button variant="primary" type="submit">
              Send
            </Button>
            <Button variant="secondary" onClick={setShowPhone}>
              Cancel
            </Button>
          </div>
        </Form>

        <Form
          onSubmit={handleSubmitVerification}
          style={{ display: isCode ? 'block' : 'none' }}
        >
          <Form.Group className="mb-3" controlId="formBasicOtp">
            <Form.Control
              type="text"
              placeholder="Enter code"
              onChange={(e) => setCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className={styles.button_phone}>
            <Button variant="primary" type="submit">
              Send
            </Button>{' '}
            <Button variant="secondary" onClick={setShowPhone}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default PhoneSingUp
