import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Typography, CircularProgress, CardContent, Card, Box, IconButton } from '@mui/material'
import axios from 'axios'
import { AccessTime, Description, EventNote } from '@mui/icons-material'
import Navbar from '../Navbar/Navbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import moment from 'moment/moment'

function ZadanieDetails() {
	const params = useParams()
	const [zadanie, setZadanie] = useState(null)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	function formatDateTime(dateTime) {
		return moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
	}
	useEffect(() => {
		const fetchProjekt = async () => {
			const token = localStorage.getItem('token')
			const res = await axios.get(`http://localhost:8080/api/zadania/${params.id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			setZadanie(res.data)
			setLoading(false)
		}
		fetchProjekt()
	}, [])

	if (loading) {
		return <CircularProgress />
	}
	const goBack = () => {
		navigate(-1)
	}
	return (
		<>
			<Navbar />
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
				<Card sx={{ width: 1000, height: 600 }}>
					<CardContent>
						<Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid grey', pb: 2, mb: 2 }}>
							<IconButton color='primary' onClick={goBack}>
								<ArrowBackIcon />
							</IconButton>
							<Typography variant='h4' sx={{ flexGrow: 1, textAlign: 'center' }}>
								{zadanie.nazwa}
							</Typography>
						</Box>
						<Box display='flex' alignItems='center' mb={1}>
							<AccessTime sx={{ mr: 1 }} />
							<Typography variant='body2'>Data dodania: {formatDateTime(zadanie.dataCzasDodania)}</Typography>
						</Box>
						<Box display='flex' alignItems='center' mb={1}>
							<Description sx={{ mr: 1 }} />
							<Typography variant='body1'>Opis: {zadanie.opis}</Typography>
						</Box>
						<Box display='flex' alignItems='center'>
							<EventNote sx={{ mr: 1 }} />
							<Typography variant='body2'>Kolejność: {zadanie.kolejnosc}</Typography>
						</Box>
					</CardContent>
				</Card>
			</Box>
		</>
	)
}

export default ZadanieDetails
