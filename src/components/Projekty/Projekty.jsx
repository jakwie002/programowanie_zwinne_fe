import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import ProjektForm from './ProjektForm'
import { Link, Navigate } from 'react-router-dom'
import { Button, IconButton, Input } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import EditProjektForm from './EditProjektForm'
const Projekty = () => {
	const [loading, setLoading] = useState(true)
	const [projekty, setProjekty] = useState([])
	const [page, setPage] = useState(0)
	const [size, setSize] = useState(10)
	const [searchText, setSearchText] = useState('')

	const userJson = localStorage.getItem('user')
	const user = JSON.parse(userJson)
	const isAdmin = user?.roles.some((role) => role === 'ADMIN') ? true : false
	useEffect(() => {
		const fetchProjekty = async () => {
			try {
				const token = localStorage.getItem('token')
				let params = {
					page: page,
					size: size,
					sort: 'asc',
				}
				if (searchText !== '') {
					params = {
						...params,
						nazwa: searchText,
					}
				}
				const response = await axios.get('http://localhost:8080/api/projekty', {
					params: params,
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				})
				const projekty = response.data.content

				const formattedData = projekty.map((projekt, index) => ({
					id: index,
					...projekt,
				}))
				setProjekty(formattedData)
				setLoading(false)
			} catch (error) {
				console.error('Błąd podczas pobierania projektów:', error)
				setLoading(false)
			}
		}

		fetchProjekty()
	}, [page, size, searchText])

	const handleSearch = (event) => {
		setSearchText(event.target.value)
	}
	const handleDelete = async (projektId) => {
		try {
			const token = localStorage.getItem('token')
			await axios.delete(`http://localhost:8080/api/projekty/${projektId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			// Aktualizacja listy projektów po usunięciu
			const newProjekty = projekty.filter((projekt) => projekt.projektId !== projektId)
			setProjekty(newProjekty)
		} catch (error) {
			console.error(`Błąd podczas usuwania projektu: ${projektId}`, error)
		}
	}
	const filteredProjekty = projekty.filter((projekt) => projekt.nazwa.toLowerCase().includes(searchText.toLowerCase()))

	// const columns = [
	// 	{ field: 'projektId', headerName: 'ID Projektu', flex: 1 },
	// 	{ field: 'nazwa', headerName: 'Nazwa', flex: 1 },
	// 	{
	// 		field: 'dataCzasUtworzeniaDateTime',
	// 		headerName: 'Data i czas utworzenia',
	// 		flex: 1,
	// 		valueGetter: (params) => {
	// 			const date = new Date(params.row.dataCzasUtworzeniaDateTime)
	// 			const datePart = date.toLocaleDateString('en-CA')
	// 			const timePart = date.toLocaleTimeString('it-IT').substring(0, 5)
	// 			return `${datePart} ${timePart}`
	// 		},
	// 	},
	// 	{
	// 		field: 'dataCzasModyfikacji',
	// 		headerName: 'Data i czas modyfikacji',
	// 		flex: 1,
	// 		valueGetter: (params) => {
	// 			const date = new Date(params.row.dataCzasModyfikacji)
	// 			const datePart = date.toLocaleDateString('en-CA')
	// 			const timePart = date.toLocaleTimeString('it-IT').substring(0, 5)
	// 			return `${datePart} ${timePart}`
	// 		},
	// 	},
	// 	{
	// 		field: 'details',
	// 		headerName: '',
	// 		sortable: false,
	// 		width: 100,
	// 		disableClickEventBubbling: true,
	// 		renderCell: (params) => {
	// 			const id = params.row.projektId
	// 			return (
	// 				<IconButton>
	// 					<Link to={`/projekty/${id}`}>
	// 						{' '}
	// 						<ArticleIcon className='iconSidebar' color='primary' />
	// 					</Link>
	// 				</IconButton>
	// 			)
	// 		},
	// 	},
	// 	{
	// 		field: 'edit',
	// 		headerName: 'Edycja',
	// 		sortable: false,
	// 		width: 100,
	// 		renderCell: (params) => {
	// 			const id = params.row.projektId
	// 			return <EditProjektForm projectId={id} />
	// 		},
	// 	},
	// 	{
	// 		field: 'delete',
	// 		headerName: 'Usuń',
	// 		sortable: false,
	// 		width: 100,
	// 		renderCell: (params) => {
	// 			const id = params.row.projektId
	// 			return (
	// 				<IconButton onClick={() => handleDelete(id)}>
	// 					<DeleteIcon color='secondary' />
	// 				</IconButton>
	// 			)
	// 		},
	// 	},
	// ]
	let columns = [
		{ field: 'projektId', headerName: 'ID Projektu', flex: 1 },
		{ field: 'nazwa', headerName: 'Nazwa', flex: 1 },
		{
			field: 'dataCzasUtworzeniaDateTime',
			headerName: 'Data i czas utworzenia',
			flex: 1,
			valueGetter: (params) => {
				const date = new Date(params.row.dataCzasUtworzeniaDateTime)
				const datePart = date.toLocaleDateString('en-CA')
				const timePart = date.toLocaleTimeString('it-IT').substring(0, 5)
				return `${datePart} ${timePart}`
			},
		},
		{
			field: 'dataCzasModyfikacji',
			headerName: 'Data i czas modyfikacji',
			flex: 1,
			valueGetter: (params) => {
				const date = new Date(params.row.dataCzasModyfikacji)
				const datePart = date.toLocaleDateString('en-CA')
				const timePart = date.toLocaleTimeString('it-IT').substring(0, 5)
				return `${datePart} ${timePart}`
			},
		},
		{
			field: 'details',
			headerName: '',
			sortable: false,
			width: 100,
			disableClickEventBubbling: true,
			renderCell: (params) => {
				const id = params.row.projektId
				return (
					<IconButton>
						<Link to={`/projekty/${id}`}>
							<ArticleIcon className='iconSidebar' color='primary' />
						</Link>
					</IconButton>
				)
			},
		},
	]

	if (isAdmin) {
		columns.push(
			{
				field: 'edit',
				headerName: 'Edycja',
				sortable: false,
				width: 100,
				renderCell: (params) => {
					const id = params.row.projektId
					return <EditProjektForm projectId={id} />
				},
			},
			{
				field: 'delete',
				headerName: 'Usuń',
				sortable: false,
				width: 100,
				renderCell: (params) => {
					const id = params.row.projektId
					return (
						<IconButton onClick={() => handleDelete(id)}>
							<DeleteIcon color='secondary' />
						</IconButton>
					)
				},
			}
		)
	}
	return (
		<div>
			<Navbar />
			<div style={{ width: '100%' }}>
				{isAdmin ? <ProjektForm /> : null}
				<Input type='text' value={searchText} onChange={handleSearch} placeholder='Wyszukaj projekt' />
				<DataGrid
					rows={filteredProjekty}
					columns={columns}
					pageSize={size}
					loading={loading}
					onPageChange={(newPage) => setPage(newPage)}
					onPageSizeChange={(newPageSize) => setSize(newPageSize)}
				/>
			</div>
		</div>
	)
}

export default Projekty
