import React from 'react'
import { Container, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
	return (
		<Container
			maxWidth='md'
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}>
			<Typography variant='h1' style={{ marginBottom: '2rem' }}>
				404
			</Typography>
			<Typography variant='h4' style={{ marginBottom: '2rem' }}>
				Nie znaleziono strony
			</Typography>
			<Button variant='contained' color='primary' component={Link} to='/'>
				Wróć do strony głównej
			</Button>
		</Container>
	)
}

export default NotFoundPage
