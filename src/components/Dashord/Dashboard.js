import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Typography, Container } from '@mui/material'

const Dashboard = () => {
	return (
		<div>
			<Navbar />
			<Container maxWidth="sm" style={{ marginTop: '2rem' }}>
				<Typography variant="h4" gutterBottom>
					Witaj na stronie głównej!
				</Typography>
			</Container>
		</div>
	)
}

export default Dashboard
