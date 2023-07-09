import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DescriptionIcon from '@mui/icons-material/Description'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import VideocamIcon from '@mui/icons-material/Videocam'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import ImageIcon from '@mui/icons-material/Image'
import ArticleIcon from '@mui/icons-material/Article'
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
} from '@mui/material'

const PlikList = ({ projektId }) => {
	const [pliki, setPliki] = useState([])

	useEffect(() => {
		const fetchPliki = async () => {
			const token = localStorage.getItem('token')
			const res = await axios.get(`http://localhost:8080/api/pliki/${projektId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			setPliki(res.data)
		}
		fetchPliki()
	}, [projektId])
	const downloadFile = async fileName => {
		try {
			const token = localStorage.getItem('token')
			const response = await axios.get(`http://localhost:8080/api/downloadFile/${fileName}`, {
				responseType: 'blob', // important
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})

			// Create a new blob object
			const downloadUrl = window.URL.createObjectURL(new Blob([response.data]))

			// Create a link for the download
			let link = document.createElement('a')
			link.href = downloadUrl

			// Set the download filename
			link.download = fileName

			// Trigger the download by simulating click
			link.click()
		} catch (error) {
			console.log('Error downloading file:', error)
		}
	}
	const deleteFile = async plik => {
		const token = localStorage.getItem('token')
		try {
			await axios.delete(`http://localhost:8080/api/pliki/${plik.id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			// Po usunięciu pliku odśwież listę plików
			const res = await axios.get(`http://localhost:8080/api/pliki/${projektId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
			setPliki(res.data)
			console.log(`Plik ${plik.fileName} usunięty.`)
		} catch (err) {
			console.error('Wystąpił błąd podczas usuwania pliku: ', err)
		}
	}
	const getFileIcon = fileName => {
		const ext = fileName.split('.').pop().toLowerCase()
		switch (ext) {
			case 'pdf':
				return <PictureAsPdfIcon />
			case 'txt':
				return <DescriptionIcon />
			case 'mp3':
				return <AudiotrackIcon />
			case 'mp4':
				return <VideocamIcon />
			case 'png':
			case 'jpg':
			case 'jpeg':
				return <ImageIcon />
			case 'doc':
			case 'docx':
			case 'xls':
			case 'xlsx':
				return <ArticleIcon />

			default:
				return <InsertDriveFileIcon />
		}
	}
	return (
		<div>
			<Typography variant="h6">Pliki w projekcie:</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Ikona</TableCell>
							<TableCell>Nazwa pliku</TableCell>
							<TableCell>Akcje</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{pliki.map((plik, index) => (
							<TableRow key={index}>
								<TableCell>{getFileIcon(plik.fileName)}</TableCell>
								<TableCell>
									<Typography variant="body1" color="textPrimary">
										{plik.fileName}
									</Typography>
								</TableCell>
								<TableCell>
									<Button variant="contained" color="secondary" onClick={() => deleteFile(plik)}>
										Usuń
									</Button>
									<Button variant="contained" color="secondary" onClick={() => downloadFile(plik.fileName)}>
										Pobierz
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default PlikList
