import React from 'react'

import { AppBar, Button, Typography } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import AuthService from '../../Service/AuthService'
import { Link } from 'react-router-dom'

const Navbar = () => {
	const userJson = localStorage.getItem('user')
	const user = JSON.parse(userJson)
	const isAdmin = user?.roles.some(role => role === 'ADMIN') ? true : false
	return (
		<div style={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						Moja Aplikacja
					</Typography>
					<Button color="inherit" component={Link} to="/profile">
						Profil
					</Button>
					<Button color="inherit" component={Link} to="/projekty">
						Projekty
					</Button>
					<Button color="inherit" component={Link} to="/chat">
						Chat
					</Button>
					{isAdmin ? (
						<Button color="inherit" component={Link} to="/student">
							Studenci
						</Button>
					) : null}
					<Button color="inherit" onClick={() => AuthService.logout()} component={Link} to="/login">
						Wyloguj się
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar
