// import React, { useEffect, useState } from 'react'
// import { DataGrid } from '@mui/x-data-grid'
// import axios from 'axios'
// import { Button } from '@mui/material'
// import Navbar from '../Navbar/Navbar'

// const StudentRestController = () => {
// 	const [students, setStudents] = useState([])
// 	const [loading, setLoading] = useState(true)

// 	useEffect(() => {
// 		const fetchStudents = async () => {
// 			try {
// 				const token = localStorage.getItem('token')
// 				const response = await axios.get('http://localhost:8080/api/studenci', {
// 					headers: {
// 						'Content-Type': 'application/json',
// 						Authorization: `Bearer ${token}`,
// 					},
// 				})
// 				if (response.data.content) {
// 					const transformedData = response.data.content.map(zadanie => ({
// 						id: zadanie.studentId,
// 						imie: zadanie.imie,
// 						nazwisko: zadanie.nazwisko,
// 						nrIndeksu: zadanie.nrIndeksu,
// 						email: zadanie.email,
// 						stacjonarny: zadanie.stacjonarny,
// 						role: zadanie.role,
// 					}))
// 					setStudents(transformedData)
// 				}
// 				console.log(response.data)
// 				// const students = response.data.content
// 				// setStudents(students)
// 				setLoading(false)
// 			} catch (error) {
// 				console.error('Błąd podczas pobierania studentów:', error)
// 				setLoading(false)
// 			}
// 		}

// 		fetchStudents()
// 	}, [])

// 	const createStudent = async () => {
// 		try {
// 			const token = localStorage.getItem('token')
// 			const response = await axios.post('http://localhost:8080/api/studenci', {
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Authorization: `Bearer ${token}`,
// 				},
// 			})
// 			const createdStudent = response.data
// 			setStudents([...students, createdStudent])
// 		} catch (error) {
// 			console.error('Błąd podczas tworzenia studenta:', error)
// 		}
// 	}

// 	const updateStudent = async studentId => {
// 		try {
// 			const token = localStorage.getItem('token')
// 			await axios.put(
// 				`http://localhost:8080/api/studenci/${studentId}`,
// 				{
// 					imie: 'Nowe imię',
// 					nazwisko: 'Nowe nazwisko',
// 					email: 'nowy.email@example.com',
// 				},
// 				{
// 					headers: {
// 						'Content-Type': 'application/json',
// 						Authorization: `Bearer ${token}`,
// 					},
// 				}
// 			)
// 			const updatedStudents = students.map(student =>
// 				student.studentId === studentId
// 					? { ...student, imie: 'Nowe imię', nazwisko: 'Nowe nazwisko', email: 'nowy.email@example.com' }
// 					: student
// 			)
// 			setStudents(updatedStudents)
// 		} catch (error) {
// 			console.error('Błąd podczas aktualizacji studenta:', error)
// 		}
// 	}

// 	const deleteStudent = async studentId => {
// 		try {
// 			const token = localStorage.getItem('token')
// 			await axios.delete(`http://localhost:8080/api/studenci/${studentId}`, {
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Authorization: `Bearer ${token}`,
// 				},
// 			})
// 			const updatedStudents = students.filter(student => student.studentId !== studentId)
// 			setStudents(updatedStudents)
// 		} catch (error) {
// 			console.error('Błąd podczas usuwania studenta:', error)
// 		}
// 	}

// 	const columns = [
// 		{ field: 'id', headerName: 'ID', width: 70 },
// 		{ field: 'imie', headerName: 'Imie', width: 130 },
// 		{ field: 'nazwisko', headerName: 'Nazwisko', width: 130 },
// 		{ field: 'nrIndeksu', headerName: 'nrIndeksu', width: 250 },
// 		{ field: 'email', headerName: 'email', width: 200 },
// 		{ field: 'stacjonarny', headerName: 'stacjonarny', width: 200 },

// 		{ field: 'role', headerName: 'role', width: 130 },
// 		{
// 			field: 'actions',
// 			headerName: 'Akcje',
// 			flex: 1,
// 			sortable: false,
// 			renderCell: params => {
// 				const studentId = params.row.studentId
// 				return (
// 					<div>
// 						<Button variant="contained" color="primary" onClick={() => updateStudent(studentId)}>
// 							Aktualizuj
// 						</Button>
// 						<Button variant="contained" color="secondary" onClick={() => deleteStudent(studentId)}>
// 							Usuń
// 						</Button>
// 					</div>
// 				)
// 			},
// 		},
// 	]

// 	return (
// 		<>
// 			<Navbar />
// 			<Button variant="contained" color="primary" onClick={createStudent}>
// 				Dodaj studenta
// 			</Button>
// 			<DataGrid rows={students} columns={columns} pageSize={5} rowsPerPageOptions={[5]} pagination autoHeight />
// 		</>
// 	)
// }

// export default StudentRestController
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { Button, TextField, Box, Paper } from '@mui/material'
import Navbar from '../Navbar/Navbar'

const StudentRestController = () => {
	const [students, setStudents] = useState([])
	const [loading, setLoading] = useState(true)
	const [showUpdateForm, setShowUpdateForm] = useState(false)
	const [updateData, setUpdateData] = useState({
		studentId: '',
		imie: '',
		nazwisko: '',
		nrIndeksu: '',
		email: '',
		stacjonarny: '',
		role: '',
	})

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const token = localStorage.getItem('token')
				const response = await axios.get('http://localhost:8080/api/studenci', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				if (response.data.content) {
					const transformedData = response.data.content.map(student => ({
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
				console.log(response.data)
				setLoading(false)
			} catch (error) {
				console.error('Błąd podczas pobierania studentów:', error)
				setLoading(false)
			}
		}

		fetchStudents()
	}, [])

	const createStudent = async () => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.post(
				'http://localhost:8080/api/studenci',
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const createdStudent = response.data
			setStudents([...students, createdStudent])
		} catch (error) {
			console.error('Błąd podczas tworzenia studenta:', error)
		}
	}

	const updateStudent = async () => {
		try {
			const token = localStorage.getItem('token')
			await axios.put(
				`http://localhost:8080/api/studenci/${updateData.studentId}`,
				{
					imie: updateData.imie,
					nazwisko: updateData.nazwisko,
					email: updateData.email,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const updatedStudents = students.map(student =>
				student.id === updateData.studentId
					? { ...student, imie: updateData.imie, nazwisko: updateData.nazwisko, email: updateData.email }
					: student
			)
			setStudents(updatedStudents)
			setShowUpdateForm(false)
			setUpdateData({
				studentId: '',
				imie: '',
				nazwisko: '',
				nrIndeksu: '',
				email: '',
				stacjonarny: '',
				role: '',
			})
		} catch (error) {
			console.error('Błąd podczas aktualizacji studenta:', error)
		}
	}

	const deleteStudent = async studentId => {
		try {
			const token = localStorage.getItem('token')
			await axios.delete(`http://localhost:8080/api/studenci/${studentId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			const updatedStudents = students.filter(student => student.id !== studentId)
			setStudents(updatedStudents)
		} catch (error) {
			console.error('Błąd podczas usuwania studenta:', error)
		}
	}

	const handleUpdateFormOpen = student => {
		setShowUpdateForm(true)
		setUpdateData({
			studentId: student.id,
			imie: student.imie,
			nazwisko: student.nazwisko,
			nrIndeksu: student.nrIndeksu,
			email: student.email,
			stacjonarny: student.stacjonarny,
			role: student.role,
		})
	}

	const handleUpdateFormClose = () => {
		setShowUpdateForm(false)
		setUpdateData({
			studentId: '',
			imie: '',
			nazwisko: '',
			nrIndeksu: '',
			email: '',
			stacjonarny: '',
			role: '',
		})
	}

	const handleUpdateDataChange = e => {
		setUpdateData({ ...updateData, [e.target.name]: e.target.value })
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'imie', headerName: 'Imie', width: 130 },
		{ field: 'nazwisko', headerName: 'Nazwisko', width: 130 },
		{ field: 'nrIndeksu', headerName: 'nrIndeksu', width: 250 },
		{ field: 'email', headerName: 'email', width: 200 },
		{ field: 'stacjonarny', headerName: 'stacjonarny', width: 200 },
		{ field: 'role', headerName: 'role', width: 130 },
		{
			field: 'actions',
			headerName: 'Akcje',
			flex: 1,
			sortable: false,
			renderCell: params => {
				const student = params.row
				return (
					<div>
						<Button variant="contained" color="primary" onClick={() => handleUpdateFormOpen(student)}>
							Aktualizuj
						</Button>
						<Button variant="contained" color="secondary" onClick={() => deleteStudent(student.id)}>
							Usuń
						</Button>
					</div>
				)
			},
		},
	]

	return (
		<>
			<Navbar />
			<Button variant="contained" color="primary" onClick={createStudent}>
				Dodaj studenta
			</Button>
			<DataGrid rows={students} columns={columns} pageSize={5} rowsPerPageOptions={[5]} pagination autoHeight />
			{showUpdateForm && (
				<Paper
					elevation={3}
					style={{ position: 'fixed', top: '50%', right: '50%', transform: 'translate(50%, -50%)', padding: '20px' }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
						<TextField name="imie" label="Imię" value={updateData.imie} onChange={handleUpdateDataChange} />
						<TextField name="nazwisko" label="Nazwisko" value={updateData.nazwisko} onChange={handleUpdateDataChange} />
						<TextField name="email" label="Email" value={updateData.email} onChange={handleUpdateDataChange} />
						<Button variant="contained" color="primary" onClick={updateStudent}>
							Aktualizuj
						</Button>
						<Button variant="contained" onClick={handleUpdateFormClose}>
							Anuluj
						</Button>
					</Box>
				</Paper>
			)}
		</>
	)
}

export default StudentRestController
