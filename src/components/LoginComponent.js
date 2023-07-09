import React, { useState, useEffect } from 'react'
import AuthService from '../Service/AuthService'
import { useNavigate, Link } from 'react-router-dom'
import { Button, TextField, Container, Typography, Grid } from '@mui/material'

function LoginComponent() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleEmailChange = (e) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}
	let navigate = useNavigate()
	// useEffect(() => {
	// 	if (AuthService.getCurrentUser()) navigate('/dashboard')
	// })

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await AuthService.login(email, password)
			if (response) {
				console.log(response)
				navigate('/dashboard') // Handle successful login
			}
		} catch (error) {
			console.error('Login failed', error)
		}
	}
	return (
		<Container
			style={{ padding: '2rem', marginTop: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}
			maxWidth='xs'>
			<Typography variant='h4' style={{ marginBottom: '1rem' }}>
				Login
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					id='email'
					label='Email Address'
					name='email'
					autoComplete='email'
					autoFocus
					value={email}
					onChange={handleEmailChange}
				/>
				<TextField
					variant='outlined'
					margin='normal'
					required
					fullWidth
					name='password'
					label='Password'
					type='password'
					id='password'
					autoComplete='current-password'
					value={password}
					onChange={handlePasswordChange}
				/>
				<Button type='submit' fullWidth variant='contained' color='primary' style={{ marginTop: '1rem' }}>
					Sign In
				</Button>
			</form>
			<Grid container>
				<Grid item>
					<Link to='/register' variant='body2'>
						{'Nie masz konta? Zarejestruj się'}
					</Link>
				</Grid>
			</Grid>
		</Container>
	)
}

export default LoginComponent
