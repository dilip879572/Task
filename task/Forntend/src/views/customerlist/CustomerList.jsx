import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import PaginationItem from '@mui/material/PaginationItem'
import { MdLocalPrintshop } from 'react-icons/md'
import { Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditModal from './EditModal'
import Form from 'react-bootstrap/Form'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { verifyDelPer, verifyEditPer } from 'src/components/verifyPermission'
import PrintModal from './PrintModal'
import 'react-datepicker/dist/react-datepicker.css'

const CustomerList = () => {
  const apiUrl = process.env.REACT_APP_API_URL
  const [note, setNote] = useState([])
  const [printRecord, setPrintRecord] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)
  const [page, setPage] = useState(1)
  const [countPage, setCountPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState('')
  const navigate = useNavigate()

  const handlePageChange = (event, value) => {
    setPage(value)
  }
  const handleClose = () => {
    resetForm()
    setShow(false)
  }
  const handleShow = () => setShow(true)
  const [selectedRecordId, setSelectedRecordId] = useState(null)

  const [print, setPrint] = useState(false)
  const [edit, setEdit] = useState(false)

  const columns = [
    {
      title: 'TITLE',
      dataIndex: 'title',
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      render: (text, record, index) => text,
    },
    {
      title: 'AKTION',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <>
            <button
              style={{ background: 'none', border: 'none' }}
              onClick={() => editRecord(record)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_476_24741)">
                  <path
                    d="M4 20.0003H8L18.5 9.5003C19.0304 8.96987 19.3284 8.25045 19.3284 7.5003C19.3284 6.75016 19.0304 6.03074 18.5 5.5003C17.9696 4.96987 17.2501 4.67188 16.5 4.67188C15.7499 4.67187 15.0304 4.96987 14.5 5.5003L4 16.0003V20.0003Z"
                    stroke="#005291"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5 6.5L17.5 10.5"
                    stroke="#005291"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_476_24741">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>Edit</span>
            </button>
          </>

          <button
            style={{ background: 'none', border: 'none' }}
            onClick={() => handleIconClick(record._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clipPath="url(#clip0_431_1048)">
                <path
                  d="M5 8H19"
                  stroke="#C20F0F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 11V16"
                  stroke="#C20F0F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 11V16"
                  stroke="#C20F0F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 8L6.85714 18.2857C6.85714 18.7404 7.03775 19.1764 7.35925 19.4979C7.68074 19.8194 8.11677 20 8.57143 20H15.4286C15.8832 20 16.3193 19.8194 16.6408 19.4979C16.9622 19.1764 17.1429 18.7404 17.1429 18.2857L18 8"
                  stroke="#C20F0F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8V5C9 4.73478 9.10536 4.48043 9.29289 4.29289C9.48043 4.10536 9.73478 4 10 4H14C14.2652 4 14.5196 4.10536 14.7071 4.29289C14.8946 4.48043 15 4.73478 15 5V8"
                  stroke="#C20F0F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_431_1048">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span> delete</span>
          </button>

          <button
            style={{ background: 'none', border: 'none' }}
            onClick={() => handlePrint(record)}
          >
            {' '}
            <MdLocalPrintshop className="fs-5" style={{ color: '#615e55' }} />
            &nbsp;Show
          </button>
        </>
      ),
      // hidden: 'true',
    },
  ]

  const editRecord = (record) => {
    let res = JSON.stringify(record)
    localStorage.setItem('editNote', res)
    setEdit(true)
  }

  const handleIconClick = (record) => {
    setSelectedRecordId(record)
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    resetForm()
    setIsModalVisible(false)
  }
  const handleDeleteConfirm = async () => {
    if (selectedRecordId) {
      try {
        const response = await fetch(`${apiUrl}/notes/get_notes/${selectedRecordId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          getDetails()
          toast.success('Note deleted was successfully')
        } else {
          const errorData = await response.json()
        }
      } catch (error) {
        toast.error('somthing error to delete note')
      }
      setIsModalVisible(false)
    }
  }

  const saveData = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
    let data = {
      title,
      description,
    }

    if (!title || !description) {
      return toast.warning('Both filed is requeed')
    }

    try {
      const response = await fetch(`${apiUrl}/notes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      console.log('result', result)
      if (response.status === 201) {
        toast.success('New note create successfully')
        resetForm()
        handleClose()
        getDetails()
      }
    } catch (error) {
      console.error('error', error)
    }
  }
  function resetForm() {
    setTitle('')
    setDescription('')
    setValidated(false)
  }

  const getDetails = async () => {
    try {
      const result = await fetch(`http://localhost:3134/notes/get_notes/`)
      const data = await result.json()
      const activeRecords = data?.notes?.filter((record) => record.status === 'active')
      setNote(activeRecords)
    } catch (error) {
      console.error('Error fetching customer record:', error)
    }
  }
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10))
    setPage(1)
  }

  const [hide, setHide] = useState(false)

  const customerItems = []

  printRecord?.map((item) => {
    if (item?.designation === 'customer') {
      customerItems?.push(item)
    }
    return null
  })

  const handlePrint = (record) => {
    let res = JSON.stringify(record)
    localStorage.setItem('create-note', res)
    setPrint(true)
  }

  useEffect(() => {
    getDetails()
  }, [page, itemsPerPage])

  return (
    <>
      <div>
        {hide ? <EditModal setHide={setHide} getDetails={getDetails} /> : ''}
        {print ? <PrintModal setPrint={setPrint} getDetails={getDetails} /> : ''}
        {edit ? <EditModal setEdit={setEdit} getDetails={getDetails} /> : ''}
        <div className="page-title">
          <h2>All Notes Here</h2>
        </div>
        <div className="search-filter-row">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-end">
                <div className="d-flex align-items-center justify-content-between justify-content-md-end text-md-end flex-md-row flex-column">
                  <button className="primary-btn" onClick={handleShow}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_437_8819)">
                        <path
                          d="M12 5V19"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 12H19"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_437_8819">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>Create New Note</span>
                  </button>
                </div>
              </div>
            </div>
            <Modal show={show} onHide={handleClose} className="modal-form">
              <Modal.Header>
                <Modal.Title>Create New Note</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form noValidate validated={validated}>
                  <div className="row">
                    <div className="col-sm-6">
                      <input
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value)
                        }}
                        type="text"
                        placeholder="Titel"
                        className="form-control"
                        required={true}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value)
                        }}
                        type="text"
                        placeholder="Description"
                        className="form-control"
                        required={true}
                      />
                    </div>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <div className="btn-wrapper d-flex w-100 m-0 justify-content-end">
                  <button className="btn btn-cancel" onClick={handleClose}>
                    {' '}
                    Cancel
                  </button>
                  <button className="btn btn-save ms-3" onClick={saveData}>
                    Create
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <Table rowKey="_id" responsive columns={columns} dataSource={note} pagination={false} />

        <div className="container-fluid pagination-row">
          <div className="row">
            <div className="col-md-10 ps-md-0 text-center text-md-start">
              <Stack spacing={2}>
                <Pagination
                  count={countPage}
                  variant="outlined"
                  shape="rounded"
                  page={page}
                  onChange={handlePageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      {...item}
                      text={
                        item.type === 'previous'
                          ? 'Previous'
                          : item.type === 'next'
                          ? 'Next'
                          : item.page
                      }
                    />
                  )}
                />
              </Stack>
            </div>
            <div className="col-md-2 pe-md-0 mt-3 mt-md-0 text-md-end">
              <select
                className="form-control form-select"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={10}>10 pro Seite</option>
                <option value={20}>20 pro Seite</option>
                <option value={50}>50 pro Seite</option>
                <option value={100}>100 pro Seite</option>
              </select>
            </div>
          </div>
        </div>

        <Modal
          show={isModalVisible}
          onHide={handleModalClose}
          centered
          className="modal-delete custom-modal"
        >
          <p>Are you sure to delete note</p>
          <div className="text-center">
            <button className="btn modal-btn delete-btn me-3" onClick={handleDeleteConfirm}>
              Delete
            </button>
            <button className="btn modal-btn close-btn" onClick={handleModalClose}>
              Cancel
            </button>
          </div>
        </Modal>
      </div>
      <ToastContainer />
    </>
  )
}

export default React.memo(CustomerList)
