import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'

const ContactForm = ({onSubmit}) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setContact(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(contact)
    console.log('Form submitted:', contact)
    setContact({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      company: '',
      jobTitle: '',
    })
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="firstName"
          value={contact.firstName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="lastName"
          value={contact.lastName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={contact.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phoneNumber"
          value={contact.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Company"
          name="company"
          value={contact.company}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Job Title"
          name="jobTitle"
          value={contact.jobTitle}
          onChange={handleChange}
        />
        <Button type='submit' variant='contained'>
          Add
        </Button>
      </Box>
    </div>
  )
}

export default ContactForm
