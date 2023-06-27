
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField, Button, Drawer, IconButton, Checkbox, FormControlLabel } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'

const ProjektForm = ({ onProjektAdded }) => {
	const [nazwa, setNazwa] = useState('')
	const [opis, setOpis] = useState('')
	const [loading, setLoading] = useState(false)
	const [drawerOpen, setDrawerOpen] = useState(false)
	const [studenci, setStudenci] = useState([])
	const token = localStorage.getItem('token')
	const userJson = localStorage.getItem('user')
	const user = JSON.parse(userJson)

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await axios.get('http://localhost:8080/api/studenci', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				setStudenci(
					response.data.content
						.filter((student) => student.role === 'USER')
						.map((student) => ({ ...student, selected: false }))
				)
			} catch (error) {
				console.error('Błąd podczas pobierania studentów', error)
			}
		}
		fetchStudents()
	}, [])

	const handleSubmit = async (event) => {
		event.preventDefault()
		setLoading(true)

		try {
			const selectedStudenci = studenci.filter((student) => student.selected).map((student) => student.studentId)
			const response = await axios.post(
				'http://localhost:8080/api/projekty',
				{
					nazwa,
					opis,
					studentIds: selectedStudenci,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
			if (onProjektAdded) {
				onProjektAdded()
			}
			setDrawerOpen(false) // Zamyka szufladę po udanym utworzeniu projektu
		} catch (error) {
			console.error('Błąd podczas tworzenia projektu', error)
		} finally {
			setLoading(false)
		}
	}

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}

	const handleStudentCheckboxChange = (index) => {
		const newStudenci = [...studenci]
		newStudenci[index].selected = !newStudenci[index].selected
		setStudenci(newStudenci)
	}

	return (
		<>
			<IconButton color='primary' onClick={toggleDrawer}>
				<AddIcon />
			</IconButton>

			<Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer}>
				<form onSubmit={handleSubmit} style={{ width: '300px', padding: '16px' }}>
					<h1>Dodaj projekt</h1>

					<TextField
						label='Nazwa'
						variant='outlined'
						value={nazwa}
						onChange={(e) => setNazwa(e.target.value)}
						required
						fullWidth
						margin='normal'
					/>
					<TextField
						label='Opis'
						variant='outlined'
						value={opis}
						onChange={(e) => setOpis(e.target.value)}
						multiline
						rows={4}
						fullWidth
						margin='normal'
					/>
					<h2>Studenci</h2>
					{studenci.map((student, index) => (
						<FormControlLabel
							key={student.studentId}
							control={<Checkbox checked={student.selected} onChange={() => handleStudentCheckboxChange(index)} />}
							label={`${student.imie} ${student.nazwisko}`}
						/>
					))}
					<Button type='submit' variant='contained' color='primary' disabled={loading} fullWidth margin='normal'>
						Utwórz projekt
					</Button>
				</form>
			</Drawer>
		</>
	)
}

export default ProjektForm
