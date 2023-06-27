import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import StudentSelect from './StudentSelect'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { Checkbox, FormControlLabel, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const EditProjektForm = ({ projectId }) => {
	const [nazwa, setNazwa] = useState('')
	const [opis, setOpis] = useState('')
	const [studenci, setStudenci] = useState([])
	const [isOpen, setIsOpen] = useState(false)
	const { id } = useParams()

	useEffect(() => {
		const fetchProjekt = async () => {
			const token = localStorage.getItem('token')
			try {
				const response = await axios.get(`http://localhost:8080/api/projekty/${projectId}`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				setNazwa(response.data.nazwa)
				setOpis(response.data.opis)
				// Przygotuj studentów z domyślnym polem 'selected' ustawionym na false
				const studenciData = response.data.studenci.map((student) => ({ ...student, selected: false }))
				setStudenci(studenciData)
			} catch (error) {
				console.error('Error fetching projekt:', error)
			}
		}

		fetchProjekt()
	}, [id, projectId])

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {
			const selectedStudenci = studenci.filter((student) => student.selected).map((student) => student.studentId)

			const token = localStorage.getItem('token')
			await axios.put(`http://localhost:8080/api/projekty/${projectId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				nazwa: nazwa,
				opis: opis,
				studentIds: selectedStudenci,
			})

			setIsOpen(false)
		} catch (error) {
			console.error('Error updating projekt:', error)
		}
	}
	const handleCheckboxChange = (index, checked) => {
		setStudenci((prevStudenci) => {
			const newStudenci = [...prevStudenci]
			newStudenci[index] = { ...newStudenci[index], selected: checked }
			return newStudenci
		})
	}
	return (
		<div>
			<IconButton onClick={() => setIsOpen(true)}>
				<EditIcon />
			</IconButton>
			<Drawer anchor='right' open={isOpen} onClose={() => setIsOpen(false)}>
				<form onSubmit={handleSubmit} style={{ margin: '1em', width: '300px' }}>
					<h1>{projectId}</h1>
					<TextField
						label='Nazwa'
						type='text'
						value={nazwa}
						onChange={(e) => setNazwa(e.target.value)}
						required
						fullWidth
						margin='normal'
					/>

					<TextField
						label='Opis'
						value={opis}
						onChange={(e) => setOpis(e.target.value)}
						required
						fullWidth
						margin='normal'
					/>

					<label>Studenci:</label>
					{studenci &&
						studenci.map((student, index) => (
							<FormControlLabel
								key={student.studentId}
								control={
									<Checkbox
										checked={student.selected}
										onChange={(event) => handleCheckboxChange(index, event.target.checked)}
									/>
								}
								label={`${student.imie} ${student.nazwisko}`}
							/>
						))}
					<Button type='submit' variant='contained' color='primary' fullWidth margin='normal'>
						Aktualizuj
					</Button>
				</form>
			</Drawer>
		</div>
	)
}

export default EditProjektForm
