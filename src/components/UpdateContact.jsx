import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'

const UpdateContact = ({ contact, open, onClose, onUpdate }) => {
    const [updateContact, setUpdateContact] = useState(contact)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUpdateContact(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdate(updateContact)
        onClose()
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Edit Contact</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="First Name"
                            name="firstName"
                            value={updateContact.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Last Name"
                            name="lastName"
                            value={updateContact.lastName}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            name="email"
                            type="email"
                            value={updateContact.email}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Phone Number"
                            name="phoneNumber"
                            value={updateContact.phoneNumber}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Company"
                            name="company"
                            value={updateContact.company}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Job Title"
                            name="jobTitle"
                            value={updateContact.jobTitle}
                            onChange={handleChange}
                        />
                        <Button type='submit' variant='contained'>
                            Edit
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateContact
