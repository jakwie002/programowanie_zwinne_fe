import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/system'
import { Button, IconButton } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import EditIcon from '@mui/icons-material/Edit'
import { Link, Navigate } from 'react-router-dom'
import moment from 'moment'
import EdycjaZadaniaForm from './ZadanieForm'
import { useCallback } from 'react'

const ZadaniaList = ({ projektId }) => {
	const [zadania, setZadania] = useState([])
	const [editOpen, setEditOpen] = useState(false)
	const [editId, setEditId] = useState(null)

	function formatDateTime(dateTime) {
		return moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
	}
	const userJson = localStorage.getItem('user')
	const user = JSON.parse(userJson)

	const isAdmin = user?.roles.some((role) => role === 'ADMIN') ? true : false
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchZadania = useCallback(async () => {
		const token = localStorage.getItem('token')
		const res = await axios.get(`http://localhost:8080/api/projekt/${projektId}/zadania`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (res.data.content) {
			const transformedData = res.data.content.map((zadanie) => ({
				id: zadanie.zadanieId,
				nazwa: zadanie.nazwa,
				kolejnosc: zadanie.kolejnosc,
				opis: zadanie.opis,
				dataCzasDodania: formatDateTime(zadanie.dataCzasDodania),
				projektId: zadanie.projekt.projektId,
			}))
			setZadania(transformedData)
		}
	})
	useEffect(() => {
		fetchZadania()
	}, [fetchZadania, projektId])

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
			renderCell: (params) => {
				const id = params.row.id

				return (
					<IconButton>
						<Link to={`/zadanie/${id}`}>
							{' '}
							<ArticleIcon className='iconSidebar' color='primary' />
						</Link>
					</IconButton>
				)
			},
		},
	]
	if (isAdmin) {
		columns.push({
			field: 'edit',
			headerName: '',
			sortable: false,
			width: 100,
			disableClickEventBubbling: true,
			renderCell: (params) => {
				const id = params.row.id

				return (
					<IconButton
						onClick={() => {
							setEditId(id)
							setEditOpen(true)
						}}>
						<EditIcon color='primary' />
					</IconButton>
				)
			},
		})
	}

	return (
		<Box sx={{ height: '80vh', width: '100%', mt: 3, mx: 2 }}>
			<DataGrid rows={zadania} columns={columns} pageSize={5} rowsPerPageOptions={[5]} pagination autoHeight />
			{editId && (
				<EdycjaZadaniaForm
					zadanieId={editId}
					open={editOpen}
					onClose={() => {
						setEditOpen(false)
						fetchZadania()
					}}
				/>
			)}
		</Box>
	)
}

export default ZadaniaList
