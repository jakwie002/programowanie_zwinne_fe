import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/system'
import { Button, IconButton } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import { Link, Navigate } from 'react-router-dom'
import moment from 'moment'

const ZadaniaList = ({ projektId }) => {
	const [zadania, setZadania] = useState([])
	function formatDateTime(dateTime) {
		return moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
	}
	useEffect(() => {
		const fetchZadania = async () => {
			const token = localStorage.getItem('token')
			const res = await axios.get(`http://localhost:8080/api/projekt/${projektId}/zadania`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})

			if (res.data.content) {
				const transformedData = res.data.content.map(zadanie => ({
					id: zadanie.zadanieId,
					nazwa: zadanie.nazwa,
					kolejnosc: zadanie.kolejnosc,
					opis: zadanie.opis,
					dataCzasDodania: formatDateTime(zadanie.dataCzasDodania),
					projektId: zadanie.projekt.projektId,
				}))
				setZadania(transformedData)
			}
		}
		fetchZadania()
	}, [projektId])

	const columns = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{ field: 'nazwa', headerName: 'Nazwa', width: 130 },
		{ field: 'kolejnosc', headerName: 'Kolejność', width: 130 },
		{ field: 'opis', headerName: 'Opis', width: 250 },
		{ field: 'dataCzasDodania', headerName: 'Data i Czas Dodania', width: 200 },
		{ field: 'projektId', headerName: 'Projekt ID', width: 130 },
		{
			field: 'details',
			headerName: '',
			sortable: false,
			width: 100,
			disableClickEventBubbling: true,
			renderCell: params => {
				const id = params.row.id
				return (
					<IconButton>
						<Link to={`/zadanie/${id}`}>
							{' '}
							<ArticleIcon className="iconSidebar" color="primary" />
						</Link>
					</IconButton>
				)
			},
		},
	]

	return (
		<Box sx={{ height: '80vh', width: '100%', mt: 3, mx: 2 }}>
			<DataGrid rows={zadania} columns={columns} pageSize={5} rowsPerPageOptions={[5]} pagination autoHeight />
		</Box>
	)
}

export default ZadaniaList
