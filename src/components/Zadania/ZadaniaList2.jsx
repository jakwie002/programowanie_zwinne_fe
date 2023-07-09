import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/system'
import { Button, IconButton, TextField } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Navbar from '../Navbar/Navbar'
import ZadanieForm2 from './ZadanieForm2'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'

const ZadaniaList2 = () => {
	const [zadania, setZadania] = useState([])
	const [filteredZadania, setFilteredZadania] = useState([])
	const [searchTerm, setSearchTerm] = useState('')

	const formatDateTime = dateTime => {
		return moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
	}

	const handleSearchChange = e => {
		setSearchTerm(e.target.value)
	}

	useEffect(() => {
		const fetchZadania = async () => {
			const token = localStorage.getItem('token')
			const res = await axios.get('http://localhost:8080/api/zadania', {
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
	}, [])

	useEffect(() => {
		const results = zadania.filter(zadanie => zadanie.nazwa.toLowerCase().includes(searchTerm.toLowerCase()))
		setFilteredZadania(results)
	}, [zadania, searchTerm])

	const [isFormOpen, setIsFormOpen] = useState(false)
	const handleOpenForm = () => {
		setIsFormOpen(true)
	}

	const handleCloseForm = () => {
		setIsFormOpen(false)
		window.location.reload()
	}
	const deleteZadanie = async (id) => {
		try {
			const token = localStorage.getItem('token')
			await axios.delete(`http://localhost:8080/api/zadania/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			setZadania(zadania.filter((zadanie) => zadanie.id !== id))
		} catch (error) {
			console.error(`Nie można usunąć zadania: ${error}`)
		}
	}
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
				console.log(id)

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
		{
			field: 'delete',
			headerName: 'Usuń',
			sortable: false,
			width: 100,
			disableClickEventBubbling: true,
			renderCell: params => {
				const id = params.row.id

				return (
					<IconButton onClick={() => deleteZadanie(id)}>
						<DeleteIcon color="secondary" />
					</IconButton>
				)
			},
		},
	]

	return (
		<>
			<Navbar />
			<Box sx={{ height: '80vh', width: '100%', mt: 3, mx: 2 }}>
				<TextField label="Wyszukaj zadanie" value={searchTerm} onChange={handleSearchChange} />
				<IconButton color="primary" onClick={handleOpenForm}>
					<AddIcon />
				</IconButton>{' '}
				<ZadanieForm2 open={isFormOpen} onClose={handleCloseForm} />
				<DataGrid
					rows={filteredZadania}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					pagination
					autoHeight
				/>
			</Box>
		</>
	)
}

export default ZadaniaList2
