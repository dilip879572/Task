import React, { useState } from 'react'
import { putFetchData } from 'src/Api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'src/components/loader/Loader'
import Form from 'react-bootstrap/Form'

import PropTypes from 'prop-types'
const EditModal = ({ setEdit, getDetails }) => {
  let modalStyle = {
    display: 'block',
    backgroundColor: 'rgba(0,0,0,0.7)',
    maxHeight: '100%',
    color: 'black',
  }
  EditModal.propTypes = {
    setEdit: PropTypes.func.isRequired,
    getDetails: PropTypes.func.isRequired,
  }

  const apiUrl = process.env.REACT_APP_API_URL
  let res = localStorage.getItem('editNote')
  let response = JSON.parse(res)

  const [data, setData] = useState({
    title: response?.title,
    description: response?.description,
  })

  const [validated, setValidated] = useState(false)
  const [loadValue, setLoadVale] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const close = () => {
    setEdit(false)
  }

  const dataa = { ...data }
  console.log('response?._id', response?._id)
  const handleSubmit = async (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    setValidated(true)
    try {
      setLoadVale(true)
      const res = await putFetchData(`${apiUrl}/notes/get_notes/${response?._id}`, dataa)
      console.log('first', res)
      if (res?.data?.success === true) {
        setLoadVale(false)
        toast.success('Note Update Sccessfully')
        close()
        getDetails()
      } else {
        toast.error('Something Error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  setTimeout(() => {
    setLoadVale(false)
  }, 5000)
  return (
    <div className="modal modal-form edit-modal-form" tabIndex={-1} style={modalStyle}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Kunden Aktualisieren</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={close}
            />
          </div>
          <div className="modal-body">
            <Form noValidate validated={validated}>
              <div className="row">
                <div className="col-sm-6">
                  <input
                    type="text"
                    placeholder="Title"
                    className="form-control"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    required={true}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    placeholder="Description"
                    className="form-control"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Form>
          </div>

          <div className="modal-footer">
            <div className="btn-wrap">
              <button
                type="button"
                className="btn btn-cancel"
                data-bs-dismiss="modal"
                onClick={close}
              >
                Cancel
              </button>

              <button type="button" className="btn  btn-save ms-3" onClick={handleSubmit}>
                {loadValue ? <Loader /> : <div> Update</div>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default EditModal
