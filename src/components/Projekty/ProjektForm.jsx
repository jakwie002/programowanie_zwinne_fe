import React, { useState } from 'react'
import axios from 'axios'
import { TextField, Button, Drawer, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'

const ProjektForm = () => {
	const [nazwa, setNazwa] = useState('')
	const [opis, setOpis] = useState('')
	const [loading, setLoading] = useState(false)
	const [drawerOpen, setDrawerOpen] = useState(false)
	const token = localStorage.getItem('token')
	const userJson = localStorage.getItem('user')
	const user = JSON.parse(userJson)

	const handleSubmit = async event => {
		event.preventDefault()
		setLoading(true)

		try {
			const response = await axios.post('http://localhost:8080/api/projekty', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				nazwa,
				opis,
			})
			console.log(response.data)
			setDrawerOpen(false) 
		} catch (error) {
			console.error('Błąd podczas tworzenia projektu', error)
		} finally {
			setLoading(false)
		}
	}

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}

	return (
		<>
			<IconButton color="primary" onClick={toggleDrawer}>
				<AddIcon />
			</IconButton>

			<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
				<form onSubmit={handleSubmit} style={{ width: '300px', padding: '16px' }}>
					<h1>Dodaj projekt</h1>

					<TextField
						label="Nazwa"
						variant="outlined"
						value={nazwa}
						onChange={e => setNazwa(e.target.value)}
						required
						fullWidth
						margin="normal"
					/>
					<TextField
						label="Opis"
						variant="outlined"
						value={opis}
						onChange={e => setOpis(e.target.value)}
						multiline
						rows={4}
						fullWidth
						margin="normal"
					/>
					<Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth margin="normal">
						Utwórz projekt
					</Button>
				</form>
			</Drawer>
		</>
	)
}

export default ProjektForm
