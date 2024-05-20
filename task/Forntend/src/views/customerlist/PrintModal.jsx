import React, { useEffect, useRef, useState } from 'react'
import { putFetchData } from 'src/Api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from 'src/components/loader/Loader'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

const PrintModal = ({ setPrint, getDetails }) => {
  let modalStyle = {
    display: 'block',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // maxHeight: '100%',
    color: 'black',
  }
  PrintModal.propTypes = {
    setPrint: PropTypes.func.isRequired,
    getDetails: PropTypes.func.isRequired,
  }

  const apiUrl = process.env.REACT_APP_API_URL
  let res = localStorage.getItem('create-note')
  let response = JSON.parse(res)

  console.log('sds', response)
  const close = () => {
    setPrint(false)
  }

  return (
    <div id="body" className="modal modal-form edit-modal-form" tabIndex={-1} style={modalStyle}>
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Note Here</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={close}
            />
          </div>

          <div className="p-2">
            <>
              <p>Title : {response.title}</p>
              <p>Description : {response.description}</p>
            </>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default PrintModal
