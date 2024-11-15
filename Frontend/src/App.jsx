import './App.css'
import '@fontsource/roboto/400.css';
import ContactForm from './components/contactForm'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom'
import ContactTable from './pages/ViewTable';
import axios from 'axios';
import UpdateContact from './components/UpdateContact';

function App() {
  const [contacts, setContacts] = useState([])
  const [edit, setEdit] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const fetchContactData = () => {
    axios.get("http://localhost:3000/contacts")
      .then((response) => setContacts(response.data))
      .catch((error) => console.error('Error fetching contacts:', error))
  }

  useEffect(() => {
    fetchContactData()
  }, [])

  const addContact = (contact) => {
    axios.post("http://localhost:3000/addContact", contact)
      .then((response) => {
        const newContact = {...response.data, id: response.data._id}
        setContacts((prevContacts) => [...prevContacts, newContact])
      })
      .catch((error) => console.error("Error while adding contacts:", error))
  }

  const deleteContact = (id) => {
    axios.delete(`http://localhost:3000/contact/${id}`)
      .then(() => setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id)))
      .catch((error) => console.error("Error while deleting contacts:", error))
  }

  const handleEdit = (contact) => {
    console.log('Editing contact:', contact)
    setEdit(contact)
    setModalOpen(true)
  }

  const editContact = (editedContact) => {
    axios.put(`http://localhost:3000/contact/${editedContact.id}`, editedContact)
      .then(() => {
        fetchContactData()
      })
      .catch((error) => console.error("Error while editing contacts:", error))
  }

  return (
    <>
      <Router>
        <nav style={{ padding: 20, display: 'flex', justifyContent: 'space-around', width: "20vw", outline: 'none' }}>
          <Link style={{ textDecoration: 'none', color: 'black', fontFamily: 'Roboto' }} to="/">Add Contact</Link>
          <Link style={{ textDecoration: 'none', color: 'black', fontFamily: 'Roboto' }} to="/viewContacts">View Contacts</Link>
        </nav>
        <Routes>
          <Route path='/' element={<ContactForm onSubmit={addContact} />} />
          <Route path='/viewContacts' element={<ContactTable contacts={contacts} onDelete={deleteContact} onEdit={handleEdit} />} />
        </Routes>
        {edit && (
          <UpdateContact 
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          contact={edit}
          onUpdate={editContact}
          />
        )}
      </Router>
    </>
  )
}

export default App
