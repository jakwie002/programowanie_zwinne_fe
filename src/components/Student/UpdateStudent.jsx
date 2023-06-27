import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField, Container, Typography, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material'
import { Drawer } from '@mui/material'

const UpdateStudent = ({ studentId, open, onClose }) => {
	const [student, setStudent] = useState({
		imie: '',
		nazwisko: '',
		nrIndeksu: '',
		email: '',
		stacjonarny: false,
		role: '',
	})
	const token = localStorage.getItem('token')

	useEffect(() => {
		axios
			.get(`http://localhost:8080/api/studenci/${studentId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setStudent(response.data)
			})
			.catch((error) => console.error(`Error: ${error}`))
	}, [studentId, token])

	const handleInputChange = (event) => {
		const target = event.target
		const value = target.type === 'checkbox' ? target.checked : target.value
		const name = target.name
		setStudent({
			...student,
			[name]: value,
		})
	}

	const handleFormSubmit = (event) => {
		event.preventDefault()

		axios
			.put(`http://localhost:8080/api/studenci/${studentId}`, student, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				setStudent({ imie: '', nazwisko: '', nrIndeksu: '', email: '', stacjonarny: false, password: '', role: '' }) // Reset formu
				onClose() // Dodaj tę linię
			})
			.catch((error) => console.error(`Error: ${error}`))
	}

	return (
		<Drawer anchor='right' open={open} onClose={onClose}>
			<Container component='main' maxWidth='xs'>
				<Typography component='h1' variant='h5'>
					Aktualizuj studenta {studentId}
				</Typography>
				<form onSubmit={handleFormSubmit}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='imie'
						label='Imię'
						name='imie'
						value={student.imie}
						onChange={handleInputChange}
						autoFocus
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='nazwisko'
						label='Nazwisko'
						name='nazwisko'
						value={student.nazwisko}
						onChange={handleInputChange}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='nrIndeksu'
						label='Nr indeksu'
						name='nrIndeksu'
						value={student.nrIndeksu}
						onChange={handleInputChange}
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email'
						name='email'
						value={student.email}
						onChange={handleInputChange}
					/>
					<FormControlLabel
						control={
							<Checkbox checked={student.stacjonarny} onChange={handleInputChange} name='stacjonarny' color='primary' />
						}
						label='Stacjonarny'
					/>
					<Select variant='outlined' value={student.role} onChange={handleInputChange} name='role' fullWidth required>
						<MenuItem value={'USER'}>USER</MenuItem>
						<MenuItem value={'ADMIN'}>ADMIN</MenuItem>
					</Select>
					<Button type='submit' fullWidth variant='contained' color='primary'>
						Aktualizuj
					</Button>
				</form>
			</Container>
		</Drawer>
	)
}

export default UpdateStudent
