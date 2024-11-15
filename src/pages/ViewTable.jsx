import React, { useEffect } from 'react'
import DataTable from '../components/ContactTable'

const ContactTable = ({contacts, onDelete, onEdit}) => {
  return (
    <div>
      <DataTable rows={contacts} onDelete={onDelete} onEdit={onEdit} />
    </div>
  )
}

export default ContactTable
