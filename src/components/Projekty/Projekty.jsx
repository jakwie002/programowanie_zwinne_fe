import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import ProjektForm from './ProjektForm'
import { Link, Navigate } from 'react-router-dom'
import { Button, IconButton, Input, TextField } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'

const Projekty = () => {
	const [loading, setLoading] = useState(true)
	const [projekty, setProjekty] = useState([])
	const [filteredProjekty, setFilteredProjekty] = useState([])
	const [page, setPage] = useState(0)
	const [size, setSize] = useState(10)
	const [searchText, setSearchText] = useState('')

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

	const handleSearch = event => {
		setSearchText(event.target.value)
	}

	useEffect(() => {
		const results = projekty.filter(projekt => projekt.nazwa.toLowerCase().includes(searchText.toLowerCase()))
		setFilteredProjekty(results)
	}, [projekty, searchText])

	const columns = [
		{ field: 'projektId', headerName: 'ID Projektu', flex: 1 },
		{ field: 'nazwa', headerName: 'Nazwa', flex: 1 },
		{ field: 'dataCzasUtworzeniaDateTime', headerName: 'Data i czas utworzenia', flex: 1 },
		{ field: 'dataCzasModyfikacji', headerName: 'Data i czas modyfikacji', flex: 1 },
		{
			field: 'details',
			headerName: '',
			sortable: false,
			width: 100,
			disableClickEventBubbling: true,
			renderCell: params => {
				const id = params.row.projektId
				console.log(id)

				return (
					<IconButton>
						<Link to={`/projekty/${id}`}>
							{' '}
							<ArticleIcon className="iconSidebar" color="primary" />
						</Link>
					</IconButton>
				)
			},
		},
	]

	return (
		<div>
			<Navbar />
			<div style={{ height: 400, width: '100%' }}>
				<ProjektForm />

				<TextField label="Wyszukaj zadanie" value={searchText} onChange={handleSearch} />
				<DataGrid
					rows={filteredProjekty}
					columns={columns}
					pageSize={size}
					loading={loading}
					onPageChange={newPage => setPage(newPage)}
					onPageSizeChange={newPageSize => setSize(newPageSize)}
				/>
			</div>
		</div>
	)
}

export default Projekty
