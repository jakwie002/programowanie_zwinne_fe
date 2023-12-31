import React, { useState } from 'react'
import axios from 'axios'
import { Button, TextField, Drawer } from '@mui/material'

const ZadanieForm = ({ projektId, open, onClose }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [nazwa, setNazwa] = useState('')
	const [kolejnosc, setKolejnosc] = useState('')
	const [opis, setOpis] = useState('')
	const [errors, setErrors] = useState({})
	const id = projektId

	

	const onSubmit = async e => {
		e.preventDefault()


		setIsLoading(true)
		try {
			const token = localStorage.getItem('token')
			const newZadanie = {
				nazwa,
				kolejnosc: parseInt(kolejnosc),
				opis,
				projektId: projektId,
			}
			console.log(newZadanie)
			await axios.post('http://localhost:8080/api/zadania', newZadanie, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			setIsLoading(false)
			resetForm()
			onClose()
		} catch (err) {
			console.error(err)
			setIsLoading(false)
		}
	}

	const resetForm = () => {
		setNazwa('')
		setKolejnosc('')
		setOpis('')
	}

	return (
		<Drawer anchor="right" open={open} onClose={onClose}>
			<form onSubmit={onSubmit} style={{ margin: '1rem', width: '300px' }}>
				<h1>Dodaj zadanie</h1>
				<TextField
					value={nazwa}
					onChange={e => setNazwa(e.target.value)}
					label="Nazwa zadania"
					variant="outlined"
					fullWidth
					margin="normal"
					error={!!errors.nazwa}
					helperText={errors.nazwa}
				/>
				<TextField
					value={kolejnosc}
					onChange={e => setKolejnosc(e.target.value)}
					type="number"
					label="Kolejność"
					variant="outlined"
					fullWidth
					margin="normal"
					error={!!errors.kolejnosc}
					helperText={errors.kolejnosc}
				/>
				<TextField
					value={opis}
					onChange={e => setOpis(e.target.value)}
					label="Opis"
					variant="outlined"
					multiline
					rows={4}
					fullWidth
					margin="normal"
					error={!!errors.opis}
					helperText={errors.opis}
				/>
				<Button variant="contained" color="primary" type="submit" disabled={isLoading}>
					Dodaj zadanie
				</Button>
			</form>
		</Drawer>
	)
}

export default ZadanieForm
