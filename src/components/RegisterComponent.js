import React, { useState } from 'react'
import AuthService from '../Service/AuthService'
import { TextField, Button, Typography, Container, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

const RegisterComponent = () => {
	const [student, setStudent] = useState({
		imie: '',
		nazwisko: '',
		nrIndeksu: '',
		email: '',
		stacjonarny: true,
		password: '',
	})
	const [errorMessage, setErrorMessage] = useState('')

	const handleInputChange = event => {
		setStudent({ ...student, [event.target.name]: event.target.value })
	}

	const handleRegister = () => {
		AuthService.register(student)
			.then(response => {
				// Handle server respons
				alert('Dodano użytkownika')
				console.log(response.data)
			})
			.catch(error => {
				// Handle errors
				setErrorMessage('Rejestracja nie powiodła się. Spróbuj ponownie.')
			})
	}

	return (
		<Container
			style={{ padding: '2rem', marginTop: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}
			maxWidth="xs">
			<Typography variant="h4" style={{ marginBottom: '1rem' }}>
				Register
			</Typography>
			{errorMessage && <Typography color="error">{errorMessage}</Typography>}
			<form noValidate>
				<TextField required margin="normal" fullWidth name="imie" label="Imię" onChange={handleInputChange} />
				<TextField required margin="normal" fullWidth name="nazwisko" label="Nazwisko" onChange={handleInputChange} />
				<TextField
					required
					margin="normal"
					fullWidth
					name="nrIndeksu"
					label="Numer indeksu"
					onChange={handleInputChange}
				/>
				<TextField required fullWidth name="email" label="Email" margin="normal" onChange={handleInputChange} />
				<TextField
					required
					fullWidth
					name="password"
					label="Hasło"
					margin="normal"
					type="password"
					onChange={handleInputChange}
				/>
				<Button variant="contained" fullWidth color="primary" onClick={handleRegister} style={{ marginTop: '1rem' }}>
					Zarejestruj się
				</Button>
			</form>
			<Grid container>
				<Grid item>
					<Link to="/login" variant="body2">
						{'Masz już konto? Zaloguj się'}
					</Link>
				</Grid>
			</Grid>
		</Container>
	)
}

export default RegisterComponent
