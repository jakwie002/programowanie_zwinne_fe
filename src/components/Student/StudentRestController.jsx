import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/system'
import Navbar from '../Navbar/Navbar'
import UpdateStudent from './UpdateStudent'
import { Button } from '@mui/material'

const StudentList = () => {
	const [students, setStudents] = useState([])
	const token = localStorage.getItem('token')

	useEffect(() => {
		// axios.get('/api/studenci')
		//   .then(response => {
		//     setStudents(response.data.content);
		//   })
		//   .catch(error => console.error(`Error: ${error}`));
		const fetchProjekty = async () => {
			const response = await axios.get('http://localhost:8080/api/studenci', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			setStudents(response.data.content)
			if (response.data.content) {
				const transformedData = response.data.content.map((student) => ({
					id: student.studentId,
					imie: student.imie,
					nazwisko: student.nazwisko,
					nrIndeksu: student.nrIndeksu,
					email: student.email,
					stacjonarny: student.stacjonarny,
					role: student.role,
				}))
				setStudents(transformedData)
			}
		}

		fetchProjekty()
	}, [token])
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [currentStudentId, setCurrentStudentId] = useState(null)
	const [strid, setId] = useState('')

	const handleDrawerClose = () => {
		setDrawerOpen(false)
	}

	const handleDrawerOpen = (id) => {
		setCurrentStudentId(id)
		setDrawerOpen(true)
	}
	const columns = [
		{ field: 'studentId', headerName: 'ID', flex: 0.5 },
		{ field: 'imie', headerName: 'Imię', flex: 1 },
		{ field: 'nazwisko', headerName: 'Nazwisko', flex: 1 },
		{ field: 'nrIndeksu', headerName: 'Nr indeksu', flex: 1 },
		{ field: 'email', headerName: 'Email', flex: 1 },
		{
			field: 'stacjonarny',
			headerName: 'Stacjonarny',
			flex: 1,
			valueGetter: (params) => (params.row.stacjonarny ? 'Tak' : 'Nie'),
		},
		{
			field: 'edit',
			headerName: 'Edycja',
			sortable: false,
			width: 100,
			renderCell: (params) => {
				const id = params.row.id
				setId(id)
				return <Button onClick={() => handleDrawerOpen(id)}>Edytuj</Button>
			},
		},
		// { field: 'projekty', headerName: 'Projekty', flex: 1 }, // Jeśli chcesz wyświetlić projekty, będziesz musiał zdecydować, jak je sformatować.
		// { field: 'role', headerName: 'Role', flex: 1 }, // Jeśli pole `role` jest dostępne w odpowiedzi API.
	]

	return (
		<>
			<Navbar />
			<UpdateStudent studentId={strid} open={drawerOpen} onClose={handleDrawerClose} />
			<Box style={{ height: 400, width: '100%' }}>
				<DataGrid rows={students} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
			</Box>
		</>
	)
}

export default StudentList
