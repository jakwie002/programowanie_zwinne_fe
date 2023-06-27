import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import Navbar from '../Navbar/Navbar'
import { Person as PersonIcon, Lock as LockIcon, School as SchoolIcon } from '@mui/icons-material'

const Profile = () => {
	const token = localStorage.getItem('token')
	const userJson = localStorage.getItem('user')
	const user = JSON.parse(userJson)
	// const isAdmin = user?.roles.some(role => role === 'ROLE_ADMIN') ? true : false

	return (
		<>
			<Navbar />
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
				<Card sx={{ width: 400 }}>
					<CardContent>
						<Typography variant="h4">Profil Użytkownika</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<PersonIcon sx={{ mr: 1 }} />
							<Typography variant="subtitle1">Imię: {user.imie}</Typography>
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<PersonIcon sx={{ mr: 1 }} />
							<Typography variant="subtitle1">Nazwisko: {user.nazwisko}</Typography>
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<SchoolIcon sx={{ mr: 1 }} />
							<Typography variant="subtitle1">Nr indeksu: {user.nrIndeksu}</Typography>
						</Box>
				
					</CardContent>
				</Card>
			</Box>
		</>
	)
}

export default Profile
