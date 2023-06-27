import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, TextField, Drawer } from '@mui/material'

const EdycjaZadaniaForm = ({ zadanieId, open, onClose }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [nazwa, setNazwa] = useState('')
	const [kolejnosc, setKolejnosc] = useState('')
	const [opis, setOpis] = useState('')
	const id = zadanieId

	useEffect(() => {
		const fetchZadanie = async () => {
			try {
				const res = await axios.get(`http://localhost:8080/api/zadania/${id}`)
				setNazwa(res.data.nazwa)
				setKolejnosc(res.data.kolejnosc)
				setOpis(res.data.opis)
			} catch (err) {
				console.error(err)
			}
		}

		if (id) fetchZadanie()
	}, [id])

	const onSubmit = async (e) => {
		e.preventDefault()

		setIsLoading(true)
		try {
			const token = localStorage.getItem('token')
			const updatedZadanie = {
				nazwa,
				kolejnosc: parseInt(kolejnosc),
				opis,
			}
			await axios.put(`http://localhost:8080/api/zadania/${id}`, updatedZadanie, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			setIsLoading(false)
			onClose()
		} catch (err) {
			console.error(err)
			setIsLoading(false)
		}
	}

	return (
		<Drawer anchor='right' open={open} onClose={onClose}>
			<form onSubmit={onSubmit} style={{ margin: '1rem', width: '300px' }}>
				<h1>Edytuj zadanie</h1>
				<TextField
					value={nazwa}
					onChange={(e) => setNazwa(e.target.value)}
					label='Nazwa zadania'
					variant='outlined'
					fullWidth
					margin='normal'
				/>
				<TextField
					value={kolejnosc}
					onChange={(e) => setKolejnosc(e.target.value)}
					type='number'
					label='Kolejność'
					variant='outlined'
					fullWidth
					margin='normal'
				/>
				<TextField
					value={opis}
					onChange={(e) => setOpis(e.target.value)}
					label='Opis'
					variant='outlined'
					multiline
					rows={4}
					fullWidth
					margin='normal'
				/>
				<Button variant='contained' color='primary' type='submit' disabled={isLoading}>
					Zapisz zmiany
				</Button>
			</form>
		</Drawer>
	)
}

export default EdycjaZadaniaForm
