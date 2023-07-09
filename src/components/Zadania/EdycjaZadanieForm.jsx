import React, { useState } from 'react'
import axios from 'axios'
import { Button, TextField, Drawer } from '@mui/material'

const ZadanieFormEdit = ({ zadanie, open, onClose }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [nazwa, setNazwa] = useState(zadanie.nazwa)
	const [kolejnosc, setKolejnosc] = useState(zadanie.kolejnosc)
	const [opis, setOpis] = useState(zadanie.opis)
	const [errors, setErrors] = useState({})
	const id = zadanie.id

	const validate = () => {
		let newErrors = {}
		if (!nazwa || nazwa.length < 3) newErrors.nazwa = 'Nazwa zadania jest wymagana i powinna mieć co najmniej 3 znaki.'
		if (!kolejnosc) newErrors.kolejnosc = 'Kolejność jest wymagana.'
		if (opis.length > 1000) newErrors.opis = 'Opis nie powinien przekraczać 1000 znaków.'

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const onSubmit = async e => {
		e.preventDefault()

		if (!validate()) return

		setIsLoading(true)
		try {
			const token = localStorage.getItem('token')
			const updatedZadanie = {
				id,
				nazwa,
				kolejnosc: parseInt(kolejnosc),
				opis,
				projektId: zadanie.projektId,
			}
			console.log(updatedZadanie)
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
		<Drawer anchor="right" open={open} onClose={onClose}>
			<form onSubmit={onSubmit} style={{ margin: '1rem', width: '300px' }}>
				<h1>Edytuj zadanie</h1>
				{/* Pozostały kod formularza pozostaje bez zmian */}
				<Button variant="contained" color="primary" type="submit" disabled={isLoading}>
					Zapisz zmiany
				</Button>
			</form>
		</Drawer>
	)
}

export default ZadanieFormEdit
