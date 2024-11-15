import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material'

const columns = [
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        width: 150
    },
    { field: 'company', headerName: 'Company', width: 150 },
    { field: 'jobTitle', headerName: 'Job Title', width: 150 },
    {
        field: 'actions', headerName: 'Actions', width: 150,
        renderCell: (params) => (
            <>
                <IconButton onClick={(event) => {
                    event.stopPropagation();
                    if (window.confirm("Really want to delete?")) {
                        params.row.onDelete(params.id);
                    }
                }}
                >
                    <Delete />
                </IconButton>
                <IconButton onClick={(event) => {
                    event.stopPropagation();
                    params.row.onEdit(params.row);
                }}
                >
                    <Edit />
                </IconButton>
            </>
        )
    },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ rows, onDelete, onEdit }) {
    const updatedRows = rows.map((row) => ({
        ...row,
        id: row.id || row._id,
        onDelete: () => onDelete(row.id),
        onEdit: () => onEdit(row),
    }))

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={updatedRows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
                getRowId={(row) => row.id}
            />
        </Paper>
    );
}