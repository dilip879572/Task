import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user_type, setUser_Type] = useState('')
  const apiUrl = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const notify = (dataa) => toast(dataa)

  const addUser = async () => {
    if (!password || !email) {
      return notify('Please Fill All Details')
    }

    try {
      let response = await fetch(`${apiUrl}/user/register`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, email }),
      })
      let result = await response.json()
      window.localStorage.setItem('student', JSON.stringify(result))
      navigate('/login')
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again later.')
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={addUser}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  )
}

export default React.memo(Register)
// import React, { useState } from 'react'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser } from '@coreui/icons'
// import { useNavigate } from 'react-router-dom'

// const Register = () => {
//   const [username, setUsername] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [role, setRole] = useState('')
//   const apiUrl = process.env.REACT_APP_API_URL
//   const navigate = useNavigate()

//   const addUser = async () => {
//     if (!username || !password || !email || !role) {
//       return
//     }

//     try {
//       let response = await fetch(`${apiUrl}/user/register`, {
//         method: 'post',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password, email, role }),
//       })
//       let result = await response.json()
//       window.localStorage.setItem('student', JSON.stringify(result))
//       navigate('/login')
//     } catch (error) {
//       console.error('Error:', error)
//       alert('An error occurred. Please try again later.')
//     }
//   }
//   return (
//     <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={9} lg={7} xl={6}>
//             <CCard className="mx-4">
//               <CCardBody className="p-4">
//                 <CForm>
//                   <h1>Register</h1>
//                   <p className="text-medium-emphasis">Create your account</p>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilUser} />
//                     </CInputGroupText>
//                     <CFormInput
//                       placeholder="Username"
//                       value={username}
//                       onChange={(e) => {
//                         setUsername(e.target.value)
//                       }}
//                       autoComplete="username"
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>@</CInputGroupText>
//                     <CFormInput
//                       placeholder="Email"
//                       value={email}
//                       onChange={(e) => {
//                         setEmail(e.target.value)
//                       }}
//                       autoComplete="email"
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       value={password}
//                       onChange={(e) => {
//                         setPassword(e.target.value)
//                       }}
//                       type="password"
//                       placeholder="Password"
//                       autoComplete="new-password"
//                     />
//                   </CInputGroup>
//                   <CInputGroup className="mb-4">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <select
//                       className="form-control"
//                       value={role}
//                       onChange={(e) => {
//                         setRole(e.target.value)
//                       }}
//                     >
//                       <option>--select--</option>
//                       <option value="customer">Customer</option>
//                       <option value="empolyee">Empolyee</option>
//                     </select>
//                   </CInputGroup>
//                   <div className="d-grid">
//                     <CButton color="success" onClick={addUser}>
//                       Create Account
//                     </CButton>
//                   </div>
//                 </CForm>
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }

// export default Register

// // import React, { useState } from 'react'
// // import Button from 'react-bootstrap/Button'
// // import Col from 'react-bootstrap/Col'
// // import Form from 'react-bootstrap/Form'
// // import InputGroup from 'react-bootstrap/InputGroup'
// // import Row from 'react-bootstrap/Row'

// // function Register() {
// //   const [validated, setValidated] = useState(false)

// //   const handleSubmit = (event) => {
// //     const form = event.currentTarget
// //     if (form.checkValidity() === false) {
// //       event.preventDefault()
// //       event.stopPropagation()
// //     }

// //     setValidated(true)
// //   }

// //   return (
// //     <Form noValidate validated={validated} onSubmit={handleSubmit}>
// //       <Row className="mb-3">
// //         <Form.Group as={Col} md="4" controlId="validationCustom01">
// //           <Form.Label>First name</Form.Label>
// //           <Form.Control required type="text" placeholder="First name" defaultValue="Mark" />
// //         </Form.Group>
// //         <Form.Group as={Col} md="4" controlId="validationCustom02">
// //           <Form.Label>Last name</Form.Label>
// //           <Form.Control required type="text" placeholder="Last name" defaultValue="Otto" />
// //         </Form.Group>
// //         <Form.Group as={Col} md="4" controlId="validationCustomUsername">
// //           <Form.Label>Username</Form.Label>
// //           <InputGroup hasValidation>
// //             <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
// //             <Form.Control
// //               type="text"
// //               placeholder="Username"
// //               aria-describedby="inputGroupPrepend"
// //               required
// //             />
// //           </InputGroup>
// //         </Form.Group>
// //       </Row>
// //       {/* <Row className="mb-3">
// //         <Form.Group as={Col} md="6" controlId="validationCustom03">
// //           <Form.Label>City</Form.Label>
// //           <Form.Control type="text" placeholder="City" required />
// //         </Form.Group>
// //         <Form.Group as={Col} md="3" controlId="validationCustom04">
// //           <Form.Label>State</Form.Label>
// //           <Form.Control type="text" placeholder="State" required />
// //         </Form.Group>
// //         <Form.Group as={Col} md="3" controlId="validationCustom05">
// //           <Form.Label>Zip</Form.Label>
// //           <Form.Control type="password" placeholder="Zip" required />
// //         </Form.Group>
// //       </Row> */}
// //       {/* <Form.Group className="mb-3">
// //         <Form.Check required label="Agree to terms and conditions" feedbackType="invalid" />
// //       </Form.Group> */}
// //       <Button type="submit">Submit form</Button>
// //     </Form>
// //   )
// // }

// // export default Register
