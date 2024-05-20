import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/hvd-logo.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const apiUrl = process.env.REACT_APP_API_URL
  console.log('api', apiUrl)
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)

  const notify = (dataa) => toast(dataa)

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      login()
    }
  }

  const login = async () => {
    try {
      if (!email || !password) {
        return
      }

      const data = { email, password }
      const response = await fetch(`http://localhost:3134/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success === true) {
        toast.success('Login Successfully')
        const token = result?.user?.tokens[0]?.token
        window.localStorage.setItem('token', token)
        window.localStorage.setItem('record_id', result?.user?._id)
        navigate('/customerList')
        window.location.reload()
      } else {
        notify('Something error')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Something error')
    }
  }

  const Register = () => {
    navigate('/register')
  }
  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{ background: '#015291' }}
    >
      <CContainer className="form-container">
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup className="mt-3">
              <CCard className="p-4">
                <CCardBody className="p-0">
                  <Form noValidate validated={validated} onKeyPress={handleKeyPress}>
                    <h4 className="h4-heading">Login</h4>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label>E-Mail Address</Form.Label>
                        <Form.Control
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          type="email"
                          placeholder="E-Mail Adresse"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-2">
                      <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="password"
                        />
                      </Form.Group>
                    </Row>
                    <div>
                      <br />
                      <div className="d-flex">
                        <Button
                          className="form-control form-btn w-50 mx-2"
                          style={{ background: '#005291', color: 'white' }}
                          onClick={login}
                        >
                          Login
                        </Button>
                        <Button
                          className="form-control form-btn w-50"
                          style={{ background: '#005291', color: 'white' }}
                          onClick={Register}
                        >
                          Register
                        </Button>
                      </div>
                    </div>
                  </Form>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  )
}

export default React.memo(Login)
