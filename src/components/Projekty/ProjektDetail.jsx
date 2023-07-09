import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ZadaniaList from '../Zadania/ZadaniaList'
import { Button, Card, CardContent, CardHeader, Typography, Box, IconButton, CircularProgress } from '@mui/material'
import Navbar from '../Navbar/Navbar'
import ZadanieForm from '../Zadania/ZadanieForm'
import AddIcon from '@mui/icons-material/Add'
import { AccessTime, Description, EventNote } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import moment from 'moment'
import PlikUpload from '../Plik/PlikUpload'
import PlikList from '../Plik/PlikList'

const ProjektDetail = () => {
	const params = useParams()
	const [projekt, setProjekt] = useState(null)
	const navigate = useNavigate()
	const [isFormOpen, setFormOpen] = useState(false)

	useEffect(() => {
		const fetchProjekt = async () => {
			const token = localStorage.getItem('token')
			const res = await axios.get(`http://localhost:8080/api/projekty/${params.id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			setProjekt(res.data)
			console.log(res.data)
		}
		fetchProjekt()
	}, [params.id])

	if (!projekt) {
		return (
			<Typography>
				<CircularProgress />
			</Typography>
		)
	}

	const handleFormOpen = () => {
		setFormOpen(true)
	}

	const handleFormClose = () => {
		setFormOpen(false)
	}

	const goBack = () => {
		navigate(-1)
	}

	function formatDateTime(dateTime) {
		return moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
	}
	return (
		<>
			<Navbar />
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
				<Card sx={{ maxWidth: '100%', maxHeight: '100%' }}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							borderBottom: '1px solid grey',
							padding: '8px',
						}}>
						<IconButton color="primary" onClick={goBack}>
							<ArrowBackIcon />
						</IconButton>
						<Typography variant="h6">{`Projekt ${projekt.nazwa}`}</Typography>

						<div style={{ display: 'flex', alignItems: 'center' }}>
							<IconButton color="primary" onClick={handleFormOpen}>
								<AddIcon />
							</IconButton>
							<PlikUpload projektId={params.id} />
						</div>
					</Box>
					<ZadanieForm projektId={params.id} open={isFormOpen} onClose={handleFormClose} />
					<CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Box sx={{ flex: 1 }}>
							<Typography variant="h6">Szczegóły projektu:</Typography>
							<Typography variant="body2">{projekt.opis}</Typography>
						</Box>
						<Box sx={{ borderLeft: '1px solid grey', pl: 3 }}>
							<Typography variant="subtitle1">Godziny:</Typography>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<EventNote sx={{ mr: 1 }} />
								<Typography variant="caption">
									Data utworzenia: {formatDateTime(projekt.dataCzasUtworzeniaDateTime)}
								</Typography>
							</Box>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<Description sx={{ mr: 1 }} />
								<Typography variant="caption">
									Data modyfikacji: {formatDateTime(projekt.dataCzasModyfikacji)}
								</Typography>
							</Box>
						</Box>
					</CardContent>

					<PlikList projektId={params.id} />
					<ZadaniaList projektId={params.id} />
				</Card>
			</Box>
		</>
	)
}

export default ProjektDetail
